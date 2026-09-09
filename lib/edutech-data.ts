export type StudentStatus = "Excellent" | "On Track" | "Needs Attention"

export type Sentiment = "positive" | "neutral" | "concern"

export type Student = {
  id: string
  name: string
  initials: string
  grade: string
  homeroom: string
  subjects: string[]
  status: StudentStatus
  average: number
  previousAverage: number
  attendance: number
  openFlags: number
  resolvedFlags: number
  parentName: string
  guardianEmail: string
}

export type TestScore = {
  id: string
  studentId: string
  subject: string
  title: string
  date: string
  score: number
  classAverage: number
}

export type ProgressionPoint = {
  month: string
  student: number
  classAverage: number
}

export type BehaviorLog = {
  id: string
  studentId: string
  week: string
  sentiment: Sentiment
  summary: string
  teacher: string
}

export type DailyNote = {
  id: string
  studentId: string
  date: string
  note: string
  teacher: string
}

export type AttendanceSummary = {
  present: number
  late: number
  absent: number
}

export const MARK_THRESHOLD = 65

const rawStudents: Student[] = [
  {
    id: "s1",
    name: "Amara Okafor",
    initials: "AO",
    grade: "Grade 8",
    homeroom: "8B",
    subjects: ["Mathematics", "Science"],
    status: "Excellent",
    average: 92,
    previousAverage: 89,
    attendance: 98,
    openFlags: 0,
    resolvedFlags: 1,
    parentName: "Ngozi Okafor",
    guardianEmail: "ngozi.okafor@example.com",
  },
  {
    id: "s2",
    name: "Liam Bennett",
    initials: "LB",
    grade: "Grade 8",
    homeroom: "8B",
    subjects: ["Mathematics", "English"],
    status: "Needs Attention",
    average: 58,
    previousAverage: 71,
    attendance: 82,
    openFlags: 3,
    resolvedFlags: 2,
    parentName: "Sarah Bennett",
    guardianEmail: "sarah.bennett@example.com",
  },
  {
    id: "s3",
    name: "Sofia Martinez",
    initials: "SM",
    grade: "Grade 7",
    homeroom: "7A",
    subjects: ["Science", "English"],
    status: "On Track",
    average: 78,
    previousAverage: 76,
    attendance: 94,
    openFlags: 1,
    resolvedFlags: 0,
    parentName: "Elena Martinez",
    guardianEmail: "elena.martinez@example.com",
  },
  {
    id: "s4",
    name: "Noah Kim",
    initials: "NK",
    grade: "Grade 8",
    homeroom: "8B",
    subjects: ["Mathematics", "Science", "English"],
    status: "On Track",
    average: 81,
    previousAverage: 80,
    attendance: 96,
    openFlags: 0,
    resolvedFlags: 3,
    parentName: "Grace Kim",
    guardianEmail: "grace.kim@example.com",
  },
  {
    id: "s5",
    name: "Zara Ahmed",
    initials: "ZA",
    grade: "Grade 7",
    homeroom: "7A",
    subjects: ["English", "Science"],
    status: "Needs Attention",
    average: 62,
    previousAverage: 68,
    attendance: 88,
    openFlags: 2,
    resolvedFlags: 1,
    parentName: "Yusuf Ahmed",
    guardianEmail: "yusuf.ahmed@example.com",
  },
  {
    id: "s6",
    name: "Ethan Walsh",
    initials: "EW",
    grade: "Grade 7",
    homeroom: "7A",
    subjects: ["Mathematics", "English"],
    status: "Excellent",
    average: 90,
    previousAverage: 91,
    attendance: 99,
    openFlags: 0,
    resolvedFlags: 0,
    parentName: "Claire Walsh",
    guardianEmail: "claire.walsh@example.com",
  },
  {
    id: "s7",
    name: "Priya Nair",
    initials: "PN",
    grade: "Grade 8",
    homeroom: "8A",
    subjects: ["Science", "Mathematics"],
    status: "On Track",
    average: 84,
    previousAverage: 82,
    attendance: 95,
    openFlags: 1,
    resolvedFlags: 2,
    parentName: "Anita Nair",
    guardianEmail: "anita.nair@example.com",
  },
  {
    id: "s8",
    name: "Jayden Brooks",
    initials: "JB",
    grade: "Grade 8",
    homeroom: "8A",
    subjects: ["English", "Mathematics"],
    status: "Needs Attention",
    average: 60,
    previousAverage: 64,
    attendance: 79,
    openFlags: 4,
    resolvedFlags: 1,
    parentName: "Monica Brooks",
    guardianEmail: "monica.brooks@example.com",
  },
]

