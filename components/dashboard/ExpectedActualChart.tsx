"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeader } from "@/components/common/SectionHeader";

interface ChartDatum {
  label: string;
  value: number;
}

/**
 * Simple Expected vs. Actual Return chart. Values come directly from
 * mock data (frontend/lib/mockData.ts) — nothing is calculated here.
 */
export function ExpectedActualChart({ data }: { data: ChartDatum[] }) {
  return (
    <section>
      <SectionHeader title="Expected vs. Actual Return" />
      <div className="h-56 rounded-lg border border-border bg-surface p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(32 42 53)" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="rgb(139 152 168)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgb(139 152 168)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip
              cursor={{ fill: "rgb(22 31 43)" }}
              contentStyle={{
                backgroundColor: "rgb(17 24 33)",
                border: "1px solid rgb(32 42 53)",
                borderRadius: 8,
                fontSize: 12,
                color: "rgb(245 247 250)",
              }}
              formatter={(value: number) => [`${value}%`, "Return"]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.label}
                  fill={entry.value < 0 ? "rgb(239 68 68)" : "rgb(34 197 94)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
