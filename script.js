// ---------------- QUIZ DATA ----------------
const quizData = [
  {
    question: "The Berlin Wall fell in which year?",
    options: ["1989", "1991", "1979", "1985"],
    correct: 0
  },
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correct: 0
  },
  {
    question: "Which empire built the Colosseum?",
    options: ["Greek", "Roman", "Ottoman", "Persian"],
    correct: 1
  }
  // add more questions here
];

// ---------------- ELEMENTS ----------------
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const timerCircle = document.getElementById("timerCircle");
const finalScore = document.getElementById("finalScore");
const toggleDark = document.getElementById("toggleDark");

// ---------------- STATE ----------------
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
const circleLength = 2 * Math.PI * 140; // r=140
timerCircle.setAttribute("stroke-dasharray", circleLength);

// ---------------- FUNCTIONS ----------------
function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  score = 0;
  currentIndex = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timerCircle.setAttribute("stroke-dashoffset", 0);
  startTimer();

  const q = quizData[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "px-4 py-2 bg-white dark:bg-gray-700 rounded shadow hover:bg-blue-100";
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });

  scoreEl.textContent = `Score: ${score}`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    const offset = circleLength - (timeLeft / 30) * circleLength;
    timerCircle.setAttribute("stroke-dashoffset", offset);

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timer);
  const q = quizData[currentIndex];
  if (selected === q.correct) {
    const bonus = Math.max(0, timeLeft - 10) * 2;
    score += 10 + bonus;
  }
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  finalScore.textContent = `Your score: ${score}`;
  localStorage.setItem("highScore", Math.max(score, localStorage.getItem("highScore") || 0));
}

// ---------------- EVENT LISTENERS ----------------
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", () => {
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

toggleDark.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
