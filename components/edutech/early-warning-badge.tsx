import { TriangleAlert } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function EarlyWarningBadge({
  reasons,
  className,
  compact = false,
}: {
  reasons: string[]
  className?: string
  compact?: boolean
}) {
  if (reasons.length === 0) return null

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 font-medium text-destructive",
              compact ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
              className,
            )}
          />
        }
      >
        <TriangleAlert className={compact ? "size-3" : "size-3.5"} aria-hidden="true" />
        {compact ? "Alert" : "Early Warning"}
      </TooltipTrigger>
      <TooltipContent className="max-w-56">
        <ul className="list-disc space-y-1 pl-4 text-xs">
          {reasons.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  )
}
