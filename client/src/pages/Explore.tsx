import { useState } from "react";
import { Search, Sparkles, Palette, Heart, Brush, Boxes, Compass, Grid, TrendingUp, Clock, ArrowUpDown, Layout, Layers } from "lucide-react";

type SortOption = "newest" | "most_liked" | "oldest";
interface Artwork { id: string; title: string; artist: string; category: string; imageUrl: string; likes: number; createdAt: string; }

const CATEGORIES = [
  { id: "all", label: "All Works", icon: Layers, gradient: "from-indigo-600 to-indigo-600", activeText: "text-indigo-600" },
  { id: "digital", label: "Digital Drawing", icon: Brush, gradient: "from-cyan-400 via-blue-500 to-indigo-500", activeText: "text-blue-600" },
  { id: "traditional", label: "Traditional Art", icon: Palette, gradient: "from-amber-400 via-orange-500 to-red-500", activeText: "text-orange-600" },
  { id: "graphic", label: "Graphic Design", icon: Layout, gradient: "from-emerald-400 via-teal-500 to-cyan-500", activeText: "text-emerald-600" },
  { id: "ai", label: "AI Art", icon: Sparkles, gradient: "from-blue-500 via-indigo-500 to-purple-500", activeText: "text-indigo-600" },
  { id: "fanart", label: "Fan Art", icon: Heart, gradient: "from-rose-400 via-pink-500 to-red-500", activeText: "text-pink-600" },
  { id: "3d", label: "3D & CGI", icon: Boxes, gradient: "from-orange-500 via-amber-500 to-yellow-400", activeText: "text-amber-600" },
  { id: "pixel", label: "Pixel Art", icon: Grid, gradient: "from-red-500 via-indigo-500 to-blue-600", activeText: "text-red-600" },
];

const MOCK_ARTWORKS: Artwork[] = [
  { id: "1", title: "Neon Cyber Cityscape", artist: "Aria Vance", category: "digital", imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80", likes: 342, createdAt: "2026-10-18T10:30:00Z" },
  { id: "2", title: "Celestial Guardian", artist: "Kenji Sato", category: "3d", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80", likes: 890, createdAt: "2026-10-15T14:20:00Z" },
  { id: "3", title: "Oil Portrait on Linen", artist: "Elena Rostova", category: "traditional", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80", likes: 156, createdAt: "2026-10-10T08:15:00Z" },
  { id: "4", title: "Synthwave Dreams", artist: "PixelCraft AI", category: "ai", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", likes: 512, createdAt: "2026-10-19T06:00:00Z" },
  { id: "5", title: "Mecha Knight", artist: "Marcus Wright", category: "fanart", imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80", likes: 721, createdAt: "2026-09-28T12:00:00Z" },
  { id: "6", title: "Abstract Flow No. 4", artist: "Sophia Chen", category: "digital", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80", likes: 230, createdAt: "2026-10-01T16:45:00Z" },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest", icon: Clock },
  { id: "most_liked", label: "Most Liked", icon: TrendingUp },
  { id: "oldest", label: "Oldest", icon: ArrowUpDown },
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredArtworks = MOCK_ARTWORKS
    .filter((art) => (activeCategory === "all" || art.category === activeCategory) && art.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return b.likes - a.likes;
    });

  return (
    <div className="space-y-6">
      {/* Inline Top Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="group flex items-stretch flex-1 max-w-xl rounded-2xl border border-indigo-500/30 bg-card/60 shadow-none transition-shadow duration-200 focus-within:shadow-md focus-within:bg-card overflow-hidden">
          <div className="flex items-center justify-center px-3.5 bg-indigo-500/10 text-indigo-500 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-colors shrink-0">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artworks or tags..."
            className="w-full bg-transparent px-3.5 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none border-none ring-0"
          />
        </div>

        {/* Seamless Segmented Control */}
        <div className="inline-flex items-center rounded-2xl shrink-0 overflow-hidden bg-card/60">
          {SORT_OPTIONS.map(({ id, label, icon: Icon }, index) => {
            const isActive = sortBy === id;
            const isFirst = index === 0;
            const isLast = index === SORT_OPTIONS.length - 1;

            return (
              <button
                key={id}
                onClick={() => setSortBy(id as SortOption)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  isFirst ? "rounded-l-2xl" : ""
                } ${isLast ? "rounded-r-2xl" : ""} ${
                  isActive
                    ? "bg-indigo-500/30 text-indigo-400 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Badges */}
      <div className="flex items-center gap-3 overflow-x-auto px-1 py-2 scrollbar-none w-full">
        {CATEGORIES.map(({ id, label, icon: Icon, gradient, activeText }) => {
          const isActive = activeCategory === id;
          return (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`group relative p-[2px] rounded-full shrink-0 transition-all duration-300 ${
                isActive ? `bg-gradient-to-r ${gradient} scale-105 shadow-md shadow-indigo-500/10` : "bg-border/60 hover:bg-border"
              }`}
            >
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-xs font-bold transition-colors ${
                isActive ? activeText : "text-gray-600 group-hover:text-gray-900"
              }`}>
                <Icon className={`h-3.5 w-3.5 ${isActive ? activeText : "text-gray-500 group-hover:text-gray-800"}`} />
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Results Bar */}
      <div className="border-b border-border/40 pb-2">
        <p className="text-xs font-medium text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{filteredArtworks.length}</span> artworks
        </p>
      </div>

      {/* Artwork Grid / Empty State */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArtworks.map((art) => (
            <div key={art.id} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <button className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10 hover:bg-red-500/80 transition-colors">
                  <Heart className="h-3.5 w-3.5 fill-current text-red-400" />
                  <span>{art.likes}</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground group-hover:text-indigo-400 transition-colors truncate">{art.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">by {art.artist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-12 text-center space-y-3">
          <Compass className="mx-auto h-10 w-10 text-muted-foreground/60" />
          <h3 className="text-sm font-semibold text-foreground">No artworks found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">Try adjusting your search terms or category selection to find what you're looking for.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("all"); setSortBy("newest"); }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}