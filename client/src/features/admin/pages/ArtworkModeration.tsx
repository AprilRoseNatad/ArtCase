
import { useCallback, useEffect, useState } from "react";
import {
  Check, X, LoaderCircle, RefreshCw, UserRound, CalendarDays,
  AlertCircle, Clock, ThumbsUp, Ban, Images,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface Artwork {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  createdAt: string;
  creator: { id: string; username: string; avatarUrl: string | null };
}

export default function ArtworkModeration() {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const categoryLabels: Record<string, string> = {
  DIGITAL: "Digital Drawing",
  TRADITIONAL: "Traditional Art",
  GRAPHIC: "Graphic Design",
  AI: "AI Art",
  FANART: "Fan Art",
  THREE_D: "3D & CGI",
  PIXEL: "Pixel Art",
};

  const getAuthHeaders = useCallback(async () => {
    if (!user) throw new Error("You must be logged in.");
    return {
      Authorization: `Bearer ${await user.getIdToken()}`,
      "Content-Type": "application/json",
    };
  }, [user]);

  const fetchPendingArtworks = useCallback(async (): Promise<Artwork[]> => {
    const response = await fetch(`${API_URL}/artworks/pending`, {
      headers: await getAuthHeaders(),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to load artworks.");
    return result.data || [];
  }, [getAuthHeaders]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function loadArtworks() {
      try {
        const data = await fetchPendingArtworks();
        if (!cancelled) setArtworks(data);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load pending artworks:", error);
          toast.error(error instanceof Error ? error.message : "Failed to load pending artworks.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadArtworks();
    return () => { cancelled = true; };
  }, [user, fetchPendingArtworks]);

  async function handleRefresh() {
    try {
      setLoading(true);
      setArtworks(await fetchPendingArtworks());
    } catch (error) {
      console.error("Failed to refresh artworks:", error);
      toast.error(error instanceof Error ? error.message : "Failed to refresh artworks.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      setProcessingId(id);
      const response = await fetch(`${API_URL}/artworks/${id}/approve`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to approve artwork.");

      setArtworks(current => current.filter(artwork => artwork.id !== id));
      toast.success("Artwork approved successfully.");
    } catch (error) {
      console.error("Artwork approval failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to approve artwork.");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject() {
    if (!selectedArtwork) return;
    if (!rejectionReason.trim()) return toast.error("Please provide a rejection reason.");

    try {
      setProcessingId(selectedArtwork.id);
      const response = await fetch(`${API_URL}/artworks/${selectedArtwork.id}/reject`, {
        method: "PATCH",
        headers: await getAuthHeaders(),
        body: JSON.stringify({ reason: rejectionReason.trim() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to reject artwork.");

      setArtworks(current => current.filter(artwork => artwork.id !== selectedArtwork.id));
      setSelectedArtwork(null);
      setRejectionReason("");
      toast.success("Artwork rejected successfully.");
    } catch (error) {
      console.error("Artwork rejection failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to reject artwork.");
    } finally {
      setProcessingId(null);
    }
  }

  const stats = [
    { label: "Total Submitted", value: "—", icon: Images, color: "text-blue-800 dark:text-blue-300", bg: "bg-blue-500/15" },
    { label: "Pending Review", value: loading ? "—" : artworks.length, icon: Clock, color: "text-amber-800 dark:text-amber-300", bg: "bg-amber-500/15" },
    { label: "Approved", value: "—", icon: ThumbsUp, color: "text-emerald-800 dark:text-emerald-300", bg: "bg-emerald-500/15" },
    { label: "Rejected", value: "—", icon: Ban, color: "text-rose-800 dark:text-rose-300", bg: "bg-rose-500/15" },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Administration</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Artwork Moderation</h1>
          <p className="mt-1 text-sm text-muted-foreground">Review and manage submitted artworks.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-lg border px-3.5 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50 sm:self-center"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`flex items-center justify-between gap-3 rounded-xl p-4 ${bg}`}>
            <div>
              <p className={`text-xs font-semibold ${color}`}>{label}</p>
              <p className={`mt-1 text-3xl font-bold tabular-nums ${color}`}>{value}</p>
            </div>
            <div className={`rounded-xl bg-background/60 p-3 ${color}`}>
              <Icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Pending Artworks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold">Pending Review</h2>
            <p className="text-xs text-muted-foreground">Artworks waiting for your decision</p>
          </div>
          {!loading && (
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600">
              {artworks.length} waiting
            </span>
          )}
        </div>

        {loading && (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3">
            <LoaderCircle className="h-7 w-7 animate-spin text-blue-600" />
            <p className="text-sm text-muted-foreground">Loading pending artworks...</p>
          </div>
        )}

        {!loading && artworks.length === 0 && (
          <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 text-center">
            <div className="rounded-full bg-emerald-500/10 p-4">
              <Check size={28} className="text-emerald-600" />
            </div>
            <h3 className="mt-3 text-base font-semibold">All caught up!</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              There are currently no artworks waiting for moderation.
            </p>
          </div>
        )}

        {!loading && artworks.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {artworks.map(artwork => (
              <article key={artwork.id} className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
                {/* Original Image Proportions */}
                <div className="relative w-full overflow-hidden bg-muted">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="block h-auto w-full"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow">
                    Pending
                  </span>
                </div>

                {/* Artwork Details */}
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="min-w-0 truncate text-sm font-semibold">{artwork.title}</h3>
                    <span className="shrink-0 rounded-full bg-blue-500/10 px-2 py-1 text-[9px] font-semibold text-blue-600">
                        {categoryLabels[artwork.category] || artwork.category}
                    </span>
                  </div>

                  <p className={`mt-1.5 line-clamp-2 min-h-8 break-words text-[11px] leading-relaxed ${
                    artwork.description ? "text-muted-foreground" : "italic text-muted-foreground/60"
                  }`}>
                    {artwork.description || "No description provided."}
                  </p>

                  {/* Creator */}
                  <div className="mt-3 flex items-center justify-between gap-2 border-t pt-2.5">
                    <div className="flex min-w-0 items-center gap-2">
                      {artwork.creator.avatarUrl ? (
                        <img
                          src={artwork.creator.avatarUrl}
                          alt={artwork.creator.username}
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                          <UserRound size={14} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold">{artwork.creator.username}</p>
                        <p className="text-[9px] text-muted-foreground">Creator</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                      <CalendarDays size={12} />
                      {new Date(artwork.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(artwork.id)}
                      disabled={processingId !== null}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-2 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {processingId === artwork.id ? (
                        <LoaderCircle size={13} className="animate-spin" />
                      ) : <Check size={13} />}
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedArtwork(artwork)}
                      disabled={processingId !== null}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 px-2 py-2 text-[11px] font-semibold text-rose-600 hover:bg-rose-500/10 disabled:opacity-50"
                    >
                      <X size={13} /> Reject
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Rejection Dialog */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border bg-background p-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Reject Artwork</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Provide a reason for rejecting "{selectedArtwork.title}".
                </p>
              </div>
              <button
                onClick={() => { setSelectedArtwork(null); setRejectionReason(""); }}
                disabled={processingId !== null}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
                aria-label="Close dialog"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="rejectionReason" className="text-sm font-medium">Rejection Reason</label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={event => setRejectionReason(event.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Explain why this artwork is being rejected..."
                className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="text-right text-xs text-muted-foreground">{rejectionReason.length}/1000</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setSelectedArtwork(null); setRejectionReason(""); }}
                disabled={processingId !== null}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || processingId !== null}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {processingId === selectedArtwork.id ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : <AlertCircle size={16} />}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
