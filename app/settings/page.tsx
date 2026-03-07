"use client"

import Link from "next/link"
import { Activity, SettingsIcon, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"

export default function SettingsPage() {
  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
      localStorage.clear()
      window.location.href = "/dashboard"
    }
  }

  const handleExportData = () => {
    const data = {
      biomarkers: localStorage.getItem("userBiomarkers"),
      age: localStorage.getItem("userAge"),
      sex: localStorage.getItem("userSex"),
      testDate: localStorage.getItem("testDate"),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `longevity-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
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
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground text-lg">Manage your account and data</p>
          </div>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Export or delete your health data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-semibold">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Download all your biomarker data as JSON</p>
                </div>
                <Button onClick={handleExportData} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
                <div>
                  <h3 className="font-semibold text-destructive">Clear All Data</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete all your health data</p>
                </div>
                <Button onClick={handleClearData} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data Ownership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Your health data is stored locally in your browser and is never sent to our servers. You own your data
                completely.
              </p>
              <p>
                All calculations (Inner Age, category scores, recommendations) are performed in your browser using
                open-source algorithms.
              </p>
              <p>
                This platform is for informational purposes only and does not provide medical advice. Always consult
                with your healthcare provider before making health decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
