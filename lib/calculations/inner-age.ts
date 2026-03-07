import { BIOMARKER_DATABASE, getInnerAgeBiomarkers } from "@/lib/biomarkers/biomarker-database"
import type { UserBiomarker, InnerAgeResult, Sex } from "@/lib/types/biomarker"

export function calculateInnerAge(biomarkers: UserBiomarker[], age: number, sex: Sex): InnerAgeResult {
  const innerAgeBiomarkers = getInnerAgeBiomarkers(sex)
  const biomarkerMap = new Map(biomarkers.map((b) => [b.code, b]))

  let totalWeight = 0
  let weightedSum = 0
  const drivers: InnerAgeResult["topDrivers"] = []

  for (const biomarkerDef of innerAgeBiomarkers) {
    const userBiomarker = biomarkerMap.get(biomarkerDef.code)
    if (!userBiomarker) continue

    const weight = biomarkerDef.innerAgeWeight?.[sex] || 0
    if (weight === 0) continue

    const ranges = biomarkerDef.ranges[sex]
    const optimalMid = (ranges.optimizedLow + ranges.optimizedHigh) / 2
    const value = userBiomarker.value

    // Calculate deviation from optimal (normalized)
    let deviation = 0
    if (value < ranges.optimizedLow) {
      deviation = (ranges.optimizedLow - value) / (ranges.optimizedLow - ranges.low)
    } else if (value > ranges.optimizedHigh) {
      deviation = (value - ranges.optimizedHigh) / (ranges.high - ranges.optimizedHigh)
    }

    // Cap deviation at 1.0
    deviation = Math.min(Math.max(deviation, -1), 1)

    const contribution = deviation * weight * 10 // Scale to years
    weightedSum += contribution
    totalWeight += weight

    if (Math.abs(contribution) > 0.01) {
      drivers.push({
        biomarker: biomarkerDef.code,
        biomarkerName: biomarkerDef.name,
        impact: contribution, // Keep the actual contribution (can be negative for youthful)
        direction: contribution > 0 ? "aging" : "youthful",
        currentValue: value,
        optimalValue: optimalMid,
      })
    }
  }

  drivers.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))

  const biologicalAge = age + weightedSum
  const confidence = Math.min((biomarkerMap.size / innerAgeBiomarkers.length) * 100, 100)

  return {
    chronological: age,
    biological: Math.round(biologicalAge * 10) / 10,
    delta: Math.round((biologicalAge - age) * 10) / 10,
    topDrivers: drivers.slice(0, 5),
    confidence: Math.round(confidence),
    biomarkersUsed: biomarkerMap.size,
    biomarkersTotal: innerAgeBiomarkers.length,
  }
}

export function calculateBiomarkerStatus(
  value: number,
  biomarkerCode: string,
  sex: Sex,
): "Low" | "Borderline Low" | "Optimized" | "Borderline High" | "High" | "Very High" {
  const biomarker = BIOMARKER_DATABASE[biomarkerCode]
  if (!biomarker) return "Optimized"

  const ranges = biomarker.ranges[sex]

  if (value < ranges.low) return "Low"
  if (value < ranges.borderlineLow) return "Borderline Low"
  if (value >= ranges.optimizedLow && value <= ranges.optimizedHigh) return "Optimized"
  if (value <= ranges.borderlineHigh) return "Borderline High"
  if (value <= ranges.high) return "High"
  return "Very High"
}
