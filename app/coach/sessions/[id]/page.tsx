import Link from "next/link"
import { Activity, Settings, ArrowLeft, Calendar, Clock, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function SessionReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Mock session data - in real app, fetch from storage
  const session = {
    id,
    date: "2025-10-10",
    time: "2:00 PM",
    focus: "Metabolic Health Review",
    duration: 15,
    summary:
      "We discussed your metabolic health markers, focusing on glucose control and insulin sensitivity. Your HbA1c is in the borderline range, suggesting prediabetes risk.",
    keyInsights: [
      "Your fasting glucose is 105 mg/dL (borderline high)",
      "HbA1c at 5.9% indicates prediabetes risk",
      "Triglycerides are elevated at 180 mg/dL",
      "HDL cholesterol is low at 38 mg/dL",
    ],
    recommendations: [
      {
        title: "Dietary Changes",
        items: [
          "Reduce refined carbohydrates and added sugars",
          "Increase fiber intake to 30g+ per day",
          "Add more omega-3 rich foods (fatty fish, walnuts)",
          "Practice portion control and mindful eating",
        ],
      },
      {
        title: "Exercise Plan",
        items: [
          "30 minutes of moderate cardio 5 days per week",
          "Resistance training 2-3 times per week",
          "Take a 10-minute walk after each meal",
          "Aim for 8,000-10,000 steps daily",
        ],
      },
      {
        title: "Supplements",
        items: [
          "Berberine 500mg 2-3x daily with meals",
          "Omega-3 fish oil 2-4g EPA/DHA daily",
          "Magnesium glycinate 300-400mg daily",
          "Consider chromium picolinate 200-400mcg",
        ],
      },
    ],
    nextSteps: [
      "Retest blood work in 3 months",
      "Track fasting glucose weekly",
      "Schedule follow-up coaching session",
      "Implement dietary changes gradually",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Longevity</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/biomarkers">
              <Button variant="ghost">Biomarkers</Button>
            </Link>
            <Link href="/meal-plan">
              <Button variant="ghost">Meal Plan</Button>
            </Link>
            <Link href="/coach">
              <Button variant="ghost">Coach</Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost">History</Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Link href="/coach">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sessions
            </Button>
          </Link>

          {/* Session Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{session.focus}</CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {session.time}
                    </span>
                    <Badge>Completed</Badge>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{session.summary}</p>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {session.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Personalized Recommendations</h2>
            {session.recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {rec.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {session.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1">
              Schedule Follow-up Session
            </Button>
            <Button size="lg" variant="outline" className="flex-1 bg-transparent">
              View Related Biomarkers
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
