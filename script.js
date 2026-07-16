const menuButton = document.querySelector("[data-menu-button]");
const siteHeader = document.querySelector(".site-header");
const gradeButtons = document.querySelectorAll("[data-grade]");
const gradeResult = document.querySelector("[data-grade-result]");
const inquiryForm = document.querySelector(".inquiry-form");
const kiyaWidget = document.querySelector("[data-kiya-widget]");
const kiyaToggle = document.querySelector("[data-kiya-toggle]");
const kiyaPanel = document.querySelector("[data-kiya-panel]");
const kiyaClose = document.querySelector("[data-kiya-close]");
const readinessForm = document.querySelector("[data-readiness-form]");
const readinessResult = document.querySelector("[data-readiness-result]");
const teacherLogin = document.querySelector("[data-teacher-login]");
const teacherLock = document.querySelector("[data-teacher-lock]");
const lockError = document.querySelector("[data-lock-error]");
const teacherPasscode = "Kidsverse@2026";
const teacherAccessKey = "kidsverseTeacherAssessmentAccess";

const gradeData = {
  "ukg-2": {
    label: "Foundation and confidence support",
    title: "Reading, writing, numbers, spoken English and daily study discipline.",
    text: "For younger learners, we focus on homework rhythm, neat work, classroom confidence, basic concepts and communication comfort.",
  },
  "3-5": {
    label: "Strong habits and exam readiness",
    title: "Concept clarity, disciplined practice and confident communication.",
    text: "Students build stronger basics, English speaking comfort, written practice, revision habits and early competitive exam awareness.",
  },
  "6-8": {
    label: "Middle school mentoring",
    title: "Academics, personality development and Sainik/Navodaya direction.",
    text: "We support school subjects, assignments, reasoning practice, communication, discipline and focused preparation for Sainik School and Navodaya exams.",
  },
  "9-10": {
    label: "High school exam support",
    title: "Exam preparation, revision discipline and confident performance.",
    text: "For Grade 9 and 10, the focus moves toward subject clarity, planned revision, doubt-solving, presentation skills and exam confidence.",
  },
};

function renderGrade(key) {
  const data = gradeData[key] || gradeData["ukg-2"];
  if (!gradeResult) return;
  gradeResult.innerHTML = `<span>${data.label}</span><h3>${data.title}</h3><p>${data.text}</p>`;
}

menuButton?.addEventListener("click", () => {
  const open = siteHeader.classList.toggle("is-open");
  menuButton.textContent = open ? "Close" : "Menu";
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.classList.remove("is-open");
    if (menuButton) {
      menuButton.textContent = "Menu";
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

gradeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    gradeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderGrade(button.dataset.grade);
  });
});

inquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const message = encodeURIComponent(
    `Hello Kidsverse School Rehan, I want to enquire. Parent: ${data.get("name")}. Mobile: ${data.get("phone")}. Program: ${data.get("program")}. Child age/grade: ${data.get("age")}.`
  );
  window.open(`https://wa.me/918826758881?text=${message}`, "_blank", "noopener,noreferrer");
});

function setKiyaOpen(open) {
  if (!kiyaWidget || !kiyaToggle || !kiyaPanel) return;
  kiyaWidget.classList.toggle("is-open", open);
  kiyaPanel.hidden = !open;
  kiyaToggle.setAttribute("aria-expanded", String(open));
}

kiyaToggle?.addEventListener("click", () => {
  setKiyaOpen(!kiyaWidget?.classList.contains("is-open"));
});

kiyaClose?.addEventListener("click", () => {
  setKiyaOpen(false);
});

document.querySelectorAll(".kiya-links a").forEach((link) => {
  link.addEventListener("click", () => setKiyaOpen(false));
});

function unlockTeacherAssessment() {
  document.body.classList.remove("is-locked");
  if (teacherLock) teacherLock.hidden = true;
}

if (teacherLogin && localStorage.getItem(teacherAccessKey) === "granted") {
  unlockTeacherAssessment();
}

teacherLogin?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(teacherLogin);
  if (formData.get("passcode") === teacherPasscode) {
    localStorage.setItem(teacherAccessKey, "granted");
    unlockTeacherAssessment();
  } else if (lockError) {
    lockError.hidden = false;
  }
});

