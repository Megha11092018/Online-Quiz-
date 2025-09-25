// Check login
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const badgeElement = document.getElementById("badge");
const highScoreElement = document.getElementById("high-score");
const restartBtn = document.getElementById("restart-btn");
const progressElement = document.getElementById("progress");
const timerElement = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Shuffle questions and options
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load question
function loadQuestion() {
  feedback.textContent = "";
  nextBtn.style.display = "none";
  timeLeft = 15;
  timerElement.textContent = timeLeft;

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  optionsContainer.innerHTML = "";
  shuffle([...currentQuestion.options]).forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

// Check answer
function checkAnswer(selectedOption) {
  stopTimer();
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    score++;
    feedback.textContent = "Correct! 🎉";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `Oops! ❌ Correct: ${correctAnswer}`;
    feedback.style.color = "red";
  }
  nextBtn.style.display = "block";
}

// Timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      feedback.textContent = `Time's up! ⏰ Correct: ${questions[currentQuestionIndex].answer}`;
      feedback.style.color = "orange";
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

// Next question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show result
function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreElement.textContent = `${score} / ${questions.length}`;

  if (score === questions.length) {
    badgeElement.textContent = "🏆 Quiz Master!";
    confetti();
  } else if (score >= Math.floor(questions.length * 0.6)) {
    badgeElement.textContent = "⭐ Intermediate!";
  } else {
    badgeElement.textContent = "🐣 Beginner!";
  }

  const highScore = localStorage.getItem("highScore") || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreElement.textContent = `🎉 New High Score: ${score}`;
  } else {
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  resultBox.classList.add("hidden");
  questions = shuffle(questions);
  loadQuestion();
});

// Start quiz
questions = shuffle(questions);
loadQuestion();
