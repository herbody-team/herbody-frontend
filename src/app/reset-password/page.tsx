import AuthForm from "@/components/auth/AuthForm";
import AuthShell from "@/components/auth/AuthShell";

export default function ResetPasswordPage() {
  return <AuthShell><div className="auth-single"><AuthForm mode="reset" /></div></AuthShell>;
}
