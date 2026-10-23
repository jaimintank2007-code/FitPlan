# FitPlan — Personal Fitness & Workout Planner

A modern, responsive fitness web application built with clean, modular HTML5, CSS3, and Vanilla JavaScript. FitPlan features a dashboard layout inspired by fitness-tracking apps, combining a dark charcoal vertical sidebar, a light-grey workspace, vibrant lime-green accents, and interactive client-side features.

---

## 📸 Key Highlights & Design System

- **Three-Part Desktop Dashboard**:
  1. **Left Navigation Sidebar**: Dark vertical sidebar with circular lime-green active indicators and smooth tab transitions.
  2. **Central Dashboard Workspace**: Primary fitness overview, target metrics, and activity cards.
  3. **Right-Side Daily Plan Panel**: Date navigation, meal tracking, and horizontal nutritional progress bars.
- **Color Palette**:
  - **Primary Accent**: Vibrant Lime Green (`#A3E635` / `#84CC16`)
  - **Sidebar & Hero Card**: Deep Charcoal / Midnight Dark (`#161622` / `#181826`)
  - **Background**: Soft Clean Grey (`#F0F2F5`)
  - **Cards & Surfaces**: Pure White (`#FFFFFF`) with subtle box shadows and `20px` border-radius
- **Typography**: Google Font **Inter** for clean readability across all screen sizes.
- **Responsive Layout**:
  - **Desktop (>1260px)**: 3-column grid layout.
  - **Tablet (769px–1260px)**: 2-column layout with a slide-out drawer for "My Daily Plan" accessible via a header icon.
  - **Mobile (≤768px)**: Bottom mobile navigation bar, stacked cards, touch-friendly touch targets, and zero horizontal overflow.

---

## ✨ Features

### 1. Dashboard & Header
- **Greeting & Date**: Dynamic time-based greeting (*"Good Morning / Afternoon / Evening, Alex"*) and formatted live date indicator.
- **Action Icons**: Search button, notification bell with animated unread badge, and quick avatar link to the Profile section.

### 2. Today's Summary & Fitness Overview
- **Live Status Header**: Prominent `Fitness Overview` heading with an animated pulsating green live badge for `Today's Summary`.
- **Dark Hero Card**:
  - **Daily Progress**: Combined daily score based on hydration, calorie intake, and workout completion.
  - **Calories Burned**: Total kcal burned today.
  - **Workout Completion**: Percentage of exercises checked off.
  - **Nutritional Progress Rings**: Three SVG circular progress rings (Protein, Carbohydrates, Fat) with smooth transition animations and centered percentage values.

### 3. Daily Targets (2×2 Grid)
- **Water Intake**: Real-time progress towards a 3,000 ml goal with a quick `+ Add Water` button.
- **Calories**: Consumed vs. burned comparison with an amber progress indicator.
- **Weight**: Current weight display with an update modal and target weight comparison.
- **Heart Rate**: Resting BPM reading with an animated CSS heartbeat pulse and clear "Demo Data" labeling.

### 4. New Activity Section
- Three image cards with zoom effects and circular action buttons:
  - **Drinking Tracker**: Quick navigation to the hydration station.
  - **Daily Exercise**: One-click jump to active workout plans.
  - **Sleep Tracker**: Interactive modal to log sleep hours and sleep quality.

### 5. Right-Side Panel: My Daily Plan
- **Date Selector**: Browse plans across different days with previous/next controls.
- **Meals Section**: Three meals (**Breakfast**, **Lunch**, **Dinner**) with meal time, estimated calories, and an edit modal to modify meal entries.
- **Nutrition Analysis**: Color-coded progress bars for **Protein** (Lime), **Carbohydrates** (Amber), **Fat** (Coral Red), and **Fibre** (Blue).
- **Add Activity**: Modal allowing users to record custom activities and calorie expenditures.

### 6. Interactive Functional Modules
- **Workout Planner**:
  - Three difficulty tiers: **Beginner** (6 exercises), **Intermediate** (8 exercises), and **Advanced** (10 exercises).
  - Exercise checklist: Check off exercises to update completion percentages with strikethrough styles.
  - Built-in **Stopwatch / Workout Timer** with Play, Pause, Resume, and Stop controls.
  - Reset button to clear workout state for a new day.
