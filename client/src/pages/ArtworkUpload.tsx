
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ImagePlus,
  UploadCloud,
  LoaderCircle,
  ArrowLeft,
  Brush,
  Palette,
  Layout,
  Sparkles,
  PenTool,
  Boxes,
  Grid,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "@/hooks/useAuth";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const CATEGORIES = [
  {
    value: "DIGITAL",
    label: "Digital Drawing",
    icon: Brush,
    gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    activeText: "text-blue-600",
  },
  {
    value: "TRADITIONAL",
    label: "Traditional Art",
    icon: Palette,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    activeText: "text-orange-600",
  },
  {
    value: "GRAPHIC",
    label: "Graphic Design",
    icon: Layout,
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    activeText: "text-emerald-600",
  },
  {
    value: "AI",
    label: "AI Art",
    icon: Sparkles,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    activeText: "text-indigo-600",
  },
  {
    value: "FANART",
    label: "Fan Art",
    icon: PenTool,
    gradient: "from-rose-400 via-pink-500 to-red-500",
    activeText: "text-pink-600",
  },
  {
    value: "THREE_D",
    label: "3D & CGI",
    icon: Boxes,
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    activeText: "text-amber-600",
  },
  {
    value: "PIXEL",
    label: "Pixel Art",
    icon: Grid,
    gradient: "from-red-500 via-indigo-500 to-blue-600",
    activeText: "text-red-600",
  },
];

export default function ArtworkUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("DIGITAL");

  const [imageError, setImageError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const previewUrl = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setImageError("");

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setImageError("Only JPEG, PNG, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setImageError("Image size must not exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setImage(selectedFile);
  }

  function removeImage() {
    setImage(null);
    setImageError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function openFilePicker() {
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  }
}

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      toast.error("Please sign in before submitting artwork.");
      return;
    }

    if (!image) {
      setImageError("Please select an artwork image.");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter an artwork title.");
      return;
    }

    try {
      setSubmitting(true);

      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);

      const response = await fetch(`${API_URL}/artworks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to submit artwork."
        );
      }

      toast.success(
        result?.message || "Artwork submitted successfully!"
      );

      navigate("/home/explore");
    } catch (error) {
      console.error("Artwork submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your artwork."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20 lg:pt-20 lg:pb-12">
        {/* Page Heading */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/home/explore")}
            className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </button>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Showcase your artwork
          </h2>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left Panel: Artwork Image */}
          <section>
            <div className="mb-4">
              <h3 className="text-base font-semibold">
                Artwork Image
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Choose an image that represents your artwork.
              </p>
            </div>

          {/* Image Preview / Upload Area */}
            <div className="relative flex min-h-[350px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card/50 p-5 transition hover:border-indigo-500/50 sm:min-h-[450px]">
              {previewUrl ? (
                <div className="relative flex h-full w-full flex-col items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Artwork preview"
                    className="max-h-[400px] w-full rounded-xl object-contain"
                  />

                  {/* Replace and Remove Actions */}
                  <div className="absolute right-2 top-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={openFilePicker}
                      aria-label="Replace artwork image"
                      title="Replace image"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={removeImage}
                      aria-label="Remove artwork image"
                      title="Remove image"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-colors hover:bg-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="mt-4 max-w-full truncate text-sm text-muted-foreground">
                    {image?.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <ImagePlus className="h-8 w-8" />
                  </div>

                  <h4 className="text-base font-semibold">
                    Upload your artwork
                  </h4>

                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    Select an image from your device to preview it here.
                  </p>

                  <button
                    type="button"
                    onClick={openFilePicker}
                    className="mt-6 flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Choose Image
                  </button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    JPEG, PNG, or WebP · Maximum 5 MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {imageError && (
              <p className="mt-3 text-sm text-red-500">
                {imageError}
              </p>
            )}

            {/* Submission Review Notice */}
            <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
              <h4 className="text-sm font-semibold text-indigo-500">
                Submission Review
              </h4>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your artwork will be submitted for review before
                appearing publicly on ArtCase.
              </p>
            </div>
          </section>

          {/* Right Panel: Artwork Details */}
          <section>
            <div className="mb-4">
              <h3 className="text-base font-semibold">
                Artwork Details
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Provide information about your creation.
              </p>
            </div>

            <div className="space-y-5.25 rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-7">
              {/* Artwork Title */}
              <div>
                <label
                  htmlFor="artwork-title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Title <span className="text-red-500">*</span>
                </label>

                <input
                  id="artwork-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Give your artwork a title"
                  maxLength={100}
                  required
                  className="w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-b-2 focus:border-indigo-500 focus:ring-0 rounded-none"
                />

                <p className="mt-2 text-right text-xs text-muted-foreground">
                  {title.length}/100
                </p>
              </div>

              {/* Artwork Category */}
                <div>
                <label className="mb-3 block text-sm font-semibold">
                    Category{" "}
                    <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-wrap gap-2.5">
                    {CATEGORIES.map(
                    ({ value, label, icon: Icon, gradient, activeText }) => {
                        const isActive = category === value;

                        return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setCategory(value)}
                            aria-pressed={isActive}
                            className={`group relative shrink-0 rounded-full p-[2px] transition-all duration-300 ${
                            isActive
                                ? `bg-gradient-to-r ${gradient} scale-105 shadow-md shadow-indigo-500/10`
                                : "bg-border/60 hover:bg-border"
                            }`}
                        >
                            <div
                            className={`flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold transition-colors ${
                                isActive ? activeText : "text-black"
                            }`}
                            >
                            <Icon
                                className={`h-3.5 w-3.5 ${
                                isActive ? activeText : "text-black"
                                }`}
                            />

                            <span>{label}</span>
                            </div>
                        </button>
                        );
                    }
                    )}
                </div>
                </div>

              {/* Artwork Description */}
              <div>
                <label
                  htmlFor="artwork-description"
                  className="mb-2 block text-sm font-semibold"
                >
                  Description
                </label>

                <textarea
                  id="artwork-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Tell us about your artwork..."
                  maxLength={2000}
                  rows={6}
                  className="w-full resize-none overflow-y-auto rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <p className="mt-2 text-right text-xs text-muted-foreground">
                  {description.length}/2000
                </p>
              </div>

              {/* Submit Artwork */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Submitting Artwork...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Submit Artwork
                  </>
                )}
              </button>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
