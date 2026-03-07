# Longevity Platform - Technical Architecture

## System Overview

Longevity is a privacy-first health tracking platform that analyzes blood biomarkers to calculate biological age and provide personalized wellness coaching. The architecture prioritizes user data ownership, ephemeral processing, and acquisition-ready modularity.

## Core Principles

1. **Privacy-First**: No persistent storage of health data on servers
2. **User-Owned Data**: All health information stored in user's Google Drive
3. **Ephemeral Processing**: 10-minute TTL for all server-side data
4. **Transparent Algorithms**: Open, explainable health calculations
5. **Modular Design**: Clean separation of concerns for easy integration

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + Local Storage
- **Charts**: Recharts for data visualization
- **UI Components**: shadcn/ui component library

### Backend (Planned)
- **API**: Next.js API Routes (serverless)
- **Authentication**: Magic Link (passwordless)
- **Session Storage**: Upstash Redis (10-min TTL)
- **File Storage**: User's Google Drive (OAuth)
- **AI/LLM**: OpenAI API or similar (ephemeral)

### Data Flow

\`\`\`
User Upload → Next.js API → Redis (temp) → Calculation Engine → Results
                                ↓
                          Google Drive (permanent)
                                ↓
                          Delete from Redis
\`\`\`

## Key Components

### 1. Biomarker Engine (`lib/biomarkers/`)

**Purpose**: Core data model for 48 blood biomarkers with reference ranges and status logic.

**Key Files**:
- `biomarker-database.ts`: Complete biomarker definitions
- `biomarker-ranges.ts`: Sex-specific reference ranges
- `biomarker-status.ts`: Status calculation (Low/Borderline/Optimized/High)
- `unit-conversion.ts`: Unit normalization (mg/dL ↔ mmol/L)

**Data Structure**:
\`\`\`typescript
interface Biomarker {
  code: string;              // e.g., "LDL_C"
  name: string;              // "LDL Cholesterol"
  unit: string;              // "mg/dL"
  categories: string[];      // ["Heart Health", "Metabolism"]
  ranges: {
    male: { low, borderlineLow, optimizedLow, optimizedHigh, borderlineHigh, high }
    female: { ... }
  }
  significance: string;      // Plain-language explanation
  recommendations: {
    high: string[];          // Actions for high values
    low: string[];           // Actions for low values
  }
}
\`\`\`

**Status Logic**:
\`\`\`typescript
function calculateStatus(value: number, ranges: Range): Status {
  if (value < ranges.low) return "Low";
  if (value < ranges.optimizedLow) return "Borderline Low";
  if (value <= ranges.optimizedHigh) return "Optimized";
  if (value <= ranges.high) return "High";
  return "Very High";
}
\`\`\`

### 2. Inner Age Calculator (`lib/inner-age/`)

**Purpose**: Calculate biological age using weighted biomarker deviations.

**Algorithm**:
1. Select sex-specific biomarkers (17 for men, 13 for women)
2. Calculate deviation from age-matched peer mean
3. Apply correlation weights (how strongly each marker correlates with aging)
4. Sum weighted deviations to get age offset
5. Add to chronological age

**Formula**:
\`\`\`
deviation = (user_value - peer_mean) / peer_std
contribution = deviation × weight × scaling_factor
inner_age = chronological_age + Σ(contributions)
\`\`\`

**Key Biomarkers**:
- **Men (17)**: LDL, HDL, Glucose, HbA1c, ALT, GGT, Albumin, Hematocrit, WBC, hsCRP, Testosterone, Free Testosterone, SHBG, Vitamin D, Ferritin, Creatinine, TSH
- **Women (13)**: LDL, HDL, Glucose, HbA1c, ALT, Albumin, Hematocrit, WBC, Vitamin D, Ferritin, Creatinine, TSH, DHEAS

**Output**:
\`\`\`typescript
interface InnerAgeResult {
  chronological: number;     // Actual age
  biological: number;        // Calculated inner age
  delta: number;             // Difference (+ older, - younger)
  topDrivers: Array<{
    biomarker: string;
    impact: number;          // Years contributed
    direction: "aging" | "youthful";
  }>;
  confidence: number;        // 0-1 based on data completeness
}
\`\`\`

### 3. Category Scoring (`lib/categories/`)

**Purpose**: Group biomarkers into health pillars and calculate category scores.

**Categories**:
1. **Heart Health**: LDL, HDL, ApoB, Triglycerides, hsCRP, Blood Pressure
2. **Metabolism**: Glucose, HbA1c, Insulin, ALT, GGT
3. **Hormones**: Testosterone, Estradiol, Progesterone, DHEAS, TSH, Cortisol
4. **Inflammation**: hsCRP, WBC, Neutrophils, Lymphocytes
5. **Nutrients**: Vitamin D, B12, Folate, Iron, Ferritin, Magnesium
6. **Endurance**: Hemoglobin, Hematocrit, RBC, Iron markers

**Scoring Algorithm**:
\`\`\`typescript
function calculateCategoryScore(biomarkers: Biomarker[]): number {
  const statuses = biomarkers.map(b => b.status);
  const weights = {
    "Optimized": 100,
    "Borderline": 70,
    "Low": 40,
    "High": 40,
    "Very High": 20
  };
  return average(statuses.map(s => weights[s]));
}
\`\`\`

### 4. AI Coach System (`lib/coach/`)

**Purpose**: Generate personalized recommendations based on biomarker status.

**Persona Types**:
- **Dabbler**: Simple, 1-2 easy habits per week
- **Consistency**: Moderate, 3-4 sustainable changes
- **Optimizer**: Advanced, 5+ aggressive interventions

**Recommendation Engine**:
\`\`\`typescript
function generateRecommendations(
  biomarkers: Biomarker[],
  persona: Persona,
  focusTrack: Category
): Recommendation[] {
  // 1. Filter non-optimized markers in focus track
  // 2. Rank by impact potential
  // 3. Match to evidence-based interventions
  // 4. Personalize for persona intensity
  // 5. Return top 2-5 actions
}
\`\`\`

**Intervention Database**:
- 7,500+ evidence-based actions
- Categorized by biomarker target
- Difficulty ratings (Easy/Moderate/Hard)
- Expected impact scores
- Citations to research

### 5. Meal Plan Generator (`lib/meal-plan/`)

**Purpose**: Create 7-day nutrition plans aligned with biomarker goals.

**Inputs**:
- Focus track (Heart/Liver/Metabolism)
- Dietary preferences (Omnivore/Vegetarian/Vegan)
- Allergies and restrictions
- Cooking skill level
- Regional grocery availability

**Output Structure**:
\`\`\`typescript
interface MealPlan {
  week: string;
  focus: Category;
  meals: Array<{
    day: string;
    breakfast: Recipe;
    lunch: Recipe;
    dinner: Recipe;
    snacks: Recipe[];
  }>;
  groceryList: {
    produce: string[];
    proteins: string[];
    pantry: string[];
    swaps: Array<{ from: string; to: string; reason: string }>;
  };
  nutritionSummary: {
    avgCalories: number;
    macros: { protein: number; carbs: number; fat: number };
    keyNutrients: Record<string, number>;
  };
}
\`\`\`

**Generation Logic**:
1. Identify target nutrients for focus track
2. Select recipes optimizing those nutrients
3. Balance macros across week
4. Ensure variety (no repeated meals)
5. Generate shopping list with regional brands
6. Add smart swaps for common items

### 6. Data Privacy Layer (`lib/privacy/`)

**Purpose**: Ensure user data ownership and ephemeral processing.

**Session Management**:
\`\`\`typescript
interface Session {
  id: string;
  userId: string;
  biomarkers: Biomarker[];
  innerAge?: InnerAgeResult;
  coachReport?: CoachReport;
  createdAt: number;
  expiresAt: number;  // createdAt + 600 seconds
}

// Redis storage with TTL
await redis.set(`session:${id}`, encrypt(session), { ex: 600 });
\`\`\`

**Data Export**:
\`\`\`typescript
interface ExportData {
  meta: {
    exportDate: string;
    appVersion: string;
    userId: string;
  };
  biomarkers: Biomarker[];
  innerAge: InnerAgeResult;
  history: Array<{
    date: string;
    biomarkers: Biomarker[];
    innerAge: number;
  }>;
}

// Save to Google Drive
await saveToDrive(exportData, "longevity-data.json");
\`\`\`

**Deletion Receipt**:
\`\`\`typescript
interface DeletionReceipt {
  sessionId: string;
  userId: string;
  deletedAt: string;
  signature: string;  // HMAC-SHA256
}
\`\`\`

## UI/UX Architecture

### Design System

**Color Palette**:
- **Primary**: Teal (#0D9488) - Trust, health, calm
- **Secondary**: Coral (#F97316) - Energy, warmth, action
- **Accent**: Emerald (#10B981) - Success, optimized
- **Warning**: Amber (#F59E0B) - Borderline, caution
- **Danger**: Rose (#F43F5E) - High/Low, needs attention
- **Neutrals**: Slate grays + warm off-white

**Typography**:
- **Headings**: Inter (bold, semi-bold)
- **Body**: Inter (regular, medium)
- **Mono**: JetBrains Mono (for data values)

**Component Patterns**:
- Rounded cards (12px radius)
- Generous whitespace (24px+ padding)
- Subtle shadows (soft, layered)
- Smooth animations (200-300ms ease)
- Color-coded status with icons (not just color)

### Page Structure

\`\`\`
/                          → Landing page
/dashboard                 → Main health overview
/dashboard/inner-age       → Biological age detail
/dashboard/categories      → Health pillar overview
/dashboard/categories/[id] → Category detail (Heart, Metabolism, etc.)
/dashboard/biomarkers/[id] → Individual biomarker page
/upload                    → Add blood work
/coach                     → AI chat interface
/meal-plan                 → Nutrition plan generator
/settings                  → Profile, privacy, export
/auth/login                → Magic Link authentication
\`\`\`

### State Management

**Global State** (React Context):
- User profile (age, sex, preferences)
- Current biomarker data
- Inner Age result
- Session status

**Local State** (Component):
- Form inputs
- UI toggles
- Animation states

**Persistent State** (Local Storage):
- Last session data (encrypted)
- User preferences
- Draft entries

## API Architecture (Planned)

### Endpoints

**Authentication**:
- `POST /api/auth/magic-link` - Send login email
- `GET /api/auth/verify` - Verify token

**Data Processing**:
- `POST /api/biomarkers/upload` - Submit lab data
- `GET /api/biomarkers/session/:id` - Retrieve session
- `POST /api/biomarkers/calculate` - Run Inner Age
- `DELETE /api/biomarkers/session/:id` - Purge data

**AI Services**:
- `POST /api/coach/chat` - Generate recommendations
- `POST /api/meal-plan/generate` - Create meal plan

**Export**:
- `POST /api/export/drive` - Save to Google Drive
- `GET /api/export/receipt/:id` - Get deletion proof

### Security

**Encryption**:
- All session data encrypted with AES-256
- Keys rotated monthly
- No plaintext health data in logs

**Rate Limiting**:
- 10 requests/min per user
- 100 requests/hour per IP

**Validation**:
- Input sanitization
- Biological plausibility checks
- Unit verification

## Deployment

**Hosting**: Vercel (serverless)
**CDN**: Vercel Edge Network
**Database**: Upstash Redis (ephemeral)
**Storage**: User's Google Drive
**Monitoring**: Vercel Analytics + Sentry (non-PHI)

## Acquisition Readiness

### Modular IP Assets
1. **Biomarker Normalization Engine**: Standardized 48-marker database
2. **Inner Age Algorithm**: Transparent, peer-reviewed calculation
3. **Recommendation Database**: 7,500+ evidence-based interventions
4. **Meal Plan Generator**: Adaptive nutrition engine
5. **Privacy Architecture**: HIPAA-ready data flow

### Integration Points
- REST API with versioned endpoints
- JSON export format
- Webhook support for events
- OAuth for third-party auth
- Modular LLM prompts

### Documentation
- API reference (OpenAPI spec)
- Algorithm white papers
- Data schemas (JSON Schema)
- Privacy audit trail
- Compliance certifications

## Performance Targets

- **Page Load**: < 2s (LCP)
- **Calculation Time**: < 5s (Inner Age)
- **Chart Render**: < 500ms
- **API Response**: < 1s (p95)
- **Mobile Score**: > 90 (Lighthouse)

## Future Enhancements

1. **Wearable Integration**: Apple Health, Fitbit, Whoop
2. **Trend Analysis**: Multi-test comparison over time
3. **Community Features**: Anonymous challenges and leaderboards
4. **Recipe Database**: 1,000+ meals with photos and instructions
5. **Supplement Tracking**: Log and correlate with biomarkers
6. **Lab Partnerships**: Direct integration with Quest, LabCorp
7. **Telemedicine**: Connect with healthcare providers
8. **Genetic Integration**: Combine DNA data with blood markers

## Conclusion

This architecture balances user privacy, scientific rigor, and acquisition readiness. The modular design allows for rapid iteration while maintaining clean boundaries between components. The ephemeral data model ensures compliance and builds trust, while the standardized schemas make integration seamless for potential acquirers.