- **Interactive BMI Calculator**:
  - Calculates Body Mass Index using height (cm) and weight (kg).
  - Displays numerical result, colored category tag (*Underweight*, *Normal*, *Overweight*, *Obese*), and a moving marker across a visual scale bar.
- **Dedicated Water Intake Tracker**:
  - Visual water bottle fill animation that rises with each logged glass.
  - Preset increment buttons (`+250 ml`, `+500 ml`), custom input modal, and intake reset.
  - Timestamped activity log showing today's hydration history.
- **Fitness Knowledge Quiz**:
  - 5 multiple-choice questions on nutrition, hydration, and exercise science.
  - Dynamic score calculation, colored feedback messages, and retake option.
- **Workout Calendar**:
  - Monthly calendar grid highlighting today's date and displaying workout completion dots on active days.
  - Day details inspector to check workout consistency.
- **User Profile Management**:
  - View and update user details (Name, Age, Height, Weight, Fitness Goals).
  - Displays total workouts, lifetime calories burned, and active day streaks.
- **Settings & Data Management**:
  - Preferences toggles (Notifications, Sound Effects, Unit selection between Metric and Imperial).
  - Full data reset button with confirmation modal.
  - Local browser storage (`localStorage`) to preserve state across page reloads.

---

## 📁 Project Structure

```text
FitPlan/
├── index.html        # Semantic HTML5 markup, accessible forms, and modular modal dialogs
├── styles.css        # Responsive stylesheet with CSS custom properties, grid/flexbox, animations
├── app.js            # Modular JavaScript application state, calculations, DOM handlers, storage
└── README.md         # Project documentation and guide
```

---

## 🚀 Getting Started

No compilers, bundlers, Node.js packages, or paid APIs are required. FitPlan runs directly in any modern browser.

### Option 1: Direct File Open
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Using Python or Node.js to serve the files locally:

**Python 3:**
```bash
# Navigate to the project directory
cd d:\clg\prectis\FitPlan

# Start local server
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

**Node.js (npx serve / live-server):**
```bash
npx serve d:\clg\prectis\FitPlan
```

---

## 🧪 Demonstration & Testing Checklist

When showcasing FitPlan:
1. **Sidebar Navigation**: Click through each navigation item (**Home**, **Fitness Overview**, **Workout Plans**, **Activity Tracker**, **Calendar**, **Profile**, **Settings**) and confirm smooth tab switching.
2. **Hydration Tracker**: Click `+ Add Water` or `+ 250 ml` to see the percentage ring, progress bar, and visual bottle update.
3. **BMI Calculator**: Switch to Fitness Overview, enter test values (e.g., `175 cm` and `72 kg`), click **Calculate BMI**, and observe the color-coded result and indicator bar.
4. **Workout Planner**: Select difficulty tabs (**Beginner** / **Intermediate** / **Advanced**), tick off exercises, and test the **Start Workout** stopwatch timer.
5. **Quiz**: Navigate to the Fitness Knowledge Quiz, answer the 5 questions, submit, and review the score card and feedback.
6. **Data Persistence**: Refresh the browser page (`F5`) to confirm that all logged water intake, profile changes, and workout progress persist via `localStorage`.
7. **Responsive Drawer**: Resize the browser window to tablet size (under `1260px`) to test the slide-out Daily Plan drawer toggled by the header button.

---

## 🛠️ Built With

- **HTML5**: Semantic tags, ARIA attributes, accessible dialog roles.
- **CSS3**: Custom properties (tokens), CSS Grid, Flexbox, keyframe animations, `@media` breakpoints.
- **Vanilla JavaScript (ES6+)**: Event delegation, state management, modular architecture, and `localStorage` API.
- **Lucide Icons**: Clean, consistent vector icon set with offline-safe loading fallbacks.
- **Google Fonts (Inter)**: Typography.

---

## 📄 License
This project was created for personal fitness tracking and academic practical demonstrations. Feel free to use and customize it!
