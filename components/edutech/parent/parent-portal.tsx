"use client"

import { useState } from "react"
import {
  CalendarCheck,
  CheckCircle2,
  GaugeCircle,
  TrendingDown,
  TriangleAlert,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/edutech/stat-card"
import { StatusTag } from "@/components/edutech/status-tag"
import { TrendChart } from "@/components/edutech/trend-chart"
import { InterventionDialog } from "@/components/edutech/parent/intervention-dialog"
import { Button } from "@/components/ui/button"
import {
  attendanceByStudent,
  behaviorForStudent,
  getProgression,
  getStudent,
  isEarlyWarning,
  scoresForStudent,
  warningReasons,
  type Sentiment,
} from "@/lib/edutech-data"
import { cn } from "@/lib/utils"

const CHILD_ID = "s2"

const sentimentLabel: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  concern: "Needs support",
}

const sentimentStyles: Record<Sentiment, string> = {
  positive: "border-success/30 bg-success/10 text-success",
  neutral: "border-primary/25 bg-primary/10 text-primary",
  concern: "border-destructive/30 bg-destructive/10 text-destructive",
}

export function ParentPortal() {
  const child = getStudent(CHILD_ID)!
  const scores = scoresForStudent(CHILD_ID)
  const logs = behaviorForStudent(CHILD_ID)
  const progression = getProgression(CHILD_ID)
  const attendance = attendanceByStudent[CHILD_ID]
  const [requested, setRequested] = useState(false)

  const flagged = isEarlyWarning(child)
  const totalDays = attendance.present + attendance.late + attendance.absent
  const attendancePct = Math.round((attendance.present / totalDays) * 100)
  const trending = child.average - child.previousAverage

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
          {child.name.split(" ")[0]}&apos;s progress
        </h1>
        <p className="text-sm text-muted-foreground">
          A real-time view of academic and behavioral micro-updates.
        </p>
      </div>

      {flagged && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <TriangleAlert className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Early warning flagged</p>
                <p className="text-sm text-muted-foreground">{warningReasons(child).join(" · ")}</p>
              </div>
            </div>
            <InterventionDialog
              childName={child.name}
              onRequested={() => setRequested(true)}
              trigger={
                <Button className="shrink-0">
                  <CalendarCheck className="size-4" aria-hidden="true" />
                  Request intervention
                </Button>
              }
            />
          </CardContent>
        </Card>
      )}

      {requested && (
        <div className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-foreground">
          <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
          Your check-in request was sent. {child.name.split(" ")[0]}&apos;s teacher will follow up within one school day.
        </div>
      )}

      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-lg font-semibold text-secondary-foreground">
              {child.initials}
            </span>
            <div>
              <p className="text-lg font-semibold text-foreground">{child.name}</p>
              <p className="text-sm text-muted-foreground">
                {child.grade} · Homeroom {child.homeroom}
              </p>
              <div className="mt-2">
                <StatusTag status={child.status} />
              </div>
            </div>
          </div>
          <InterventionDialog childName={child.name} onRequested={() => setRequested(true)} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Current average"
          value={child.average}
          unit="%"
          icon={GaugeCircle}
          change={trending}
          hint="vs last term"
          accent={flagged ? "destructive" : "primary"}
        />
        <StatCard
          label="Attendance"
          value={attendancePct}
          unit="%"
          icon={CalendarCheck}
          accent={attendancePct >= 90 ? "success" : "warning"}
          hint={`${attendance.absent} days absent`}
        />
        <StatCard
          label="Open flags"
          value={child.openFlags}
          icon={TriangleAlert}
          accent="warning"
          hint={`${child.resolvedFlags} resolved`}
        />
        <StatCard
          label="Term trend"
          value={`${trending > 0 ? "+" : ""}${trending}`}
          unit="pts"
          icon={TrendingDown}
          accent={trending >= 0 ? "success" : "destructive"}
          hint="6-month change"
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Mark progression vs class average</CardTitle>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-chart-1" aria-hidden="true" />
              {child.name.split(" ")[0]}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-chart-3" aria-hidden="true" />
              Class avg
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <TrendChart data={progression} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Weekly behavior logs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {logs.map((log) => (
              <div key={log.id} className="rounded-xl border border-border p-4">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">{log.week}</span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                      sentimentStyles[log.sentiment],
                    )}
                  >
                    {sentimentLabel[log.sentiment]}
                  </span>
                </div>
                <p className="text-sm text-foreground">{log.summary}</p>
                <p className="mt-1 text-xs text-muted-foreground">Logged by {log.teacher}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent test scores</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {scores.map((s) => {
                const below = s.score < s.classAverage
                return (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground">{s.subject}</p>
                      </div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          below ? "text-destructive" : "text-success",
                        )}
                      >
                        {s.score}%
                      </span>
                    </div>
                    <Progress value={s.score} className="h-1.5" />
                    <p className="mt-1 text-xs text-muted-foreground">Class avg {s.classAverage}%</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Attendance summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <AttendanceRow label="Present" value={attendance.present} total={totalDays} tone="bg-success" />
              <AttendanceRow label="Late" value={attendance.late} total={totalDays} tone="bg-warning" />
              <AttendanceRow label="Absent" value={attendance.absent} total={totalDays} tone="bg-destructive" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AttendanceRow({
  label,
  value,
  total,
  tone,
}: {
  label: string
  value: number
  total: number
  tone: string
}) {
  const pct = Math.round((value / total) * 100)
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">
          {value} {value === 1 ? "day" : "days"}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
