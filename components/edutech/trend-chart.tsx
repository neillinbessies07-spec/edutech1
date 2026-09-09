"use client"

import { Area, AreaChart, CartesianGrid, Line, ReferenceLine, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { MARK_THRESHOLD, type ProgressionPoint } from "@/lib/edutech-data"

const config = {
  student: { label: "Student", color: "var(--chart-1)" },
  classAverage: { label: "Class Average", color: "var(--chart-3)" },
} satisfies ChartConfig

export function TrendChart({ data }: { data: ProgressionPoint[] }) {
  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <AreaChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillStudent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-student)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-student)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis domain={[40, 100]} tickLine={false} axisLine={false} tickMargin={8} width={36} />
        <ReferenceLine
          y={MARK_THRESHOLD}
          stroke="var(--destructive)"
          strokeDasharray="4 4"
          strokeOpacity={0.6}
          label={{ value: "Threshold", position: "insideTopRight", fontSize: 10, fill: "var(--destructive)" }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="student"
          type="monotone"
          stroke="var(--color-student)"
          strokeWidth={2.5}
          fill="url(#fillStudent)"
        />
        <Line
          dataKey="classAverage"
          type="monotone"
          stroke="var(--color-classAverage)"
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
