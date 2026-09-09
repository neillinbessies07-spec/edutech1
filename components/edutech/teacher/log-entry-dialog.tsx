"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ALL_SUBJECTS, students, type Sentiment } from "@/lib/edutech-data"

export type NewEntry =
  | { kind: "behavior"; studentId: string; sentiment: Sentiment; summary: string }
  | { kind: "note"; studentId: string; summary: string }
  | { kind: "score"; studentId: string; subject: string; title: string; score: number }

export function LogEntryDialog({
  onSave,
  defaultStudentId,
  trigger,
}: {
  onSave: (entry: NewEntry) => void
  defaultStudentId?: string
  trigger?: React.ReactElement
}) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("behavior")

  const [studentId, setStudentId] = useState(defaultStudentId ?? students[1].id)
  const [sentiment, setSentiment] = useState<Sentiment>("neutral")
  const [summary, setSummary] = useState("")
  const [subject, setSubject] = useState(ALL_SUBJECTS[0])
  const [title, setTitle] = useState("")
  const [score, setScore] = useState("")

  function reset() {
    setSentiment("neutral")
    setSummary("")
    setSubject(ALL_SUBJECTS[0])
    setTitle("")
    setScore("")
  }

  function submit() {
    if (tab === "behavior") {
      if (!summary.trim()) return
      onSave({ kind: "behavior", studentId, sentiment, summary: summary.trim() })
    } else if (tab === "note") {
      if (!summary.trim()) return
      onSave({ kind: "note", studentId, summary: summary.trim() })
    } else {
      const n = Number(score)
      if (!title.trim() || Number.isNaN(n) || n < 0 || n > 100) return
      onSave({ kind: "score", studentId, subject, title: title.trim(), score: n })
    }
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button>
              <Plus className="size-4" aria-hidden="true" />
              Log entry
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Log a student entry</DialogTitle>
          <DialogDescription>
            Record micro-level insights that surface instantly in the parent portal.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="student">Student</Label>
          <Select value={studentId} onValueChange={(v) => setStudentId(v as string)}>
            <SelectTrigger id="student">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {students.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} — {s.grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="note">Daily note</TabsTrigger>
            <TabsTrigger value="score">Test score</TabsTrigger>
          </TabsList>

          <TabsContent value="behavior" className="grid gap-3 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="sentiment">Sentiment</Label>
              <Select value={sentiment} onValueChange={(v) => setSentiment(v as Sentiment)}>
                <SelectTrigger id="sentiment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="concern">Concern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="behavior-summary">Weekly summary</Label>
              <Textarea
                id="behavior-summary"
                placeholder="Describe this week's behavior and engagement…"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="note" className="grid gap-3 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="note-summary">Quick note</Label>
              <Textarea
                id="note-summary"
                placeholder="A short observation from today…"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="score" className="grid gap-3 pt-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={(v) => setSubject(v as string)}>
                  <SelectTrigger id="subject">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="score">Score (0–100)</Label>
                <Input
                  id="score"
                  inputMode="numeric"
                  placeholder="e.g. 84"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Assessment title</Label>
              <Input
                id="title"
                placeholder="e.g. Algebra Quiz 5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Save entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
