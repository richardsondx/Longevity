"use client"

import { useEffect, useState } from "react"

interface InnerAgeGaugeProps {
  chronologicalAge: number
  biologicalAge: number
  className?: string
}

export function InnerAgeGauge({ chronologicalAge, biologicalAge, className = "" }: InnerAgeGaugeProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const delta = biologicalAge - chronologicalAge
  const isYounger = delta < 0

  const minAge = Math.max(chronologicalAge - 15, 20)
  const maxAge = chronologicalAge + 15
  const clampedAge = Math.max(minAge, Math.min(maxAge, biologicalAge))
  const percentage = (clampedAge - minAge) / (maxAge - minAge)
  const rotation = percentage * 180 - 90

  // Determine status based on delta
  const getStatus = () => {
    if (delta <= -2) return { label: "Excellent", color: "#10b981" } // Green
    if (delta <= 0) return { label: "Good", color: "#10b981" } // Green
    if (delta <= 2) return { label: "Fair", color: "#f59e0b" } // Amber
    return { label: "Needs Attention", color: "#ef4444" } // Red
  }

  const status = getStatus()

  return (
    <div className={`relative w-full ${className}`}>
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-1">Your Biological Age is</p>
        <p className="text-6xl font-bold" style={{ color: status.color }}>
          {biologicalAge.toFixed(1)}
        </p>
      </div>

      {/* Main Gauge Circle */}
      <svg viewBox="0 0 200 140" className="w-full h-auto">
        {/* Background Arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          className="text-gray-200 dark:text-gray-700"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          className="transition-all duration-1000"
        />

        {/* Needle */}
        <g transform={`rotate(${rotation} 100 100)`} className="transition-transform duration-1000 ease-out">
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-gray-900 dark:text-white"
          />
          <circle cx="100" cy="100" r="6" fill="currentColor" className="text-gray-900 dark:text-white" />
        </g>

        {/* Age Labels */}
        <text x="20" y="115" className="text-xs fill-current text-gray-600 dark:text-gray-400" textAnchor="start">
          {minAge}
        </text>
        <text x="180" y="115" className="text-xs fill-current text-gray-600 dark:text-gray-400" textAnchor="end">
          {maxAge}
        </text>
      </svg>

      <div className="flex items-center justify-between mt-2 px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Younger</span>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{chronologicalAge}</div>
          <div className="text-xs text-muted-foreground">Chronological Age</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Older</span>
          <div className="w-3 h-3 rounded-full bg-red-500" />
        </div>
      </div>

      <div className="text-center mt-6">
        <div className={`text-2xl font-bold`} style={{ color: status.color }}>
          {isYounger ? "" : "+"}
          {delta.toFixed(1)} years
        </div>
        <div className="text-sm text-muted-foreground">
          {isYounger ? "younger than your age" : "older than your age"}
        </div>
      </div>
    </div>
  )
}
