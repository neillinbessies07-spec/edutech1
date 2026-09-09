"use client"

import { useState } from "react"
import { GraduationCap, LayoutDashboard, ShieldCheck, Users } from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TeacherDashboard } from "@/components/edutech/teacher/teacher-dashboard"
import { ParentPortal } from "@/components/edutech/parent/parent-portal"
import { AdminOverview } from "@/components/edutech/admin/admin-overview"

type Role = "teacher" | "parent" | "admin"

const roles: { id: Role; label: string; icon: typeof Users; person: string }[] = [
  { id: "teacher", label: "Teacher", icon: LayoutDashboard, person: "Ms. Lowe" },
  { id: "parent", label: "Parent", icon: Users, person: "Sarah Bennett" },
  { id: "admin", label: "Admin", icon: ShieldCheck, person: "Dr. Reyes" },
]

export function AppShell() {
  const [role, setRole] = useState<Role>("teacher")
  const active = roles.find((r) => r.id === role)!

  return (
    <TooltipProvider delay={150}>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight text-foreground">EduTech</p>
                <p className="hidden text-xs text-muted-foreground sm:block">Connected school insights</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div
                role="tablist"
                aria-label="Switch role view"
                className="flex items-center gap-1 rounded-xl border border-border bg-muted/50 p-1"
              >
                {roles.map((r) => {
                  const Icon = r.icon
                  const selected = r.id === role
                  return (
                    <button
                      key={r.id}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3",
                        selected
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{r.label}</span>
                    </button>
                  )
                })}
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium text-foreground">{active.person}</p>
                  <p className="text-xs capitalize text-muted-foreground">{active.label} account</p>
                </div>
                <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                  {active.person
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          {role === "teacher" && <TeacherDashboard />}
          {role === "parent" && <ParentPortal />}
          {role === "admin" && <AdminOverview />}
        </main>
      </div>
    </TooltipProvider>
  )
}
