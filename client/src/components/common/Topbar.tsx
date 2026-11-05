import { Search, Bell, User, Headset, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export function Topbar() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user ?? null;

  const [isFocused, setIsFocused] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Clean up and format Google photo URL to ensure valid sizing
  const rawPhotoUrl = user?.photoURL;
  const photoUrl = rawPhotoUrl?.includes("googleusercontent.com") && !rawPhotoUrl.includes("=")
    ? `${rawPhotoUrl}=s96-c`
    : rawPhotoUrl;

  const seed = user?.displayName || user?.email || "default";
  const avatarUrl =
    photoUrl ||
    `https://api.dicebear.com/10.x/clay/svg?seed=${encodeURIComponent(seed)}`;

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-gradient-to-r from-[#2563EB] to-[#7C3AED] backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div
          className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-white w-56 md:w-80 transition-all backdrop-blur-md ${
            isFocused
              ? "bg-white/25 ring-0 outline-none border-0"
              : "bg-white/15"
          }`}
        >
          <Search className="h-4 w-4 text-white/80 shrink-0" />
          <input
            id="search"
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "" : "Search keywords..."}
            className="w-full bg-transparent text-xs sm:text-sm text-white outline-none border-none ring-0 placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Right Side Tools */}
      <div className="flex items-center gap-3">
        {/* Plus Button */}
        <button className="relative rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <Plus className="h-4 w-4" />
        </button>

        {/* Notification Bell */}
        <button className="relative rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-400" />
        </button>

        {/* Support / Help Center Button */}
        <button className="relative rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          <Headset className="h-4 w-4" />
        </button>

        <div className="h-5 w-px bg-white/20" />

        {/* User Pill */}
        <div className="flex items-center gap-2 rounded-lg bg-[#7C3AED] p-1 pr-3 backdrop-blur-md">
          {avatarUrl && !imgError ? (
            <img
              key={user?.photoURL || "default-avatar"}
              src={avatarUrl}
              alt={user?.displayName || "User Avatar"}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-7 w-7 rounded-md object-cover ring-1 ring-white/30 shrink-0"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] text-white font-bold text-xs shrink-0">
              {user?.displayName?.[0]?.toUpperCase() ||
                user?.email?.[0]?.toUpperCase() || (
                  <User className="h-4 w-4" />
                )}
            </div>
          )}

          <span className="text-xs sm:text-sm font-semibold text-white max-w-[120px] truncate hidden sm:inline tracking-wide">
            {user?.displayName || user?.email?.split("@")[0] || "Account"}
          </span>
        </div>
      </div>
    </header>
  );
}