export const students = rawStudents

export const ALL_SUBJECTS = ["Mathematics", "Science", "English"]
export const ALL_GRADES = ["Grade 7", "Grade 8"]

export const testScores: TestScore[] = [
  { id: "t1", studentId: "s1", subject: "Mathematics", title: "Algebra Quiz 4", date: "2026-08-28", score: 94, classAverage: 78 },
  { id: "t2", studentId: "s1", subject: "Science", title: "Cells Unit Test", date: "2026-08-21", score: 90, classAverage: 75 },
  { id: "t3", studentId: "s2", subject: "Mathematics", title: "Algebra Quiz 4", date: "2026-08-28", score: 52, classAverage: 78 },
  { id: "t4", studentId: "s2", subject: "English", title: "Essay Assessment", date: "2026-08-20", score: 61, classAverage: 74 },
  { id: "t5", studentId: "s3", subject: "Science", title: "Cells Unit Test", date: "2026-08-21", score: 79, classAverage: 75 },
  { id: "t6", studentId: "s3", subject: "English", title: "Essay Assessment", date: "2026-08-20", score: 77, classAverage: 74 },
  { id: "t7", studentId: "s4", subject: "Mathematics", title: "Algebra Quiz 4", date: "2026-08-28", score: 83, classAverage: 78 },
  { id: "t8", studentId: "s5", subject: "English", title: "Essay Assessment", date: "2026-08-20", score: 60, classAverage: 74 },
  { id: "t9", studentId: "s6", subject: "Mathematics", title: "Algebra Quiz 4", date: "2026-08-28", score: 91, classAverage: 78 },
  { id: "t10", studentId: "s7", subject: "Science", title: "Cells Unit Test", date: "2026-08-21", score: 86, classAverage: 75 },
  { id: "t11", studentId: "s8", subject: "Mathematics", title: "Algebra Quiz 4", date: "2026-08-28", score: 57, classAverage: 78 },
]

const progressionByStudent: Record<string, ProgressionPoint[]> = {
  s2: [
    { month: "Mar", student: 74, classAverage: 76 },
    { month: "Apr", student: 72, classAverage: 77 },
    { month: "May", student: 70, classAverage: 76 },
    { month: "Jun", student: 66, classAverage: 78 },
    { month: "Jul", student: 61, classAverage: 77 },
    { month: "Aug", student: 58, classAverage: 78 },
  ],
  default: [
    { month: "Mar", student: 80, classAverage: 76 },
    { month: "Apr", student: 82, classAverage: 77 },
    { month: "May", student: 84, classAverage: 76 },
    { month: "Jun", student: 85, classAverage: 78 },
    { month: "Jul", student: 88, classAverage: 77 },
    { month: "Aug", student: 92, classAverage: 78 },
  ],
}

export function getProgression(studentId: string): ProgressionPoint[] {
  return progressionByStudent[studentId] ?? progressionByStudent.default
}

