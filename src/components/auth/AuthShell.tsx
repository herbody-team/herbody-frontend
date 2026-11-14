import Link from "next/link";
import Image from "next/image";

export default function AuthShell({
  children,
  mode = "login",
}: {
  children: React.ReactNode;
  mode?: "login" | "register";
}) {
  return (
    <main className="auth-page">
      <header className="auth-header">
        <Link href="/" className="auth-logo">HerBody</Link>
        <div className="auth-header-links">
          <Link href="/healthy-life">◌ Explore Anonymously</Link>
          <Link href={mode === "login" ? "/register" : "/login"}>
            {mode === "login" ? "Create account →" : "← Sign in"}
          </Link>
        </div>
      </header>
      <div className="auth-content">{children}</div>
      <p className="auth-disclaimer">HerBody honors biological autonomy. Encrypted at rest. Never sold to third-party data brokers.</p>
    </main>
  );
}

export function FeaturePanel({ register = false }: { register?: boolean }) {
  return (
    <aside className="feature-panel">
      <span className="eyebrow">✦ FEMTECH EDUCATION · SCIENTIFIC PRECISION</span>
      <h1>{register ? "Begin your journey of anatomical discovery." : <>Scientific clarity meets <em>intimate intuition.</em></>}</h1>
      <p>{register ? "Join thousands of women exploring their bodies with clinical accuracy, transparent 3D physiological models, and compassionate AI companions." : "Your anatomical twin, synchronized with your hormonal cycles, medical benchmarks, and everyday vitality."}</p>
      <div className="body-image-wrap">
        <Image
          src="/body.png"
          alt="3D anatomical body visualization"
          width={410}
          height={306}
          priority
        />
      </div>
      <div className="feature-pills"><span>♡ Cycle Synchrony</span><span>♢ HIPAA & GDPR Grade</span></div>
      <small>♧ Zero Data Monetization Guarantee</small>
    </aside>
  );
}
