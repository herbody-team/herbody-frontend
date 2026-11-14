import AuthForm from "@/components/auth/AuthForm";
import AuthShell, { FeaturePanel } from "@/components/auth/AuthShell";

export default function Home() {
  return <AuthShell><div className="auth-grid"><FeaturePanel /><AuthForm mode="login" /></div></AuthShell>;
}
