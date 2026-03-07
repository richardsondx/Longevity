"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Activity, Settings, ArrowLeft, Star, Calendar, Target, BookOpen, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"
import { generateActionCards } from "@/lib/actions/action-generator"
import type { UserBiomarker, Sex } from "@/lib/types/biomarker"
import type { ActionCard } from "@/lib/actions/action-generator"

export default function ActionDetailPage() {
  const params = useParams()
  const actionId = params.id as string
  const [action, setAction] = useState<ActionCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedBiomarkers = localStorage.getItem("userBiomarkers")
    const storedSex = localStorage.getItem("userSex")

    if (storedBiomarkers) {
      const biomarkers: UserBiomarker[] = JSON.parse(storedBiomarkers)
      const sex = (storedSex as Sex) || "male"
      const actions = generateActionCards(biomarkers, sex)
      const foundAction = actions.find((a) => a.id === actionId)
      setAction(foundAction || null)
    }

    setIsLoading(false)
  }, [actionId])

  const getActionDetails = (actionId: string) => {
    const details: Record<string, { howTo: string[]; science: string; evidence: string }> = {
      "psyllium-supplement": {
        howTo: [
          "Take 5-10g of psyllium husk powder daily",
          "Mix with at least 8oz of water or juice",
          "Take 30 minutes before meals for best results",
          "Start with a lower dose and gradually increase",
          "Drink plenty of water throughout the day",
        ],
        science:
          "Psyllium is a soluble fiber that binds to cholesterol in the digestive tract, preventing its absorption. Clinical studies show it can reduce LDL cholesterol by 5-10% when taken regularly. It also helps regulate blood sugar by slowing glucose absorption.",
        evidence:
          "Meta-analysis of 21 randomized controlled trials published in the American Journal of Clinical Nutrition demonstrated significant LDL reduction with psyllium supplementation.",
      },
      "eat-beans": {
        howTo: [
          "Aim for 1/2 to 1 cup of cooked beans per serving",
          "Include variety: black beans, kidney beans, chickpeas, lentils",
          "Add to salads, soups, or as a side dish",
          "Rinse canned beans to reduce sodium",
          "Soak dried beans overnight for better digestion",
        ],
        science:
          "Beans are rich in soluble fiber, plant protein, and resistant starch. They help lower LDL cholesterol, improve blood sugar control, and provide sustained energy. The high fiber content also supports gut health and satiety.",
        evidence:
          "A systematic review in the Canadian Medical Association Journal found that consuming beans regularly reduced LDL cholesterol and improved glycemic control in people with and without diabetes.",
      },
      "omega3-supplement": {
        howTo: [
          "Take 2-4g of combined EPA/DHA daily",
          "Choose high-quality fish oil or algae-based supplements",
          "Take with meals to improve absorption",
          "Store in refrigerator to prevent oxidation",
          "Look for third-party tested products",
        ],
        science:
          "Omega-3 fatty acids (EPA and DHA) reduce triglyceride production in the liver and increase their clearance from the blood. They also have anti-inflammatory effects that benefit cardiovascular health.",
        evidence:
          "Multiple meta-analyses show omega-3 supplementation reduces triglycerides by 15-30% and lowers inflammatory markers like hs-CRP. The American Heart Association recommends omega-3s for elevated triglycerides.",
      },
      "dark-chocolate": {
        howTo: [
          "Choose chocolate with at least 70% cocoa content",
          "Limit to 1-2 ounces (28-56g) per day",
          "Enjoy as a snack or after meals",
          "Look for minimal added sugar",
          "Pair with nuts for added benefits",
        ],
        science:
          "Dark chocolate is rich in flavonoids, particularly epicatechin, which have potent anti-inflammatory and antioxidant properties. These compounds help reduce oxidative stress and inflammation markers like hs-CRP.",
        evidence:
          "Research published in the Journal of Nutrition found that regular dark chocolate consumption reduced hs-CRP levels and improved endothelial function in healthy adults.",
      },
      "cardio-exercise": {
        howTo: [
          "Aim for 150 minutes of moderate cardio per week",
          "Include activities like brisk walking, jogging, cycling, or swimming",
          "Start with 20-30 minute sessions",
          "Gradually increase intensity and duration",
          "Mix steady-state and interval training",
        ],
        science:
          "Cardiovascular exercise improves insulin sensitivity by increasing glucose uptake in muscles and reducing insulin resistance. It also helps lower triglycerides, raise HDL cholesterol, and reduce inflammation.",
        evidence:
          "The Diabetes Prevention Program showed that 150 minutes of moderate exercise per week reduced the risk of developing type 2 diabetes by 58% through improved glucose metabolism.",
      },
      "vitamin-d-supplement": {
        howTo: [
          "Take 2000-5000 IU of vitamin D3 daily",
          "Take with a meal containing fat for better absorption",
          "Get your levels tested to determine optimal dose",
          "Consider higher doses in winter months",
          "Pair with vitamin K2 for bone health",
        ],
        science:
          "Vitamin D is essential for calcium absorption, bone health, and immune function. It also plays a role in reducing inflammation and supporting cardiovascular health. Most people are deficient, especially in winter.",
        evidence:
          "The Endocrine Society recommends vitamin D supplementation for individuals with levels below 30 ng/mL. Studies show supplementation improves bone density and reduces fracture risk.",
      },
      "iron-rich-foods": {
        howTo: [
          "Include heme iron sources: red meat, poultry, fish",
          "Add non-heme iron sources: spinach, lentils, fortified cereals",
          "Pair with vitamin C-rich foods to enhance absorption",
          "Avoid tea and coffee with iron-rich meals",
          "Cook in cast iron cookware to increase iron content",
        ],
        science:
          "Iron is essential for hemoglobin production and oxygen transport. Heme iron from animal sources is more readily absorbed than non-heme iron from plants. Vitamin C significantly enhances non-heme iron absorption.",
        evidence:
          "Clinical guidelines recommend dietary iron as first-line treatment for mild iron deficiency. Studies show that combining iron-rich foods with vitamin C can double absorption rates.",
      },
      "green-tea": {
        howTo: [
          "Drink 2-3 cups of green tea daily",
          "Steep for 2-3 minutes in water below boiling (160-180°F)",
          "Avoid adding sugar or sweeteners",
          "Consider matcha for higher antioxidant content",
          "Drink between meals for best absorption",
        ],
        science:
          "Green tea is rich in catechins, particularly EGCG, which have powerful antioxidant and anti-inflammatory properties. These compounds help reduce oxidative stress, lower inflammation markers, and support metabolic health.",
        evidence:
          "Meta-analyses show that regular green tea consumption reduces hs-CRP levels and improves markers of oxidative stress. The polyphenols in green tea also support cardiovascular and metabolic health.",
      },
    }

    return (
      details[actionId] || {
        howTo: ["Follow recommended guidelines", "Consult with a healthcare provider"],
        science: "This action has been shown to improve health markers.",
        evidence: "Multiple studies support this recommendation.",
      }
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading action details...</p>
        </div>
      </div>
    )
  }

  if (!action) {
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
          <p className="text-xl text-muted-foreground">Action not found.</p>
          <Link href="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const details = getActionDetails(action.id)

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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-br from-muted to-muted/50">
              <img src={`/images/actions/${action.id}.jpg`} alt={action.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{action.title}</CardTitle>
                  <CardDescription className="text-base">{action.description}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                  <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                  {action.rating}/5
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{action.frequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span className="capitalize">{action.category}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Target Biomarkers
              </CardTitle>
              <CardDescription>This action is recommended to improve the following markers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {action.targetBiomarkers.map((biomarker) => (
                  <Badge key={biomarker} variant="secondary" className="text-sm px-3 py-1">
                    {biomarker}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="how-to" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="how-to">
                <Lightbulb className="h-4 w-4 mr-2" />
                How To
              </TabsTrigger>
              <TabsTrigger value="science">
                <BookOpen className="h-4 w-4 mr-2" />
                Science
              </TabsTrigger>
            </TabsList>
            <TabsContent value="how-to" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Guide</CardTitle>
                  <CardDescription>Follow these steps to get the most benefit</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {details.howTo.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="science" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>The Science</CardTitle>
                  <CardDescription>Understanding how this works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Mechanism of Action</h4>
                    <p className="text-sm text-muted-foreground">{details.science}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Clinical Evidence</h4>
                    <p className="text-sm text-muted-foreground">{details.evidence}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
