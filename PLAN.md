# Longevity Platform - Development Plan

## Project Overview
A privacy-first blood biomarker tracking platform that analyzes 48 health markers, calculates biological age (Inner Age), and provides personalized AI coaching and meal plans.

## Core Features Status

### Phase 1: Foundation & Architecture ✅
- [x] Project setup with Next.js 15 + TypeScript
- [x] Tailwind CSS v4 configuration
- [x] Design system with semantic tokens
- [x] Documentation structure (PLAN.md, ARCHITECTURE.md)

### Phase 2: Data Models & Biomarker Engine ⏳
- [x] Complete 48 biomarker database with reference ranges
- [x] Sex-specific range calculations
- [x] Status determination logic (Low/Borderline/Optimized/High)
- [x] Unit conversion utilities
- [x] Biomarker categorization (Heart Health, Metabolism, etc.)

### Phase 3: Upload & Data Entry System ⏳
- [x] Manual biomarker entry form with validation
- [x] Multi-unit support (mg/dL, mmol/L, etc.)
- [x] Real-time value validation
- [x] Biological plausibility checks
- [ ] PDF upload with OCR (future enhancement)

### Phase 4: Inner Age Calculation Engine ⏳
- [x] Weighted biomarker model (17 markers for men, 13 for women)
- [x] Age/sex-specific peer comparison
- [x] Deviation calculation from optimal ranges
- [x] Top driver identification
- [x] Transparent calculation display

### Phase 5: Dashboard & Visualizations ⏳
- [x] Main dashboard with health summary
- [x] Category overview cards (Heart, Metabolism, Hormones, etc.)
- [x] Individual biomarker detail pages
- [x] Interactive trend charts with optimized zones
- [x] Radial progress gauges
- [x] Color-coded status indicators
- [x] Mobile-responsive design

### Phase 6: AI Coach Chat System 🔄
- [x] Chat interface with typing indicators
- [x] Persona-based coaching (Dabbler/Consistency/Optimizer)
- [x] Biomarker-specific recommendations
- [x] Action plan generation
- [ ] LLM integration (requires API setup)

### Phase 7: Meal Plan Generator 🔄
- [x] 7-day meal plan structure
- [x] Focus track alignment (Heart/Liver/Metabolism)
- [x] Dietary preference support
- [x] Grocery list generation
- [x] Printable PDF format
- [ ] Recipe database integration (future)

### Phase 8: Authentication & Privacy 📋
- [ ] Magic Link authentication setup
- [ ] Upstash Redis integration
- [ ] Session management (10-min TTL)
- [ ] Google Drive export
- [ ] Data deletion receipts
- [ ] Privacy policy & consent flows

## Feature Completeness

### Fully Functional Features
1. **Biomarker Data Entry**: Complete manual entry system with 48 markers
2. **Inner Age Calculation**: Full algorithm with transparent breakdown
3. **Dashboard Visualizations**: Interactive charts, gauges, and trend displays
4. **Category Analysis**: Health pillars with scoring and recommendations
5. **Biomarker Details**: Individual marker pages with ranges and advice
6. **AI Coach Interface**: Chat UI with persona-based guidance
7. **Meal Plan Generator**: 7-day plans with grocery lists

### Partially Implemented
1. **Authentication**: UI ready, needs Magic Link integration
2. **Data Persistence**: Local state management, needs Upstash
3. **LLM Integration**: Prompt templates ready, needs API keys

### Future Enhancements
1. **PDF Upload & OCR**: Automatic lab report parsing
2. **Wearable Integration**: Apple Health, Fitbit sync
3. **Community Features**: Challenges and progress sharing
4. **Recipe Database**: Detailed meal instructions with photos
5. **Trend Analysis**: Multi-test comparison over time

## Testing Instructions

### Manual Testing Flow
1. **Navigate to Dashboard**: See overview of health categories
2. **Add Biomarkers**: Click "Add Blood Work" and enter test values
3. **View Inner Age**: See biological age calculation with drivers
4. **Explore Categories**: Click Heart Health, Metabolism, etc.
5. **Check Individual Markers**: View detailed biomarker pages
6. **Chat with Coach**: Get personalized recommendations
7. **Generate Meal Plan**: Create 7-day nutrition plan

### Sample Test Data
Use these values to test the full system:

**Male, Age 38:**
- LDL: 132 mg/dL (Borderline High)
- HDL: 48 mg/dL (Low)
- Glucose: 105 mg/dL (Borderline)
- HbA1c: 5.8% (Borderline)
- Testosterone: 420 ng/dL (Optimized)
- Vitamin D: 28 ng/mL (Low)

**Expected Results:**
- Inner Age: ~41 years (3 years older)
- Top Drivers: LDL (+1.2 years), HDL (+0.9 years)
- Focus Track: Heart Health
- Recommendations: Increase fiber, exercise, vitamin D

## Architecture Highlights

### Privacy-First Design
- No persistent health data storage on servers
- 10-minute session TTL in Redis
- User-owned data export to Google Drive
- Signed deletion receipts

### Scalable Data Model
- Normalized biomarker codes
- Versioned reference ranges
- Modular calculation engines
- Clean API boundaries

### Acquisition-Ready
- Standardized JSON schemas
- Well-documented algorithms
- Modular architecture
- Clear IP boundaries

## Next Steps
1. Integrate Magic Link authentication
2. Connect Upstash Redis for session management
3. Add LLM API for dynamic coach responses
4. Implement Google Drive export
5. Add PDF upload with OCR
6. Build trend analysis for multiple tests
7. Create onboarding flow
8. Add payment integration for Premium tier
