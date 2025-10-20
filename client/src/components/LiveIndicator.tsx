import { Badge } from "@/components/ui/badge";

export default function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
      </span>
      <Badge variant="destructive" className="text-xs font-semibold uppercase tracking-wide">
        Live
      </Badge>
    </div>
  );
}
