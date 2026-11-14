"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, getAccessToken } from "@/lib/api";

const navigation = [
  ["✣", "Interactive Body"],
  ["⌁", "Organ Details"],
  ["♧", "AI Companion"],
];

export default function HealthJourneyPage() {
  const [active, setActive] = useState("Interactive Body");
  const [loggingOut, setLoggingOut] = useState(false);
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
          {navigation.map(([icon, label]) => (
            <button key={label} className={active === label ? "dashboard-nav active" : "dashboard-nav"} onClick={() => setActive(label)}>
              <span>{icon}</span>{label}
            </button>
          ))}
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
            <div className="anatomy-glow" />
            <div className="model-figure" aria-label="Interactive 3D anatomical model">
              <span className="model-head" /><span className="model-neck" /><span className="model-torso" />
              <span className="model-arm left" /><span className="model-arm right" />
              <span className="model-leg left" /><span className="model-leg right" />
              <span className="model-organ heart" /><span className="model-organ uterus" />
            </div>
            <span className="model-focus">● UTERUS</span>
            <small className="scale-label">◉ &nbsp; Coronal Educational Stance · Scale 1:1</small>
          </div>
          <article className="organ-card">
            <div className="organ-card-top"><span>PELVIC RESONANCE</span><small>● Active Node</small></div>
            <h2>The Uterus</h2>
            <p>Layered smooth muscle architecture in monthly synchronization with endocrine signaling.</p>
            <div className="organ-stats"><div><small>LINING DEPTH</small><strong>11.2 mm</strong><span>Secretory phase</span></div><div><small>CADENCE</small><strong>28-Day Cycle</strong><span>Stem-cell renewal</span></div></div>
            <button className="discover-button">Discover Organ <b>→</b></button>
          </article>
        </div>
        <footer className="dashboard-footer"><span>♧ CLINICAL MODEL · 3D FEMTECH ANATOMICAL ATLAS</span><span>Select pin or rotate angle to view hormonal dynamics</span></footer>
      </section>
    </main>
  );
}
