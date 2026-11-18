"use client";

import { Bounds, Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { Component, type ReactNode, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ORGANS, MODEL_URL } from "@/lib/organs";
import type { OrganId } from "@/types/organ";

type BodyViewerProps = {
  selectedOrgan: OrganId | null;
  onSelect: (organ: OrganId | null) => void;
};

type ViewerErrorBoundaryProps = {
  children: ReactNode;
  onRetry: () => void;
};

type ViewerErrorBoundaryState = {
  failed: boolean;
};

class ViewerErrorBoundary extends Component<
  ViewerErrorBoundaryProps,
  ViewerErrorBoundaryState
> {
  state: ViewerErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ViewerErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="grid h-full min-h-80 place-items-center p-6 text-center">
          <div>
            <p className="font-semibold text-brand-purple">The 3D model could not load.</p>
            <p className="mt-2 text-sm text-ink/70">Check your connection and try again.</p>
            <button
              type="button"
              onClick={() => {
                this.setState({ failed: false });
                this.props.onRetry();
              }}
              className="mt-4 rounded-full bg-brand-purple px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Model({ selectedOrgan, onSelect }: BodyViewerProps) {
  const gltf = useGLTF(MODEL_URL);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganId | null>(null);

  useEffect(() => {
    const brandPink =
      typeof window === "undefined"
        ? new THREE.Color("pink")
        : new THREE.Color(
            getComputedStyle(document.documentElement)
              .getPropertyValue("--color-brand-pink")
              .trim() || "pink",
          );

    scene.traverse((object) => {
      if (!((object as THREE.Mesh).isMesh)) return;
      const mesh = object as THREE.Mesh;

      const matchingOrgan = (Object.keys(ORGANS) as OrganId[]).find((organId) =>
        ORGANS[organId].meshNames.includes(mesh.name),
      );
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      mesh.material = materials.map((material) => {
        if (!material) return material;
        const cloned = material.clone();
        if (cloned instanceof THREE.MeshStandardMaterial) {
          const isActive =
            matchingOrgan === selectedOrgan || matchingOrgan === hoveredOrgan;
          cloned.emissive.copy(isActive ? brandPink : new THREE.Color("black"));
          cloned.emissiveIntensity = matchingOrgan === selectedOrgan ? 1.1 : matchingOrgan === hoveredOrgan ? 0.35 : 0;
        }
        return cloned;
      });
    });
  }, [hoveredOrgan, scene, selectedOrgan]);

  useEffect(() => {
    document.body.style.cursor = hoveredOrgan ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hoveredOrgan]);

  function handleClick(event: ThreeEvent<MouseEvent>, organ: OrganId) {
    event.stopPropagation();
    onSelect(organ);
  }

  return (
    <Bounds fit clip observe margin={1.25}>
      <Center>
        <primitive
          object={scene}
          onClick={(event: ThreeEvent<MouseEvent>) => {
            const clickedMesh = event.object as THREE.Mesh;
            const organId = (Object.keys(ORGANS) as OrganId[]).find((id) =>
              ORGANS[id].meshNames.includes(clickedMesh.name),
            );
            if (organId) handleClick(event, organId);
            else event.stopPropagation();
          }}
          onPointerOver={(event: ThreeEvent<PointerEvent>) => {
            event.stopPropagation();
            const hoveredMesh = event.object as THREE.Mesh;
            const organId = (Object.keys(ORGANS) as OrganId[]).find((id) =>
              ORGANS[id].meshNames.includes(hoveredMesh.name),
            );
            setHoveredOrgan(organId ?? null);
          }}
          onPointerOut={() => setHoveredOrgan(null)}
        />
      </Center>
    </Bounds>
  );
}

useGLTF.preload(MODEL_URL);

export default function BodyViewer(props: BodyViewerProps) {
  const [retryKey, setRetryKey] = useState(0);

  return (
    <ViewerErrorBoundary
      onRetry={() => {
        useGLTF.clear(MODEL_URL);
        setRetryKey((key) => key + 1);
      }}
    >
      <Canvas
        key={retryKey}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 3], fov: 35, near: 0.1, far: 100 }}
        onPointerMissed={() => props.onSelect(null)}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        aria-label="Interactive 3D human body model"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <Model {...props} />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={1.5}
          maxDistance={8}
          rotateSpeed={0.7}
          zoomSpeed={0.7}
        />
      </Canvas>
    </ViewerErrorBoundary>
  );
}
