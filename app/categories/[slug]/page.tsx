"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Activity,
  Settings,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Zap,
  Scale,
  Flame,
  Apple,
  Dumbbell,
  Brain,
  Moon,
  Wind,
  Pill,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { BIOMARKER_DATABASE } from "@/lib/biomarkers/biomarker-database"
import { calculateCategoryScores } from "@/lib/calculations/category-scores"
import { generateActionCards } from "@/lib/actions/action-generator"
import type { UserBiomarker, Sex, CategoryScore, ActionCard } from "@/lib/types/biomarker"

export default function CategoryDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [biomarkers, setBiomarkers] = useState<UserBiomarker[]>([])
  const [sex, setSex] = useState<Sex>("male")
  const [category, setCategory] = useState<CategoryScore | null>(null)
  const [actionCards, setActionCards] = useState<ActionCard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedBiomarkers = localStorage.getItem("userBiomarkers")
    const storedSex = localStorage.getItem("userSex")

    if (storedBiomarkers) {
      const parsedBiomarkers = JSON.parse(storedBiomarkers)
      setBiomarkers(parsedBiomarkers)

      const userSex = (storedSex as Sex) || "male"
      setSex(userSex)

      const scores = calculateCategoryScores(parsedBiomarkers, userSex)
      const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      const foundCategory = scores.find((c) => c.category.toLowerCase() === categoryName.toLowerCase())

      setCategory(foundCategory || null)

      if (foundCategory) {
        const allActions = generateActionCards(parsedBiomarkers, userSex)
        // Filter actions relevant to this category's biomarkers
        const categoryBiomarkerCodes = foundCategory.biomarkers.map((b) => b.code)
        const relevantActions = allActions.filter((action) =>
          action.targetBiomarkers.some((target) =>
            categoryBiomarkerCodes.some((code) => BIOMARKER_DATABASE[code]?.name.includes(target)),
          ),
        )
        setActionCards(relevantActions.slice(0, 4))
      }
    }

    setIsLoading(false)
  }, [slug])

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Heart Health":
        return <Heart className="h-8 w-8 text-red-500" />
      case "Metabolism":
        return <Zap className="h-8 w-8 text-yellow-500" />
      case "Hormone Balance":
        return <Scale className="h-8 w-8 text-purple-500" />
      case "Inflammation":
        return <Flame className="h-8 w-8 text-orange-500" />
      case "Nutrients":
        return <Apple className="h-8 w-8 text-green-500" />
      case "Endurance":
        return <Dumbbell className="h-8 w-8 text-blue-500" />
      case "Cognition":
        return <Brain className="h-8 w-8 text-indigo-500" />
      case "Sleep":
        return <Moon className="h-8 w-8 text-slate-500" />
      case "Recovery":
        return <Wind className="h-8 w-8 text-cyan-500" />
      case "Gut Health":
        return <Pill className="h-8 w-8 text-amber-500" />
      default:
        return <Activity className="h-8 w-8 text-teal-500" />
    }
  }

  const getBadgeColor = (status: string) => {
    if (status === "Excellent" || status === "Good") return "bg-green-500/10 text-green-700 border-green-500/20"
    if (status === "Fair") return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
    return "bg-red-500/10 text-red-700 border-red-500/20"
  }

  const getProgressColor = (status: string) => {
    if (status === "Excellent" || status === "Good") return "bg-green-500"
    if (status === "Fair") return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimized":
        return "bg-green-500/10 text-green-700"
      case "Borderline Low":
      case "Borderline High":
        return "bg-yellow-500/10 text-yellow-700"
      case "Low":
      case "High":
      case "Very High":
        return "bg-red-500/10 text-red-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === "Optimized") return <Minus className="h-4 w-4" />
    if (status.includes("High")) return <TrendingUp className="h-4 w-4" />
    if (status.includes("Low")) return <TrendingDown className="h-4 w-4" />
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading category details...</p>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
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
              <Link href="/biomarkers">
                <Button variant="ghost">Biomarkers</Button>
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
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Category not found.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
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
            <Link href="/biomarkers">
              <Button variant="ghost">Biomarkers</Button>
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Back Button */}
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Category Header */}
          <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-2">
            <CardContent className="pt-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-background rounded-2xl shadow-sm">{getCategoryIcon(category.category)}</div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{category.category}</h1>
                  <p className="text-muted-foreground text-lg mb-4">
                    Tracking {category.biomarkers.length} biomarkers in this category
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-bold">{category.score}</div>
                    <div>
                      <Badge variant="outline" className={`${getBadgeColor(category.status)} text-base px-3 py-1`}>
                        {category.status}
                      </Badge>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden mt-2 w-48">
                        <div
                          className={`h-full ${getProgressColor(category.status)} transition-all duration-500`}
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Top Drivers
              </CardTitle>
              <CardDescription>Biomarkers with the most impact on this category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.biomarkers.slice(0, 3).map((biomarker) => {
                  const userBiomarker = biomarkers.find((b) => b.code === biomarker.code)
                  if (!userBiomarker) return null

                  return (
                    <div key={biomarker.code} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{biomarker.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {userBiomarker.value} {userBiomarker.unit}
                        </p>
                      </div>
                      <Badge className={getStatusColor(biomarker.status)}>
                        {getStatusIcon(biomarker.status)}
                        {biomarker.status}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* This Week's Actions */}
          {actionCards.length > 0 && (
            <Card className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
              <CardHeader>
                <CardTitle>This Week's Actions</CardTitle>
                <CardDescription>Focus on these to improve your {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {actionCards.map((action) => (
                    <Link href={`/actions/${action.id}`} key={action.id}>
                      <Card className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full">
                        <div className="relative h-32 bg-gradient-to-br from-muted to-muted/50">
                          <img
                            src={`/images/actions/${action.id}.jpg`}
                            alt={action.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base leading-tight">{action.title}</CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{action.frequency}</span>
                            <span>•</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: action.rating }).map((_, i) => (
                                <span key={i} className="text-yellow-500">
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">Recommended to improve:</p>
                            <div className="flex flex-wrap gap-1">
                              {action.targetBiomarkers.slice(0, 3).map((biomarker) => (
                                <Badge key={biomarker} variant="secondary" className="text-xs">
                                  {biomarker}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Biomarkers in Category */}
          <Card>
            <CardHeader>
              <CardTitle>All Biomarkers</CardTitle>
              <CardDescription>Detailed view of all biomarkers in this category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.biomarkers.map((biomarker) => {
                  const userBiomarker = biomarkers.find((b) => b.code === biomarker.code)
                  const def = BIOMARKER_DATABASE[biomarker.code]
                  if (!userBiomarker || !def) return null

                  const ranges = def.ranges[sex]
                  const percentage = ((userBiomarker.value - ranges.low) / (ranges.high - ranges.low)) * 100

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
                              {userBiomarker.value} {userBiomarker.unit}
                            </span>
                            <span className="text-muted-foreground">
                              Optimal: {ranges.optimizedLow} - {ranges.optimizedHigh} {def.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        {/* Red zone (low) */}
                        <div
                          className="absolute h-full bg-red-500/30"
                          style={{
                            left: "0%",
                            width: `${((ranges.borderlineLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                          }}
                        />
                        {/* Yellow zone (borderline low) */}
                        <div
                          className="absolute h-full bg-yellow-500/30"
                          style={{
                            left: `${((ranges.borderlineLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                            width: `${((ranges.optimizedLow - ranges.borderlineLow) / (ranges.high - ranges.low)) * 100}%`,
                          }}
                        />
                        {/* Green zone (optimal) */}
                        <div
                          className="absolute h-full bg-green-500/40"
                          style={{
                            left: `${((ranges.optimizedLow - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                            width: `${((ranges.optimizedHigh - ranges.optimizedLow) / (ranges.high - ranges.low)) * 100}%`,
                          }}
                        />
                        {/* Yellow zone (borderline high) */}
                        <div
                          className="absolute h-full bg-yellow-500/30"
                          style={{
                            left: `${((ranges.optimizedHigh - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                            width: `${((ranges.borderlineHigh - ranges.optimizedHigh) / (ranges.high - ranges.low)) * 100}%`,
                          }}
                        />
                        {/* Red zone (high) */}
                        <div
                          className="absolute h-full bg-red-500/30"
                          style={{
                            left: `${((ranges.borderlineHigh - ranges.low) / (ranges.high - ranges.low)) * 100}%`,
                            width: `${((ranges.high - ranges.borderlineHigh) / (ranges.high - ranges.low)) * 100}%`,
                          }}
                        />
                        {/* Current value indicator */}
                        <div
                          className={`absolute h-full w-1 ${getBarColor(userBiomarker.value)} shadow-lg z-10`}
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
  )
}
