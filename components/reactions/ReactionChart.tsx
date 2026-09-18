"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReactionTimelinePoint } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";

/**
 * "Event Window Reaction" — Actual Return vs. Expected Return across
 * event days. Values come directly from mock data
 * (lib/mockData.ts); nothing is calculated here.
 */
export function ReactionChart({ timeline }: { timeline: ReactionTimelinePoint[] }) {
  const data = timeline.map((point) => ({
    day: point.day > 0 ? `+${point.day}` : String(point.day),
    "Actual Return": point.actualReturnPercent,
    "Expected Return": point.expectedReturnPercent,
  }));

  return (
    <section>
      <SectionHeader title="Event Window Reaction" />
      <div className="h-72 rounded-lg border border-border bg-surface p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(32 42 53)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="rgb(139 152 168)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: "Event Day", position: "insideBottom", offset: -2, fill: "rgb(139 152 168)", fontSize: 11 }}
            />
            <YAxis
              stroke="rgb(139 152 168)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(17 24 33)",
                border: "1px solid rgb(32 42 53)",
                borderRadius: 8,
                fontSize: 12,
                color: "rgb(245 247 250)",
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "rgb(139 152 168)" }} />
            <Line
              type="monotone"
              dataKey="Actual Return"
              stroke="rgb(124 108 246)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Expected Return"
              stroke="rgb(139 152 168)"
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
