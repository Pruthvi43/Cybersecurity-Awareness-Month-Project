
const scenarios = [
  {
    icon: "💻",
    title: "Operating System Update",
    description: "Your company-managed laptop displays a security update in its normal system settings.",
    source: "Device Settings",
    content: "Security update available. This update fixes known security issues. Install through your company's approved update process.",
    answer: "real",
    explanation: "Updates shown through your normal, approved device settings are generally trustworthy. Follow your organization's update policy."
  },
  {
    icon: "🚨",
    title: "Urgent Browser Warning",
    description: "A random website suddenly claims your computer is infected and demands an immediate download.",
    source: "Unknown Website",
    content: "WARNING! YOUR COMPUTER IS INFECTED! Download our emergency security update immediately!",
    answer: "fake",
    explanation: "Unexpected website pop-ups can be scams designed to install malware. Close the page and use approved security tools."
  },
  {
    icon: "📦",
    title: "Application Update",
    description: "Your organization's approved software center lists an update for an application you use at work.",
    source: "Company Software Center",
    content: "Application update available. Version 4.2.1. Review the update details and follow your company's installation instructions.",
    answer: "real",
    explanation: "Your organization's approved software center is the appropriate place to check for authorized application updates."
  },
  {
    icon: "⚠️",
    title: "Suspicious Download",
    description: "An unexpected pop-up says your video player is outdated and asks you to download a file from an unfamiliar site.",
    source: "Unknown Download",
    content: "Your player is OUTDATED! Download this special update now to continue watching. Click here!",
    answer: "fake",
    explanation: "Don't download updates from unexpected pop-ups or unfamiliar sites. Verify updates through the software's official or company-approved channel."
  },
  {
    icon: "🔐",
    title: "Unexpected Update Email",
    description: "You receive an unexpected email claiming to contain a critical update. The link leads to an unfamiliar domain.",
    source: "Unexpected Email",
    content: "URGENT: Install this attachment to protect your account. Open the file and enter your work password to continue.",
    answer: "fake",
    explanation: "Unexpected update attachments and requests for passwords are warning signs. Don't open the file; report the email through your company's security process."
  }
];

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const results = document.getElementById("results");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const roundLabel = document.getElementById("round-label");
const scoreLabel = document.getElementById("score");
const progress = document.getElementById("progress");

const scenarioIcon = document.getElementById("scenario-icon");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioText = document.getElementById("scenario-text");
const windowIcon = document.getElementById("window-icon");
const windowSource = document.getElementById("window-source");
const windowContent = document.getElementById("window-content");

const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");

let currentRound = 0;
let score = 0;
let answered = false;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextRound);
restartBtn.addEventListener("click", startGame);

document.querySelectorAll(".answer-btn").forEach(button => {
  button.addEventListener("click", () => {
    checkAnswer(button.dataset.answer);
  });
});

function startGame() {
  currentRound = 0;
  score = 0;
  answered = false;

  intro.classList.add("hidden");
  results.classList.add("hidden");
  game.classList.remove("hidden");

  scoreLabel.textContent = score;
  showScenario();
}

function showScenario() {
  answered = false;

  const scenario = scenarios[currentRound];

  roundLabel.textContent =
    `ROUND ${currentRound + 1} OF ${scenarios.length}`;

  progress.style.width =
    `${(currentRound / scenarios.length) * 100}%`;

  scenarioIcon.textContent = scenario.icon;
  scenarioTitle.textContent = scenario.title;
  scenarioText.textContent = scenario.description;
  windowIcon.textContent = scenario.icon;
  windowSource.textContent = scenario.source;
  windowContent.textContent = scenario.content;

  feedback.classList.add("hidden");
  feedback.classList.remove("correct", "incorrect");

  document.querySelectorAll(".answer-btn").forEach(button => {
    button.disabled = false;
  });
}

function checkAnswer(choice) {
  if (answered) return;

  answered = true;

  const scenario = scenarios[currentRound];
  const isCorrect = choice === scenario.answer;

  if (isCorrect) {
    score++;
  }

  scoreLabel.textContent = score;

  document.querySelectorAll(".answer-btn").forEach(button => {
    button.disabled = true;
  });

  feedback.classList.remove("hidden");
  feedback.classList.add(isCorrect ? "correct" : "incorrect");

  feedbackTitle.textContent = isCorrect
    ? "✓ Correct! Great job."
    : "✕ Not quite!";

  feedbackText.textContent = scenario.explanation;

  nextBtn.textContent =
    currentRound === scenarios.length - 1
      ? "See My Results →"
      : "Next Round →";
}

function nextRound() {
  if (!answered) return;

  currentRound++;

  if (currentRound < scenarios.length) {
    showScenario();
  } else {
    showResults();
  }
}

function showResults() {
  game.classList.add("hidden");
  results.classList.remove("hidden");

  const percentage = Math.round((score / scenarios.length) * 100);

  document.getElementById("final-score").textContent =
    `${score}/${scenarios.length}`;

  document.getElementById("final-progress").style.width =
    `${percentage}%`;

  const title = document.getElementById("result-title");
  const message = document.getElementById("result-message");
  const tip = document.getElementById("result-tip");

  if (score === 5) {
    title.textContent = "Update Defender! 🏆";
    message.textContent =
      "Perfect score! You know how to spot suspicious update requests.";
  } else if (score >= 3) {
    title.textContent = "Great Work! 🛡️";
    message.textContent =
      "You're building strong cybersecurity habits. Keep learning!";
  } else {
    title.textContent = "Keep Practicing! 💡";
    message.textContent =
      "Every round is a chance to improve your cybersecurity awareness.";
  }

  tip.textContent =
    "Remember: verify updates through approved sources, avoid unexpected downloads, and follow your organization's update policy.";
}