const cultureForm = document.querySelector("[data-culture-form]");
const cultureReport = document.querySelector("[data-culture-report]");
const pdfAssessmentButton = document.querySelector("[data-pdf-assessment]");
const assessmentActionButtons = document.querySelectorAll("[data-assessment-action]");
const assessmentValidation = document.querySelector("[data-assessment-validation]");
const cultureAreas = [
  { key: "greetings", label: "Respect & Greetings", strength: "Students greet teachers and visitors confidently.", improve: "Practice daily greeting routines and standing response." },
  { key: "walking", label: "Walking Discipline", strength: "Students move in lines with good control.", improve: "Improve silent walking, line formation and monitor-led movement." },
  { key: "water", label: "Water & Washroom Discipline", strength: "Students follow washroom and water routines responsibly.", improve: "Remind children to take permission, return quietly and close taps." },
  { key: "environment", label: "Environmental Awareness", strength: "Students show care for classroom resources.", improve: "Assign energy and water monitors to switch off lights, fans and taps." },
  { key: "classroom", label: "Classroom Behaviour", strength: "Students listen, sit properly and follow classroom instructions.", improve: "Reinforce hand-raising, silence practice and active listening." },
  { key: "property", label: "Respect for School Property", strength: "Students care for books, desks and classroom materials.", improve: "Use a responsibility chart for books, dustbins and shared materials." },
  { key: "personal", label: "Personal Discipline", strength: "Students maintain personal grooming and school readiness.", improve: "Add a weekly uniform, nails, shoes and ID-card reminder." },
  { key: "values", label: "Values", strength: "Students show kindness, sharing and polite communication.", improve: "Use values role play for please, sorry, thank you and helping habits." },
];

function getCultureData() {
  if (!cultureForm) return null;
  const formData = new FormData(cultureForm);
  const scores = cultureAreas.map((area) => {
    const card = cultureForm.querySelector(`[data-area="${area.key}"]`);
    const checkboxes = Array.from(card?.querySelectorAll('input[type="checkbox"]') || []);
    const checked = checkboxes.filter((checkbox) => checkbox.checked).length;
    const maxChecks = checkboxes.length || 1;
    const score = Math.round((checked / maxChecks) * 10);
    return {
      ...area,
      score,
      checked,
      maxChecks,
    };
  });
  const total = scores.reduce((sum, area) => sum + area.score, 0);
  const max = scores.length * 10;
  const percent = Math.round((total / max) * 100);
  const grade = percent >= 90 ? "Excellent" : percent >= 75 ? "Good" : percent >= 60 ? "Needs Improvement" : "Immediate Attention";
  return {
    id: Date.now(),
    date: formData.get("date"),
    observer: formData.get("observer"),
    className: formData.get("className"),
    teacher: formData.get("teacher"),
    notes: formData.get("notes"),
    scores,
    total,
    max,
    percent,
    grade,
  };
}

function renderCultureReport(data) {
  if (!cultureReport || !data) return;
  const topAreas = [...data.scores].sort((a, b) => b.score - a.score).slice(0, 3);
  const weakAreas = [...data.scores].sort((a, b) => a.score - b.score).slice(0, 3);
  const stars = "★★★★★".slice(0, Math.max(1, Math.round(data.percent / 20)));
  const gradeClass = data.percent >= 90 ? "excellent" : data.percent >= 75 ? "good" : data.percent >= 60 ? "needs" : "attention";
  cultureReport.innerHTML = `
    <div class="report-card report-dashboard">
      <div class="report-topline">
        <div>
          <p class="eyebrow">Generated analysis</p>
          <h2>${data.className || "Class"} Culture Dashboard</h2>
          <p>${data.date || "Date not added"} · ${data.teacher || "Teacher not selected"} · ${data.observer || "Class Teacher"}</p>
        </div>
        <div class="score-ring ${gradeClass}"><strong>${data.percent}%</strong><span>${data.grade}</span></div>
      </div>

      <div class="report-stat-grid">
        <article><span>Overall</span><strong>${data.total}/${data.max}</strong><small>Total score</small></article>
        <article><span>Grade</span><strong>${data.grade}</strong><small>${stars}</small></article>
        <article><span>Top Area</span><strong>${topAreas[0]?.label || "Not available"}</strong><small>${topAreas[0]?.score || 0}/10</small></article>
        <article><span>Needs Focus</span><strong>${weakAreas[0]?.label || "Not available"}</strong><small>${weakAreas[0]?.score || 0}/10</small></article>
      </div>

      <h3>Area-wise Score</h3>
      <div class="score-bars">
        ${data.scores.map((area) => `<div class="score-bar-row"><div><strong>${area.label}</strong><small>${area.checked}/${area.maxChecks} habits observed</small></div><span>${area.score}/10</span><progress max="10" value="${area.score}"></progress></div>`).join("")}
      </div>

      <div class="report-columns">
        <section class="report-panel strengths-panel"><h3>Strengths</h3><ul>${topAreas.map((area) => `<li>${area.strength}</li>`).join("")}</ul></section>
        <section class="report-panel improvement-panel"><h3>Areas for Improvement</h3><ul>${weakAreas.map((area) => `<li>${area.improve}</li>`).join("")}</ul></section>
      </div>

      <section class="report-panel suggestion-panel">
        <h3>Suggestions for Teacher</h3>
        <ul>
          <li>Greeting Circle Activity</li>
          <li>Classroom Responsibility Chart</li>
          <li>Energy Saving Monitor</li>
          <li>Silent Walking Practice</li>
          <li>Save Water Campaign</li>
        </ul>
      </section>
    </div>
  `;
}

