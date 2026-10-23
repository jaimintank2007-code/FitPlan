# FitPlan — Personal Fitness & Workout Planner

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-A3E635?style=for-the-badge)](styles.css)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](index.html)

> **FitPlan** is a modern, responsive personal fitness dashboard and workout planner built with semantic HTML5, modern CSS3 (Custom Properties & Grid/Flexbox), and modular Vanilla ES6+ JavaScript. Designed with a fitness-dashboard aesthetic, it features a charcoal sidebar, clean white cards on a soft-grey workspace, vibrant lime-green accents, and comprehensive interactive fitness tracking.

---

## 📑 Table of Contents
1. [Overview & Design Identity](#-overview--design-identity)
2. [Layout Architecture](#-layout-architecture)
3. [Key Features](#-key-features)
   - [Dashboard Header](#1-dashboard-header)
   - [Today's Summary & Fitness Overview](#2-todays-summary--fitness-overview)
   - [Daily Targets (2×2 Grid)](#3-daily-targets-22-grid)
   - [New Activity Section](#4-new-activity-section)
   - [Right-Side Daily Plan Panel](#5-right-side-daily-plan-panel)
   - [Interactive Workout Planner & Timer](#6-interactive-workout-planner--timer)
   - [BMI Calculator](#7-bmi-calculator)
   - [Hydration Station Tracker](#8-hydration-station-tracker)
   - [Fitness Knowledge Quiz](#9-fitness-knowledge-quiz)
   - [Workout Consistency Calendar](#10-workout-consistency-calendar)
   - [Profile & Settings Management](#11-profile--settings-management)
4. [Color System & Design Tokens](#-color-system--design-tokens)
5. [Project Structure](#-project-structure)
6. [Quick Start & Setup](#-quick-start--setup)
7. [College Practical Demonstration Script](#-college-practical-demonstration-script)
8. [Browser Compatibility & Technical Notes](#-browser-compatibility--technical-notes)

---

## 🎨 Overview & Design Identity

FitPlan recreates the layout, visual hierarchy, and polished aesthetic of premium fitness applications:

- **Desktop Three-Column Layout**: Left vertical navigation sidebar, central dashboard workspace, and a right-side daily plan & nutrition panel.
- **Color Accent**: Vibrant lime green (`#A3E635` / `#84CC16`) paired with dark charcoal (`#161622` / `#181826`) and soft grey (`#F0F2F5`).
- **Typography & Components**: Modern typography via Google Font **Inter**, rounded corners (`20px`), subtle drop shadows, and clean vector iconography.
- **Zero Heavy Dependencies**: 100% lightweight Vanilla JavaScript without requiring frameworks, build tools, external databases, or paid APIs.
- **Offline & Storage Resilient**: All user progress, hydration intake, workout completion status, and settings persist safely in `localStorage`.

---

## 📐 Layout Architecture

```text
+----------------------------------------------------------------------------------------------------+
|                                      FITPLAN APPLICATION LAYOUT                                    |
+---------------+--------------------------------------------------------------+---------------------+
| LEFT SIDEBAR  | CENTRAL DASHBOARD WORKSPACE                                  | RIGHT PANEL         |
| (80px Fixed)  | (Flexible Width, Max Height Scroll)                          | (380px Width)       |
+---------------+--------------------------------------------------------------+---------------------+
| [FP Logo]     |  [ Header: Greeting | Search | Notifications | Avatar ]      |  [ My Daily Plan ]  |
|               |                                                              |  [ Date Selector ]  |
|  * Home       |  +--------------------------------------------------------+  |  [ + Add Activity ] |
|  * Fitness    |  | Today's Summary & Fitness Overview (Dark Hero Card)   |  |                     |
|  * Workouts   |  | Daily Progress % | Calories Burned | Rings (P, C, F)   |  |  [ Meals Section ]  |
|  * Activity   |  +--------------------------------------------------------+  |  - Breakfast Card   |
|  * Calendar   |                                                              |  - Lunch Card       |
|               |  +----------------------------+---------------------------+  |  - Dinner Card      |
|  ----------   |  | Water Target Card          | Calories Target Card      |  |                     |
|  * Profile    |  +----------------------------+---------------------------+  |  [ Nutrition Card ] |
|  * Settings   |  | Weight Target Card         | Heart Rate (Pulse) Card   |  |  - Protein Bar      |
|               |  +----------------------------+---------------------------+  |  - Carbs Bar        |
|               |                                                              |  - Fat Bar          |
|               |  [ New Activity: Drinking Tracker | Exercise | Sleep ]       |  - Fibre Bar        |
+---------------+--------------------------------------------------------------+---------------------+
| MOBILE BAR    | [ Home ]   [ Fitness ]   [ Workouts ]   [ Activity ]   [ Calendar ]   [ Profile ]  |
+----------------------------------------------------------------------------------------------------+
```

---

## ⚡ Key Features

### 1. Dashboard Header
- **Dynamic Time Greeting**: Automatically displays *"Good Morning"*, *"Good Afternoon"*, or *"Good Evening"* with the active user's first name.
- **Notification Indicator**: Notification bell with a pulsing red alert dot.
- **Quick Profile Shortcut**: Clicking the user avatar opens the Profile section.

### 2. Today's Summary & Fitness Overview
- **Header Badge**: Sleek `Fitness Overview` title with an animated live status badge: `<span class="pulse-dot"></span> Today's Summary`.
- **Dark Hero Card**:
  - **Daily Progress**: Aggregate percentage calculated dynamically from water intake, calorie goals, and completed exercises.
  - **Calories Burned**: Total active calories displayed with unit formatting.
  - **Workout Completion**: Percentage of today's exercises completed.
  - **Three SVG Circular Progress Rings**:
    - **Protein**: 65% (`#A3E635` Lime Green)
    - **Carbohydrates**: 48% (`#FBBF24` Warm Amber)
    - **Fat**: 72% (`#F87171` Coral Red)
    - Centered percentage text inside each ring with labels below.

### 3. Daily Targets (2×2 Grid)
- **Water**: Millilitres consumed vs. configurable 3,000 ml goal with a quick `+ Add Water` action.
- **Calories**: Consumed calories progress bar vs. daily limit (2,200 kcal) with burned calories indicator.
- **Weight**: Current weight in kilograms with an **Update Weight** modal and target comparison.
- **Heart Rate**: Resting BPM reading with an animated CSS heartbeat pulse and clear "Demo Data" labeling.

### 4. New Activity Section
Three visual cards with high-resolution imagery and hover zoom:
1. **Drinking Tracker**: Inspiring hydration graphic with a button navigating to the water intake tracker.
2. **Daily Exercise**: Workout imagery with dumbbell exercises and a one-click button opening the workout planner.
3. **Sleep Tracker**: Relaxing sleep visual opening an interactive sleep log modal (hours slept & quality rating).

### 5. Right-Side Daily Plan Panel
- **Date Selector**: Browse plans across different days with previous/next controls.
- **Meal Cards**: Breakfast (*Oatmeal & Berries*), Lunch (*Grilled Chicken Salad*), and Dinner (*Salmon & Vegetables*) with meal time, estimated calories, and an edit modal to modify entries.
- **Nutrition Analysis**: Color-coded progress bars for Protein, Carbohydrates, Fat, and Dietary Fibre.
- **Add Activity Modal**: Record custom exercises, durations, and estimated calories burned.
- **Tablet Drawer**: On screens ≤ 1260px, the panel transforms into a slide-out drawer toggled via the header button.

### 6. Interactive Workout Planner & Timer
- **Three Difficulty Levels**:
  - **Beginner**: 6 exercises (Jumping Jacks, Squats, Knee Push-ups, Plank, Lunges, Cool Down).
  - **Intermediate**: 8 exercises (Burpees, Dumbbell Squats, Push-ups, Mountain Climbers, Rows, etc.).
  - **Advanced**: 10 exercises (Box Jumps, Barbell Squats, Deadlifts, Pull-ups, Kettlebell Swings, HIIT).
- **Interactive Checklists**: Tick off completed exercises to trigger strikethrough styling and update the progress bar.
- **Stopwatch Timer**: Integrated workout timer with Play, Pause, Resume, and Stop controls.
- **Reset Day**: Clear all completion checks for a fresh workout session.

### 7. BMI Calculator
- Computes Body Mass Index from height (cm) and weight (kg).
- Categorizes results:
  - `< 18.5`: Underweight (Blue)
  - `18.5 – 24.9`: Normal (Green)
  - `25.0 – 29.9`: Overweight (Amber)
  - `≥ 30.0`: Obese (Red)
- Includes a colored gradient scale with an animated position indicator pin.

### 8. Hydration Station Tracker
- Animated visual water bottle graphic whose fill level rises with each logged glass.
- One-click presets: `+ 250 ml`, `+ 500 ml`, and a custom amount modal.
- Timestamped activity log showing today's hydration history with a reset option.

### 9. Fitness Knowledge Quiz
- 5 multiple-choice questions testing hydration, muscle anatomy, WHO guidelines, recovery nutrients, and resting heart rate.
- Instant score calculation (e.g. `5 / 5`), percentage bar, tailored feedback, and a retake option.

### 10. Workout Consistency Calendar
- Monthly calendar grid highlighting today's date.
- Green workout dots on days where workouts were completed.
- Click any date to view historical workout details.

### 11. Profile & Settings Management
- **Profile**: Edit full name, age, height, weight, and fitness goals with instant greeting updates.
- **Settings**: Toggle reminders and sound effects, switch measurement units (Metric / Imperial), and reset data.

---

## 🎨 Color System & Design Tokens

| Token Name | Hex / Value | Role / Usage |
|:---|:---|:---|
| `--primary` | `#A3E635` | Primary brand lime green, active navigation, buttons |
| `--primary-dark` | `#84CC16` | Hover states, focused controls, active toggles |
| `--primary-darker`| `#65A30D` | High-contrast text accents, dark badges |
| `--primary-light` | `#D9F99D` | Subtle borders, light badge tints |
| `--sidebar` | `#161622` | Dark vertical sidebar, mobile navigation bar |
| `--dark-hero` | `#181826` | Fitness Overview hero card gradient start |
| `--dark-hero-card`| `#202036` | Fitness Overview hero card gradient end |
| `--bg` | `#F0F2F5` | Main workspace background |
| `--card` | `#FFFFFF` | Target cards, modal surfaces, meal cards |
| `--text-primary` | `#111827` | Headings, primary statistics, labels |
| `--text-secondary`| `#6B7280` | Subtitles, units, helper descriptions |
| `--accent-blue` | `#3B82F6` | Hydration tracker, underweight BMI, distance metric |
| `--accent-amber`| `#F59E0B` | Calorie progress fill, overweight BMI |
| `--accent-red` | `#EF4444` | Notification dot, heart rate card, obese BMI |

---

## 📁 Project Structure

```text
FitPlan/
│
├── index.html        # Semantic HTML5 markup, ARIA roles, modals, and dashboard structure
├── styles.css        # Master stylesheet with CSS Custom Properties, Grid, Flexbox, & Media Queries
├── app.js            # Modular JavaScript: state management, calculations, DOM handlers, & storage
└── README.md         # Comprehensive project documentation & demonstration guide
```

---

## 🚀 Quick Start & Setup

FitPlan is a static client-side web application. It requires **no build step, no npm installs, and no backend server**.

### Method 1: Open Directly in Browser
Double-click `index.html` or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Method 2: Local HTTP Server (Recommended)
Using Python or Node.js to serve files locally:

```bash
# 1. Open terminal and navigate to the project folder
cd d:\clg\prectis\FitPlan

# 2. Run with Python 3:
python -m http.server 8000

# OR run with Node.js npx:
npx serve .
```

Then navigate to `http://localhost:8000` in your browser.

---

## 🧪 College Practical Demonstration Script

Follow this step-by-step checklist when presenting or grading this practical:

1. **Dashboard Overview & "Today's Summary"**:
   - Point out the **three-column layout** on desktop.
   - Show the **"Today's Summary" live pulsating badge** and dark hero card with the 3 SVG circular progress rings (Protein, Carbs, Fat).
2. **Hydration & Calorie Interaction**:
   - On the Home page, click **+ Add Water**. Observe the water intake increase by 250 ml, the progress bar advance, and the daily progress percentage recalculate.
3. **Interactive Workout Planner**:
   - Click the **Dumbbell icon** in the sidebar to open Workout Plans.
   - Switch between **Beginner**, **Intermediate**, and **Advanced** tabs.
   - Check off several exercises. Notice the strikethrough effect and the progress bar updating.
   - Click **Start Workout** to demonstrate the running stopwatch timer with Pause/Resume/Stop.
4. **BMI Calculator**:
   - Navigate to the **Fitness Overview** section.
   - Enter `175` for Height and `72` for Weight. Click **Calculate BMI**.
   - Verify the score (`23.5`), category tag (`Normal`), and position pin on the colored scale bar.
5. **Fitness Knowledge Quiz**:
   - Answer the 5 quiz questions. Select the answers and click **Next**.
   - On the 5th question, click **Submit** to view the score circle (e.g. `5/5`) and feedback message.
6. **Data Persistence (localStorage)**:
   - Make any change (e.g. log water or update weight).
   - Press **F5** to refresh the browser page. Notice that all updated data persists intact without data loss.
7. **Responsive & Tablet Drawer**:
   - Open browser developer tools (`F12`) and switch to responsive device mode.
   - On tablet widths (≤ 1260px), click the header drawer icon to reveal the slide-out **My Daily Plan** panel.
   - On mobile widths (≤ 768px), verify that the vertical sidebar smoothly transforms into the bottom navigation bar.

---

## 💻 Browser Compatibility & Technical Notes

- **Browser Support**: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+, Opera 76+.
- **No Third-Party Framework Overhead**: Built with standard web technologies for fast load times and clean code inspection.
- **Offline Safety**: Lucide vector icons load via CDN with a built-in fallback timeout in `app.js`, ensuring all event listeners initialize properly even in restricted network environments.
- **Storage**: Uses browser `localStorage` under the key `fitplan_state`.

---

## 📄 License
This project is developed for educational purposes, practical fitness planning demonstrations, and portfolio showcases. Free to use, modify, and distribute under the MIT License.
