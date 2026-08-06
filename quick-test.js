(() => {
  const sourceUrl = "quick-test-questions.txt";
  const card = document.querySelector("[data-question-card]");
  const countLabel = document.querySelector("[data-question-count]");
  const statusLabel = document.querySelector("[data-question-status]");
  const syncLabel = document.querySelector("[data-live-sync]");
  const refreshButtons = document.querySelectorAll("[data-refresh-questions]");

  if (!card) return;

  let lastSignature = "";

  const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  function parseQuestionBank(text) {
    return text
      .split(/\n\s*---\s*\n/g)
      .map((block) => block.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#")))
      .map((lines, index) => {
        const item = { id: `q${index + 1}`, question: "" };
        lines.forEach((line) => {
          const match = line.match(/^([A-Za-z]+)\s*:\s*(.*)$/);
          if (!match) return;
          const key = match[1].toUpperCase();
          const value = match[2].trim();
          if (key === "QUESTION") item.question = value;
        });
        return item;
      })
      .filter((item) => item.question);
  }

  function renderQuestions(questions) {
    if (!questions.length) {
      card.innerHTML = `
        <div class="empty-state">
          <span>No questions</span>
          <strong>No valid questions found.</strong>
          <p>Please add questions in quick-test-questions.txt using QUESTION lines.</p>
        </div>`;
      return;
    }

    card.innerHTML = `
      <div class="worksheet-list">
        ${questions.map((question, index) => `
          <article class="worksheet-question">
            <div class="worksheet-number">${String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>${escapeHtml(question.question)}</h3>
              <div class="answer-placeholder" aria-label="Notebook answer placeholder">
                <span>English:</span>
                <i></i>
              </div>
            </div>
          </article>
        `).join("")}
      </div>`;
  }

  async function loadQuestions(manual = false) {
    try {
      if (syncLabel) syncLabel.textContent = manual ? "Refreshing..." : "Auto-sync on";
      const response = await fetch(`${sourceUrl}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Unable to load ${sourceUrl}`);
      const text = await response.text();
      const questions = parseQuestionBank(text);
      const signature = JSON.stringify(questions);
      if (signature !== lastSignature || manual) {
        lastSignature = signature;
        if (countLabel) countLabel.textContent = `${questions.length} question${questions.length === 1 ? "" : "s"}`;
        if (statusLabel) statusLabel.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
        if (syncLabel) syncLabel.textContent = manual ? "Updated now" : "Question bank synced";
        renderQuestions(questions);
      }
    } catch (error) {
      if (countLabel) countLabel.textContent = "Unable to load";
      if (statusLabel) statusLabel.textContent = "Open this page through the local server and check quick-test-questions.txt.";
      if (syncLabel) syncLabel.textContent = "Sync issue";
      card.innerHTML = `
        <div class="empty-state">
          <span>File not loaded</span>
          <strong>Could not read quick-test-questions.txt.</strong>
          <p>Make sure the file exists beside quick-test.html and open the page through your local server.</p>
        </div>`;
    }
  }

  refreshButtons.forEach((button) => button.addEventListener("click", () => loadQuestions(true)));
  loadQuestions();
  window.setInterval(() => loadQuestions(false), 8000);
})();
