"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { flagTrend } from "@/lib/edutech-data"

const config = {
  opened: { label: "Opened", color: "var(--chart-3)" },
  resolved: { label: "Resolved", color: "var(--chart-2)" },
} satisfies ChartConfig

export function FlagsChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
      <BarChart data={flagTrend} margin={{ left: -12, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="opened" fill="var(--color-opened)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="resolved" fill="var(--color-resolved)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
