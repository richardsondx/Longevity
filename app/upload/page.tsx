"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Activity, Upload, FileText, Plus, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BIOMARKER_DATABASE } from "@/lib/biomarkers/biomarker-database"
import { calculateBiomarkerStatus } from "@/lib/calculations/inner-age"
import type { UserBiomarker, Sex } from "@/lib/types/biomarker"

export default function UploadPage() {
  const router = useRouter()
  const [sex, setSex] = useState<Sex>("male")
  const [age, setAge] = useState<number>(35)
  const [biomarkers, setBiomarkers] = useState<UserBiomarker[]>([])
  const [selectedBiomarker, setSelectedBiomarker] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [testDate, setTestDate] = useState<string>(new Date().toISOString().split("T")[0])

  const handleAddBiomarker = () => {
    if (!selectedBiomarker || !value) return

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return

    const biomarkerDef = BIOMARKER_DATABASE[selectedBiomarker]
    if (!biomarkerDef) return

    const status = calculateBiomarkerStatus(numValue, selectedBiomarker, sex)

    const newBiomarker: UserBiomarker = {
      code: selectedBiomarker,
      value: numValue,
      unit: biomarkerDef.unit,
      status,
      testDate,
    }

    setBiomarkers([...biomarkers, newBiomarker])
    setSelectedBiomarker("")
    setValue("")
  }

  const handleRemoveBiomarker = (index: number) => {
    setBiomarkers(biomarkers.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("userBiomarkers", JSON.stringify(biomarkers))
    localStorage.setItem("userAge", age.toString())
    localStorage.setItem("userSex", sex)
    localStorage.setItem("testDate", testDate)

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      const lines = text.split("\n")
      const newBiomarkers: UserBiomarker[] = []

      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        const [code, valueStr, unit] = line.split(",").map((s) => s.trim())
        const numValue = Number.parseFloat(valueStr)

        if (code && !isNaN(numValue) && BIOMARKER_DATABASE[code]) {
          const status = calculateBiomarkerStatus(numValue, code, sex)
          newBiomarkers.push({
            code,
            value: numValue,
            unit: unit || BIOMARKER_DATABASE[code].unit,
            status,
            testDate,
          })
        }
      }

      setBiomarkers([...biomarkers, ...newBiomarkers])
    }
    reader.readAsText(file)
  }

  const handleLoadSampleData = () => {
    // Generate realistic sample data with variability (mix of excellent, good, borderline, and at-risk values)
    const sampleBiomarkers: UserBiomarker[] = [
      // Heart Health - Mix of good and borderline
      { code: "GLUCOSE", value: 95, unit: "mg/dL", status: "Optimized", testDate },
      { code: "HBA1C", value: 5.4, unit: "%", status: "Optimized", testDate },
      { code: "TOTAL_CHOL", value: 215, unit: "mg/dL", status: "Borderline High", testDate }, // Borderline
      { code: "LDL", value: 135, unit: "mg/dL", status: "Borderline High", testDate }, // Borderline
      { code: "HDL", value: 48, unit: "mg/dL", status: "Borderline Low", testDate }, // Borderline low
      { code: "TRIGLYCERIDES", value: 165, unit: "mg/dL", status: "Borderline High", testDate }, // Borderline
      { code: "APOB", value: 105, unit: "mg/dL", status: "Borderline High", testDate }, // Borderline

      // Inflammation - At risk
      { code: "HSCRP", value: 3.8, unit: "mg/L", status: "High", testDate }, // High inflammation

      // Vitamins - Mix
      { code: "VITAMIN_D", value: 28, unit: "ng/mL", status: "Borderline Low", testDate }, // Low
      { code: "VITAMIN_B12", value: 350, unit: "pg/mL", status: "Borderline Low", testDate }, // Borderline

      // Minerals
      { code: "FERRITIN", value: sex === "male" ? 45 : 18, unit: "μg/L", status: "Borderline Low", testDate }, // Low

      // Thyroid - Good
      { code: "TSH", value: 1.8, unit: "mU/L", status: "Optimized", testDate },

      // Liver - Borderline
      { code: "ALT", value: 42, unit: "U/L", status: "Borderline High", testDate },
      { code: "AST", value: 38, unit: "U/L", status: "Optimized", testDate },

      // Kidney - Good
      { code: "CREATININE", value: sex === "male" ? 1.0 : 0.9, unit: "mg/dL", status: "Optimized", testDate },

      // Hormones - Mix
      { code: "TESTOSTERONE", value: sex === "male" ? 420 : 35, unit: "ng/dL", status: "Borderline Low", testDate },
      { code: "CORTISOL", value: 18, unit: "μg/dL", status: "Optimized", testDate },

      // Metabolic
      { code: "URIC_ACID", value: 6.8, unit: "mg/dL", status: "Borderline High", testDate },
      { code: "HOMOCYSTEINE", value: 11.5, unit: "μmol/L", status: "Borderline High", testDate },
    ]

    setBiomarkers(sampleBiomarkers)
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
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Upload Blood Work</h1>
            <p className="text-muted-foreground text-lg">Enter your lab results to get personalized insights</p>
          </div>

          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>We need this to calculate your biological age accurately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number.parseInt(e.target.value) || 0)}
                    placeholder="35"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Biological Sex</Label>
                  <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
                    <SelectTrigger id="sex">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="testDate">Test Date</Label>
                <Input id="testDate" type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Upload Methods */}
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add Biomarkers</CardTitle>
                  <CardDescription>Select a biomarker and enter your test result</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-end">
                    <Button onClick={handleLoadSampleData} variant="outline" size="sm">
                      Load Sample Data
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="biomarker">Biomarker</Label>
                      <Select value={selectedBiomarker} onValueChange={setSelectedBiomarker}>
                        <SelectTrigger id="biomarker">
                          <SelectValue placeholder="Select biomarker" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(BIOMARKER_DATABASE).map((b) => (
                            <SelectItem key={b.code} value={b.code}>
                              {b.name} ({b.unit})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <div className="flex gap-2">
                        <Input
                          id="value"
                          type="number"
                          step="0.01"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="0.00"
                        />
                        <Button onClick={handleAddBiomarker} size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {selectedBiomarker && BIOMARKER_DATABASE[selectedBiomarker] && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium">{BIOMARKER_DATABASE[selectedBiomarker].name}</p>
                      <p className="text-sm text-muted-foreground">
                        {BIOMARKER_DATABASE[selectedBiomarker].description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Optimal range: {BIOMARKER_DATABASE[selectedBiomarker].ranges[sex].optimizedLow} -{" "}
                        {BIOMARKER_DATABASE[selectedBiomarker].ranges[sex].optimizedHigh}{" "}
                        {BIOMARKER_DATABASE[selectedBiomarker].unit}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="csv" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload CSV File</CardTitle>
                  <CardDescription>
                    Upload a CSV file with columns: code, value, unit (e.g., GLUCOSE,95,mg/dL)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <Label htmlFor="csv-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Click to upload CSV</p>
                        <p className="text-xs text-muted-foreground">or drag and drop</p>
                      </div>
                    </Label>
                    <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Biomarkers List */}
          {biomarkers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Biomarkers ({biomarkers.length})</CardTitle>
                <CardDescription>Review your entered values before saving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {biomarkers.map((b, index) => {
                    const def = BIOMARKER_DATABASE[b.code]
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{def?.name || b.code}</p>
                          <p className="text-sm text-muted-foreground">
                            {b.value} {b.unit} - <span className="font-medium">{b.status}</span>
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveBiomarker(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave} disabled={biomarkers.length === 0} size="lg">
              Save & Analyze
              <Upload className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
