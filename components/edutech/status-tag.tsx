import { cn } from "@/lib/utils"
import type { StudentStatus } from "@/lib/edutech-data"

const styles: Record<StudentStatus, string> = {
  Excellent: "bg-success/15 text-success-foreground/90 border-success/30",
  "On Track": "bg-primary/10 text-primary border-primary/25",
  "Needs Attention": "bg-warning/20 text-warning-foreground border-warning/40",
}

const dot: Record<StudentStatus, string> = {
  Excellent: "bg-success",
  "On Track": "bg-primary",
  "Needs Attention": "bg-warning",
}

export function StatusTag({ status, className }: { status: StudentStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot[status])} aria-hidden="true" />
      {status}
    </span>
  )
}
