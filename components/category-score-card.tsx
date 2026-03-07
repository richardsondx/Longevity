"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Zap, Activity, Flame, Apple, TrendingUp } from "lucide-react"

interface CategoryScoreCardProps {
  category: string
  score: number
  status: string
  biomarkerCount: number
}

const categoryIcons: Record<string, any> = {
  "Heart Health": Heart,
  Metabolism: Zap,
  "Hormone Balance": Activity,
  Inflammation: Flame,
  Nutrients: Apple,
  Endurance: TrendingUp,
}

const categoryColors: Record<string, { gradient: string; from: string; to: string }> = {
  "Heart Health": { gradient: "from-red-500 to-pink-500", from: "#ef4444", to: "#ec4899" },
  Metabolism: { gradient: "from-yellow-500 to-orange-500", from: "#eab308", to: "#f97316" },
  "Hormone Balance": { gradient: "from-purple-500 to-indigo-500", from: "#a855f7", to: "#6366f1" },
  Inflammation: { gradient: "from-orange-500 to-red-500", from: "#f97316", to: "#ef4444" },
  Nutrients: { gradient: "from-green-500 to-emerald-500", from: "#22c55e", to: "#10b981" },
  Endurance: { gradient: "from-blue-500 to-cyan-500", from: "#3b82f6", to: "#06b6d4" },
}

export function CategoryScoreCard({ category, score, status, biomarkerCount }: CategoryScoreCardProps) {
  const Icon = categoryIcons[category] || Activity
  const colors = categoryColors[category] || {
    gradient: "from-gray-500 to-gray-600",
    from: "#6b7280",
    to: "#4b5563",
  }

  // Calculate circle progress
  const circumference = 2 * Math.PI * 45
  const progress = (score / 100) * circumference

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className={`bg-gradient-to-br ${colors.gradient} text-white pb-4`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {category}
          </CardTitle>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {biomarkerCount} markers
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke={`url(#gradient-${category.replace(/\s+/g, "-")})`}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id={`gradient-${category.replace(/\s+/g, "-")}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{score}</span>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <Badge
              variant={status === "Excellent" ? "default" : status === "Good" ? "secondary" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {status}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Overall Score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
