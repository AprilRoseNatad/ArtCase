import {
  Image,
  Users,
  UserRoundCog,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Pending Artworks",
    value: "0",
    description: "Awaiting moderation",
    icon: Image,
  },
  {
    label: "Total Users",
    value: "0",
    description: "Registered accounts",
    icon: Users,
  },
  {
    label: "Role Requests",
    value: "0",
    description: "Awaiting approval",
    icon: UserRoundCog,
  },
  {
    label: "Pending Reviews",
    value: "0",
    description: "Require your attention",
    icon: Clock,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Overview of your ArtCase platform and its activities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>

                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Common administrative tasks.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Image size={22} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Review Artworks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review submitted artworks before publication.
                </p>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600">
              Artwork Moderation
              <ArrowUpRight size={16} />
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                <UserRoundCog size={22} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Review Role Requests
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage requests for elevated account roles.
                </p>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-1 text-sm font-medium text-purple-600">
              Role Requests
              <ArrowUpRight size={16} />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}