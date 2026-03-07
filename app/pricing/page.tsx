import Link from "next/link"
import { Activity, Check, ArrowRight, Sparkles, Brain, TrendingUp, Apple, MessageSquare, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
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
            <Link href="/#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="ghost">How It Works</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-0">
          Yearly Plans • Privacy-First
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Own Your Health Data.{" "}
          <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Understand It Better.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Your lab data stays 100% yours. We just help you make sense of it with AI-powered insights and personalized
          coaching.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan (Free) */}
          <Card className="relative border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Great for exploring your first blood results</CardDescription>
              <div className="pt-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground text-lg">/year</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-transparent" variant="outline" size="lg" asChild>
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">1 blood test upload</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">48 biomarkers parsed (basic insights)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">6 core health categories</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    InnerAge <strong>teaser</strong> (locked value)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">1 Lifespan Coach chat / quarter</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">3-day sample meal plan</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Data stays 100% yours (local/Drive)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Longevity+ Plan (Premium) */}
          <Card className="relative border-2 border-teal-600 shadow-2xl scale-105 bg-gradient-to-br from-background to-teal-50/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-0 px-6 py-1.5 text-sm">
                <Sparkles className="h-4 w-4 mr-1" />
                Recommended
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Longevity+</CardTitle>
              <CardDescription>For people ready to take charge of their longevity</CardDescription>
              <div className="pt-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  $199
                </span>
                <span className="text-muted-foreground text-lg">/year</span>
                <div className="text-sm text-muted-foreground mt-1">≈ $16.58/month billed annually</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white"
                size="lg"
                asChild
              >
                <Link href="/dashboard">
                  Upgrade to Longevity+
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="space-y-3 pt-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold">Everything in Starter, plus:</span>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Full InnerAge calculation</strong> & goal setting
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Focus Tracks (Heart, Liver, Kidney, Thyroid, Metabolic)</span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>12 Lifespan Coach chats per year</strong> (reschedulable)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Apple className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Weekly meal plan + grocery list (AI-generated)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Personalized supplement recommendations</span>
                </div>
                {/* End of Supplement Recommendations feature */}
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Faster lab parsing (priority queue)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Progress tracking & InnerAge trend graph</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">100% private data mode (stored on your Drive/local)</span>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">Add extra coach chat: +$10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Message */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-50 dark:bg-teal-950/30 rounded-full border border-teal-200 dark:border-teal-800">
            <Shield className="h-5 w-5 text-teal-600" />
            <p className="text-sm font-medium text-teal-900 dark:text-teal-100">
              Longevity never stores your lab data. You own it — and we help you make sense of it.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Why yearly billing only?</h3>
              <p className="text-muted-foreground">
                Health transformation takes time. Yearly billing aligns with your long-term goals and gives you the best
                value. Plus, it's simpler — no monthly surprises.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your
                yearly period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Do you really not store my data?</h3>
              <p className="text-muted-foreground">
                Correct. Your lab results stay on your device or in your Google Drive. We process them to generate
                insights, but we never keep copies. You're in full control.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What biomarkers do you support?</h3>
              <p className="text-muted-foreground">
                We support 48+ common biomarkers from any lab provider, including cholesterol, glucose, hormones,
                vitamins, inflammation markers, and more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Is this medical advice?</h3>
              <p className="text-muted-foreground">
                No, Longevity provides educational information and insights based on scientific research. Always consult
                with your healthcare provider before making health decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">What's the difference between Starter and Longevity+?</h3>
              <p className="text-muted-foreground">
                Starter gives you a taste of what's possible with basic insights and a teaser of your InnerAge.
                Longevity+ unlocks the full experience: your actual InnerAge, weekly meal plans, 12 coach chats per
                year, personalized supplement recommendations, and progress tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-600 to-emerald-600 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Understand Your Health Better?</h2>
          <p className="text-xl mb-8 text-white/90 text-pretty max-w-2xl mx-auto">
            Join people who are taking ownership of their health data. Start exploring your biomarkers today — for free.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Longevity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal health optimization platform powered by science.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Longevity. All rights reserved. Not medical advice. Consult your healthcare provider.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
