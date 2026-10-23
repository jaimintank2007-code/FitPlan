/* ============================================================
   FitPlan — Personal Fitness & Workout Planner
   Main Application JavaScript
   ============================================================ */

(function () {
    'use strict';

    /* ──────────────────────────────────────────────
       1. DEFAULT STATE & CONSTANTS
       ────────────────────────────────────────────── */

    const STORAGE_KEY = 'fitplan_state';
    const CIRCUMFERENCE = 2 * Math.PI * 42; // SVG ring circumference

    const DEFAULTS = {
        currentSection: 'home',
        user: { name: 'Alex Morgan', age: 28, height: 175, weight: 72, goal: 'Maintain fitness' },
        water: {
            current: 1500,
            goal: 3000,
            history: [
                { time: '09:15 AM', amount: 500 },
                { time: '01:30 PM', amount: 500 },
                { time: '04:45 PM', amount: 500 }
            ]
        },
        calories: { consumed: 1850, burned: 420, goal: 2200 },
        heartRate: 72,
        currentPlan: 'beginner',
        completedExercises: ['b1', 'b2', 'b3', 'b4'],
        meals: {
            breakfast: { name: 'Oatmeal & Berries', time: '08:00', calories: 350, notes: 'Rich in fiber and antioxidants' },
            lunch: { name: 'Grilled Chicken Salad', time: '13:00', calories: 520, notes: 'High protein with olive oil' },
            dinner: { name: 'Salmon & Vegetables', time: '19:00', calories: 480, notes: 'Omega-3 fatty acids' }
        },
        nutrition: { protein: 120, carbs: 200, fat: 55, fibre: 22 },
        quizState: { currentQuestion: 0, score: 0, answers: [], completed: false, bestScore: 0 },
        bmi: { height: 175, weight: 72, result: 23.5, category: 'Normal' },
        sleep: { hours: 7.5, quality: 'Good' },
        checklist: { warmup: true, cardio: true, strength: true, stretch: false, water: true },
        workoutDates: [
            new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
            new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
            new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
            new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
            new Date().toISOString().split('T')[0]
        ],
        profileStats: { workouts: 24, caloriesBurned: 12450, streak: 7 },
        dailyPlanDate: new Date().toISOString().split('T')[0],
        settings: { notifications: true, sounds: false, units: 'metric' }
    };

    /* ──────────────────────────────────────────────
       2. WORKOUT PLANS DATA
       ────────────────────────────────────────────── */

    const WORKOUT_PLANS = {
        beginner: [
            { id: 'b1', name: 'Jumping Jacks', sets: 3, reps: '15 reps', duration: '5 min', icon: '🏃' },
            { id: 'b2', name: 'Bodyweight Squats', sets: 3, reps: '12 reps', duration: '6 min', icon: '🦵' },
            { id: 'b3', name: 'Push-ups (Knee)', sets: 3, reps: '10 reps', duration: '5 min', icon: '💪' },
            { id: 'b4', name: 'Plank Hold', sets: 3, reps: '30 sec', duration: '4 min', icon: '🧘' },
            { id: 'b5', name: 'Lunges', sets: 3, reps: '10 each leg', duration: '7 min', icon: '🦿' },
            { id: 'b6', name: 'Cool Down Stretch', sets: 1, reps: '5 min', duration: '5 min', icon: '🙆' }
        ],
        intermediate: [
            { id: 'i1', name: 'Burpees', sets: 4, reps: '12 reps', duration: '8 min', icon: '🔥' },
            { id: 'i2', name: 'Dumbbell Squats', sets: 4, reps: '15 reps', duration: '8 min', icon: '🏋️' },
            { id: 'i3', name: 'Push-ups', sets: 4, reps: '15 reps', duration: '6 min', icon: '💪' },
            { id: 'i4', name: 'Mountain Climbers', sets: 4, reps: '20 reps', duration: '6 min', icon: '⛰️' },
            { id: 'i5', name: 'Dumbbell Rows', sets: 4, reps: '12 reps', duration: '7 min', icon: '🏋️' },
            { id: 'i6', name: 'Bicycle Crunches', sets: 4, reps: '20 reps', duration: '5 min', icon: '🚴' },
            { id: 'i7', name: 'Jump Squats', sets: 3, reps: '15 reps', duration: '6 min', icon: '⬆️' },
            { id: 'i8', name: 'Plank to Push-up', sets: 3, reps: '10 reps', duration: '5 min', icon: '🧘' }
        ],
        advanced: [
            { id: 'a1', name: 'Box Jumps', sets: 5, reps: '12 reps', duration: '8 min', icon: '📦' },
            { id: 'a2', name: 'Barbell Squats', sets: 5, reps: '10 reps', duration: '10 min', icon: '🏋️' },
            { id: 'a3', name: 'Weighted Push-ups', sets: 5, reps: '15 reps', duration: '8 min', icon: '💪' },
            { id: 'a4', name: 'Deadlifts', sets: 5, reps: '8 reps', duration: '12 min', icon: '🏗️' },
            { id: 'a5', name: 'Pull-ups', sets: 4, reps: '10 reps', duration: '8 min', icon: '🔝' },
            { id: 'a6', name: 'Kettlebell Swings', sets: 4, reps: '20 reps', duration: '7 min', icon: '🔔' },
            { id: 'a7', name: 'Battle Ropes', sets: 4, reps: '30 sec', duration: '6 min', icon: '🪢' },
            { id: 'a8', name: 'Turkish Get-ups', sets: 3, reps: '5 each', duration: '8 min', icon: '🧗' },
            { id: 'a9', name: 'Muscle-ups', sets: 3, reps: '5 reps', duration: '7 min', icon: '🤸' },
            { id: 'a10', name: 'HIIT Finisher', sets: 1, reps: '10 min', duration: '10 min', icon: '🔥' }
        ]
    };

    /* ──────────────────────────────────────────────
       3. QUIZ DATA
       ────────────────────────────────────────────── */

    const QUIZ_QUESTIONS = [
        {
            question: 'What is the recommended daily water intake for adults?',
            options: ['1 litre', '2–3 litres', '5 litres', '500 ml'],
            correct: 1
        },
        {
            question: 'Which exercise primarily targets the quadriceps?',
            options: ['Bicep Curls', 'Deadlifts', 'Squats', 'Lat Pulldowns'],
            correct: 2
        },
        {
            question: 'How many minutes of moderate exercise per week does WHO recommend?',
            options: ['30 minutes', '75 minutes', '150 minutes', '300 minutes'],
            correct: 2
        },
        {
            question: 'What macronutrient is most important for muscle recovery?',
            options: ['Fat', 'Carbohydrates', 'Fibre', 'Protein'],
            correct: 3
        },
        {
            question: 'What is a healthy resting heart rate for adults?',
            options: ['40–50 BPM', '60–100 BPM', '100–120 BPM', '120–140 BPM'],
            correct: 1
        }
    ];

    /* ──────────────────────────────────────────────
       4. STATE MANAGEMENT
       ────────────────────────────────────────────── */

    let state = {};

    function loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Deep merge with defaults
                state = deepMerge(JSON.parse(JSON.stringify(DEFAULTS)), parsed);
            } else {
                state = JSON.parse(JSON.stringify(DEFAULTS));
            }
        } catch (e) {
            console.warn('Could not load saved state:', e);
            state = JSON.parse(JSON.stringify(DEFAULTS));
        }
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Could not save state:', e);
        }
    }

    function deepMerge(target, source) {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {};
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    /* ──────────────────────────────────────────────
       5. UTILITY HELPERS
       ────────────────────────────────────────────── */

    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return document.querySelectorAll(sel); }

    function formatNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function formatTime24To12(time24) {
        if (!time24) return '';
        const [h, m] = time24.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
    }

    function formatDateShort(dateStr) {
        const d = new Date(dateStr + 'T00:00:00');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
    }

    function getGreeting() {
        const h = new Date().getHours();
        if (h < 12) return 'Good Morning';
        if (h < 17) return 'Good Afternoon';
        return 'Good Evening';
    }

    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    function animateValue(el, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();
        function step(timestamp) {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = progress * (2 - progress); // ease-out
            el.textContent = Math.round(start + range * eased);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ──────────────────────────────────────────────
       6. TOAST NOTIFICATIONS
       ────────────────────────────────────────────── */

    function showToast(message, type = 'info') {
        const container = $('#toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
        toast.innerHTML = `<i data-lucide="${icons[type] || 'info'}"></i><span>${sanitizeInput(message)}</span>`;
        container.appendChild(toast);
        // Initialize lucide icons on new element
        if (window.lucide) lucide.createIcons({ nodes: [toast] });
        // Animate in
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /* ──────────────────────────────────────────────
       7. MODAL MANAGEMENT
       ────────────────────────────────────────────── */

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('hidden');
        requestAnimationFrame(() => modal.classList.add('show'));
        // Focus first input
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
        // Trap escape key
        modal._escHandler = (e) => { if (e.key === 'Escape') closeModal(id); };
        document.addEventListener('keydown', modal._escHandler);
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 200);
        if (modal._escHandler) {
            document.removeEventListener('keydown', modal._escHandler);
        }
    }

    // Close modal on overlay click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
            setTimeout(() => e.target.classList.add('hidden'), 200);
        }
        // Close buttons
        if (e.target.closest('.modal-close')) {
            const modalId = e.target.closest('.modal-close').dataset.modal;
            if (modalId) closeModal(modalId);
        }
    });

    /* ──────────────────────────────────────────────
       8. NAVIGATION
       ────────────────────────────────────────────── */

    function navigateTo(section) {
        // Update sidebar
        $$('.nav-item').forEach(item => item.classList.remove('active'));
        $$('.mobile-nav-item').forEach(item => item.classList.remove('active'));
        const navBtn = $(`.nav-item[data-section="${section}"]`);
        const mobBtn = $(`.mobile-nav-item[data-section="${section}"]`);
        if (navBtn) navBtn.classList.add('active');
        if (mobBtn) mobBtn.classList.add('active');

        // Update sections
        $$('.section-content').forEach(sec => {
            sec.classList.remove('active');
            sec.style.animation = '';
        });
        const target = $(`#section-${section}`);
        if (target) {
            target.classList.add('active');
            target.style.animation = 'fadeIn 0.4s ease forwards';
        }

        state.currentSection = section;
        saveState();

        // Scroll main to top
        const main = $('#mainContent');
        if (main) main.scrollTop = 0;
    }

    // Sidebar nav click
    document.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item, .mobile-nav-item');
        if (navItem && navItem.dataset.section) {
            navigateTo(navItem.dataset.section);
        }
    });

    /* ──────────────────────────────────────────────
       9. CIRCULAR PROGRESS RINGS
       ────────────────────────────────────────────── */

    function updateRing(ringEl, percentage) {
        if (!ringEl) return;
        const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
        ringEl.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
        ringEl.style.strokeDashoffset = offset;
    }

    function initRings() {
        const proteinPct = Math.round((state.nutrition.protein / 150) * 100);
        const carbsPct = Math.round((state.nutrition.carbs / 250) * 100);
        const fatPct = Math.round((state.nutrition.fat / 65) * 100);

        updateRing($('#proteinRing'), proteinPct);
        updateRing($('#carbsRing'), carbsPct);
        updateRing($('#fatRing'), fatPct);

        const pv = $('#proteinValue'); if (pv) pv.textContent = proteinPct + '%';
        const cv = $('#carbsValue'); if (cv) cv.textContent = carbsPct + '%';
        const fv = $('#fatValue'); if (fv) fv.textContent = fatPct + '%';
    }

    /* ──────────────────────────────────────────────
       10. FITNESS OVERVIEW (HOME)
       ────────────────────────────────────────────── */

    function updateFitnessOverview() {
        // Calculate daily progress based on multiple factors
        const waterPct = Math.min((state.water.current / state.water.goal) * 100, 100);
        const calPct = Math.min((state.calories.consumed / state.calories.goal) * 100, 100);
        const exercises = WORKOUT_PLANS[state.currentPlan] || [];
        const completedCount = state.completedExercises.filter(id =>
            exercises.some(ex => ex.id === id)
        ).length;
        const workoutPct = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0;
        const dailyProgress = Math.round((waterPct + calPct + workoutPct) / 3);

        const dp = $('#dailyProgressText'); if (dp) dp.textContent = dailyProgress + '%';
        const cb = $('#caloriesBurnedText'); if (cb) cb.innerHTML = `${formatNumber(state.calories.burned)} <small>kcal</small>`;
        const wc = $('#workoutCompletionText'); if (wc) wc.textContent = Math.round(workoutPct) + '%';

        initRings();
    }

    /* ──────────────────────────────────────────────
       11. DAILY TARGETS (HOME)
       ────────────────────────────────────────────── */

    function updateTargets() {
        // Water
        const wv = $('#waterValueHome'); if (wv) wv.textContent = formatNumber(state.water.current);
        const wp = $('#waterProgressHome');
        if (wp) wp.style.width = Math.min((state.water.current / state.water.goal) * 100, 100) + '%';

        // Calories
        const cc = $('#caloriesConsumedHome'); if (cc) cc.textContent = formatNumber(state.calories.consumed);
        const cp = $('#caloriesProgressHome');
        if (cp) cp.style.width = Math.min((state.calories.consumed / state.calories.goal) * 100, 100) + '%';
        const cbh = $('#caloriesBurnedHome'); if (cbh) cbh.textContent = formatNumber(state.calories.burned);

        // Weight
        const wvh = $('#weightValueHome'); if (wvh) wvh.textContent = state.user.weight;

        // Heart Rate
        const hr = $('#heartRateValue'); if (hr) hr.textContent = state.heartRate;
    }

    /* ──────────────────────────────────────────────
       12. WATER TRACKER
       ────────────────────────────────────────────── */

    function addWater(amount) {
        if (amount <= 0 || isNaN(amount)) return;
        state.water.current += amount;
        state.water.history.push({
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            amount: amount
        });
        saveState();
        updateWaterUI();
        updateTargets();
        updateFitnessOverview();
        showToast(`Added ${amount} ml of water!`, 'success');
    }

    function resetWater() {
        state.water.current = 0;
        state.water.history = [];
        saveState();
        updateWaterUI();
        updateTargets();
        updateFitnessOverview();
        showToast('Water intake reset', 'info');
    }

    function updateWaterUI() {
        const pct = Math.min((state.water.current / state.water.goal) * 100, 100);

        // Fitness page water display
        const wc = $('#waterCurrent'); if (wc) wc.textContent = formatNumber(state.water.current);
        const wg = $('#waterGoalText'); if (wg) wg.textContent = formatNumber(state.water.goal) + ' ml';
        const wf = $('#waterProgressFitness'); if (wf) wf.style.width = pct + '%';
        const bf = $('#waterBottleFill'); if (bf) bf.style.height = pct + '%';

        // Water log list
        const list = $('#waterLogList');
        if (list) {
            if (state.water.history.length === 0) {
                list.innerHTML = '<li class="text-sm text-grey">No water logged today</li>';
            } else {
                list.innerHTML = state.water.history.map(entry =>
                    `<li><span class="water-log-time">${entry.time}</span> <span class="water-log-amount">+${entry.amount} ml</span></li>`
                ).reverse().join('');
            }
        }
    }

    /* ──────────────────────────────────────────────
       13. BMI CALCULATOR
       ────────────────────────────────────────────── */

    function calculateBMI() {
        const heightInput = $('#bmiHeight');
        const weightInput = $('#bmiWeight');
        const h = parseFloat(heightInput.value);
        const w = parseFloat(weightInput.value);

        // Validation
        if (!h || !w || h < 50 || h > 300 || w < 10 || w > 500) {
            showToast('Please enter valid height (50–300 cm) and weight (10–500 kg)', 'warning');
            return;
        }

        const hm = h / 100;
        const bmi = w / (hm * hm);
        const bmiRound = Math.round(bmi * 10) / 10;

        let category, colorClass;
        if (bmi < 18.5) { category = 'Underweight'; colorClass = 'bmi-underweight'; }
        else if (bmi < 25) { category = 'Normal'; colorClass = 'bmi-normal'; }
        else if (bmi < 30) { category = 'Overweight'; colorClass = 'bmi-overweight'; }
        else { category = 'Obese'; colorClass = 'bmi-obese'; }

        state.bmi = { height: h, weight: w, result: bmiRound, category };
        saveState();

        // Show result
        const resultDiv = $('#bmiResult');
        if (resultDiv) resultDiv.classList.remove('hidden');
        const numEl = $('#bmiNumber');
        if (numEl) {
            numEl.textContent = bmiRound;
            numEl.className = 'bmi-number ' + colorClass;
        }
        const catEl = $('#bmiCategory');
        if (catEl) {
            catEl.textContent = category;
            catEl.className = 'bmi-category ' + colorClass;
        }

        // Position indicator
        const indicator = $('#bmiIndicator');
        if (indicator) {
            const pos = clamp(((bmi - 15) / 25) * 100, 2, 98);
            indicator.style.left = pos + '%';
        }

        showToast(`Your BMI is ${bmiRound} (${category})`, 'info');
    }

    /* ──────────────────────────────────────────────
       14. FITNESS QUIZ
       ────────────────────────────────────────────── */

    function initQuiz() {
        if (state.quizState.completed) {
            showQuizResult();
            return;
        }
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        const qi = state.quizState.currentQuestion;
        if (qi >= QUIZ_QUESTIONS.length) {
            finishQuiz();
            return;
        }
        const q = QUIZ_QUESTIONS[qi];
        const qEl = $('#quizQuestion');
        const oEl = $('#quizOptions');
        const counter = $('#quizCounter');
        const nextBtn = $('#quizNextBtn');
        const progressFill = $('#quizProgressFill');

        if (qEl) qEl.textContent = q.question;
        if (counter) counter.textContent = `Question ${qi + 1} of ${QUIZ_QUESTIONS.length}`;
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.textContent = qi === QUIZ_QUESTIONS.length - 1 ? 'Submit' : 'Next';
        }
        if (progressFill) progressFill.style.width = ((qi) / QUIZ_QUESTIONS.length * 100) + '%';

        if (oEl) {
            oEl.innerHTML = q.options.map((opt, i) =>
                `<button class="quiz-option" data-index="${i}">${sanitizeInput(opt)}</button>`
            ).join('');
        }

        // Show quiz container, hide result
        const container = $('#quizContainer'); if (container) container.classList.remove('hidden');
        const result = $('#quizResult'); if (result) result.classList.add('hidden');
    }

    function selectQuizOption(index) {
        $$('.quiz-option').forEach(btn => btn.classList.remove('selected'));
        const btn = $(`.quiz-option[data-index="${index}"]`);
        if (btn) btn.classList.add('selected');
        const nextBtn = $('#quizNextBtn');
        if (nextBtn) nextBtn.disabled = false;
        state.quizState._selectedOption = index;
    }

    function nextQuizQuestion() {
        const sel = state.quizState._selectedOption;
        if (sel === undefined || sel === null) return;

        const qi = state.quizState.currentQuestion;
        const q = QUIZ_QUESTIONS[qi];
        if (sel === q.correct) state.quizState.score++;
        state.quizState.answers.push(sel);
        state.quizState.currentQuestion++;
        state.quizState._selectedOption = null;
        saveState();

        if (state.quizState.currentQuestion >= QUIZ_QUESTIONS.length) {
            finishQuiz();
        } else {
            renderQuizQuestion();
        }
    }

    function finishQuiz() {
        state.quizState.completed = true;
        if (state.quizState.score > state.quizState.bestScore) {
            state.quizState.bestScore = state.quizState.score;
        }
        saveState();
        showQuizResult();
    }

    function showQuizResult() {
        const container = $('#quizContainer'); if (container) container.classList.add('hidden');
        const result = $('#quizResult'); if (result) result.classList.remove('hidden');

        const scoreEl = $('#quizScoreValue');
        if (scoreEl) scoreEl.textContent = state.quizState.score;

        const feedbacks = [
            'Time to hit the books! Try again!',
            'Time to hit the books! Try again!',
            'Not bad, but there\'s room to improve!',
            'Good effort! Keep learning!',
            'Great job! You know your stuff!',
            'Outstanding! You\'re a fitness expert!'
        ];
        const fb = $('#quizFeedback');
        if (fb) fb.textContent = feedbacks[state.quizState.score] || feedbacks[0];

        const fill = $('#quizProgressFill');
        if (fill) fill.style.width = '100%';
    }

    function retakeQuiz() {
        state.quizState.currentQuestion = 0;
        state.quizState.score = 0;
        state.quizState.answers = [];
        state.quizState.completed = false;
        state.quizState._selectedOption = null;
        saveState();
        renderQuizQuestion();
    }

    /* ──────────────────────────────────────────────
       15. WORKOUT PLANS
       ────────────────────────────────────────────── */

    function renderExerciseList() {
        const plan = WORKOUT_PLANS[state.currentPlan] || [];
        const list = $('#exerciseList');
        if (!list) return;

        list.innerHTML = plan.map(ex => {
            const completed = state.completedExercises.includes(ex.id);
            return `
                <div class="exercise-card ${completed ? 'completed' : ''}" data-id="${ex.id}">
                    <label class="exercise-check">
                        <input type="checkbox" ${completed ? 'checked' : ''} data-exercise="${ex.id}" aria-label="Mark ${ex.name} as complete">
                        <span class="checkmark"></span>
                    </label>
                    <span class="exercise-icon">${ex.icon}</span>
                    <div class="exercise-info">
                        <span class="exercise-name">${ex.name}</span>
                        <span class="exercise-detail">${ex.sets} sets × ${ex.reps} · ${ex.duration}</span>
                    </div>
                    <button class="btn-sm btn-secondary exercise-start" data-id="${ex.id}" aria-label="Start ${ex.name}">
                        Start
                    </button>
                </div>
            `;
        }).join('');

        updateWorkoutProgress();
        // Re-init icons
        if (window.lucide) lucide.createIcons();
    }

    function toggleExercise(exerciseId) {
        const idx = state.completedExercises.indexOf(exerciseId);
        if (idx > -1) {
            state.completedExercises.splice(idx, 1);
        } else {
            state.completedExercises.push(exerciseId);
        }
        saveState();
        renderExerciseList();
        updateFitnessOverview();

        // Record workout date
        const today = new Date().toISOString().split('T')[0];
        if (state.completedExercises.length > 0 && !state.workoutDates.includes(today)) {
            state.workoutDates.push(today);
            saveState();
        }
    }

    function updateWorkoutProgress() {
        const plan = WORKOUT_PLANS[state.currentPlan] || [];
        const completed = state.completedExercises.filter(id => plan.some(ex => ex.id === id)).length;
        const pct = plan.length > 0 ? Math.round((completed / plan.length) * 100) : 0;

        const bar = $('#workoutProgressBar'); if (bar) bar.style.width = pct + '%';
        const text = $('#workoutProgressPercent'); if (text) text.textContent = pct + '%';
    }

    function switchPlan(planName) {
        if (!WORKOUT_PLANS[planName]) return;
        state.currentPlan = planName;
        saveState();
        renderExerciseList();

        // Update tabs
        $$('.difficulty-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.plan === planName);
            tab.setAttribute('aria-selected', tab.dataset.plan === planName);
        });
    }

    function resetWorkout() {
        state.completedExercises = [];
        saveState();
        renderExerciseList();
        updateFitnessOverview();
        showToast('Workout plan reset for today', 'info');
    }

    /* ──────────────────────────────────────────────
       16. WORKOUT TIMER
       ────────────────────────────────────────────── */

    let timerInterval = null;
    let timerSeconds = 0;
    let timerPaused = false;

    function startTimer() {
        const timerDiv = $('#workoutTimer');
        if (timerDiv) timerDiv.classList.remove('hidden');
        timerSeconds = 0;
        timerPaused = false;
        updateTimerDisplay();
        const pauseBtn = $('#pauseTimerBtn');
        if (pauseBtn) pauseBtn.innerHTML = '<i data-lucide="pause"></i> Pause';
        if (window.lucide) lucide.createIcons();

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!timerPaused) {
                timerSeconds++;
                updateTimerDisplay();
            }
        }, 1000);
        showToast('Workout timer started!', 'success');
    }

    function pauseTimer() {
        timerPaused = !timerPaused;
        const pauseBtn = $('#pauseTimerBtn');
        if (pauseBtn) {
            pauseBtn.innerHTML = timerPaused
                ? '<i data-lucide="play"></i> Resume'
                : '<i data-lucide="pause"></i> Pause';
            if (window.lucide) lucide.createIcons();
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        const timerDiv = $('#workoutTimer');
        if (timerDiv) timerDiv.classList.add('hidden');
        showToast(`Workout completed! Duration: ${formatTimer(timerSeconds)}`, 'success');
    }

    function updateTimerDisplay() {
        const tv = $('#timerValue');
        if (tv) tv.textContent = formatTimer(timerSeconds);
    }

    function formatTimer(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    /* ──────────────────────────────────────────────
       17. CALENDAR
       ────────────────────────────────────────────── */

    let calendarDate = new Date();

    function renderCalendar() {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        const my = $('#calMonthYear');
        if (my) my.textContent = `${monthNames[month]} ${year}`;

        const grid = $('#calendarGrid');
        if (!grid) return;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        let html = '';

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const hasWorkout = state.workoutDates.includes(dateStr);
            html += `<div class="calendar-day ${isToday ? 'today' : ''} ${hasWorkout ? 'has-workout' : ''}" 
                          data-date="${dateStr}">
                        <span>${d}</span>
                        ${hasWorkout ? '<div class="workout-dot"></div>' : ''}
                     </div>`;
        }

        grid.innerHTML = html;
    }

    function navigateCalendar(dir) {
        calendarDate.setMonth(calendarDate.getMonth() + dir);
        renderCalendar();
    }

    function showCalendarDetail(dateStr) {
        const detail = $('#calendarDetail');
        const dateEl = $('#calDetailDate');
        const contentEl = $('#calDetailContent');
        if (!detail || !dateEl || !contentEl) return;

        detail.classList.remove('hidden');
        dateEl.textContent = formatDateShort(dateStr);

        if (state.workoutDates.includes(dateStr)) {
            contentEl.innerHTML = '<p class="text-success">✅ Workout completed on this day!</p>';
        } else {
            contentEl.innerHTML = '<p class="text-grey">No workouts recorded for this day.</p>';
        }
    }

    /* ──────────────────────────────────────────────
       18. DAILY PLAN (RIGHT PANEL)
       ────────────────────────────────────────────── */

    function updateDailyPlan() {
        const dateEl = $('#dateDisplay');
        if (dateEl) dateEl.textContent = formatDateShort(state.dailyPlanDate);
        updateMeals();
        updateNutrition();
    }

    function navigateDate(dir) {
        const d = new Date(state.dailyPlanDate + 'T00:00:00');
        d.setDate(d.getDate() + dir);
        state.dailyPlanDate = d.toISOString().split('T')[0];
        saveState();
        updateDailyPlan();
    }

    function updateMeals() {
        ['breakfast', 'lunch', 'dinner'].forEach(mealKey => {
            const meal = state.meals[mealKey];
            const card = $(`#meal${mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}`);
            if (!card || !meal) return;
            const nameEl = card.querySelector('.meal-name');
            const timeEl = card.querySelector('.meal-time');
            const calEl = card.querySelector('.meal-cal');
            if (nameEl) nameEl.textContent = meal.name;
            if (timeEl) timeEl.textContent = `${formatTime24To12(meal.time)} · ${mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}`;
            if (calEl) calEl.textContent = `~${meal.calories} kcal`;
        });
    }

    function updateNutrition() {
        const n = state.nutrition;
        const goals = { protein: 150, carbs: 250, fat: 65, fibre: 30 };
        ['protein', 'carbs', 'fat', 'fibre'].forEach(key => {
            const valEl = $(`#nutrition${key.charAt(0).toUpperCase() + key.slice(1)}`);
            const barEl = $(`#nutrition${key.charAt(0).toUpperCase() + key.slice(1)}Bar`);
            if (valEl) valEl.textContent = n[key];
            if (barEl) barEl.style.width = Math.min((n[key] / goals[key]) * 100, 100) + '%';
        });
    }

    /* ──────────────────────────────────────────────
       19. MEAL EDITING
       ────────────────────────────────────────────── */

    function openMealEditor(mealKey) {
        const meal = state.meals[mealKey];
        if (!meal) return;
        $('#mealName').value = meal.name;
        $('#mealTime').value = meal.time;
        $('#mealCalories').value = meal.calories;
        $('#mealNotes').value = meal.notes || '';
        $('#mealEditTarget').value = mealKey;
        $('#mealModalTitle').textContent = `Edit ${mealKey.charAt(0).toUpperCase() + mealKey.slice(1)}`;
        openModal('mealModal');
    }

    function saveMeal() {
        const mealKey = $('#mealEditTarget').value;
        const name = $('#mealName').value.trim();
        const time = $('#mealTime').value;
        const calories = parseInt($('#mealCalories').value);
        const notes = $('#mealNotes').value.trim();

        if (!name) { showToast('Please enter a meal name', 'warning'); return; }
        if (isNaN(calories) || calories < 0) { showToast('Please enter valid calories', 'warning'); return; }

        state.meals[mealKey] = {
            name: sanitizeInput(name),
            time: time || state.meals[mealKey].time,
            calories: calories,
            notes: sanitizeInput(notes)
        };
        saveState();
        updateMeals();
        closeModal('mealModal');
        showToast('Meal updated!', 'success');
    }

    /* ──────────────────────────────────────────────
       20. PROFILE
       ────────────────────────────────────────────── */

    function updateProfileUI() {
        const pn = $('#profileName'); if (pn) pn.textContent = state.user.name;
        const pg = $('#profileGoal'); if (pg) pg.textContent = 'Goal: ' + state.user.goal;
        const pa = $('#profileAge'); if (pa) pa.textContent = state.user.age + ' years';
        const ph = $('#profileHeight'); if (ph) ph.textContent = state.user.height + ' cm';
        const pw = $('#profileWeight'); if (pw) pw.textContent = state.user.weight + ' kg';
        const pwo = $('#profileWorkouts'); if (pwo) pwo.textContent = formatNumber(state.profileStats.workouts);
        const pcb = $('#profileCalories'); if (pcb) pcb.textContent = formatNumber(state.profileStats.caloriesBurned);
        const ps = $('#profileStreak'); if (ps) ps.textContent = state.profileStats.streak;

        // Update header greeting
        const greeting = $('#greetingText');
        if (greeting) {
            const firstName = state.user.name.split(' ')[0];
            greeting.innerHTML = `${getGreeting()}, <span class="text-accent">${sanitizeInput(firstName)}</span> 👋`;
        }
    }

    function openProfileEditor() {
        $('#editName').value = state.user.name;
        $('#editAge').value = state.user.age;
        $('#editHeight').value = state.user.height;
        $('#editWeight2').value = state.user.weight;
        $('#editGoal').value = state.user.goal;
        openModal('profileModal');
    }

    function saveProfile() {
        const name = $('#editName').value.trim();
        const age = parseInt($('#editAge').value);
        const height = parseInt($('#editHeight').value);
        const weight = parseFloat($('#editWeight2').value);
        const goal = $('#editGoal').value;

        if (!name) { showToast('Please enter your name', 'warning'); return; }
        if (isNaN(age) || age < 10 || age > 120) { showToast('Please enter a valid age (10–120)', 'warning'); return; }
        if (isNaN(height) || height < 50 || height > 300) { showToast('Please enter a valid height', 'warning'); return; }
        if (isNaN(weight) || weight < 20 || weight > 300) { showToast('Please enter a valid weight', 'warning'); return; }

        state.user = {
            name: sanitizeInput(name),
            age,
            height,
            weight,
            goal
        };
        saveState();
        updateProfileUI();
        updateTargets();
        closeModal('profileModal');
        showToast('Profile updated!', 'success');
    }

    /* ──────────────────────────────────────────────
       21. WEIGHT UPDATE
       ────────────────────────────────────────────── */

    function openWeightModal() {
        $('#newWeight').value = state.user.weight;
        openModal('weightModal');
    }

    function saveWeight() {
        const w = parseFloat($('#newWeight').value);
        if (isNaN(w) || w < 20 || w > 300) {
            showToast('Please enter a valid weight (20–300 kg)', 'warning');
            return;
        }
        state.user.weight = w;
        saveState();
        updateTargets();
        updateProfileUI();
        closeModal('weightModal');
        showToast(`Weight updated to ${w} kg`, 'success');
    }

    /* ──────────────────────────────────────────────
       22. SLEEP TRACKER
       ────────────────────────────────────────────── */

    function openSleepModal() {
        if (state.sleep.hours) {
            $('#sleepHours').value = state.sleep.hours;
            $('#sleepQuality').value = state.sleep.quality || 'good';
            const summary = $('#sleepSummary');
            const summaryText = $('#sleepSummaryText');
            if (summary) summary.classList.remove('hidden');
            if (summaryText) summaryText.textContent = `${state.sleep.hours} hours — ${state.sleep.quality || 'Good'} quality`;
        }
        openModal('sleepModal');
    }

    function saveSleep() {
        const hours = parseFloat($('#sleepHours').value);
        const quality = $('#sleepQuality').value;
        if (isNaN(hours) || hours < 0 || hours > 24) {
            showToast('Please enter valid hours (0–24)', 'warning');
            return;
        }
        state.sleep = { hours, quality };
        saveState();
        closeModal('sleepModal');
        showToast(`Sleep logged: ${hours} hours (${quality})`, 'success');
    }

    /* ──────────────────────────────────────────────
       23. DAILY CHECKLIST
       ────────────────────────────────────────────── */

    function updateChecklist() {
        const keys = ['warmup', 'cardio', 'strength', 'stretch', 'water'];
        keys.forEach(key => {
            const cb = $(`#check-${key}`);
            if (cb) cb.checked = state.checklist[key] || false;
        });
        updateChecklistCount();
    }

    function toggleChecklistItem(key) {
        state.checklist[key] = !state.checklist[key];
        saveState();
        updateChecklistCount();
    }

    function updateChecklistCount() {
        const keys = ['warmup', 'cardio', 'strength', 'stretch', 'water'];
        const count = keys.filter(k => state.checklist[k]).length;
        const el = $('#checklistCount'); if (el) el.textContent = count;
        const bar = $('#checklistProgress'); if (bar) bar.style.width = (count / keys.length * 100) + '%';
    }

    /* ──────────────────────────────────────────────
       24. HEART RATE DEMO
       ────────────────────────────────────────────── */

    function startHeartRateDemo() {
        setInterval(() => {
            const variation = Math.floor(Math.random() * 7) - 3; // -3 to +3
            state.heartRate = clamp(72 + variation, 60, 100);
            const el = $('#heartRateValue');
            if (el) el.textContent = state.heartRate;
        }, 3000);
    }

    /* ──────────────────────────────────────────────
       25. SETTINGS
       ────────────────────────────────────────────── */

    function initSettings() {
        const notif = $('#settingNotifications');
        if (notif) notif.checked = state.settings.notifications;
        const sounds = $('#settingSounds');
        if (sounds) sounds.checked = state.settings.sounds;
        const units = $('#settingUnits');
        if (units) units.value = state.settings.units;
    }

    function resetAllData() {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
        state = JSON.parse(JSON.stringify(DEFAULTS));
        saveState();
        initApp();
        closeModal('confirmModal');
        showToast('All data has been reset', 'info');
    }

    /* ──────────────────────────────────────────────
       26. ADD ACTIVITY (RIGHT PANEL)
       ────────────────────────────────────────────── */

    function saveActivity() {
        const name = $('#activityName').value.trim();
        const duration = parseInt($('#activityDuration').value);
        const calories = parseInt($('#activityCalories').value);

        if (!name) { showToast('Please enter an activity name', 'warning'); return; }
        if (isNaN(duration) || duration < 1) { showToast('Please enter a valid duration', 'warning'); return; }

        state.calories.burned += (calories || 0);
        saveState();
        updateTargets();
        updateFitnessOverview();
        closeModal('activityModal');
        showToast(`Activity "${name}" added!`, 'success');

        // Clear form
        $('#activityName').value = '';
        $('#activityDuration').value = '';
        $('#activityCalories').value = '';
    }

    /* ──────────────────────────────────────────────
       27. CUSTOM WATER MODAL
       ────────────────────────────────────────────── */

    function saveCustomWater() {
        const amount = parseInt($('#customWater').value);
        if (isNaN(amount) || amount < 50 || amount > 2000) {
            showToast('Please enter a valid amount (50–2000 ml)', 'warning');
            return;
        }
        closeModal('waterModal');
        addWater(amount);
        $('#customWater').value = '';
    }

    /* ──────────────────────────────────────────────
       28. CONFIRM MODAL HELPER
       ────────────────────────────────────────────── */

    let confirmCallback = null;

    function showConfirm(message, callback) {
        const msg = $('#confirmMessage');
        if (msg) msg.textContent = message;
        confirmCallback = callback;
        openModal('confirmModal');
    }

    /* ──────────────────────────────────────────────
       29. EVENT LISTENERS
       ────────────────────────────────────────────── */

    function bindEvents() {
        // Water buttons (home)
        const addWaterHome = $('#addWaterHomeBtn');
        if (addWaterHome) addWaterHome.addEventListener('click', () => addWater(250));

        // Water buttons (fitness page)
        const w250 = $('#addWater250'); if (w250) w250.addEventListener('click', () => addWater(250));
        const w500 = $('#addWater500'); if (w500) w500.addEventListener('click', () => addWater(500));
        const wCustom = $('#addWaterCustom'); if (wCustom) wCustom.addEventListener('click', () => openModal('waterModal'));
        const wReset = $('#resetWater'); if (wReset) wReset.addEventListener('click', resetWater);
        const saveWC = $('#saveCustomWater'); if (saveWC) saveWC.addEventListener('click', saveCustomWater);

        // Weight
        const weightBtn = $('#updateWeightBtn'); if (weightBtn) weightBtn.addEventListener('click', openWeightModal);
        const saveW = $('#saveWeightBtn'); if (saveW) saveW.addEventListener('click', saveWeight);

        // BMI
        const bmiBtn = $('#calculateBmiBtn'); if (bmiBtn) bmiBtn.addEventListener('click', calculateBMI);

        // Quiz
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quiz-option')) {
                const idx = parseInt(e.target.closest('.quiz-option').dataset.index);
                selectQuizOption(idx);
            }
        });
        const quizNext = $('#quizNextBtn'); if (quizNext) quizNext.addEventListener('click', nextQuizQuestion);
        const retake = $('#retakeQuizBtn'); if (retake) retake.addEventListener('click', retakeQuiz);

        // Workout plans
        document.addEventListener('click', (e) => {
            // Difficulty tabs
            if (e.target.closest('.difficulty-tab')) {
                const plan = e.target.closest('.difficulty-tab').dataset.plan;
                if (plan) switchPlan(plan);
            }
            // Exercise checkbox
            if (e.target.closest('input[data-exercise]')) {
                const id = e.target.closest('input[data-exercise]').dataset.exercise;
                toggleExercise(id);
            }
            // Exercise start button
            if (e.target.closest('.exercise-start')) {
                showToast(`Starting ${e.target.closest('.exercise-start').dataset.id}...`, 'info');
            }
        });

        const startW = $('#startWorkoutBtn'); if (startW) startW.addEventListener('click', startTimer);
        const pauseT = $('#pauseTimerBtn'); if (pauseT) pauseT.addEventListener('click', pauseTimer);
        const stopT = $('#stopTimerBtn'); if (stopT) stopT.addEventListener('click', stopTimer);
        const resetW = $('#resetWorkoutBtn'); if (resetW) resetW.addEventListener('click', () => {
            showConfirm('Reset all exercise progress for today?', resetWorkout);
        });

        // Calendar
        const calPrev = $('#calPrevMonth'); if (calPrev) calPrev.addEventListener('click', () => navigateCalendar(-1));
        const calNext = $('#calNextMonth'); if (calNext) calNext.addEventListener('click', () => navigateCalendar(1));
        document.addEventListener('click', (e) => {
            const day = e.target.closest('.calendar-day:not(.empty)');
            if (day && day.dataset.date) showCalendarDetail(day.dataset.date);
        });

        // Profile
        const editP = $('#editProfileBtn'); if (editP) editP.addEventListener('click', openProfileEditor);
        const saveP = $('#saveProfileBtn'); if (saveP) saveP.addEventListener('click', saveProfile);

        // Meals
        document.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.meal-edit');
            if (editBtn) openMealEditor(editBtn.dataset.meal);
        });
        const saveM = $('#saveMealBtn'); if (saveM) saveM.addEventListener('click', saveMeal);

        // Daily plan date
        const datePrev = $('#datePrev'); if (datePrev) datePrev.addEventListener('click', () => navigateDate(-1));
        const dateNext = $('#dateNext'); if (dateNext) dateNext.addEventListener('click', () => navigateDate(1));

        // Add activity
        const addAct = $('#addActivityBtn'); if (addAct) addAct.addEventListener('click', () => openModal('activityModal'));
        const saveAct = $('#saveActivityBtn'); if (saveAct) saveAct.addEventListener('click', saveActivity);

        // Activity cards
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.activity-card-btn');
            if (btn) {
                const action = btn.dataset.action;
                if (action === 'water') navigateTo('fitness');
                if (action === 'workout') navigateTo('workouts');
                if (action === 'sleep') openSleepModal();
            }
        });

        // Sleep
        const saveSl = $('#saveSleepBtn'); if (saveSl) saveSl.addEventListener('click', saveSleep);

        // Checklist
        document.addEventListener('change', (e) => {
            if (e.target.id && e.target.id.startsWith('check-')) {
                const key = e.target.id.replace('check-', '');
                toggleChecklistItem(key);
            }
        });

        // Settings
        const notif = $('#settingNotifications');
        if (notif) notif.addEventListener('change', () => {
            state.settings.notifications = notif.checked;
            saveState();
            showToast(notif.checked ? 'Notifications enabled' : 'Notifications disabled', 'info');
        });
        const sounds = $('#settingSounds');
        if (sounds) sounds.addEventListener('change', () => {
            state.settings.sounds = sounds.checked;
            saveState();
        });
        const units = $('#settingUnits');
        if (units) units.addEventListener('change', () => {
            state.settings.units = units.value;
            saveState();
            showToast(`Units set to ${units.value}`, 'info');
        });

        // Reset all data
        const resetAll = $('#resetAllDataBtn');
        if (resetAll) resetAll.addEventListener('click', () => {
            showConfirm('This will delete all your saved data. Are you sure?', resetAllData);
        });

        // Confirm modal action button
        const confirmBtn = $('#confirmActionBtn');
        if (confirmBtn) confirmBtn.addEventListener('click', () => {
            if (confirmCallback) {
                confirmCallback();
                confirmCallback = null;
            }
        });

        // Search button (placeholder)
        const searchBtn = $('#searchBtn');
        if (searchBtn) searchBtn.addEventListener('click', () => showToast('Search coming soon!', 'info'));

        // Notification button (placeholder)
        const notifBtn = $('#notifBtn');
        if (notifBtn) notifBtn.addEventListener('click', () => {
            showToast('No new notifications', 'info');
            const dot = notifBtn.querySelector('.notification-dot');
            if (dot) dot.style.display = 'none';
        });

        // Header avatar -> profile
        const headerAvatar = $('#headerAvatar');
        if (headerAvatar) headerAvatar.addEventListener('click', () => navigateTo('profile'));

        // Right panel toggle (for tablet/mobile drawer)
        const toggleRP = $('#toggleRightPanel');
        const openDP = $('#openDailyPlanBtn');
        const rightPanel = $('#rightPanel');

        if (toggleRP && rightPanel) {
            toggleRP.addEventListener('click', () => {
                rightPanel.classList.toggle('open');
            });
        }
        if (openDP && rightPanel) {
            openDP.addEventListener('click', () => {
                rightPanel.classList.toggle('open');
            });
        }
    }

    /* ──────────────────────────────────────────────
       30. INITIALIZATION
       ────────────────────────────────────────────── */

    function initApp() {
        loadState();
        navigateTo(state.currentSection || 'home');
        updateFitnessOverview();
        updateTargets();
        updateWaterUI();
        updateDailyPlan();
        updateProfileUI();
        renderExerciseList();
        renderCalendar();
        initQuiz();
        initSettings();
        updateChecklist();
        startHeartRateDemo();

        // Set BMI fields from state
        const bmiH = $('#bmiHeight'); if (bmiH) bmiH.value = state.bmi.height || state.user.height;
        const bmiW = $('#bmiWeight'); if (bmiW) bmiW.value = state.bmi.weight || state.user.weight;

        // Show BMI result if already calculated
        if (state.bmi.result) {
            calculateBMI();
        }

        // Show sleep summary if exists
        if (state.sleep.hours) {
            const summary = $('#sleepSummary');
            const summaryText = $('#sleepSummaryText');
            if (summary) summary.classList.remove('hidden');
            if (summaryText) summaryText.textContent = `${state.sleep.hours} hours — ${state.sleep.quality || 'Good'} quality`;
        }
    }

    /* ──────────────────────────────────────────────
       31. DOM READY
       ────────────────────────────────────────────── */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    function boot() {
        let attempts = 0;
        function tryInit() {
            attempts++;
            if (window.lucide || attempts > 10) {
                if (window.lucide) {
                    try { lucide.createIcons(); } catch (e) { console.warn(e); }
                }
                bindEvents();
                initApp();
            } else {
                setTimeout(tryInit, 100);
            }
        }
        tryInit();
    }

})();
