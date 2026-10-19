import { auth } from "@/config/firebase";
import { Trophy, Compass, Plus } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  const user = auth.currentUser;

  return (
    <div className="space-y-8">
      {/* Welcome Banner with Background Beams */}
      <BackgroundBeamsWithCollision className="w-full flex flex-col items-center justify-center text-center -mt-4 sm:-mt-6 lg:-mt-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]">
        <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Welcome back, {user?.displayName || user?.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-sm text-neutral-400 sm:text-base">
            Track your ongoing events, manage registrations, or browse upcoming competitions.
          </p>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Feed Section */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight flex items-center gap-2">
              <Trophy className="h-4 w-4 text-indigo-400" /> Active Competitions
            </h2>
            <button className="text-xs font-semibold text-indigo-400 hover:underline">
              View all
            </button>
          </div>

          {/* Empty State Block */}
          <div className="rounded-2xl border border-border/60 bg-card/50 p-8 text-center space-y-3">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h3 className="text-sm font-semibold text-foreground">No active events joined</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              You haven't registered for any active events. Browse open opportunities to test your skills.
            </p>
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90">
              <Plus className="h-4 w-4" /> Explore Events
            </button>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-6">
          <h2 className="text-base font-semibold tracking-tight">Overview</h2>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-background/50 p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="text-lg font-bold mt-0.5 text-foreground">0</p>
              </div>
              <div className="rounded-xl bg-background/50 p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">Wins</p>
                <p className="text-lg font-bold mt-0.5 text-foreground">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}