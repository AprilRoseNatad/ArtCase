
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Users,
  UserRoundCog,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import artcaseLogoW from "@/assets/images/artcaseLogoW.png";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    to: "/admin",
    end: true,
  },
  {
    label: "Artwork Moderation",
    icon: Image,
    to: "/admin/artworks",
  },
  {
    label: "User Management",
    icon: Users,
    to: "/admin/users",
  },
  {
    label: "Role Requests",
    icon: UserRoundCog,
    to: "/admin/role-requests",
  },
];

export function AdminLayout() {
  const { appUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Admin logout failed:", error);
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Admin Sidebar */}
      <aside className="sticky top-0 z-40 flex h-screen w-60 shrink-0 flex-col bg-gradient-to-b from-[#1e40af] via-[#1d4ed8] to-[#5b21b6] text-white shadow-xl">

        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-7">
          <img
            src={artcaseLogoW}
            alt="ArtCase Logo"
            className="h-8 w-8 shrink-0 object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight">
            ArtCase
          </span>
        </div>

        {/* Admin Label */}
        <div className="mx-5 mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
          <ShieldCheck className="h-5 w-5 text-white" />

          <div>
            <p className="text-sm font-bold">Administration</p>
            <p className="text-[11px] text-white/60">
              Management Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
            Main Menu
          </p>

          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-5">
          <p className="text-center text-[11px] text-white/50">
            © {new Date().getFullYear()} ArtCase
          </p>
          <p className="mt-1 text-center text-[10px] text-white/40">
            Administrative Portal
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Admin Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/95 px-6 shadow-sm backdrop-blur-md">

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Admin Panel
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage and monitor ArtCase
            </p>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                {appUser?.username || "Administrator"}
              </p>
              <p className="text-xs text-muted-foreground">
                {appUser?.role}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
