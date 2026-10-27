
const questions = [
    {
      category: "PASSWORD SCANNER",
      question: "A hacker is trying to guess your password. Which one is the strongest?",
      choices: [
        "password123",
        "Alex2009",
        "River!Comet7Purple#",
        "qwerty"
      ],
      answer: 2,
      explanation: "Long, unique passphrases are harder to guess. Avoid common patterns and personal information."
    },
    {
      category: "ACCOUNT DEFENSE",
      question: "You have five online accounts. What should you do?",
      choices: [
        "Use the same password for all",
        "Use a different password for every account",
        "Add 1 to each password",
        "Use your birthday everywhere"
      ],
      answer: 1,
      explanation: "Unique passwords help prevent one compromised account from putting your other accounts at risk."
    },
    {
      category: "SECURE STORAGE",
      question: "How can you safely manage lots of passwords?",
      choices: [
        "Write them on a public note",
        "Send them to a friend",
        "Use a trusted password manager",
        "Use your name for every login"
      ],
      answer: 2,
      explanation: "A trusted password manager can generate and securely store unique passwords."
    },
    {
      category: "PHISHING ALERT",
      question: "Someone messages you asking for your password to fix your account. What do you do?",
      choices: [
        "Send it immediately",
        "Share only half",
        "Post it in a group chat",
        "Never share it; verify the request through an official channel"
      ],
      answer: 3,
      explanation: "Never disclose your password. Contact the organization through a trusted, official channel."
    },
    {
      category: "EXTRA PROTECTION",
      question: "What extra protection should you enable on important accounts?",
      choices: [
        "Multi-factor authentication (MFA)",
        "A shorter password",
        "The same password twice",
        "Save your password on every computer"
      ],
      answer: 0,
      explanation: "MFA adds another layer of protection beyond your password."
    },
    {
      category: "BREACH RESPONSE",
      question: "A website reports that your account may have been compromised. What should you do?",
      choices: [
        "Ignore the warning",
        "Change the affected password, especially if reused, and check account security",
        "Reuse the password on a new account",
        "Send your password to support"
      ],
      answer: 1,
      explanation: "Change compromised passwords, make sure they are unique, and enable MFA where available."
    }
  ];
  
  let current = 0;
  let score = 0;
  let locked = false;
  
  const $ = id => document.getElementById(id);
  
  function showScreen(screen) {
    ["intro", "play", "results"].forEach(id => {
      $(id).classList.toggle("hidden", id !== screen);
    });
  }
  
  function startGame() {
    current = 0;
    score = 0;
    locked = false;
  
    $("xp").textContent = "0";
    showScreen("play");
    renderQuestion();
  }
  
  function renderQuestion() {
    locked = false;
  
    const q = questions[current];
  
    $("mission").textContent =
      `MISSION ${current + 1} OF ${questions.length}`;
  
    $("scoreLabel").textContent =
      `SCORE: ${score}/${questions.length}`;
  
    $("footerScore").textContent =
      `${score} / ${questions.length} CORRECT`;
  
    $("progress").style.width =
      `${(current / questions.length) * 100}%`;
  
    $("category").textContent = q.category;
    $("question").textContent = q.question;
  
    $("feedback").replaceChildren();
    $("next").classList.add("hidden");
  
    const choices = $("choices");
    choices.replaceChildren();
  
    q.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.className = "choice";
      button.type = "button";
  
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = String.fromCharCode(65 + index);
  
      const label = document.createElement("span");
      label.textContent = choice;
  
      button.append(letter, label);
  
      button.addEventListener("click", () => {
        selectAnswer(index);
      });
  
      choices.appendChild(button);
    });
  }
  
  function selectAnswer(selected) {
    if (locked) return;
    locked = true;
  
    const q = questions[current];
    const correct = selected === q.answer;
  
    const buttons = $("choices").querySelectorAll("button");
  
    buttons.forEach((button, index) => {
      button.disabled = true;
  
      if (index === q.answer) {
        button.classList.add("correct");
        button.querySelector(".letter").textContent = "✓";
      } else if (index === selected) {
        button.classList.add("wrong");
        button.querySelector(".letter").textContent = "✕";
      }
    });
  
    if (correct) {
      score++;
      $("xp").textContent = score * 100;
    }
  
    $("scoreLabel").textContent =
      `SCORE: ${score}/${questions.length}`;
  
    $("footerScore").textContent =
      `${score} / ${questions.length} CORRECT`;
  
    const feedback = document.createElement("div");
    feedback.className = `feedback ${correct ? "" : "bad"}`;
  
    const title = document.createElement("h3");
    title.textContent = correct
      ? "✓ ACCESS GRANTED! +100 XP"
      : "⚠ NOT QUITE — LEARN & ADAPT";
  
    const explanation = document.createElement("p");
    explanation.textContent = q.explanation;
  
    feedback.append(title, explanation);
    $("feedback").replaceChildren(feedback);
  
    $("next").textContent =
      current === questions.length - 1
        ? "COMPLETE MISSION →"
        : "NEXT MISSION →";
  
    $("next").classList.remove("hidden");
  }
  
  function showResults() {
    showScreen("results");
  
    $("progress").style.width = "100%";
    $("finalScore").textContent = score * 100;
  
    let title;
    let badge;
    let message;
    let icon;
  
    if (score === questions.length) {
      title = "ELITE CYBER GUARDIAN!";
      badge = "🏆 ULTIMATE CYBER GUARDIAN";
      icon = "🏆";
      message =
        "Perfect score! You defeated the hacker with excellent security knowledge.";
    } else if (score >= 4) {
      title = "PASSWORD PRO!";
      badge = "🛡️ CYBER DEFENDER";
      icon = "🛡️";
      message =
        "Great work! You have strong cybersecurity instincts. Keep practicing.";
    } else if (score >= 2) {
      title = "DEFENDER IN TRAINING!";
      badge = "🔐 SECURITY TRAINEE";
      icon = "🔐";
      message =
        "You're making progress. Review your security checklist and try again.";
    } else {
      title = "ROOKIE DEFENDER!";
      badge = "⚡ TRAINING INITIATED";
      icon = "⚡";
      message =
        "Every cyber expert starts somewhere. Learn the tips and give it another shot.";
    }
  
    $("resultIcon").textContent = icon;
    $("resultTitle").textContent = title;
    $("resultBadge").textContent = badge;
  
    $("resultMessage").textContent =
      `${message} You answered ${score} out of ${questions.length} questions correctly.`;
  }
  
  $("start").addEventListener("click", startGame);
  
  $("next").addEventListener("click", () => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResults();
    }
  });
  
  $("restart").addEventListener("click", startGame);
  