import type { UserBiomarker, Sex } from "@/lib/types/biomarker"
import { BIOMARKER_DATABASE } from "@/lib/biomarkers/biomarker-database"

export interface ActionCard {
  id: string
  title: string
  frequency: string
  daysPerWeek: number
  rating: number
  targetBiomarkers: string[]
  category: "supplement" | "food" | "exercise" | "lifestyle"
  imageQuery: string
  description: string
}

export function generateActionCards(biomarkers: UserBiomarker[], sex: Sex): ActionCard[] {
  const actions: ActionCard[] = []

  biomarkers.forEach((biomarker) => {
    const def = BIOMARKER_DATABASE[biomarker.code]
    if (!def) return

    const ranges = def.ranges[sex]
    const value = biomarker.value

    const isLow = value < ranges.optimizedLow
    const isHigh = value > ranges.optimizedHigh

    if (!isLow && !isHigh) return

    // Generate specific actions based on biomarker
    switch (biomarker.code) {
      case "LDL":
      case "APOB":
      case "TOTAL_CHOLESTEROL":
        if (isHigh) {
          actions.push({
            id: "psyllium-supplement",
            title: "Take a psyllium supplement",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["LDL", "Total Cholesterol", "HbA1c", "Glucose"],
            category: "supplement",
            imageQuery: "bowl of psyllium husk powder with wooden spoon",
            description: "Soluble fiber that reduces LDL cholesterol by 5-10%",
          })
          actions.push({
            id: "beans",
            title: "Eat beans 4x per week",
            frequency: "4 days per week",
            daysPerWeek: 4,
            rating: 5,
            targetBiomarkers: ["LDL", "Glucose", "HDL", "Ferritin"],
            category: "food",
            imageQuery: "bowl of mixed beans on wooden table",
            description: "High in soluble fiber and plant protein",
          })
        }
        break

      case "TRIGLYCERIDES":
        if (isHigh) {
          actions.push({
            id: "omega3-supplement",
            title: "Take an omega-3 supplement",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["Triglycerides", "hs-CRP", "HDL"],
            category: "supplement",
            imageQuery: "omega-3 fish oil capsules on white background",
            description: "EPA/DHA significantly lowers triglycerides",
          })
        }
        break

      case "HSCRP":
        if (isHigh) {
          actions.push({
            id: "dark-chocolate",
            title: "Enjoy some dark chocolate",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["hs-CRP", "Inflammation"],
            category: "food",
            imageQuery: "dark chocolate bar broken into pieces with cocoa powder",
            description: "Rich in anti-inflammatory flavonoids",
          })
        }
        break

      case "GLUCOSE":
      case "HBA1C":
        if (isHigh) {
          actions.push({
            id: "cardio-exercise",
            title: "Add in some cardio",
            frequency: "3-4 days per week",
            daysPerWeek: 4,
            rating: 5,
            targetBiomarkers: ["Glucose", "HbA1c", "Triglycerides", "HDL"],
            category: "exercise",
            imageQuery: "two people jogging outdoors on scenic trail",
            description: "Improves insulin sensitivity and glucose control",
          })
        }
        break

      case "VITAMIN_D":
        if (isLow) {
          actions.push({
            id: "vitamin-d-supplement",
            title: "Take a vitamin D supplement",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["Vitamin D", "Immunity", "Bone Health"],
            category: "supplement",
            imageQuery: "vitamin D3 softgel capsules in sunlight",
            description: "Essential for bone health and immune function",
          })
        }
        break

      case "HEMOGLOBIN":
      case "FERRITIN":
        if (isLow) {
          actions.push({
            id: "iron-rich-foods",
            title: "Eat iron-rich foods daily",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["Hemoglobin", "Ferritin", "Hematocrit"],
            category: "food",
            imageQuery: "plate of spinach, red meat, and lentils",
            description: "Boosts iron stores and hemoglobin levels",
          })
        }
        break

      case "TESTOSTERONE_TOTAL":
        if (sex === "male" && isLow) {
          actions.push({
            id: "resistance-training",
            title: "Start resistance training",
            frequency: "3-4 days per week",
            daysPerWeek: 4,
            rating: 5,
            targetBiomarkers: ["Testosterone", "Muscle Mass", "Bone Density"],
            category: "exercise",
            imageQuery: "person lifting weights in gym",
            description: "Naturally boosts testosterone production",
          })
        }
        break

      case "VITAMIN_B12":
        if (isLow) {
          actions.push({
            id: "b12-supplement",
            title: "Take a B12 supplement",
            frequency: "7 days per week",
            daysPerWeek: 7,
            rating: 5,
            targetBiomarkers: ["Vitamin B12", "Energy", "Cognition"],
            category: "supplement",
            imageQuery: "vitamin B12 sublingual tablets",
            description: "Supports energy production and nerve function",
          })
        }
        break
    }
  })

  // Add general lifestyle actions
  actions.push({
    id: "green-tea",
    title: "Drink green tea daily",
    frequency: "7 days per week",
    daysPerWeek: 7,
    rating: 5,
    targetBiomarkers: ["hs-CRP", "Antioxidants", "Metabolism"],
    category: "lifestyle",
    imageQuery: "cup of green tea with tea leaves",
    description: "Rich in antioxidants and anti-inflammatory compounds",
  })

  // Remove duplicates
  const uniqueActions = actions.filter((action, index, self) => index === self.findIndex((a) => a.id === action.id))

  return uniqueActions.slice(0, 8) // Return top 8 actions
}
