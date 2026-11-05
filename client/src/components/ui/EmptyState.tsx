import blankCanvasSvg from "@/assets/svg/undraw_blank-canvas_a6x5.svg";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No artworks found",
  description = "Try adjusting your search query, selection and filters to find what you're looking for.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-card/30 p-12 text-center space-y-6">
      <img
        src={blankCanvasSvg}
        alt="Blank Canvas"
        className="h-64 sm:h-80 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 opacity-70 max-w-md mx-auto font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}