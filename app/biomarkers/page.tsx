"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Activity,
  Settings,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Heart,
  Zap,
  Scale,
  Flame,
  Apple,
  Dumbbell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BIOMARKER_DATABASE } from "@/lib/biomarkers/biomarker-database"
import { calculateInnerAge } from "@/lib/calculations/inner-age"
import { calculateCategoryScores } from "@/lib/calculations/category-scores"
import { InnerAgeGauge } from "@/components/inner-age-gauge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import type { UserBiomarker, Sex, InnerAgeResult, CategoryScore } from "@/lib/types/biomarker"

export default function BiomarkersPage() {
  const [biomarkers, setBiomarkers] = useState<UserBiomarker[]>([])
  const [age, setAge] = useState<number>(35)
  const [sex, setSex] = useState<Sex>("male")
  const [innerAge, setInnerAge] = useState<InnerAgeResult | null>(null)
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedBiomarkers = localStorage.getItem("userBiomarkers")
    const storedAge = localStorage.getItem("userAge")
    const storedSex = localStorage.getItem("userSex")

    console.log("[v0] Loading biomarkers from localStorage:", storedBiomarkers)

    if (storedBiomarkers) {
      try {
        const parsedBiomarkers = JSON.parse(storedBiomarkers)
        setBiomarkers(parsedBiomarkers)

        const userAge = storedAge ? Number.parseInt(storedAge) : 35
        const userSex = (storedSex as Sex) || "male"
        setAge(userAge)
        setSex(userSex)

        console.log("[v0] Calculating Inner Age with:", { userAge, userSex, biomarkerCount: parsedBiomarkers.length })

        const innerAgeResult = calculateInnerAge(parsedBiomarkers, userAge, userSex)
        console.log("[v0] Inner Age Result:", innerAgeResult)
        setInnerAge(innerAgeResult)

        const scores = calculateCategoryScores(parsedBiomarkers, userSex)
        console.log("[v0] Category Scores:", scores)
        setCategoryScores(scores)
      } catch (error) {
        console.error("[v0] Error loading biomarkers:", error)
      }
    }

    setIsLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimized":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "Borderline Low":
      case "Borderline High":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "Low":
      case "High":
      case "Very High":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === "Optimized") return <Minus className="h-4 w-4" />
    if (status.includes("High")) return <TrendingUp className="h-4 w-4" />
    if (status.includes("Low")) return <TrendingDown className="h-4 w-4" />
    return null
  }

  const getCategorySlug = (categoryName: string) => {
    return categoryName.toLowerCase().replace(/\s+/g, "-")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your biomarkers...</p>
        </div>
      </div>
    )
  }

  if (biomarkers.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Longevity</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">No biomarker data found. Please upload your blood work first.</p>
          <Link href="/upload">
            <Button className="mt-4">Upload Blood Work</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Longevity</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/coach">
              <Button variant="ghost">AI Coach</Button>
            </Link>
            <Link href="/meal-plan">
              <Button variant="ghost">Meal Plan</Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost">History</Button>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Your Biomarkers
            </h1>
            <p className="text-muted-foreground text-lg">AI-powered analysis of your blood work results</p>
          </div>

          {innerAge && (
            <Card className="bg-muted/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="h-8 w-8 text-primary" />
                  Your Biological Age Analysis
                </CardTitle>
                <CardDescription>
                  AI-calculated from {innerAge.biomarkersUsed} biomarkers with {innerAge.confidence}% confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Gauge Visualization */}
                  <div className="lg:col-span-1">
                    <InnerAgeGauge
                      chronologicalAge={innerAge.chronological}
                      biologicalAge={innerAge.biological}
                      className="max-w-md mx-auto"
                    />
                  </div>

                  {/* Top Aging Drivers */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Top Aging Drivers
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      These biomarkers have the biggest impact on your biological age. Focus on improving these for the
                      best results.
                    </p>
                    <div className="space-y-3">
                      {innerAge.topDrivers.slice(0, 5).map((driver, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                          <div className="flex-1">
                            <p className="font-medium">{driver.biomarkerName}</p>
                            <p className="text-sm text-muted-foreground">
                              Current: {driver.currentValue.toFixed(1)} | Optimal: {driver.optimalValue.toFixed(1)}
                            </p>
                          </div>
                          <Badge
                            variant={driver.direction === "aging" ? "destructive" : "default"}
                            className="ml-2 shrink-0"
                          >
                            {driver.direction === "aging" ? "+" : "-"}
                            {driver.impact.toFixed(1)} yrs
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">Health Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryScores.map((category) => {
                // Determine icon based on category name
                const getIcon = () => {
                  switch (category.category) {
                    case "Heart Health":
                      return <Heart className="h-6 w-6 text-red-500" />
                    case "Metabolism":
                      return <Zap className="h-6 w-6 text-yellow-500" />
                    case "Hormone Balance":
                      return <Scale className="h-6 w-6 text-purple-500" />
                    case "Inflammation":
                      return <Flame className="h-6 w-6 text-orange-500" />
                    case "Nutrients":
                      return <Apple className="h-6 w-6 text-green-500" />
                    case "Endurance":
                      return <Dumbbell className="h-6 w-6 text-blue-500" />
                    default:
                      return <Activity className="h-6 w-6 text-teal-500" />
                  }
                }

                const getBadgeColor = () => {
                  if (category.status === "Excellent" || category.status === "Good")
                    return "bg-green-500/10 text-green-700 border-green-500/20"
                  if (category.status === "Fair") return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                  return "bg-red-500/10 text-red-700 border-red-500/20"
                }

                const getProgressColor = () => {
                  if (category.status === "Excellent" || category.status === "Good") return "bg-green-500"
                  if (category.status === "Fair") return "bg-yellow-500"
                  return "bg-red-500"
                }

                return (
                  <Link key={category.category} href={`/categories/${getCategorySlug(category.category)}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {getIcon()}
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{category.score}</span>
                          <Badge variant="outline" className={getBadgeColor()}>
                            {category.status}
                          </Badge>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor()} transition-all duration-500`}
                            style={{ width: `${category.score}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{category.biomarkers.length} biomarkers tracked</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* All Biomarkers */}
          <div>
            <h2 className="text-2xl font-bold mb-4">All Biomarkers</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {biomarkers.map((biomarker) => {
                    const def = BIOMARKER_DATABASE[biomarker.code]
                    if (!def) return null

                    const ranges = def.ranges[sex]
                    const percentage = ((biomarker.value - ranges.low) / (ranges.high - ranges.low)) * 100

                    const getBarColor = (value: number) => {
                      if (value >= ranges.optimizedLow && value <= ranges.optimizedHigh) return "bg-green-500"
                      if (
                        (value >= ranges.borderlineLow && value < ranges.optimizedLow) ||
                        (value > ranges.optimizedHigh && value <= ranges.borderlineHigh)
                      )
                        return "bg-yellow-500"
                      return "bg-red-500"
                    }

                    return (
                      <div key={biomarker.code} className="p-4 border border-border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{def.name}</h3>
                              <Badge className={getStatusColor(biomarker.status)}>
                                {getStatusIcon(biomarker.status)}
                                {biomarker.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{def.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="font-medium">
                                {biomarker.value} {biomarker.unit}
                              </span>
                              <span className="text-muted-foreground">
                                Optimal: {ranges.optimizedLow} - {ranges.optimizedHigh} {def.unit}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-red-500/30"
                            style={{
                              left: "0%",
                              width: `${((ranges.borderlineLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-yellow-500/30"
                            style={{
                              left: `${((ranges.borderlineLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                              width: `${((ranges.optimizedLow - ranges.borderlineLow) / (ranges.high - ranges.low)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-green-500/40"
                            style={{
                              left: `${((ranges.optimizedLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                              width: `${((ranges.optimizedHigh - ranges.optimizedLow) / (ranges.high - ranges.low)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-yellow-500/30"
                            style={{
                              left: `${((ranges.optimizedHigh - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                              width: `${((ranges.borderlineHigh - ranges.optimizedHigh) / (ranges.high - ranges.low)) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-red-500/30"
                            style={{
                              left: `${((ranges.borderlineHigh - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                              width: `${((ranges.high - ranges.borderlineHigh) / (ranges.high - ranges.low)) * 100}%`,
                            }}
                          />
                          <div
                            className={`absolute h-full w-1 ${getBarColor(biomarker.value)} shadow-lg z-10`}
                            style={{
                              left: `${Math.min(Math.max(percentage, 0), 100)}%`,
                            }}
                          />
                        </div>

                        {biomarker.status !== "Optimized" && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-2">Recommendations:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {(biomarker.status.includes("High") ? def.recommendations.high : def.recommendations.low)
                                .slice(0, 2)
                                .map((rec, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
