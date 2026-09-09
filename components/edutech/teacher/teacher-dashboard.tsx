"use client"

import { useMemo, useState } from "react"
import {
  BookOpen,
  ClipboardList,
  GaugeCircle,
  Search,
  TriangleAlert,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatCard } from "@/components/edutech/stat-card"
import { StatusTag } from "@/components/edutech/status-tag"
import { EarlyWarningBadge } from "@/components/edutech/early-warning-badge"
import { LogEntryDialog, type NewEntry } from "@/components/edutech/teacher/log-entry-dialog"
import {
  ALL_GRADES,
  ALL_SUBJECTS,
  behaviorLogs,
  dailyNotes,
  getStudent,
  isEarlyWarning,
  students,
  warningReasons,
  type Sentiment,
} from "@/lib/edutech-data"
import { cn } from "@/lib/utils"

type FeedItem = {
  id: string
  studentName: string
  kind: string
  sentiment?: Sentiment
  text: string
  meta: string
}

const sentimentStyles: Record<Sentiment, string> = {
  positive: "bg-success",
  neutral: "bg-primary",
  concern: "bg-destructive",
}

const baseFeed: FeedItem[] = [
  ...behaviorLogs.map((b) => ({
    id: b.id,
    studentName: getStudent(b.studentId)?.name ?? "",
    kind: "Behavior report",
    sentiment: b.sentiment,
    text: b.summary,
    meta: b.week,
  })),
  ...dailyNotes.map((n) => ({
    id: n.id,
    studentName: getStudent(n.studentId)?.name ?? "",
    kind: "Daily note",
    text: n.note,
    meta: n.date,
  })),
]

export function TeacherDashboard() {
  const [query, setQuery] = useState("")
  const [subject, setSubject] = useState("all")
  const [grade, setGrade] = useState("all")
  const [feed, setFeed] = useState<FeedItem[]>(baseFeed)
  const [entriesThisWeek, setEntriesThisWeek] = useState(6)

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase())
      const matchesSubject = subject === "all" || s.subjects.includes(subject)
      const matchesGrade = grade === "all" || s.grade === grade
      return matchesQuery && matchesSubject && matchesGrade
    })
  }, [query, subject, grade])

  const needsAttention = students.filter((s) => s.status === "Needs Attention").length
  const classAverage = Math.round(
    students.reduce((sum, s) => sum + s.average, 0) / students.length,
  )

  function handleSave(entry: NewEntry) {
    const student = getStudent(entry.studentId)
    const now = "Just now"
    let item: FeedItem
    if (entry.kind === "behavior") {
      item = {
        id: crypto.randomUUID(),
        studentName: student?.name ?? "",
        kind: "Behavior report",
        sentiment: entry.sentiment,
        text: entry.summary,
        meta: now,
      }
    } else if (entry.kind === "note") {
      item = {
        id: crypto.randomUUID(),
        studentName: student?.name ?? "",
        kind: "Daily note",
        text: entry.summary,
        meta: now,
      }
    } else {
      item = {
        id: crypto.randomUUID(),
        studentName: student?.name ?? "",
        kind: "Test score",
        text: `${entry.title} (${entry.subject}) — ${entry.score}%`,
        meta: now,
      }
    }
    setFeed((prev) => [item, ...prev])
    setEntriesThisWeek((n) => n + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            Teacher dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Track micro-level performance and behavior for your class roster.
          </p>
        </div>
        <LogEntryDialog onSave={handleSave} />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Students" value={students.length} icon={Users} hint="Across 2 grades" />
        <StatCard
          label="Needs attention"
          value={needsAttention}
          icon={TriangleAlert}
          accent="warning"
          hint="Flagged for review"
        />
        <StatCard
          label="Class average"
          value={classAverage}
          unit="%"
          icon={GaugeCircle}
          accent="success"
          change={2}
          hint="vs last term"
        />
        <StatCard
          label="Entries this week"
          value={entriesThisWeek}
          icon={ClipboardList}
          hint="Logs & scores"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="gap-4">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="size-4 text-muted-foreground" aria-hidden="true" />
                Class roster
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {filtered.length} of {students.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  className="pl-9"
                  placeholder="Search students…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search students"
                />
              </div>
              <Select value={subject} onValueChange={(v) => setSubject(v as string)}>
                <SelectTrigger className="sm:w-40" aria-label="Filter by subject">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All subjects</SelectItem>
                  {ALL_SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={grade} onValueChange={(v) => setGrade(v as string)}>
                <SelectTrigger className="sm:w-36" aria-label="Filter by grade">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All grades</SelectItem>
                  {ALL_GRADES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Student</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                            {s.initials}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                              {isEarlyWarning(s) && (
                                <EarlyWarningBadge reasons={warningReasons(s)} compact />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {s.grade} · {s.subjects.join(", ")}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-28">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span
                              className={cn(
                                "font-semibold",
                                isEarlyWarning(s) ? "text-destructive" : "text-foreground",
                              )}
                            >
                              {s.average}%
                            </span>
                          </div>
                          <Progress value={s.average} className="h-1.5" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusTag status={s.status} />
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <LogEntryDialog
                          onSave={handleSave}
                          defaultStudentId={s.id}
                          trigger={
                            <Button variant="outline" size="sm">
                              <span>Log</span>
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                        No students match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {feed.slice(0, 8).map((item) => (
              <div key={item.id} className="flex gap-3">
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    item.sentiment ? sentimentStyles[item.sentiment] : "bg-muted-foreground/50",
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">{item.studentName}</span>{" "}
                    <span className="text-muted-foreground">· {item.kind}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">{item.meta}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
