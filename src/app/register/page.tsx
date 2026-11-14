import AuthForm from "@/components/auth/AuthForm";
import AuthShell, { FeaturePanel } from "@/components/auth/AuthShell";

export default function RegisterPage() {
  return <AuthShell mode="register"><div className="auth-grid"><FeaturePanel register /><AuthForm mode="register" /></div></AuthShell>;
}
