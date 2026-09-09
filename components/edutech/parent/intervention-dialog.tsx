"use client"

import { useState } from "react"
import { CalendarClock } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function InterventionDialog({
  childName,
  onRequested,
  trigger,
}: {
  childName: string
  onRequested: () => void
  trigger?: React.ReactElement
}) {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState("academic")
  const [message, setMessage] = useState("")

  function submit() {
    onRequested()
    setMessage("")
    setTopic("academic")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button>
              <CalendarClock className="size-4" aria-hidden="true" />
              Request check-in
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a teacher check-in</DialogTitle>
          <DialogDescription>
            Send a request to {childName}&apos;s teachers. They typically respond within one school day.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="topic">Focus area</Label>
          <Select value={topic} onValueChange={(v) => setTopic(v as string)}>
            <SelectTrigger id="topic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic performance</SelectItem>
              <SelectItem value="behavior">Behavior & engagement</SelectItem>
              <SelectItem value="attendance">Attendance</SelectItem>
              <SelectItem value="general">General check-in</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">Message (optional)</Label>
          <Textarea
            id="message"
            placeholder="Share any context that would help the teacher prepare…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Send request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
