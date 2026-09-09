import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  change,
  changeSuffix = "%",
  hint,
  accent = "primary",
}: {
  label: string
  value: string | number
  unit?: string
  icon: LucideIcon
  change?: number
  changeSuffix?: string
  hint?: string
  accent?: "primary" | "success" | "warning" | "destructive"
}) {
  const accentBg = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    destructive: "bg-destructive/10 text-destructive",
  }[accent]

  const positive = (change ?? 0) >= 0

  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight text-foreground">{value}</span>
            {unit ? <span className="text-sm text-muted-foreground">{unit}</span> : null}
          </div>
          {typeof change === "number" ? (
            <div className="mt-2 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  positive ? "text-success" : "text-destructive",
                )}
              >
                {positive ? (
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="size-3.5" aria-hidden="true" />
                )}
                {positive ? "+" : ""}
                {change}
                {changeSuffix}
              </span>
              {hint ? <span className="text-muted-foreground">{hint}</span> : null}
            </div>
          ) : hint ? (
            <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", accentBg)}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
  )
}
