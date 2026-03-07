"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, Settings, Download, FileJson, RefreshCw, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { MobileNav } from "@/components/mobile-nav"

interface HistoryEntry {
  id: string
  date: string
  source: string
  biomarkersCount: number
  innerAge: number | null
  trend: "down" | "up" | "same" | null
  chronologicalAge: number
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    // Load current data from localStorage
    const biomarkers = localStorage.getItem("userBiomarkers")
    const age = localStorage.getItem("userAge")
    const testDate = localStorage.getItem("testDate")

    if (biomarkers && age) {
      const parsedBiomarkers = JSON.parse(biomarkers)
      const entry: HistoryEntry = {
        id: "current",
        date: testDate || new Date().toISOString().split("T")[0],
        source: "Manual Entry",
        biomarkersCount: parsedBiomarkers.length,
        innerAge: 35.1, // This would be calculated
        trend: null,
        chronologicalAge: Number.parseInt(age),
      }
      setHistory([entry])
    }
  }, [])

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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Uploads & History</h1>
              <p className="text-muted-foreground text-lg">
                Track your lab results over time. Your data stays on your device.
              </p>
            </div>
            <Link href="/upload">
              <Button size="lg">+ Add Lab</Button>
            </Link>
          </div>

          {/* History Table */}
          {history.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Lab History</CardTitle>
                <CardDescription>All past uploads and test results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Coverage</TableHead>
                      <TableHead>InnerAge</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.date}</TableCell>
                        <TableCell>{entry.source}</TableCell>
                        <TableCell>{entry.biomarkersCount} biomarkers</TableCell>
                        <TableCell>
                          {entry.innerAge ? (
                            <span className="font-semibold">{entry.innerAge} years</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {entry.trend === "down" && (
                            <Badge variant="default" className="bg-green-500">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Younger
                            </Badge>
                          )}
                          {entry.trend === "up" && (
                            <Badge variant="destructive">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Older
                            </Badge>
                          )}
                          {entry.trend === "same" && (
                            <Badge variant="secondary">
                              <Minus className="h-3 w-3 mr-1" />
                              No change
                            </Badge>
                          )}
                          {!entry.trend && <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Link href="/dashboard">
                            <Button variant="ghost" size="sm">
                              View Report
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileJson className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No labs yet</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first lab results to start tracking your health journey
                </p>
                <Link href="/upload">
                  <Button size="lg">Upload Lab Results</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Privacy Note */}
          <Card className="bg-muted/50">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground text-center">
                🔒 We fetch your history from your device. Nothing is stored on our servers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