export const behaviorLogs: BehaviorLog[] = [
  { id: "b1", studentId: "s2", week: "Week of Aug 25", sentiment: "concern", summary: "Disengaged during group work and missed two homework submissions.", teacher: "Mr. Daniels" },
  { id: "b2", studentId: "s2", week: "Week of Aug 18", sentiment: "concern", summary: "Frequent distraction in class; struggled to stay on task.", teacher: "Mr. Daniels" },
  { id: "b3", studentId: "s2", week: "Week of Aug 11", sentiment: "neutral", summary: "Participated more actively but rushed through assessments.", teacher: "Ms. Lowe" },
  { id: "b4", studentId: "s1", week: "Week of Aug 25", sentiment: "positive", summary: "Led a lab group with excellent collaboration and curiosity.", teacher: "Ms. Lowe" },
  { id: "b5", studentId: "s3", week: "Week of Aug 25", sentiment: "neutral", summary: "Steady effort; would benefit from asking questions when stuck.", teacher: "Ms. Lowe" },
  { id: "b6", studentId: "s5", week: "Week of Aug 25", sentiment: "concern", summary: "Late arrivals affecting morning reading block.", teacher: "Mr. Daniels" },
  { id: "b7", studentId: "s8", week: "Week of Aug 25", sentiment: "concern", summary: "Multiple incidents of off-task behavior and incomplete work.", teacher: "Mr. Daniels" },
]

export const dailyNotes: DailyNote[] = [
  { id: "n1", studentId: "s2", date: "2026-09-08", note: "Stayed after class for extra algebra support.", teacher: "Mr. Daniels" },
  { id: "n2", studentId: "s1", date: "2026-09-08", note: "Volunteered to help a peer with the lab report.", teacher: "Ms. Lowe" },
  { id: "n3", studentId: "s5", date: "2026-09-07", note: "Arrived 15 minutes late again — following up with guardian.", teacher: "Mr. Daniels" },
  { id: "n4", studentId: "s8", date: "2026-09-07", note: "Positive turnaround in the afternoon session.", teacher: "Ms. Lowe" },
]

export const attendanceByStudent: Record<string, AttendanceSummary> = {
  s1: { present: 48, late: 1, absent: 1 },
  s2: { present: 40, late: 6, absent: 4 },
  s3: { present: 46, late: 2, absent: 2 },
  s4: { present: 47, late: 2, absent: 1 },
  s5: { present: 43, late: 5, absent: 2 },
  s6: { present: 49, late: 1, absent: 0 },
  s7: { present: 46, late: 3, absent: 1 },
  s8: { present: 38, late: 8, absent: 4 },
}

export function isEarlyWarning(student: Student): boolean {
  return student.average < MARK_THRESHOLD || student.openFlags >= 3
}

export function warningReasons(student: Student): string[] {
  const reasons: string[] = []
  if (student.average < MARK_THRESHOLD) reasons.push(`Average ${student.average}% below ${MARK_THRESHOLD}% threshold`)
  if (student.openFlags >= 3) reasons.push(`${student.openFlags} open behavior flags`)
  return reasons
}

export const schoolMetrics = {
  gradeAverage: 76.4,
  gradeAverageChange: 1.8,
  openFlags: 11,
  resolvedFlags: 34,
  activeUsers: 842,
  activeUsersChange: 6.2,
  interventionRequests: 5,
  attendanceRate: 92.1,
}

export const gradeHealth = [
  { grade: "Grade 7", average: 74, needsAttention: 2, total: 3 },
  { grade: "Grade 8", average: 79, needsAttention: 2, total: 5 },
]

export const flagTrend = [
  { month: "Mar", opened: 9, resolved: 6 },
  { month: "Apr", opened: 7, resolved: 8 },
  { month: "May", opened: 11, resolved: 9 },
  { month: "Jun", opened: 8, resolved: 10 },
  { month: "Jul", opened: 6, resolved: 7 },
  { month: "Aug", opened: 10, resolved: 12 },
]

export function getStudent(id: string): Student | undefined {
  return students.find((s) => s.id === id)
}

export function scoresForStudent(id: string): TestScore[] {
  return testScores.filter((t) => t.studentId === id)
}

export function behaviorForStudent(id: string): BehaviorLog[] {
  return behaviorLogs.filter((b) => b.studentId === id)
}

export function notesForStudent(id: string): DailyNote[] {
  return dailyNotes.filter((n) => n.studentId === id)
}
