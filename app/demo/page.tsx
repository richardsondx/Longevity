"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { calculateBiomarkerStatus } from "@/lib/calculations/inner-age"
import type { UserBiomarker } from "@/lib/types/biomarker"

export default function DemoPage() {
  const router = useRouter()

  useEffect(() => {
    // Create demo data
    const demoData: UserBiomarker[] = [
      { code: "GLUCOSE", value: 92, unit: "mg/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "HBA1C", value: 5.3, unit: "%", status: "Optimized", testDate: "2025-01-15" },
      { code: "LDL", value: 115, unit: "mg/dL", status: "Borderline High", testDate: "2025-01-15" },
      { code: "HDL", value: 58, unit: "mg/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "TRIGLYCERIDES", value: 95, unit: "mg/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "TOTAL_CHOLESTEROL", value: 195, unit: "mg/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "APOB", value: 105, unit: "mg/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "HSCRP", value: 2.1, unit: "mg/L", status: "Borderline High", testDate: "2025-01-15" },
      { code: "VITAMIN_D", value: 35, unit: "ng/mL", status: "Borderline Low", testDate: "2025-01-15" },
      { code: "TESTOSTERONE_TOTAL", value: 550, unit: "ng/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "TSH", value: 1.8, unit: "mU/L", status: "Optimized", testDate: "2025-01-15" },
      { code: "ALT", value: 28, unit: "U/L", status: "Optimized", testDate: "2025-01-15" },
      { code: "HEMOGLOBIN", value: 15.2, unit: "g/dL", status: "Optimized", testDate: "2025-01-15" },
      { code: "FERRITIN", value: 85, unit: "μg/L", status: "Optimized", testDate: "2025-01-15" },
      { code: "VITAMIN_B12", value: 520, unit: "pg/mL", status: "Optimized", testDate: "2025-01-15" },
    ]

    // Recalculate statuses
    const sex = "male"
    const updatedData = demoData.map((b) => ({
      ...b,
      status: calculateBiomarkerStatus(b.value, b.code, sex),
    }))

    // Save to localStorage
    localStorage.setItem("userBiomarkers", JSON.stringify(updatedData))
    localStorage.setItem("userAge", "35")
    localStorage.setItem("userSex", sex)
    localStorage.setItem("testDate", "2025-01-15")

    // Redirect to dashboard
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">Loading demo data...</p>
      </div>
    </div>
  )
}
