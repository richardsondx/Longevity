"use client"

import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, AreaChart } from "recharts"
import { Card } from "@/components/ui/card"

interface BiomarkerChartProps {
  data: Array<{ date: string; value: number }>
  optimizedLow: number
  optimizedHigh: number
  low: number
  high: number
  unit: string
  name: string
}

export function BiomarkerChart({ data, optimizedLow, optimizedHigh, low, high, unit, name }: BiomarkerChartProps) {
  // Create zone data for background
  const zoneData = data.map((d) => ({
    date: d.date,
    value: d.value,
    low,
    optimizedLow,
    optimizedHigh,
    high,
  }))

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-muted-foreground">
          Optimal: {optimizedLow} - {optimizedHigh} {unit}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={zoneData}>
          <defs>
            <linearGradient id="colorZone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.1} />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity={0.1} />
              <stop offset="50%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} />
          <YAxis domain={[low * 0.8, high * 1.2]} tick={{ fill: "#6b7280", fontSize: 12 }} tickLine={false} />

          {/* Optimal Zone */}
          <ReferenceLine y={optimizedLow} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
          <ReferenceLine y={optimizedHigh} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />

          {/* Data Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={{ fill: "#0d9488", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-muted-foreground">Borderline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Optimized</span>
        </div>
      </div>
    </Card>
  )
}
