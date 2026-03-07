import { getBiomarkersByCategory } from "@/lib/biomarkers/biomarker-database"
import type { UserBiomarker, CategoryScore, Sex, HealthCategory } from "@/lib/types/biomarker"

const CATEGORIES: HealthCategory[] = [
  "Heart Health",
  "Metabolism",
  "Hormone Balance",
  "Inflammation",
  "Nutrients",
  "Endurance",
  "Cognition",
  "Sleep",
  "Recovery",
  "Gut Health",
]

export function calculateCategoryScores(biomarkers: UserBiomarker[], sex: Sex): CategoryScore[] {
  const biomarkerMap = new Map(biomarkers.map((b) => [b.code, b]))
  const scores: CategoryScore[] = []

  for (const category of CATEGORIES) {
    const categoryBiomarkers = getBiomarkersByCategory(category)
    let totalScore = 0
    let count = 0
    const biomarkerStatuses: CategoryScore["biomarkers"] = []

    for (const biomarkerDef of categoryBiomarkers) {
      const userBiomarker = biomarkerMap.get(biomarkerDef.code)
      if (!userBiomarker) continue

      const ranges = biomarkerDef.ranges[sex]
      const value = userBiomarker.value

      // Calculate score (0-100)
      let score = 50
      if (value >= ranges.optimizedLow && value <= ranges.optimizedHigh) {
        score = 100
      } else if (value < ranges.optimizedLow) {
        if (value >= ranges.borderlineLow) {
          score = 70
        } else if (value >= ranges.low) {
          score = 40
        } else {
          score = 20
        }
      } else {
        if (value <= ranges.borderlineHigh) {
          score = 70
        } else if (value <= ranges.high) {
          score = 40
        } else {
          score = 20
        }
      }

      totalScore += score
      count++

      biomarkerStatuses.push({
        code: biomarkerDef.code,
        name: biomarkerDef.name,
        status: userBiomarker.status,
      })
    }

    if (count === 0) continue

    const avgScore = totalScore / count
    let status: CategoryScore["status"]
    if (avgScore >= 85) status = "Excellent"
    else if (avgScore >= 70) status = "Good"
    else if (avgScore >= 50) status = "Fair"
    else status = "Needs Work"

    // Get recommendations for this category
    const recommendations = getCategoryRecommendations(category, biomarkerStatuses)

    scores.push({
      category,
      score: Math.round(avgScore),
      status,
      biomarkers: biomarkerStatuses,
      recommendations,
    })
  }

  return scores
}

function getCategoryRecommendations(category: HealthCategory, biomarkers: CategoryScore["biomarkers"]): string[] {
  const recommendations: string[] = []

  // Category-specific recommendations
  switch (category) {
    case "Heart Health":
      recommendations.push(
        "Follow a Mediterranean diet rich in olive oil, fish, and vegetables",
        "Exercise 150+ minutes per week with mix of cardio and strength",
        "Manage stress through meditation or yoga",
      )
      break
    case "Metabolism":
      recommendations.push(
        "Eat balanced meals with protein, fiber, and healthy fats",
        "Exercise after meals to improve insulin sensitivity",
        "Get 7-9 hours of quality sleep",
      )
      break
    case "Hormone Balance":
      recommendations.push(
        "Maintain healthy body weight",
        "Get adequate vitamin D and zinc",
        "Manage stress and prioritize sleep",
      )
      break
    case "Inflammation":
      recommendations.push(
        "Eat anti-inflammatory foods (berries, leafy greens, fatty fish)",
        "Reduce processed foods and added sugars",
        "Consider omega-3 supplements",
      )
      break
    case "Nutrients":
      recommendations.push(
        "Eat a colorful variety of fruits and vegetables",
        "Include lean proteins and whole grains",
        "Consider targeted supplementation for deficiencies",
      )
      break
    case "Endurance":
      recommendations.push(
        "Ensure adequate iron intake from food or supplements",
        "Stay well hydrated",
        "Include vitamin C with iron-rich meals",
      )
      break
    case "Cognition":
      recommendations.push(
        "Eat brain-healthy foods (fatty fish, berries, nuts)",
        "Stay mentally active with puzzles and learning",
        "Get regular aerobic exercise to boost brain health",
      )
      break
    case "Sleep":
      recommendations.push(
        "Maintain consistent sleep schedule (7-9 hours)",
        "Create dark, cool sleeping environment",
        "Avoid screens 1 hour before bed",
      )
      break
    case "Recovery":
      recommendations.push(
        "Include rest days in your exercise routine",
        "Prioritize protein intake for muscle repair",
        "Consider massage or foam rolling",
      )
      break
    case "Gut Health":
      recommendations.push(
        "Eat fermented foods (yogurt, kimchi, sauerkraut)",
        "Include prebiotic fiber (onions, garlic, bananas)",
        "Stay hydrated and manage stress",
      )
      break
    case "Fitness":
      recommendations.push(
        "Mix cardio and strength training",
        "Progressive overload for continuous improvement",
        "Track your workouts and recovery",
      )
      break
  }

  return recommendations
}
