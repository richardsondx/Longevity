export type BiomarkerStatus = "Low" | "Borderline Low" | "Optimized" | "Borderline High" | "High" | "Very High"

export type Sex = "male" | "female"

export type HealthCategory =
  | "Heart Health"
  | "Metabolism"
  | "Hormone Balance"
  | "Inflammation"
  | "Nutrients"
  | "Endurance"
  | "Recovery"
  | "Cognition"
  | "Gut Health"
  | "Sleep"
  | "Fitness"

export interface BiomarkerRange {
  low: number
  borderlineLow: number
  optimizedLow: number
  optimizedHigh: number
  borderlineHigh: number
  high: number
}

export interface BiomarkerDefinition {
  code: string
  name: string
  shortName?: string
  description: string
  unit: string
  alternativeUnits?: string[]
  categories: HealthCategory[]
  ranges: {
    male: BiomarkerRange
    female: BiomarkerRange
  }
  significance: string
  recommendations: {
    high: string[]
    low: string[]
    borderline?: string[]
  }
  innerAgeWeight?: {
    male?: number
    female?: number
  }
}

export interface UserBiomarker {
  code: string
  value: number
  unit: string
  status: BiomarkerStatus
  testDate: string
  labProvider?: string
}

export interface InnerAgeResult {
  chronological: number
  biological: number
  delta: number
  topDrivers: Array<{
    biomarker: string
    biomarkerName: string
    impact: number
    direction: "aging" | "youthful"
    currentValue: number
    optimalValue: number
  }>
  confidence: number
  biomarkersUsed: number
  biomarkersTotal: number
}

export interface CategoryScore {
  category: HealthCategory
  score: number
  status: "Excellent" | "Good" | "Fair" | "Needs Work"
  biomarkers: Array<{
    code: string
    name: string
    status: BiomarkerStatus
  }>
  recommendations: string[]
}
