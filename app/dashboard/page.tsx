"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Activity,
  Upload,
  Brain,
  TrendingUp,
  MessageSquare,
  UtensilsCrossed,
  ArrowRight,
  Heart,
  Zap,
  Scale,
  Flame,
  Apple,
  Dumbbell,
  Moon,
  Sparkles,
  Wind,
  Salad,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { InnerAgeGauge } from "@/components/inner-age-gauge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { GoalSettingModal } from "@/components/goal-setting-modal"
import { calculateInnerAge } from "@/lib/calculations/inner-age"
import { calculateCategoryScores } from "@/lib/calculations/category-scores"
import { generateActionCards } from "@/lib/actions/action-generator"
import type { UserBiomarker, Sex, InnerAgeResult, CategoryScore } from "@/lib/types/biomarker"
import type { ActionCard } from "@/lib/actions/action-generator"

export default function DashboardPage() {
  const [hasData, setHasData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [innerAge, setInnerAge] = useState<InnerAgeResult | null>(null)
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([])
  const [biologicalAgeGoal, setBiologicalAgeGoal] = useState<number | null>(null)
  const [actionCards, setActionCards] = useState<ActionCard[]>([])

  useEffect(() => {
    // Check if user has uploaded data
    const storedData = localStorage.getItem("userBiomarkers")
    const storedAge = localStorage.getItem("userAge")
    const storedSex = localStorage.getItem("userSex")
    const storedGoal = localStorage.getItem("biologicalAgeGoal")

    if (storedGoal) {
      setBiologicalAgeGoal(Number.parseFloat(storedGoal))
    }

    if (storedData) {
      setHasData(true)

      try {
        const biomarkers: UserBiomarker[] = JSON.parse(storedData)
        const age = storedAge ? Number.parseInt(storedAge) : 35
        const sex = (storedSex as Sex) || "male"

        const innerAgeResult = calculateInnerAge(biomarkers, age, sex)
        setInnerAge(innerAgeResult)

        const scores = calculateCategoryScores(biomarkers, sex)
        setCategoryScores(scores)

        const actions = generateActionCards(biomarkers, sex)
        setActionCards(actions)
      } catch (error) {
        console.error("[v0] Error calculating dashboard data:", error)
      }
    }

    setIsLoading(false)
  }, [])

  const handleSaveGoal = (goal: number) => {
    localStorage.setItem("biologicalAgeGoal", goal.toString())
    setBiologicalAgeGoal(goal)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
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
      case "Cognition":
        return <Brain className="h-6 w-6 text-indigo-500" />
      case "Sleep":
        return <Moon className="h-6 w-6 text-slate-500" />
      case "Recovery":
        return <Sparkles className="h-6 w-6 text-cyan-500" />
      case "Gut Health":
        return <Salad className="h-6 w-6 text-emerald-500" />
      case "Fitness":
        return <Wind className="h-6 w-6 text-teal-500" />
      default:
        return <Activity className="h-6 w-6 text-teal-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!hasData) {
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
            <UserMenu />
          </div>
        </header>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mx-auto">
              <Upload className="h-12 w-12 text-teal-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Welcome to Your Health Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Upload your blood work to discover your biological age and get personalized health insights.
              </p>
              <p className="text-sm text-muted-foreground">🔒 Your data stays on your device. You own it completely.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                >
                  Upload Blood Work
                  <Upload className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            <Link href="/upload">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Results
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl overflow-x-hidden">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Health Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Your latest lab results have been analyzed. These are your top opportunities for improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/biomarkers" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold">View Biomarkers</h3>
                    <p className="text-sm text-muted-foreground">See detailed analysis</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/coach" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">AI Coach</h3>
                    <p className="text-sm text-muted-foreground">Get personalized advice</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/meal-plan" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                      <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Meal Plans</h3>
                    <p className="text-sm text-muted-foreground">Optimize your nutrition</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {innerAge ? (
            <>
              <Card className="bg-muted/30 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Brain className="h-8 w-8 text-primary" />
                    Your Biological Age
                  </CardTitle>
                  <CardDescription>Based on your latest blood work analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex-1 w-full">
                      <InnerAgeGauge
                        chronologicalAge={innerAge.chronological}
                        biologicalAge={innerAge.biological}
                        className="max-w-sm mx-auto"
                      />
                    </div>
                    <div className="flex-1 w-full space-y-4">
                      <div className="p-4 rounded-lg bg-card border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Your Goal</h3>
                        </div>
                        {biologicalAgeGoal ? (
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-primary">{biologicalAgeGoal} years</p>
                            <p className="text-sm text-muted-foreground">
                              {innerAge.biological > biologicalAgeGoal
                                ? `${(innerAge.biological - biologicalAgeGoal).toFixed(1)} years to go`
                                : "Goal achieved! 🎉"}
                            </p>
                            <GoalSettingModal
                              currentBiologicalAge={innerAge.biological}
                              chronologicalAge={innerAge.chronological}
                              currentGoal={biologicalAgeGoal}
                              onSaveGoal={handleSaveGoal}
                              trigger={
                                <Button variant="outline" size="sm">
                                  Update Goal
                                </Button>
                              }
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Set a target biological age to work towards</p>
                            <GoalSettingModal
                              currentBiologicalAge={innerAge.biological}
                              chronologicalAge={innerAge.chronological}
                              currentGoal={null}
                              onSaveGoal={handleSaveGoal}
                            />
                          </div>
                        )}
                      </div>
                      <Link href="/biomarkers">
                        <Button size="lg" className="w-full">
                          View Full Analysis
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {innerAge.topDrivers && innerAge.topDrivers.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Top Aging Drivers</h2>
                  <p className="text-muted-foreground mb-4">
                    These biomarkers are contributing most to your biological age
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {innerAge.topDrivers.slice(0, 3).map((driver, index) => (
                      <Card
                        key={driver.biomarker}
                        className={
                          driver.direction === "aging"
                            ? "border-orange-500/30 bg-orange-500/5"
                            : "border-green-500/30 bg-green-500/5"
                        }
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{driver.biomarkerName}</CardTitle>
                            <Badge
                              variant="outline"
                              className={
                                driver.direction === "aging"
                                  ? "bg-orange-500/10 text-orange-700 border-orange-500/20"
                                  : "bg-green-500/10 text-green-700 border-green-500/20"
                              }
                            >
                              #{index + 1}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{driver.currentValue.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">
                              → {driver.optimalValue.toFixed(1)} optimal
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp
                              className={`h-4 w-4 ${driver.direction === "aging" ? "text-orange-500" : "text-green-500"}`}
                            />
                            <span className="text-sm">
                              {driver.direction === "aging" ? "Aging impact" : "Youthful impact"}:{" "}
                              {Math.abs(driver.impact).toFixed(1)} years
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card className="bg-muted/30 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  Your Biological Age
                </CardTitle>
                <CardDescription>Based on your latest blood work analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4 py-8">
                  <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
                  <p className="text-muted-foreground">Calculating your Inner Age...</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">Health Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryScores.length > 0
                ? categoryScores.map((category) => {
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

                    const categorySlug = category.category.toLowerCase().replace(/\s+/g, "-")

                    return (
                      <Link href={`/categories/${categorySlug}`} key={category.category}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {getCategoryIcon(category.category)}
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
                            <p className="text-xs text-muted-foreground">
                              {category.biomarkers.length} biomarkers tracked
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })
                : [
                    { name: "Heart Health", icon: <Heart className="h-6 w-6 text-red-500" /> },
                    { name: "Metabolism", icon: <Zap className="h-6 w-6 text-yellow-500" /> },
                    { name: "Hormone Balance", icon: <Scale className="h-6 w-6 text-purple-500" /> },
                    { name: "Inflammation", icon: <Flame className="h-6 w-6 text-orange-500" /> },
                    { name: "Nutrients", icon: <Apple className="h-6 w-6 text-green-500" /> },
                    { name: "Endurance", icon: <Dumbbell className="h-6 w-6 text-blue-500" /> },
                    { name: "Cognition", icon: <Brain className="h-6 w-6 text-indigo-500" /> },
                    { name: "Sleep", icon: <Moon className="h-6 w-6 text-slate-500" /> },
                    { name: "Recovery", icon: <Sparkles className="h-6 w-6 text-cyan-500" /> },
                    { name: "Gut Health", icon: <Salad className="h-6 w-6 text-emerald-500" /> },
                  ].map((category) => (
                    <Card key={category.name}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {category.icon}
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">0</span>
                          <Badge variant="secondary">Loading...</Badge>
                        </div>
                        <Progress value={0} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>

          {actionCards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">This Week's Actions</h2>
              <p className="text-muted-foreground mb-6">
                Focus on these evidence-based recommendations to improve your biomarkers
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
