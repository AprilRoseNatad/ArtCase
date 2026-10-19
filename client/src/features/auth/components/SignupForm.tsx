  import { signupSchema } from "../schemas/signup.schema";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, type AuthError } from "firebase/auth";
  import { auth } from "@/config/firebase";
  import { Mail, Lock, UserCheck, ArrowRight, Loader2, Eye, EyeOff, X } from "lucide-react";
  import { toast } from "react-toastify";
  import { PaintLoader } from "@/components/common/PaintLoader";

  export function SignupForm() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
    Username: "",
    Email: "",
    Password: "", "Confirm Password": "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [emailErrorMsg, setEmailErrorMsg] = useState<string | null>(null);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "Email") setEmailErrorMsg(null);
      if (e.target.name.includes("Password")) setPasswordErrorMsg(null);
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const syncBackend = async (token: string, username?: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username,}),
      });
      if (!res.ok) throw new Error("Failed to sync user data with server.");
    };

    const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setEmailErrorMsg(null);
      setPasswordErrorMsg(null);

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setEmailErrorMsg(errors.Email?.[0] ?? null);
      setPasswordErrorMsg(
        errors.Password?.[0] ??
        errors["Confirm Password"]?.[0] ??
        null
      );
    return;
  }

  setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, form.Email, form.Password);
        
        // Generate the Dicebear avatar using the username as the seed and assign to photoURL
        const dicebearAvatar = `https://api.dicebear.com/10.x/clay/svg?seed=${encodeURIComponent(form.Username || form.Email)}`;
        
        await updateProfile(res.user, { 
          displayName: form.Username,
          photoURL: dicebearAvatar 
        });

        await syncBackend(await res.user.getIdToken(), form.Username);
        navigate("/home");
      } catch (err: unknown) {
        console.error("Signup Error:", err);

        const authErr = err as AuthError;
        if (!navigator.onLine || authErr?.code === "auth/network-request-failed") {
          toast.error("No internet connection");
        } else if (authErr?.code === "auth/invalid-email") {
          setEmailErrorMsg("Invalid email address.");
        } else if (authErr?.code === "auth/email-already-in-use") {
          setEmailErrorMsg("Email already exists.");
        } else if (authErr?.code === "auth/weak-password") {
          setPasswordErrorMsg("Password must be at least 6 characters.");
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
        const res = await signInWithPopup(auth, new GoogleAuthProvider());
        await syncBackend(await res.user.getIdToken(), );
        navigate("/home");
      } catch (err: unknown) {
        console.error("Google Auth Error:", err);

        const authError = err as AuthError;
        if (authError?.code === "auth/popup-closed-by-user" || authError?.code === "auth/cancelled-popup-request") {
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
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Sign up Now</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Join ArtCase and start showcasing your work.</p>
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

        <form onSubmit={handleSignup} noValidate autoComplete="off" className="space-y-4">

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Username</label>
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input id="username" type="text" name="Username" value={form.Username} onChange={onChange} placeholder="Username" autoComplete="off" className="w-full rounded-xl border border-input bg-background/50 py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Email</label>
            {emailErrorMsg && <p className="text-xs font-semibold text-red-500 mb-1">{emailErrorMsg}</p>}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input id="email" type="email" name="Email" value={form.Email} onChange={onChange} placeholder="Email" autoComplete="off" className={`w-full rounded-xl border bg-background/50 py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:ring-1 ${emailErrorMsg ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-indigo-500 focus:ring-indigo-500"}`} />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "Password", name: "Password", state: showPass, toggle: () => setShowPass(!showPass) },
                { label: "Confirm Password", name: "Confirm Password", state: showConfirm, toggle: () => setShowConfirm(!showConfirm) }
              ].map(({ label, name, state, toggle }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
                  {passwordErrorMsg && <p className="text-xs font-semibold text-red-500 mb-1">{passwordErrorMsg}</p>}
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input id="password" type={state ? "text" : "password"} name={name} value={form[name as keyof typeof form]} onChange={onChange} placeholder={label} autoComplete="new-password" className={`w-full rounded-xl border bg-background/50 py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-all focus:ring-1 ${passwordErrorMsg ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-indigo-500 focus:ring-indigo-500"}`} />
                    <button type="button" onClick={toggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground">
                      {state ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading || googleLoading} className="group relative flex w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 py-3.5 font-semibold text-white shadow-md transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="flex items-center gap-2 text-sm font-bold">Create Account <ArrowRight className="h-4 w-4" /></span>}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-400 hover:underline hover:text-indigo-600 transition-colors">Log in</Link>
        </p>
      </div>
    );
  }