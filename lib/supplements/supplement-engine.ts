import type { UserBiomarker, Sex } from "@/lib/types/biomarker"
import { BIOMARKER_DATABASE } from "@/lib/biomarkers/biomarker-database"

export interface SupplementRecommendation {
  name: string
  dosage: string
  frequency: string
  mechanism: string
  evidence: string
  citations: string[]
  priority: "high" | "medium" | "low"
  category: "supplement" | "food" | "lifestyle"
  targetBiomarkers: string[]
}

export function generateSupplementRecommendations(biomarkers: UserBiomarker[], sex: Sex): SupplementRecommendation[] {
  const recommendations: SupplementRecommendation[] = []

  biomarkers.forEach((biomarker) => {
    const def = BIOMARKER_DATABASE[biomarker.code]
    if (!def) return

    const ranges = def.ranges[sex]
    const value = biomarker.value

    // Determine if biomarker is out of optimal range
    const isLow = value < ranges.optimizedLow
    const isHigh = value > ranges.optimizedHigh
    const isBorderlineLow = value >= ranges.borderlineLow && value < ranges.optimizedLow
    const isBorderlineHigh = value > ranges.optimizedHigh && value <= ranges.borderlineHigh

    if (!isLow && !isHigh && !isBorderlineLow && !isBorderlineHigh) return

    // Generate recommendations based on biomarker type
    switch (biomarker.code) {
      case "HEMOGLOBIN":
      case "HEMATOCRIT":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Iron (Ferrous Sulfate)",
            dosage: "65 mg elemental iron",
            frequency: "Once or twice daily",
            mechanism: "Restores hemoglobin to normal within 2 months in iron-deficiency anemia",
            evidence: "Strong - Multiple RCTs show efficacy",
            citations: ["MedlinePlus Medical Encyclopedia"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
          recommendations.push({
            name: "Vitamin C",
            dosage: "200 mg",
            frequency: "With iron supplement",
            mechanism: "Significantly boosts iron absorption",
            evidence: "Strong - Well-established enhancement of iron uptake",
            citations: ["Clinical nutrition studies"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "VITAMIN_B12":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Vitamin B12 (Methylcobalamin)",
            dosage: "1000 μg",
            frequency: "Daily",
            mechanism: "Resolves B12-deficiency anemia and supports neurological function",
            evidence: "Strong - Oral B12 may resolve B12 deficiency",
            citations: ["MedlinePlus - Vitamin B12 deficiency anemia"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "LDL":
      case "APOB":
      case "TOTAL_CHOLESTEROL":
        if (isHigh || isBorderlineHigh) {
          recommendations.push({
            name: "Plant Sterols/Stanols",
            dosage: "2 g",
            frequency: "Daily",
            mechanism: "Reduces LDL cholesterol by ~10% on average",
            evidence: "Strong - Meta-analysis of RCTs",
            citations: ["Plant sterols/stanols as cholesterol lowering agents - PMC"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
          recommendations.push({
            name: "Niacin (Vitamin B3)",
            dosage: "1-2 g",
            frequency: "Daily (extended-release)",
            mechanism: "Lowers LDL by ~20% and raises HDL by 16-25%",
            evidence: "Strong - Multiple clinical trials",
            citations: ["Effect of niacin monotherapy on HDL - PMC"],
            priority: "medium",
            category: "supplement",
            targetBiomarkers: [biomarker.code, "HDL"],
          })
        }
        break

      case "HDL":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Niacin (Vitamin B3)",
            dosage: "1000 mg",
            frequency: "Daily",
            mechanism: "Raises HDL by ~25% in trials",
            evidence: "Strong - Well-documented HDL elevation",
            citations: ["Effect of niacin monotherapy on HDL - PMC"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "TRIGLYCERIDES":
        if (isHigh || isBorderlineHigh) {
          recommendations.push({
            name: "Omega-3 Fish Oil (EPA/DHA)",
            dosage: "2-4 g combined EPA/DHA",
            frequency: "Daily",
            mechanism: "Linearly lowers triglycerides and non-HDL cholesterol",
            evidence: "Strong - Meta-analysis shows significant TG reduction",
            citations: ["Association Between Omega-3 Fatty Acid Intake and Dyslipidemia - PubMed"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "GLUCOSE":
      case "HBA1C":
        if (isHigh || isBorderlineHigh) {
          recommendations.push({
            name: "Berberine",
            dosage: "500 mg",
            frequency: "2-3 times daily with meals",
            mechanism: "Lowers fasting glucose and HbA1c, comparable to metformin",
            evidence: "Strong - Meta-analyses show significant glucose reduction",
            citations: ["Glucose-lowering effect of berberine on type 2 diabetes - PubMed"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
          recommendations.push({
            name: "Magnesium",
            dosage: "300-400 mg",
            frequency: "Daily",
            mechanism: "Improves insulin sensitivity and modestly lowers glucose",
            evidence: "Moderate - Several studies show benefit",
            citations: ["Magnesium supplementation and insulin sensitivity"],
            priority: "medium",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "HSCRP":
        if (isHigh || isBorderlineHigh) {
          recommendations.push({
            name: "Curcumin (Turmeric Extract)",
            dosage: "500-1000 mg",
            frequency: "Daily",
            mechanism: "Significantly lowers hs-CRP by ~3.7 mg/L on average",
            evidence: "Strong - Meta-analysis of RCTs",
            citations: ["Effect of curcumin on C-reactive protein - PubMed"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
          recommendations.push({
            name: "Omega-3 Fish Oil",
            dosage: "2-3 g EPA/DHA",
            frequency: "Daily",
            mechanism: "Reduces CRP and other inflammatory cytokines",
            evidence: "Strong - Umbrella review shows significant CRP reduction",
            citations: ["Efficacy of omega-3 fatty acids on inflammatory biomarkers - PubMed"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "VITAMIN_D":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Vitamin D3 (Cholecalciferol)",
            dosage: "2000-5000 IU",
            frequency: "Daily",
            mechanism: "Normalizes vitamin D levels, supports immunity and bone health",
            evidence: "Strong - Overwhelming evidence for supplementation",
            citations: ["NIH Office of Dietary Supplements - Vitamin D"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "FERRITIN":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Iron with Vitamin C",
            dosage: "65 mg elemental iron + 200 mg vitamin C",
            frequency: "Daily",
            mechanism: "Replenishes iron stores, vitamin C enhances absorption",
            evidence: "Strong - Standard treatment for iron deficiency",
            citations: ["Taking iron supplements - MedlinePlus"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "TESTOSTERONE_TOTAL":
        if (sex === "male" && (isLow || isBorderlineLow)) {
          recommendations.push({
            name: "Zinc",
            dosage: "15-30 mg",
            frequency: "Daily",
            mechanism: "Zinc deficiency lowers testosterone; supplementation improves levels",
            evidence: "Strong - Systematic review confirms benefit",
            citations: ["Correlation between serum zinc and testosterone - PubMed"],
            priority: "high",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
          recommendations.push({
            name: "Fenugreek Extract",
            dosage: "500 mg",
            frequency: "Daily",
            mechanism: "Modestly increases total testosterone (SMD ~0.32)",
            evidence: "Moderate - Meta-analysis shows small but significant increase",
            citations: ["The Anabolic Effect of Fenugreek - PubMed"],
            priority: "medium",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break

      case "WBC":
        if (isLow || isBorderlineLow) {
          recommendations.push({
            name: "Multivitamin with Zinc",
            dosage: "15-30 mg zinc, vitamins A, C, D, E, B6",
            frequency: "Daily",
            mechanism: "Supports white blood cell production and immune function",
            evidence: "Moderate - Essential nutrients for immune health",
            citations: ["The 7 Best Vitamins for Your Immune System - Cleveland Clinic"],
            priority: "medium",
            category: "supplement",
            targetBiomarkers: [biomarker.code],
          })
        }
        break
    }
  })

  // Remove duplicates and prioritize
  const uniqueRecommendations = recommendations.filter(
    (rec, index, self) => index === self.findIndex((r) => r.name === rec.name),
  )

  return uniqueRecommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}
