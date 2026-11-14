import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";

export default function VerifyEmailPage() {
  return <AuthShell><div className="auth-single"><AuthForm mode="verify" /></div></AuthShell>;
}
