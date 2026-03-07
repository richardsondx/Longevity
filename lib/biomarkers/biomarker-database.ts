import type { BiomarkerDefinition } from "@/lib/types/biomarker"

export const BIOMARKER_DATABASE: Record<string, BiomarkerDefinition> = {
  // Lipids & Cardiovascular
  APOB: {
    code: "APOB",
    name: "Apolipoprotein B",
    shortName: "ApoB",
    description: "Key indicator of heart health",
    unit: "mg/dL",
    categories: ["Heart Health", "Metabolism"],
    ranges: {
      male: { low: 40, borderlineLow: 60, optimizedLow: 80, optimizedHigh: 100, borderlineHigh: 120, high: 130 },
      female: { low: 40, borderlineLow: 60, optimizedLow: 80, optimizedHigh: 100, borderlineHigh: 120, high: 130 },
    },
    significance:
      "ApoB is the main protein in LDL/VLDL particles. Higher ApoB means more atherogenic particles and increased cardiovascular risk.",
    recommendations: {
      high: [
        "Adopt a Mediterranean-style diet with olive oil, fish, and nuts",
        "Cut saturated and trans fats from your diet",
        "Exercise regularly (150+ minutes per week)",
        "Add soluble fiber from oats, beans, and vegetables",
        "Consider omega-3 fish oil supplements",
      ],
      low: [
        "Ensure adequate nutrition with healthy fats and protein",
        "Consult healthcare provider if persistently low",
      ],
    },
    innerAgeWeight: { male: 0.08, female: 0.08 },
  },

  LDL: {
    code: "LDL",
    name: "LDL Cholesterol",
    shortName: "LDL",
    description: "Bad cholesterol",
    unit: "mg/dL",
    categories: ["Heart Health", "Metabolism"],
    ranges: {
      male: { low: 40, borderlineLow: 70, optimizedLow: 70, optimizedHigh: 100, borderlineHigh: 130, high: 160 },
      female: { low: 40, borderlineLow: 70, optimizedLow: 70, optimizedHigh: 100, borderlineHigh: 130, high: 160 },
    },
    significance:
      "LDL is the primary carrier of cholesterol to arteries. Elevated LDL is a major cardiovascular risk factor.",
    recommendations: {
      high: [
        "Minimize saturated fat intake",
        "Eat soluble fiber daily (oats, beans, berries)",
        "Include plant sterols in your diet",
        "Exercise 30+ minutes most days",
        "Maintain healthy body weight",
      ],
      low: ["Generally safe, but ensure adequate nutrition", "Check for malabsorption if very low"],
    },
    innerAgeWeight: { male: 0.12, female: 0.12 },
  },

  HDL: {
    code: "HDL",
    name: "HDL Cholesterol",
    shortName: "HDL",
    description: "Good cholesterol",
    unit: "mg/dL",
    categories: ["Heart Health", "Metabolism"],
    ranges: {
      male: { low: 30, borderlineLow: 40, optimizedLow: 50, optimizedHigh: 80, borderlineHigh: 100, high: 120 },
      female: { low: 35, borderlineLow: 50, optimizedLow: 60, optimizedHigh: 90, borderlineHigh: 110, high: 130 },
    },
    significance: "HDL helps remove cholesterol from arteries. Higher HDL is cardio-protective.",
    recommendations: {
      low: [
        "Exercise regularly, especially resistance and interval training",
        "Eat healthy fats (olive oil, avocados, nuts)",
        "Avoid smoking and excessive alcohol",
        "Maintain healthy body weight",
      ],
      high: ["Generally beneficial, no action needed", "Continue healthy lifestyle habits"],
    },
    innerAgeWeight: { male: 0.1, female: 0.1 },
  },

  TRIGLYCERIDES: {
    code: "TRIGLYCERIDES",
    name: "Triglycerides",
    shortName: "TG",
    description: "Blood fat levels",
    unit: "mg/dL",
    categories: ["Heart Health", "Metabolism", "Gut Health"],
    ranges: {
      male: { low: 40, borderlineLow: 70, optimizedLow: 70, optimizedHigh: 100, borderlineHigh: 150, high: 200 },
      female: { low: 40, borderlineLow: 70, optimizedLow: 70, optimizedHigh: 100, borderlineHigh: 150, high: 200 },
    },
    significance: "Reflects metabolic health. High triglycerides often indicate insulin resistance.",
    recommendations: {
      high: [
        "Cut added sugars and refined carbohydrates",
        "Limit alcohol consumption",
        "Emphasize non-starchy vegetables and lean proteins",
        "Regular cardio exercise",
        "Add omega-3 fatty acids (fish or supplements)",
        "Lose 5-10% body weight if overweight",
      ],
      low: ["Generally fine, ensure sufficient caloric intake"],
    },
    innerAgeWeight: { male: 0.09, female: 0.09 },
  },

  TOTAL_CHOLESTEROL: {
    code: "TOTAL_CHOLESTEROL",
    name: "Total Cholesterol",
    description: "Sum of all cholesterol types",
    unit: "mg/dL",
    categories: ["Heart Health", "Metabolism"],
    ranges: {
      male: { low: 120, borderlineLow: 150, optimizedLow: 150, optimizedHigh: 200, borderlineHigh: 240, high: 280 },
      female: { low: 120, borderlineLow: 150, optimizedLow: 150, optimizedHigh: 200, borderlineHigh: 240, high: 280 },
    },
    significance: "Overall lipid status indicator. High total cholesterol increases cardiovascular risk.",
    recommendations: {
      high: [
        "Follow heart-healthy diet (Mediterranean pattern)",
        "Reduce saturated fat and increase fiber",
        "Exercise regularly",
        "Maintain healthy weight",
      ],
      low: ["Usually benign, ensure adequate nutrition"],
    },
  },

  // Glycemic & Metabolic
  GLUCOSE: {
    code: "GLUCOSE",
    name: "Fasting Glucose",
    description: "Blood sugar regulator",
    unit: "mg/dL",
    alternativeUnits: ["mmol/L"],
    categories: ["Metabolism", "Cognition", "Gut Health", "Sleep"],
    ranges: {
      male: { low: 60, borderlineLow: 70, optimizedLow: 75, optimizedHigh: 95, borderlineHigh: 100, high: 126 },
      female: { low: 60, borderlineLow: 70, optimizedLow: 75, optimizedHigh: 95, borderlineHigh: 100, high: 126 },
    },
    significance: "Immediate blood sugar status. Elevated glucose indicates insulin resistance or diabetes risk.",
    recommendations: {
      high: [
        "Follow balanced plate (50% vegetables, 25% whole grains, 25% lean protein)",
        "Exercise daily, especially after meals",
        "Lose 5-10% body weight if overweight",
        "Increase fiber-rich foods",
        "Minimize refined carbs and sugary drinks",
        "Consider cinnamon and vinegar with meals",
      ],
      low: [
        "Eat regular meals with complex carbohydrates",
        "Avoid prolonged fasting",
        "Consult provider if symptomatic",
      ],
    },
    innerAgeWeight: { male: 0.11, female: 0.11 },
  },

  HBA1C: {
    code: "HBA1C",
    name: "Hemoglobin A1c",
    shortName: "HbA1c",
    description: "3-month average blood sugar",
    unit: "%",
    categories: ["Metabolism", "Cognition", "Gut Health"],
    ranges: {
      male: { low: 4.0, borderlineLow: 4.5, optimizedLow: 4.8, optimizedHigh: 5.4, borderlineHigh: 5.7, high: 6.5 },
      female: { low: 4.0, borderlineLow: 4.5, optimizedLow: 4.8, optimizedHigh: 5.4, borderlineHigh: 5.7, high: 6.5 },
    },
    significance: "Long-term glycemic control indicator. Reflects average blood sugar over 3 months.",
    recommendations: {
      high: [
        "Follow low-glycemic diet",
        "Increase physical activity (150+ min/week)",
        "Weight loss of 5-10% can drop HbA1c by 0.3-0.5%",
        "Adequate sleep (7-9 hours)",
        "Stress management",
        "Consider berberine or alpha-lipoic acid supplements",
      ],
      low: ["Generally good, maintain healthy habits"],
    },
    innerAgeWeight: { male: 0.1, female: 0.1 },
  },

  INSULIN: {
    code: "INSULIN",
    name: "Fasting Insulin",
    description: "Insulin sensitivity marker",
    unit: "μIU/mL",
    categories: ["Hormone Balance", "Metabolism"],
    ranges: {
      male: { low: 1, borderlineLow: 2, optimizedLow: 2, optimizedHigh: 10, borderlineHigh: 15, high: 25 },
      female: { low: 1, borderlineLow: 2, optimizedLow: 2, optimizedHigh: 10, borderlineHigh: 15, high: 25 },
    },
    significance: "High fasting insulin indicates insulin resistance, even with normal glucose.",
    recommendations: {
      high: [
        "Follow low-glycemic, high-fiber diet",
        "Regular exercise, especially resistance training",
        "Weight loss improves insulin sensitivity",
        "Consider intermittent fasting (16:8)",
        "Berberine or alpha-lipoic acid may help",
      ],
      low: ["Avoid prolonged fasting if symptomatic"],
    },
  },

  // Liver Enzymes
  ALT: {
    code: "ALT",
    name: "Alanine Aminotransferase",
    shortName: "ALT",
    description: "Liver health indicator",
    unit: "U/L",
    categories: ["Recovery", "Metabolism"],
    ranges: {
      male: { low: 5, borderlineLow: 10, optimizedLow: 10, optimizedHigh: 35, borderlineHigh: 45, high: 60 },
      female: { low: 5, borderlineLow: 10, optimizedLow: 10, optimizedHigh: 25, borderlineHigh: 35, high: 50 },
    },
    significance: "Elevated ALT indicates liver cell stress or damage.",
    recommendations: {
      high: [
        "Limit alcohol consumption",
        "Drink coffee (protective for liver)",
        "Eat antioxidant-rich foods (berries, leafy greens)",
        "Include omega-3 fatty acids",
        "Lose weight if overweight",
        "Avoid hepatotoxic medications",
      ],
      low: ["Generally not concerning"],
    },
    innerAgeWeight: { male: 0.07, female: 0.07 },
  },

  GGT: {
    code: "GGT",
    name: "Gamma-Glutamyl Transferase",
    shortName: "GGT",
    description: "Liver and alcohol marker",
    unit: "U/L",
    categories: ["Recovery", "Metabolism"],
    ranges: {
      male: { low: 5, borderlineLow: 10, optimizedLow: 10, optimizedHigh: 30, borderlineHigh: 40, high: 60 },
      female: { low: 5, borderlineLow: 10, optimizedLow: 10, optimizedHigh: 25, borderlineHigh: 35, high: 50 },
    },
    significance: "Sensitive to alcohol and toxin exposure. Marker of liver health.",
    recommendations: {
      high: [
        "Abstain from alcohol",
        "Drink coffee (liver protective)",
        "Hydrate well",
        "Eat cruciferous vegetables",
        "Reduce processed foods",
      ],
      low: ["Optimal, maintain healthy habits"],
    },
    innerAgeWeight: { male: 0.06, female: 0.06 },
  },

  // Hormones
  TESTOSTERONE_TOTAL: {
    code: "TESTOSTERONE_TOTAL",
    name: "Total Testosterone",
    description: "Primary male hormone",
    unit: "ng/dL",
    categories: ["Hormone Balance", "Fitness"],
    ranges: {
      male: { low: 200, borderlineLow: 300, optimizedLow: 400, optimizedHigh: 700, borderlineHigh: 900, high: 1200 },
      female: { low: 5, borderlineLow: 10, optimizedLow: 20, optimizedHigh: 50, borderlineHigh: 70, high: 100 },
    },
    significance: "Affects muscle mass, mood, libido, and energy in both sexes.",
    recommendations: {
      low: [
        "Resistance training and HIIT",
        "Adequate protein and healthy fats",
        "Maintain vitamin D and zinc levels",
        "Reduce stress and alcohol",
        "Get 7-9 hours quality sleep",
        "Maintain healthy body weight",
      ],
      high: [
        "For women: may indicate PCOS, improve insulin sensitivity",
        "For men: usually normal, monitor if very high",
      ],
    },
    innerAgeWeight: { male: 0.08 },
  },

  VITAMIN_D: {
    code: "VITAMIN_D",
    name: "Vitamin D (25-OH)",
    description: "Bone health and immunity",
    unit: "ng/mL",
    categories: ["Hormone Balance", "Inflammation", "Recovery"],
    ranges: {
      male: { low: 10, borderlineLow: 20, optimizedLow: 40, optimizedHigh: 60, borderlineHigh: 80, high: 100 },
      female: { low: 10, borderlineLow: 20, optimizedLow: 40, optimizedHigh: 60, borderlineHigh: 80, high: 100 },
    },
    significance: "Crucial for bone health, immunity, and hormone production.",
    recommendations: {
      low: [
        "Safe sun exposure (15-20 min daily)",
        "Vitamin D3 supplementation (2000-4000 IU daily)",
        "Eat fatty fish, fortified foods",
        "Check levels every 3 months",
      ],
      high: ["Reduce supplementation dose", "Usually from over-supplementation"],
    },
    innerAgeWeight: { male: 0.07, female: 0.08 },
  },

  TSH: {
    code: "TSH",
    name: "Thyroid-Stimulating Hormone",
    shortName: "TSH",
    description: "Thyroid function regulator",
    unit: "mU/L",
    categories: ["Metabolism", "Hormone Balance"],
    ranges: {
      male: { low: 0.3, borderlineLow: 0.5, optimizedLow: 1.0, optimizedHigh: 2.5, borderlineHigh: 4.0, high: 5.0 },
      female: { low: 0.3, borderlineLow: 0.5, optimizedLow: 1.0, optimizedHigh: 2.5, borderlineHigh: 4.0, high: 5.0 },
    },
    significance: "Regulates thyroid hormones. High TSH indicates hypothyroidism.",
    recommendations: {
      high: [
        "Ensure adequate iodine (iodized salt, seaweed)",
        "Get enough selenium (Brazil nuts)",
        "Vitamin D and zinc support",
        "Eat cooked cruciferous vegetables in moderation",
        "Manage stress and get adequate rest",
      ],
      low: ["Avoid excess iodine", "Stress reduction", "Consult provider if persistent"],
    },
    innerAgeWeight: { male: 0.05, female: 0.06 },
  },

  // Inflammation
  HSCRP: {
    code: "HSCRP",
    name: "High-Sensitivity C-Reactive Protein",
    shortName: "hs-CRP",
    description: "Inflammation marker",
    unit: "mg/L",
    categories: ["Inflammation", "Heart Health", "Recovery"],
    ranges: {
      male: { low: 0.1, borderlineLow: 0.5, optimizedLow: 0.5, optimizedHigh: 1.5, borderlineHigh: 3.0, high: 10.0 },
      female: { low: 0.1, borderlineLow: 0.5, optimizedLow: 0.5, optimizedHigh: 1.5, borderlineHigh: 3.0, high: 10.0 },
    },
    significance: "Marker of systemic inflammation and cardiovascular risk.",
    recommendations: {
      high: [
        "Anti-inflammatory diet (Mediterranean pattern)",
        "Regular exercise",
        "Weight loss if overweight",
        "Adequate sleep (7-9 hours)",
        "Omega-3 supplements",
        "Spices like turmeric and ginger",
      ],
      low: ["Excellent, maintain healthy lifestyle"],
    },
    innerAgeWeight: { male: 0.09, female: 0.09 },
  },

  WBC: {
    code: "WBC",
    name: "White Blood Cell Count",
    shortName: "WBC",
    description: "Immune system indicator",
    unit: "×10³/μL",
    categories: ["Inflammation", "Recovery"],
    ranges: {
      male: { low: 3.5, borderlineLow: 4.0, optimizedLow: 4.5, optimizedHigh: 10.0, borderlineHigh: 11.0, high: 12.0 },
      female: {
        low: 3.5,
        borderlineLow: 4.0,
        optimizedLow: 4.5,
        optimizedHigh: 10.0,
        borderlineHigh: 11.0,
        high: 12.0,
      },
    },
    significance: "Reflects immune status. High may indicate infection or inflammation.",
    recommendations: {
      high: ["Ensure rest and recovery", "Anti-inflammatory nutrition", "Hydration", "Rule out infection"],
      low: [
        "Support immune health with balanced diet",
        "Vitamins C, D, and zinc",
        "Moderate exercise",
        "Adequate sleep",
      ],
    },
    innerAgeWeight: { male: 0.06, female: 0.06 },
  },

  // Endurance & Blood Health
  HEMOGLOBIN: {
    code: "HEMOGLOBIN",
    name: "Hemoglobin",
    shortName: "Hb",
    description: "Oxygen carrier in blood",
    unit: "g/dL",
    categories: ["Endurance"],
    ranges: {
      male: {
        low: 12.0,
        borderlineLow: 13.5,
        optimizedLow: 14.0,
        optimizedHigh: 17.0,
        borderlineHigh: 17.5,
        high: 18.5,
      },
      female: {
        low: 11.0,
        borderlineLow: 12.0,
        optimizedLow: 12.5,
        optimizedHigh: 15.0,
        borderlineHigh: 15.5,
        high: 16.5,
      },
    },
    significance: "Low hemoglobin indicates anemia. High may indicate polycythemia.",
    recommendations: {
      low: [
        "Increase dietary iron (red meat, spinach, legumes)",
        "Pair iron with vitamin C for absorption",
        "Ensure adequate B12 and folate",
        "Iron supplements if needed",
      ],
      high: ["Stay well hydrated", "Evaluate for sleep apnea", "Consult provider if persistently elevated"],
    },
    innerAgeWeight: { male: 0.07, female: 0.07 },
  },

  HEMATOCRIT: {
    code: "HEMATOCRIT",
    name: "Hematocrit",
    shortName: "Hct",
    description: "Percentage of red blood cells",
    unit: "%",
    categories: ["Endurance"],
    ranges: {
      male: { low: 38, borderlineLow: 41, optimizedLow: 42, optimizedHigh: 50, borderlineHigh: 52, high: 55 },
      female: { low: 34, borderlineLow: 36, optimizedLow: 37, optimizedHigh: 47, borderlineHigh: 48, high: 52 },
    },
    significance: "Parallels hemoglobin. Reflects blood's oxygen-carrying capacity.",
    recommendations: {
      low: ["Same as hemoglobin: increase iron, B12, folate", "Treat underlying anemia"],
      high: ["Ensure adequate hydration", "Evaluate for underlying causes"],
    },
    innerAgeWeight: { male: 0.06, female: 0.06 },
  },

  FERRITIN: {
    code: "FERRITIN",
    name: "Ferritin",
    description: "Iron storage indicator",
    unit: "μg/L",
    categories: ["Endurance", "Inflammation"],
    ranges: {
      male: { low: 15, borderlineLow: 30, optimizedLow: 50, optimizedHigh: 200, borderlineHigh: 300, high: 400 },
      female: { low: 10, borderlineLow: 20, optimizedLow: 30, optimizedHigh: 150, borderlineHigh: 250, high: 350 },
    },
    significance: "Low ferritin indicates iron deficiency. High may reflect inflammation or iron overload.",
    recommendations: {
      low: [
        "Boost dietary iron (heme and non-heme sources)",
        "Take iron with vitamin C",
        "Iron supplements if needed",
        "Recheck in 3 months",
      ],
      high: [
        "Often from inflammation or excess iron",
        "Limit iron supplements and alcohol",
        "Follow anti-inflammatory diet",
        "Medical evaluation if very high",
      ],
    },
    innerAgeWeight: { male: 0.05, female: 0.06 },
  },

  VITAMIN_B12: {
    code: "VITAMIN_B12",
    name: "Vitamin B12",
    description: "Energy and nerve function",
    unit: "pg/mL",
    categories: ["Cognition", "Endurance"],
    ranges: {
      male: { low: 150, borderlineLow: 200, optimizedLow: 400, optimizedHigh: 900, borderlineHigh: 1000, high: 1500 },
      female: { low: 150, borderlineLow: 200, optimizedLow: 400, optimizedHigh: 900, borderlineHigh: 1000, high: 1500 },
    },
    significance: "Essential for red blood cell formation and neurological function.",
    recommendations: {
      low: [
        "Eat animal products (clams, salmon, eggs)",
        "Fortified foods for vegetarians/vegans",
        "Sublingual B12 supplements",
        "Check for absorption issues",
      ],
      high: ["Usually from supplementation", "Reduce supplement dose if very high"],
    },
  },

  ALBUMIN: {
    code: "ALBUMIN",
    name: "Albumin",
    description: "Protein and liver function",
    unit: "g/dL",
    categories: ["Recovery", "Metabolism"],
    ranges: {
      male: { low: 3.0, borderlineLow: 3.5, optimizedLow: 4.0, optimizedHigh: 5.0, borderlineHigh: 5.5, high: 6.0 },
      female: { low: 3.0, borderlineLow: 3.5, optimizedLow: 4.0, optimizedHigh: 5.0, borderlineHigh: 5.5, high: 6.0 },
    },
    significance: "Low albumin suggests malnutrition or chronic disease.",
    recommendations: {
      low: ["Increase high-quality protein intake", "Ensure adequate calories", "Address underlying conditions"],
      high: ["Usually from dehydration", "Increase fluid intake"],
    },
    innerAgeWeight: { male: 0.06, female: 0.06 },
  },

  CREATININE: {
    code: "CREATININE",
    name: "Creatinine",
    description: "Kidney function marker",
    unit: "mg/dL",
    categories: ["Recovery", "Fitness"],
    ranges: {
      male: { low: 0.5, borderlineLow: 0.7, optimizedLow: 0.9, optimizedHigh: 1.2, borderlineHigh: 1.4, high: 1.5 },
      female: { low: 0.4, borderlineLow: 0.6, optimizedLow: 0.7, optimizedHigh: 1.0, borderlineHigh: 1.2, high: 1.3 },
    },
    significance: "Reflects kidney function and muscle mass.",
    recommendations: {
      high: [
        "Stay well hydrated",
        "Moderate protein intake",
        "Monitor kidney function",
        "Consult provider if elevated",
      ],
      low: ["May indicate low muscle mass", "Increase protein and resistance training"],
    },
    innerAgeWeight: { male: 0.05, female: 0.05 },
  },
}

// Helper function to get all biomarker codes
export function getAllBiomarkerCodes(): string[] {
  return Object.keys(BIOMARKER_DATABASE)
}

// Helper function to get biomarkers by category
export function getBiomarkersByCategory(category: string): BiomarkerDefinition[] {
  return Object.values(BIOMARKER_DATABASE).filter((b) => b.categories.includes(category as any))
}

// Helper function to get Inner Age biomarkers
export function getInnerAgeBiomarkers(sex: "male" | "female"): BiomarkerDefinition[] {
  return Object.values(BIOMARKER_DATABASE).filter((b) => b.innerAgeWeight && b.innerAgeWeight[sex] !== undefined)
}
