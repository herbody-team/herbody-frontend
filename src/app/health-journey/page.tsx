"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, getAccessToken } from "@/lib/api";
import OrganCard from "@/components/body/OrganCard";
import { ORGANS } from "@/lib/organs";
import type { OrganId } from "@/types/organ";

const BodyViewer = dynamic(
  () => import("@/components/body/BodyViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center text-sm text-ink/70">
        Loading the interactive body…
      </div>
    ),
  },
);

const navigation = [
  ["✣", "Interactive Body"],
  ["⌁", "Organ Details"],
  ["♧", "AI Companion"],
];

export default function HealthJourneyPage() {
  const [active, setActive] = useState("Interactive Body");
  const [loggingOut, setLoggingOut] = useState(false);
  const [selectedOrgan, setSelectedOrgan] = useState<OrganId | null>(null);
  const router = useRouter();

  async function logout() {
    setLoggingOut(true);
    try {
      await apiRequest("/api/auth/logout", {
        method: "POST",
        token: getAccessToken(),
      });
    } finally {
      sessionStorage.removeItem("herbody_access_token");
      router.push("/login");
    }
  }

  return (
    <main className="dashboard">
      <aside className="dashboard-sidebar">
        <Link href="/" className="dashboard-brand">
          <span className="brand-mark">♥</span>
          <span><strong>HerBody</strong><small>FEMTECH<br />EDU</small></span>
        </Link>
        <p className="dashboard-label">CURRICULUM</p>
        <nav>
          {navigation.map(([icon, label]) =>
            label === "Interactive Body" ? (
              <Link
                key={label}
                href="/interactive-body"
                className={active === label ? "dashboard-nav active" : "dashboard-nav"}
                onClick={() => setActive(label)}
              >
                <span>{icon}</span>{label}
              </Link>
            ) : (
              <button
                key={label}
                className={active === label ? "dashboard-nav active" : "dashboard-nav"}
                onClick={() => setActive(label)}
              >
                <span>{icon}</span>{label}
              </button>
            ),
          )}
        </nav>
        <div className="dashboard-profile">
          <span className="profile-avatar">♟</span>
          <span><strong>Dr. Sophia Althaus</strong><small>Clinical Lead</small></span>
          <button aria-label="Settings">⚙</button>
        </div>
        <button className="logout-button" onClick={logout} disabled={loggingOut}>
          <span>↪</span>{loggingOut ? "Signing out…" : "Log out"}
        </button>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <span>Anatomy <b>›</b> <strong>Explorer</strong></span>
          <span className="cycle-badge">● DAY 14 · OVULATORY</span>
        </header>
        <div className="dashboard-heading">
          <div><p className="dashboard-eyebrow">● 3D FEMTECH ATLAS</p><h1>Explore Your Body.</h1><p>Interactive biological atlas in translucent resonance with your natural cycles.</p></div>
          <div className="body-tabs"><button className="selected">Whole Body</button><button>Pelvic System</button><button>Neuroendocrine</button></div>
        </div>
        <div className="atlas-stage">
          <div className="anatomy-visual">
            <div className="h-full w-full" aria-label="Interactive 3D anatomical model">
              <BodyViewer
                selectedOrgan={selectedOrgan}
                onSelect={setSelectedOrgan}
              />
            </div>
            <small className="scale-label">◉ &nbsp; Coronal Educational Stance · Scale 1:1</small>
          </div>
          <div className="organ-card">
            <OrganCard selectedOrgan={selectedOrgan} />
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose an organ">
              {(Object.keys(ORGANS) as OrganId[]).map((organId) => {
                const organ = ORGANS[organId];
                const isSelected = selectedOrgan === organId;
                return (
                  <button
                    key={organId}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedOrgan(organId)}
                    className={`rounded-full border px-3 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple ${
                      isSelected
                        ? "border-brand-pink bg-brand-pink text-white"
                        : "border-brand-purple/15 bg-white text-brand-purple"
                    }`}
                  >
                    {organ.label}
                  </button>
                );
              })}
            </div>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {selectedOrgan ? `${ORGANS[selectedOrgan].label} selected.` : "No organ selected."}
            </p>
          </div>
        </div>
        <footer className="dashboard-footer"><span>♧ CLINICAL MODEL · 3D FEMTECH ANATOMICAL ATLAS</span><span>Select pin or rotate angle to view hormonal dynamics</span></footer>
      </section>
    </main>
  );
}
