"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Activity,
  Settings,
  UtensilsCrossed,
  ChefHat,
  Clock,
  Users,
  Store,
  AlertCircle,
  Heart,
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
  Edit,
  ShoppingCart,
  X,
  Apple,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import type { UserBiomarker } from "@/lib/types/biomarker"

type ViewState = "blank" | "preview" | "configured"

interface MealPreferences {
  people: string
  planLength: string
  stores: string
  restrictions: string
  favoriteMeals: string
  otherPreferences: string
  fixedMeals: string
  budget: string
}

export default function MealPlanPage() {
  const [viewState, setViewState] = useState<ViewState>("blank")
  const [isGenerating, setIsGenerating] = useState(false)
  const [biomarkers, setBiomarkers] = useState<UserBiomarker[]>([])
  const [showGroceryList, setShowGroceryList] = useState(false)

  const [preferences, setPreferences] = useState<MealPreferences>({
    people: "2",
    planLength: "1week",
    stores: "",
    restrictions: "",
    favoriteMeals: "",
    otherPreferences: "",
    fixedMeals: "",
    budget: "150",
  })

  useEffect(() => {
    const storedBiomarkers = localStorage.getItem("userBiomarkers")
    const storedPreferences = localStorage.getItem("mealPlanPreferences")

    if (storedBiomarkers) {
      setBiomarkers(JSON.parse(storedBiomarkers))
    }

    if (storedPreferences) {
      const prefs = JSON.parse(storedPreferences)
      setPreferences(prefs)
      setViewState("configured")
    }
  }, [])

  const handleGeneratePlan = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setViewState("configured") // Changed from setCurrentStep("plan")
    }, 3000)
  }

  const handleGenerateGroceryList = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowGroceryList(true)
    }, 2000)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("mealPlanPreferences", JSON.stringify(preferences))
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setViewState("configured")
    }, 2000)
  }

  const handleEditPreferences = () => {
    setViewState("preview")
  }

  if (viewState === "blank") {
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

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="h-12 w-12 text-orange-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Personalized Meal Planning</h1>
              <p className="text-xl text-muted-foreground">
                Get AI-powered meal plans optimized for your biomarkers and lifestyle preferences
              </p>
            </div>

            {biomarkers.length > 0 && (
              <Card className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div className="text-left">
                      <p className="font-medium">Biomarker-Optimized Nutrition</p>
                      <p className="text-sm text-muted-foreground">
                        We'll create meals targeting your {biomarkers.length} biomarkers to improve your biological age
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-3 gap-4 text-left">
              <Card>
                <CardContent className="pt-6">
                  <ChefHat className="h-8 w-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold mb-2">Personalized Plans</h3>
                  <p className="text-sm text-muted-foreground">
                    Tailored to your dietary restrictions, preferences, and health goals
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <ShoppingCart className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">Smart Grocery Lists</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically generated shopping lists organized by store
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Heart className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold mb-2">Health-Optimized</h3>
                  <p className="text-sm text-muted-foreground">
                    Meals designed to improve your specific biomarker results
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={() => setViewState("preview")}
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
            >
              Configure Meal Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (viewState === "preview") {
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

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Meal Plan Preferences</h1>
              <p className="text-muted-foreground text-lg">
                Tell us about your lifestyle to create a personalized meal plan
              </p>
            </div>

            {biomarkers.length > 0 && (
              <Card className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <p className="font-medium mb-2">AI-Optimized for Your Health</p>
                      <p className="text-sm text-muted-foreground">
                        We'll create meals targeting your {biomarkers.length} biomarkers to improve your biological age
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Your Preferences</CardTitle>
                <CardDescription>We'll remember these settings for future meal plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="people" className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Number of People
                    </Label>
                    <Input
                      id="people"
                      type="number"
                      value={preferences.people}
                      onChange={(e) => setPreferences({ ...preferences, people: e.target.value })}
                      placeholder="2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      Plan Length
                    </Label>
                    <RadioGroup
                      value={preferences.planLength}
                      onValueChange={(v) => setPreferences({ ...preferences, planLength: v })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1week" id="1week" />
                        <Label htmlFor="1week" className="font-normal cursor-pointer">
                          1 Week
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2weeks" id="2weeks" />
                        <Label htmlFor="2weeks" className="font-normal cursor-pointer">
                          2 Weeks
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stores" className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-green-600" />
                    Grocery Stores
                  </Label>
                  <Input
                    id="stores"
                    value={preferences.stores}
                    onChange={(e) => setPreferences({ ...preferences, stores: e.target.value })}
                    placeholder="Walmart, Target, Whole Foods"
                  />
                  <p className="text-xs text-muted-foreground">Where do you typically shop?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restrictions" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Dietary Restrictions
                  </Label>
                  <Input
                    id="restrictions"
                    value={preferences.restrictions}
                    onChange={(e) => setPreferences({ ...preferences, restrictions: e.target.value })}
                    placeholder="No seafood, gluten-free, vegetarian"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favoriteMeals" className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-600" />
                    Favorite Meals
                  </Label>
                  <Textarea
                    id="favoriteMeals"
                    value={preferences.favoriteMeals}
                    onChange={(e) => setPreferences({ ...preferences, favoriteMeals: e.target.value })}
                    placeholder="Oatmeal for breakfast, Chicken pasta for dinner"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherPreferences" className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-orange-600" />
                    Other Preferences
                  </Label>
                  <Textarea
                    id="otherPreferences"
                    value={preferences.otherPreferences}
                    onChange={(e) => setPreferences({ ...preferences, otherPreferences: e.target.value })}
                    placeholder="Prefer healthy meals with vegetables. Budget-friendly options."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fixedMeals" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    Fixed Meals
                  </Label>
                  <Textarea
                    id="fixedMeals"
                    value={preferences.fixedMeals}
                    onChange={(e) => setPreferences({ ...preferences, fixedMeals: e.target.value })}
                    placeholder="Monday lunch - eating out ($15)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    Weekly Budget
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={preferences.budget}
                    onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                    placeholder="150"
                  />
                </div>

                <Button
                  onClick={handleSavePreferences}
                  disabled={isGenerating}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                      Generating Your Meal Plan...
                    </>
                  ) : (
                    <>
                      Generate Meal Plan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
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
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/biomarkers">
              <Button variant="ghost">Biomarkers</Button>
            </Link>
            <Link href="/coach">
              <Button variant="ghost">AI Coach</Button>
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Meal Plan</h1>
              <p className="text-muted-foreground text-lg">
                Optimized for {preferences.people} {Number.parseInt(preferences.people) === 1 ? "person" : "people"} •{" "}
                {preferences.planLength === "1week" ? "1 Week" : "2 Weeks"} • ${preferences.budget} budget
              </p>
            </div>
            <Button onClick={handleEditPreferences} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Preferences
            </Button>
          </div>

          {biomarkers.length > 0 && (
            <Card className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-medium mb-2">Optimized for: Heart Health + Metabolism</p>
                    <p className="text-sm text-muted-foreground">
                      These meals are designed to improve your key health markers and reduce your biological age
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Weekly Meal Plan</CardTitle>
              <CardDescription>Breakfast, lunch, and dinner for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="border-b pb-6 last:border-0">
                    <h3 className="font-semibold text-lg mb-4">{day}</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Breakfast</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium mb-1">Mediterranean Oatmeal</p>
                          <p className="text-xs text-muted-foreground">380 cal • 10 min</p>
                          <div className="flex gap-1 mt-2">
                            <Badge className="text-xs bg-amber-500/10 text-amber-700 border-amber-500/20">
                              High Fiber
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Lunch</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium mb-1">Grilled Salmon Salad</p>
                          <p className="text-xs text-muted-foreground">450 cal • 20 min</p>
                          <div className="flex gap-1 mt-2">
                            <Badge className="text-xs bg-blue-500/10 text-blue-700 border-blue-500/20">Omega-3</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Dinner</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium mb-1">Quinoa Buddha Bowl</p>
                          <p className="text-xs text-muted-foreground">520 cal • 25 min</p>
                          <div className="flex gap-1 mt-2">
                            <Badge className="text-xs bg-green-500/10 text-green-700 border-green-500/20">
                              Protein
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleGenerateGroceryList}
            disabled={isGenerating}
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                Generating Grocery List...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Grocery List
              </>
            )}
          </Button>
        </div>
      </div>

      {showGroceryList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Your Grocery List</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowGroceryList(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CardDescription>
                Shopping list for {preferences.people} {Number.parseInt(preferences.people) === 1 ? "person" : "people"}{" "}
                • {preferences.planLength === "1week" ? "1 Week" : "2 Weeks"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Apple className="h-5 w-5 text-green-600" />
                  Produce
                </h3>
                <ul className="space-y-2">
                  {[
                    "Spinach (2 bags)",
                    "Mixed greens (1 container)",
                    "Cherry tomatoes (2 pints)",
                    "Avocados (4)",
                    "Bananas (1 bunch)",
                    "Blueberries (2 containers)",
                    "Lemons (3)",
                    "Garlic (1 bulb)",
                    "Onions (2)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                  Proteins
                </h3>
                <ul className="space-y-2">
                  {[
                    "Salmon fillets (1.5 lbs)",
                    "Chicken breast (2 lbs)",
                    "Greek yogurt (32 oz)",
                    "Eggs (1 dozen)",
                    "Tofu (1 block)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-amber-600" />
                  Grains & Pantry
                </h3>
                <ul className="space-y-2">
                  {[
                    "Rolled oats (1 container)",
                    "Quinoa (1 bag)",
                    "Brown rice (1 bag)",
                    "Whole wheat bread (1 loaf)",
                    "Olive oil (1 bottle)",
                    "Almonds (1 bag)",
                    "Chia seeds (1 bag)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Estimated Total:</span>
                  <span className="text-2xl font-bold text-green-600">${preferences.budget}</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setShowGroceryList(false)}>
                    Done
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
