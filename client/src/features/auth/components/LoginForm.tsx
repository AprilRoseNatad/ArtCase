import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, type AuthError } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-toastify";
import { PaintLoader } from "@/components/common/PaintLoader";

export function LoginForm() {
  const navigate = useNavigate();
  const { appUser, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

      useEffect(() => {
      if (!authLoading && appUser) {
        navigate("/home", { replace: true });
      }
    }, [authLoading, appUser, navigate]);

  // General auth error message
  const [authErrorMsg, setAuthErrorMsg] = useState<string | null>(null);

  // Client-side format error state
  const [emailFormatError, setEmailFormatError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthErrorMsg(null);
    if (e.target.name === "Email") setEmailFormatError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setAuthErrorMsg(null);
  setEmailFormatError(null);

  if (!form.Email || !form.Email.includes("@")) {
    setEmailFormatError("Please enter a valid email address.");
    setForm((prev) => ({ ...prev, Email: "", Password: "" }));
    return;
  }

  if (!form.Password) {
    setAuthErrorMsg("Invalid email or password.");
    setForm((prev) => ({ ...prev, Email: "", Password: "" }));
    return;
  }

  setLoading(true);

  try {
    await signInWithEmailAndPassword(auth, form.Email, form.Password);
  } catch (err: unknown) {
    console.error("Login Error:", err);
    setForm((prev) => ({ ...prev, Email: "", Password: "" }));

    const authErr = err as AuthError;

    if (!navigator.onLine || authErr?.code === "auth/network-request-failed") {
      toast.error("No internet connection");
    } else if (
      authErr?.code === "auth/invalid-credential" ||
      authErr?.code === "auth/wrong-password" ||
      authErr?.code === "auth/user-not-found"
    ) {
      setAuthErrorMsg("Invalid email or password.");
    } else if (authErr?.code === "auth/invalid-email") {
      setEmailFormatError("Invalid email format.");
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account consent" });

      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      console.error("Google Auth Error:", err);

      const authError = err as AuthError;
      if (
        authError?.code === "auth/popup-closed-by-user" ||
        authError?.code === "auth/cancelled-popup-request"
      ) {
        return;
      }

      if (!navigator.onLine || authError?.code === "auth/network-request-failed") {
        toast.error("No internet connection");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative space-y-6">
      <Link
        to="/"
        className="absolute -right-7 -top-7 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        title="Return to Home"
      >
        <X className="h-5 w-5" />
      </Link>

      <div className="text-center pr-6 lg:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Welcome back</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Sign in to access your dashboard and active competitions.</p>
      </div>

      <button type="button" onClick={handleGoogle} disabled={googleLoading || loading} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-card/80 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-50">
        {googleLoading ? (
          <PaintLoader size={20} className="text-indigo-400" />
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </>
        )}
      </button>

      <div className="flex items-center gap-3 my-2">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Or email</span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <form onSubmit={handleLogin} noValidate autoComplete="off" className="space-y-4">
        <div>
          {authErrorMsg && (
            <p className="text-xs font-semibold text-red-500 mb-1 text-left">
              {authErrorMsg}
            </p>
          )}

          <label className="block text-xs font-medium text-foreground mb-1">Email</label>
          {emailFormatError && <p className="text-xs font-semibold text-red-500 mb-1">{emailFormatError}</p>}
          
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              name="Email"
              value={form.Email}
              onChange={onChange}
              placeholder="Email"
              autoComplete="username"
              className={`w-full rounded-xl border bg-background/50 py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:ring-1 ${
                emailFormatError || authErrorMsg
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-input focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPass ? "text" : "password"}
              name="Password"
              value={form.Password}
              onChange={onChange}
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full rounded-xl border bg-background/50 py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-all focus:ring-1 ${
                authErrorMsg
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-input focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="group relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 py-3.5 font-semibold text-white shadow-md transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2 text-sm font-bold">
              Sign In <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-indigo-400 hover:underline hover:text-indigo-600 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}