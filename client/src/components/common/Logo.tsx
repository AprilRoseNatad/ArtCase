import { Palette } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Palette size={20} />
      </div>

      <span className="text-xl font-bold tracking-tight">
        ArtCase
      </span>
    </div>
  );
}