function getCultureAnalysisText(data) {
  if (!data) return "";
  const topAreas = [...data.scores].sort((a, b) => b.score - a.score).slice(0, 3);
  const weakAreas = [...data.scores].sort((a, b) => a.score - b.score).slice(0, 3);
  return [
    "Kidsverse School Rehan",
    "Class Culture Assessment",
    "",
    `Date: ${data.date || "Not added"}`,
    `Audit conducted by: ${data.observer || "Class Teacher"}`,
    `Class: ${data.className || "Not selected"}`,
    `Class Teacher: ${data.teacher || "Not selected"}`,
    `Overall Score: ${data.percent}% (${data.grade})`,
    `Total: ${data.total}/${data.max}`,
    data.notes ? `Notes: ${data.notes}` : "",
    "",
    "Area Scores:",
    ...data.scores.map((area) => `- ${area.label}: ${area.score}/10 (${area.checked}/${area.maxChecks} habits observed)`),
    "",
    "Strengths:",
    ...topAreas.map((area) => `- ${area.strength}`),
    "",
    "Areas for Improvement:",
    ...weakAreas.map((area) => `- ${area.improve}`),
    "",
    "Suggestions for Teacher:",
    "- Greeting Circle Activity",
    "- Classroom Responsibility Chart",
    "- Energy Saving Monitor",
    "- Silent Walking Practice",
    "- Save Water Campaign",
  ].filter(Boolean).join("\n");
}

function updateAutoScores() {
  document.querySelectorAll("[data-area-card]").forEach((card) => {
    const checkboxes = Array.from(card.querySelectorAll('input[type="checkbox"]'));
    const checked = checkboxes.filter((checkbox) => checkbox.checked).length;
    const score = checkboxes.length ? Math.round((checked / checkboxes.length) * 10) : 0;
    const scoreBadge = card.querySelector("[data-auto-score]");
    if (scoreBadge) scoreBadge.textContent = `${score}/10`;
  });
}

function isAssessmentValid() {
  if (!cultureForm) return false;
  const formData = new FormData(cultureForm);
  const hasRequiredDetails = Boolean(formData.get("date") && formData.get("className") && formData.get("teacher"));
  const hasObservation = Array.from(cultureForm.querySelectorAll('[data-area-card] input[type="checkbox"]')).some((checkbox) => checkbox.checked);
  return hasRequiredDetails && hasObservation;
}

function updateAssessmentValidation() {
  const valid = isAssessmentValid();
  assessmentActionButtons.forEach((button) => {
    button.disabled = !valid;
  });
  if (assessmentValidation) {
    assessmentValidation.hidden = valid;
  }
  return valid;
}

document.querySelectorAll('[data-area-card] input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateAutoScores();
    updateAssessmentValidation();
  });
});

cultureForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!updateAssessmentValidation()) return;
  renderCultureReport(getCultureData());
});

cultureForm?.addEventListener("input", updateAssessmentValidation);
cultureForm?.addEventListener("change", updateAssessmentValidation);

pdfAssessmentButton?.addEventListener("click", () => {
  const data = getCultureData();
  if (!data || !updateAssessmentValidation()) return;
  renderCultureReport(data);
  window.print();
});

if (cultureForm) {
  cultureForm.elements.date.valueAsDate = new Date();
  updateAutoScores();
  updateAssessmentValidation();
}

readinessForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!readinessResult) return;

  const data = new FormData(readinessForm);
  const childName = String(data.get("childName") || "Your child").trim() || "Your child";
  const values = ["communication", "social", "motor", "routine", "learning"].map((key) => Number(data.get(key) || 0));
  const total = values.reduce((sum, value) => sum + value, 0);
  const percent = Math.round((total / 15) * 100);
  let title = "Nursery ready with gentle support";
  let note = "Your child is showing many readiness signs. A school visit can help us understand comfort, confidence and the right starting routine.";

  if (percent < 55) {
    title = "Building readiness step by step";
    note = "Your child may benefit from gentle settling, speaking practice, routines and playful activities before a full Nursery rhythm.";
  } else if (percent >= 78) {
    title = "Strong Nursery readiness signs";
    note = "Your child is showing good signs across communication, routines, social comfort and learning habits. A visit can confirm the best fit.";
  }

  const message = encodeURIComponent(
    `Hello Kidsverse School, I completed the Nursery Readiness Check for ${childName}. Score: ${percent}%. Please guide me on the right class and school visit.`
  );

  readinessResult.hidden = false;
  readinessResult.innerHTML = `
    <span>Readiness view</span>
    <strong>${percent}%</strong>
    <h3>${title}</h3>
    <p>${note}</p>
    <div class="readiness-result-actions">
      <a class="primary-button" href="https://wa.me/918826758881?text=${message}" target="_blank" rel="noopener noreferrer">Discuss With Kidsverse</a>
      <a class="secondary-button" href="nursery.html">View Nursery Programme</a>
    </div>
  `;
  readinessResult.scrollIntoView({ behavior: "smooth", block: "center" });
});
