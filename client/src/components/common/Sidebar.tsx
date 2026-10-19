import { NavLink } from "react-router-dom";
import { Home, Calendar, Settings, Image, Users, Award } from "lucide-react";
import artcaseLogoW from "@/assets/images/artcaseLogoW.png";

const NAV_ITEMS = [
  { label: "Explore", icon: Image, to: "explore" },
  { label: "Competitive", icon: Award, to: "competitions" },
  { label: "Community", icon: Users, to: "community" },
  { label: "Schedule", icon: Calendar, to: "schedule" },
  { label: "Dashboard", icon: Home, to: "dashboard" },
  { label: "Settings", icon: Settings, to: "settings" },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen flex flex-col items-center py-4 text-white bg-gradient-to-b from-[#1e40af] via-[#1d4ed8] to-[#5b21b6] border-r border-white/10 shadow-xl z-40 w-60 shrink-0">
      {/* Header / App Logo */}
      <div className="flex h-12 w-full items-center px-8">
        <div className="flex items-center gap-3">
          <img src={artcaseLogoW} alt="ArtCase Logo" className="h-8 w-8 object-contain drop-shadow-md shrink-0 hover:scale-105 transition-transform" />
          <span className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm whitespace-nowrap">ArtCase</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full space-y-2 py-6 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `group relative flex items-center gap-3.5 px-8 py-3.5 text-sm font-semibold transition-all ${isActive ? "text-white font-bold" : "text-white/90 hover:text-white"}`}
          >
            {({ isActive }) => (
              <div className="flex items-center w-full h-full gap-3.5">
                <span className={`absolute inset-y-0 left-0 rounded-r-full -z-10 w-[calc(100%-1.5rem)] transition-all ${isActive ? "bg-white/20" : "bg-white/0 group-hover:bg-white/10"}`} />
                <item.icon className="h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="px-6 pb-6 pt-3 text-center border-t border-white/10 w-full text-[11px] text-white/60 font-light">
        <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
        {" • "}
        <NavLink to="/terms" className="hover:text-white transition-colors">Terms & Conditions</NavLink>
        <p>© {new Date().getFullYear()} ArtCase. All rights reserved.</p>
      </div>
    </aside>
  );
}