import AuthForm from "@/components/auth/AuthForm";
import AuthShell, { FeaturePanel } from "@/components/auth/AuthShell";

export default function LoginPage() {
  return <AuthShell><div className="auth-grid"><FeaturePanel /><AuthForm mode="login" /></div></AuthShell>;
}
