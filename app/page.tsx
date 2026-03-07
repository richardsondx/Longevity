import Link from "next/link"
import { ArrowRight, Activity, Brain, Heart, Sparkles, Zap, Scale, Flame, Apple, Dumbbell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BloodCellAnimation } from "@/components/blood-cell-animation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 relative">
      <BloodCellAnimation />

      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Longevity</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <Link href="/dashboard">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            Transform Your Blood Data Into{" "}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Actionable Insights
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover your biological age, optimize your health markers, and get personalized coaching to live longer and
            better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 animate-gradient bg-[length:200%_auto]"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-card/50 rounded-3xl my-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
            Everything You Need to Optimize Your Health
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Biological Age</h3>
              <p className="text-muted-foreground leading-relaxed">
                Calculate your Inner Age using 48 blood biomarkers. See exactly which markers are aging you and by how
                much.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">Health Categories</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track 6 key health pillars: Heart Health, Metabolism, Hormones, Inflammation, Nutrients, and Endurance.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">AI Coaching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get personalized recommendations, meal plans, and habit tracking to improve your biomarkers week by
                week.
              </p>
            </div>
          </div>
          <div className="mt-12 p-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">Your Data, Your Control</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike other health platforms, we never store your personal health information on our servers. All
                  your data stays on your device or in your personal cloud storage. You have complete ownership and
                  control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Health Categories Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Track Your Health Across 6 Key Categories
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Get comprehensive insights into every aspect of your health with detailed biomarker analysis
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Heart Health</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monitor cholesterol, triglycerides, and cardiovascular markers to keep your heart strong and healthy.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Metabolism</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track glucose, insulin, and metabolic markers to optimize energy levels and weight management.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
                <Scale className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hormone Balance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Analyze thyroid, testosterone, estrogen, and other hormones critical for vitality and wellbeing.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4">
                <Flame className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inflammation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Measure inflammatory markers like CRP and homocysteine to reduce chronic inflammation and disease risk.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                <Apple className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nutrients</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Check vitamin D, B12, iron, and other essential nutrients to ensure optimal cellular function.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <Dumbbell className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Endurance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Assess hemoglobin, red blood cells, and oxygen capacity for peak physical performance and stamina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
            Simple, Science-Backed Process
          </h2>
          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Upload Your Blood Work",
                description:
                  "Enter your lab results manually or upload a PDF. We support 48 biomarkers from any lab provider.",
              },
              {
                step: "02",
                title: "See Your Inner Age",
                description:
                  "Our algorithm calculates your biological age and shows which biomarkers are aging you the most.",
              },
              {
                step: "03",
                title: "Get Personalized Guidance",
                description:
                  "Receive evidence-based recommendations for diet, exercise, and lifestyle changes tailored to your results.",
              },
              {
                step: "04",
                title: "Track Your Progress",
                description:
                  "Retest every 3-6 months and watch your biological age decrease as you optimize your health.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-hover rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Discover Your Biological Age?</h2>
          <p className="text-xl mb-8 text-white/90 text-pretty max-w-2xl mx-auto">
            Join thousands of people optimizing their health with data-driven insights.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 mt-20 relative z-10">
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
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    How It Works
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
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms
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
