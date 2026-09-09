"use client"

import { Flag, GaugeCircle, ShieldCheck, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatCard } from "@/components/edutech/stat-card"
import { StatusTag } from "@/components/edutech/status-tag"
import { EarlyWarningBadge } from "@/components/edutech/early-warning-badge"
import { FlagsChart } from "@/components/edutech/admin/flags-chart"
import {
  gradeHealth,
  isEarlyWarning,
  schoolMetrics,
  students,
  warningReasons,
} from "@/lib/edutech-data"

export function AdminOverview() {
  const flagged = students.filter(isEarlyWarning)
  const resolutionRate = Math.round(
    (schoolMetrics.resolvedFlags / (schoolMetrics.resolvedFlags + schoolMetrics.openFlags)) * 100,
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
          School health overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Macro-level metrics across Northfield Middle School.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Grade average"
          value={schoolMetrics.gradeAverage}
          unit="%"
          icon={GaugeCircle}
          accent="success"
          change={schoolMetrics.gradeAverageChange}
          hint="vs last term"
        />
        <StatCard
          label="Open behavior flags"
          value={schoolMetrics.openFlags}
          icon={Flag}
          accent="warning"
          hint={`${schoolMetrics.resolvedFlags} resolved`}
        />
        <StatCard
          label="Active users"
          value={schoolMetrics.activeUsers}
          icon={Users}
          change={schoolMetrics.activeUsersChange}
          hint="teachers & parents"
        />
        <StatCard
          label="Flag resolution"
          value={resolutionRate}
          unit="%"
          icon={ShieldCheck}
          accent="success"
          hint="resolved vs total"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Behavior flags — opened vs resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <FlagsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grade health</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {gradeHealth.map((g) => (
              <div key={g.grade}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{g.grade}</span>
                  <span className="text-muted-foreground">{g.average}% avg</span>
                </div>
                <Progress value={g.average} className="h-2" />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {g.needsAttention} of {g.total} students need attention
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground">Attendance rate</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {schoolMetrics.attendanceRate}%
              </p>
              <p className="text-xs text-muted-foreground">School-wide, this term</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Students requiring intervention</CardTitle>
          <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
            {flagged.length} flagged · {schoolMetrics.interventionRequests} parent requests
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {flagged.map((s) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                  {s.initials}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <EarlyWarningBadge reasons={warningReasons(s)} compact />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {s.grade} · {s.average}% average · {s.openFlags} open flags
                  </p>
                </div>
              </div>
              <StatusTag status={s.status} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
