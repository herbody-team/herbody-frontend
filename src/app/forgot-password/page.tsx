import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return <AuthShell><div className="auth-single"><AuthForm mode="forgot" /></div></AuthShell>;
}
