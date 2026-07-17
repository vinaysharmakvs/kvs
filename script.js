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
const parentFeedbackForm = document.querySelector("[data-parent-feedback-form]");
const feedbackPercent = document.querySelector("[data-feedback-percent]");
const feedbackMood = document.querySelector("[data-feedback-mood]");
const feedbackProgress = document.querySelector("[data-feedback-progress]");
const feedbackSubmit = document.querySelector("[data-feedback-submit]");
const feedbackValidation = document.querySelector("[data-feedback-validation]");
const feedbackThankYou = document.querySelector("[data-feedback-thank-you]");
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
const studentReportForm = document.querySelector("[data-student-report-form]");
const studentReportOutput = document.querySelector("[data-student-report-output]");
const studentReportButtons = document.querySelectorAll("[data-student-report-action]");
const studentReportValidation = document.querySelector("[data-student-report-validation]");
const studentReportPdf = document.querySelector("[data-student-report-pdf]");
const studentPhotoInput = document.querySelector("[data-student-photo-input]");
const studentClassSelect = document.querySelector("[data-student-class-select]");
const studentNameSelect = document.querySelector("[data-student-name-select]");
const studentTeacherSelect = document.querySelector("[data-student-teacher-select]");
let studentPhotoDataUrl = "";
const studentRosters = {
  "Playway - Alpha": {
    teacher: "Ms Kajal",
    students: [
      "Harshiv Dhiman",
      "Aariv Choudhary",
      "Daksh Manhas",
      "Kiyansh Bhardwaj",
      "Kriday Sharma",
      "Rivaan Sharma",
      "Smarth Thakur",
      "Navikaa Dhiman",
    ],
  },
  "Nursery - Alpha": {
    teacher: "Ms Diksha",
    students: [
      "Prashi Dhiman",
      "Kaviya Sharma",
      "Raghavan Kashyap",
      "Kashvi",
      "Rudraksh Divya Sharma",
      "Wamika Singh",
      "Kashvi",
      "Samayra",
      "Taksh Sharma",
      "Tarish Sharma",
      "Nivisha Sharma",
      "Manya",
      "Suryansh",
      "Diyansh bhardwaj",
      "Anaya Choudhary",
      "Rudraditya Singh Rana",
      "Vanya Sharma",
      "Aarvik narang",
      "Tysha Naharwaria",
      "Shreyansh Rana Rajput",
      "Rabhya Thakur",
      "Agastya Sharma",
      "Rabnoor",
      "Kashvi Modgil",
    ],
  },
  "Nursery - Beta": {
    teacher: "Ms Rubi",
    students: [
      "Prisha Dhiman",
      "Radhika",
      "Aabid Khan",
      "Aadil Khan",
      "Aarav Singh",
      "Naira Sharma",
      "Divyam Sharma",
      "Harnoor Kaur",
      "Samarth Awasti",
      "Gurpreet kaur",
      "Ayaan Sharma",
      "Sanvi Sharma",
      "Shiv Pathania",
      "Manraj Singh",
      "Lakshit Mankotia",
      "Manvik Singh",
      "Vedaant",
      "PranaV Panjla",
      "Vedansh",
      "Samayra",
      "Manvi Sharma",
      "Gunvit Singh",
      "Aarav",
      "Suryansh Sharma",
    ],
  },
  "Nursery - Gamma": {
    teacher: "Ms Meenakshi",
    students: [
      "Advay Pakhreria",
      "Advay Pakhreria",
      "Vedansh Kutlehria",
      "Parineeta",
      "Parineeti",
      "Aashvi Thakur",
      "Shivansh Sharma",
      "Vriha Sharma",
      "Trinaj Kaushal",
      "Hardik Pathania",
      "Amayra Sharma",
      "Saisha Sharma",
      "Aadish",
      "Nyra Thakur",
      "Pranav Pathania",
      "Riyansh Koundal",
      "Agastya Choudhary",
      "Shambhavi Sharma",
      "Kiara Sharma",
      "Manya Sharma",
      "Yadunandan Sharma",
      "Vidushi",
      "Rudraksh",
      "Aadil Sharma",
      "Kavish Choudhary",
      "Mitaksh Pathania",
      "Yashmit Mankotia",
      "Aadhya Singh",
      "Shivansh Guleria",
      "Shinoy Bhardwaj",
    ],
  },
  "LKG - Alpha": {
    teacher: "Ms Darshana",
    students: [
      "Barleen Kaur",
      "Arpit pathania",
      "dhruvit sharma",
      "Aradhya",
      "Prathyush",
      "Atharv mankotia",
      "Anaya",
      "Dhruv Sapehia",
      "KAVISH THAKUR",
      "SHIRIN",
      "KRISHIV RANA",
      "Bhavika",
      "Rushant Guleria",
      "Aarush Singh",
      "Aadvik Samkaria",
      "Anaya",
      "Jasmine Pathania",
      "Rushita Koundal",
      "Jashvi Rana",
      "Rubab Rana",
      "Dhriti Sharma",
      "Krishiv Sharma",
      "Naira",
      "Kashvi",
    ],
  },
  "LKG - Beta": {
    teacher: "Ms Neena",
    students: [
      "Smayra Dhiman",
      "ishan rana",
      "Akshit pathania",
      "Saket",
      "Kairav Sharma",
      "Kanishk",
      "Krishav Thakur",
      "Harleen kaur",
      "Sahibpreet Singh",
      "Shivansh sharma",
      "Jasveen kaur",
      "krishaa thakur",
      "Saransh Guleria",
      "Arindham Bhardwaj",
      "Rounak",
      "Mitansh Thakur",
      "tanishka sandhu",
      "samaira sharma",
      "mishika dhiman",
      "Kiara Dadwal",
      "shivaansh bhardwaj",
      "Gitansh sharma",
      "Samaira Choudhary",
      "Rihan Gaidher",
      "Hitika Kalia",
      "Agamjot Singh",
      "Avyukt Sharma",
    ],
  },
  "LKG - Gamma": {
    teacher: "Ms Puja",
    students: [
      "Mahir Gautam",
      "Atharv Pandit",
      "Chahat Thakur",
      "Dhriti rana",
      "Trishika Guleria",
      "Ekansh",
      "Aashutosh Sharma",
      "Arshveer",
      "Advik pathania",
      "Aaira Sharma",
      "Kridham",
      "Siromani Gandharvika",
      "Daksh rana",
      "Ojasvi thakur",
      "Atharva pathania",
      "Manvik Singh",
      "Yuvik pathania",
      "Aashvi sharma",
      "Keerat",
      "Aashvi",
      "Hetal",
      "Shanaya naryal",
      "Krisha pathania",
      "Parnika Rajput",
      "Swastika Koundal",
      "Avnish choudhary",
      "Saanvi Bhatia",
    ],
  },
  "UKG - Alpha": {
    teacher: "Ms Rajnish",
    students: [
      "Lavit Minahas",
      "Gourish Bhandari",
      "Kartik",
      "Akarsh Singh Mankotia",
      "Inayat Sharma",
      "Navish Sharma",
      "Raghavi",
      "Aadvik Bhardwaj",
      "Mankirat Singh",
      "Sunali Thakur",
      "Aashita Sharma",
      "Parv Dhiman",
      "Aavya Sharma",
      "Rihan Sharma",
      "Aadhvika Sharma",
      "Shivank Sharma",
      "Jasnoor Kaur",
      "Anaya Thakur",
      "Anandit Sandhu",
      "Aahana Pathania",
      "Dipansh",
      "Anayra Rajput",
      "Ayush pathania",
      "Aashvik Dhiman",
      "Viransh",
      "Atharv Rana",
      "Suryansh",
      "Aashvi Singh",
    ],
  },
  "UKG - Beta": {
    teacher: "Ms Priya",
    students: [
      "Aayra Sharma",
      "Abira",
      "Riyansh sharma",
      "Ennayat Kaushal",
      "Shouvik",
      "Anayra Sharma",
      "Avyansh Sharma",
      "Sharvil Dhiman",
      "prabhleen kaur",
      "Aditi mankotia",
      "Abhyuday Singh",
      "navika katoch",
      "Parneet kaur sandhu",
      "avnoor singh",
      "Divyanshi",
      "Aarav Guleria",
      "Saira Sharma",
      "Viraaj veer Sharma",
      "Geetanshi Kutlehria",
      "Mannat",
      "Avni Pathania",
      "Samraat Pathania",
      "Ashita Bhatia",
      "Aadhvik sharma",
      "Kavyansh Dhiman",
      "Sehajleen Kaur",
      "Rudvika",
      "Riyanshi Dhiman",
      "Ritika",
      "Vivan",
    ],
  },
  "Grade 1 - Alpha": {
    teacher: "Ms Shikha",
    students: [
      "Kairav Patiyal",
      "Harshida",
      "Arabjot Singh",
      "Adhira Rana",
      "Abir Sharma",
      "Amyra Bhardwaj",
      "Rutakshya",
      "Twisha",
      "Anaya",
      "Naman Choudhary",
      "Mokshita Sharma",
      "Vansh Rana",
      "Devarsh Pathania",
      "Rutvin Sapehia",
      "Yamya Singh",
      "Ashvik Dhiman",
      "Abhinandan Sharma",
      "Swastik Sharma",
      "Rudraksh Bhardwaj",
      "Mitansh Nangla",
      "Anav Pathania",
    ],
  },
};
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

const studentAssessmentAreas = [
  {
    key: "academic",
    label: "Academic Performance",
    strength: "shows strong classroom understanding and concept clarity",
    improve: "revise classroom concepts through short daily practice",
    parent: "Please ask one simple question daily from the topic covered in class.",
    teacher: "Use quick recap questions before moving to the next concept.",
  },
  {
    key: "readingWriting",
    label: "Reading & Writing",
    strength: "is developing good reading and written expression",
    improve: "strengthen reading fluency, handwriting and sentence formation",
    parent: "Encourage 10-15 minutes of reading aloud and neat writing practice at home.",
    teacher: "Give guided reading turns and short copy-writing support during class.",
  },
  {
    key: "communication",
    label: "Communication",
    strength: "communicates with confidence and clarity",
    improve: "speak more confidently during class conversations",
    parent: "Invite the child to describe their school day in 3-4 complete sentences.",
    teacher: "Offer small speaking opportunities through show-and-tell or question rounds.",
  },
  {
    key: "participation",
    label: "Participation",
    strength: "participates actively in classroom activities",
    improve: "take more initiative during group tasks and class activities",
    parent: "Appreciate every attempt to answer or participate, even when the answer is not perfect.",
    teacher: "Use partner activities to increase comfortable participation.",
  },
  {
    key: "behaviour",
    label: "Behaviour",
    strength: "follows classroom rules and maintains good discipline",
    improve: "follow instructions more consistently during routines",
    parent: "Reinforce polite words, listening habits and simple routines at home.",
    teacher: "Use gentle reminders and visual routine cues during transitions.",
  },
  {
    key: "responsibility",
    label: "Responsibility",
    strength: "shows responsibility with belongings, homework and school habits",
    improve: "build stronger responsibility for belongings, homework and cleanliness",
    parent: "Let the child pack their bag with a small checklist.",
    teacher: "Assign small classroom responsibilities to build ownership.",
  },
  {
    key: "social",
    label: "Social Skills",
    strength: "shares, cooperates and works well with classmates",
    improve: "practice sharing, teamwork and respectful peer interaction",
    parent: "Encourage turn-taking games and polite sharing at home.",
    teacher: "Pair the child with supportive peers for cooperative activities.",
  },
  {
    key: "creativity",
    label: "Creativity",
    strength: "shows creativity during activities and projects",
    improve: "express ideas more freely through art, stories and play",
    parent: "Provide simple drawing, craft or storytelling time without pressure.",
    teacher: "Use open-ended prompts where there is more than one correct answer.",
  },
  {
    key: "attendance",
    label: "Attendance",
    strength: "maintains good attendance and school readiness",
    improve: "improve punctuality and regular attendance",
    parent: "Keep a consistent sleep and morning routine for school readiness.",
    teacher: "Monitor attendance patterns and support settling when the child returns after absence.",
  },
  {
    key: "growth",
    label: "Overall Growth",
    strength: "has shown positive overall growth this month",
    improve: "continue building steady progress across learning and confidence",
    parent: "Celebrate small improvements and keep practice light but regular.",
    teacher: "Set one small weekly goal and acknowledge visible progress.",
  },
];

function getStudentReportData() {
  if (!studentReportForm) return null;
  const formData = new FormData(studentReportForm);
  const scores = studentAssessmentAreas.map((area) => ({
    ...area,
    score: Number(formData.get(area.key) || 0),
  }));
  const total = scores.reduce((sum, area) => sum + area.score, 0);
  const max = scores.length * 5;
  const percent = Math.round((total / max) * 100);
  const average = total / scores.length;
  const grade = average >= 4.5 ? "Excellent" : average >= 3.7 ? "Very Good" : average >= 3 ? "Good" : average >= 2.2 ? "Needs Support" : "Needs Focused Attention";
  return {
    studentName: String(formData.get("studentName") || "").trim(),
    className: String(formData.get("className") || "").trim(),
    month: String(formData.get("month") || "").trim(),
    teacher: String(formData.get("teacher") || "").trim(),
    remarks: String(formData.get("remarks") || "").trim(),
    improvementNote: String(formData.get("improvementNote") || "").trim(),
    studentPhoto: studentPhotoDataUrl,
    scores,
    total,
    max,
    percent,
    average,
    grade,
  };
}

function formatStudentMonth(value) {
  if (!value) return "Month not selected";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function getStudentReportTone(data) {
  if (data.average >= 4.5) return "excellent progress";
  if (data.average >= 3.7) return "very good progress";
  if (data.average >= 3) return "steady progress";
  return "developing progress with focused support";
}

function getTeacherNoteKeywords(text) {
  const value = String(text || "").toLowerCase();
  return {
    learning: /learn|learing|study|academic|concept|understand/.test(value),
    reading: /read|phonics|book/.test(value),
    writing: /writ|handwriting|copy|sentence/.test(value),
    maths: /math|number|count/.test(value),
    communication: /speak|talk|communication|confidence|answer/.test(value),
    behaviour: /behav|discipline|listen|rule|manners/.test(value),
    participation: /participat|activity|group|class/.test(value),
    work: /work|practice|focus|improve|need|weak/.test(value),
    positive: /good|very good|excellent|nice|better|improv|progress/.test(value),
  };
}

function rewriteTeacherObservation(text, firstName) {
  const keywords = getTeacherNoteKeywords(text);
  const strengths = [];
  if (keywords.learning) strengths.push("learning progress");
  if (keywords.reading) strengths.push("reading readiness");
  if (keywords.writing) strengths.push("written work");
  if (keywords.maths) strengths.push("number concepts");
  if (keywords.communication) strengths.push("classroom communication");
  if (keywords.behaviour) strengths.push("classroom behaviour");
  if (keywords.participation) strengths.push("class participation");

  if (strengths.length) {
    return `${firstName} is showing positive development in ${strengths.slice(0, 2).join(" and ")}. The teacher has observed steady effort and encouraging progress during classroom activities.`;
  }

  if (keywords.positive) {
    return `${firstName} is showing good progress this month and is responding well to classroom routines and learning activities.`;
  }

  return `${firstName} is making steady progress this month. The teacher has noted areas that can be supported through regular guidance and encouragement.`;
}

function rewriteImprovementFocus(text, firstName) {
  const keywords = getTeacherNoteKeywords(text);
  const focus = [];
  if (keywords.reading) focus.push("reading practice");
  if (keywords.writing) focus.push("neat written work");
  if (keywords.maths) focus.push("number practice");
  if (keywords.communication) focus.push("speaking confidence");
  if (keywords.behaviour) focus.push("listening and classroom routines");
  if (keywords.participation) focus.push("active class participation");
  if (keywords.learning && !focus.length) focus.push("concept revision");
  if (keywords.work && !focus.length) focus.push("consistent practice");

  if (focus.length) {
    return `${firstName} will benefit from focused support in ${focus.slice(0, 2).join(" and ")}. Short daily practice and gentle encouragement will help build stronger confidence next month.`;
  }

  return `${firstName} should continue receiving guided practice and positive reinforcement so progress remains steady in the coming month.`;
}

function isStudentReportValid() {
  if (!studentReportForm) return false;
  const data = getStudentReportData();
  if (!data) return false;
  return Boolean(
    data.studentName &&
      data.className &&
      data.month &&
      data.teacher &&
      data.remarks &&
      data.improvementNote &&
      data.studentPhoto &&
      data.scores.every((area) => area.score > 0)
  );
}

function updateStudentReportValidation() {
  const valid = isStudentReportValid();
  studentReportButtons.forEach((button) => {
    button.disabled = !valid;
  });
  if (studentReportValidation) studentReportValidation.hidden = valid;
  return valid;
}

function updateStudentStarVisuals() {
  document.querySelectorAll(".star-rating").forEach((group) => {
    const selected = Number(group.querySelector("input:checked")?.value || 0);
    Array.from(group.querySelectorAll("label")).forEach((label, index) => {
      label.classList.toggle("is-filled", index < selected);
    });
  });
}

function applyStudentRosterTags() {
  if (!studentReportForm || !studentClassSelect || !studentNameSelect || !studentTeacherSelect) return;
  const selectedClass = studentClassSelect.value;
  const roster = studentRosters[selectedClass];
  const previousStudent = studentNameSelect.value;

  studentNameSelect.innerHTML = "";
  studentTeacherSelect.innerHTML = "";

  if (!selectedClass) {
    studentNameSelect.disabled = true;
    studentTeacherSelect.disabled = true;
    studentNameSelect.append(new Option("Select class first", ""));
    studentTeacherSelect.append(new Option("Teacher will appear after class selection", ""));
    return;
  }

  if (!roster) {
    studentNameSelect.disabled = true;
    studentTeacherSelect.disabled = true;
    studentNameSelect.append(new Option("No student roster added for this class yet", ""));
    studentTeacherSelect.append(new Option("No teacher tagged for this class yet", ""));
    return;
  }

  studentNameSelect.disabled = false;
  studentTeacherSelect.disabled = false;
  studentNameSelect.append(new Option("Select student", ""));
  roster.students.forEach((student) => {
    studentNameSelect.append(new Option(student, student));
  });
  if (roster.students.includes(previousStudent)) {
    studentNameSelect.value = previousStudent;
  }

  studentTeacherSelect.append(new Option(roster.teacher, roster.teacher));
  studentTeacherSelect.value = roster.teacher;
}

function renderStudentReport(data) {
  if (!studentReportOutput || !data) return;
  const topAreas = [...data.scores].sort((a, b) => b.score - a.score).slice(0, 3);
  const focusAreas = [...data.scores].sort((a, b) => a.score - b.score).slice(0, 3);
  const stars = "★★★★★".slice(0, Math.max(1, Math.round(data.average)));
  const gradeClass = data.average >= 4.5 ? "excellent" : data.average >= 3.7 ? "good" : data.average >= 3 ? "needs" : "attention";
  const firstName = data.studentName.split(" ")[0] || "The student";
  const teacherRemark = data.remarks ? `<p><strong>Teacher observation:</strong> ${rewriteTeacherObservation(data.remarks, firstName)}</p>` : "";
  const improvementRemark = data.improvementNote ? `<p><strong>Focus for next month:</strong> ${rewriteImprovementFocus(data.improvementNote, firstName)}</p>` : "";
  const photoMarkup = data.studentPhoto
    ? `<img class="student-report-photo" src="${data.studentPhoto}" alt="${data.studentName} photo" />`
    : `<div class="student-report-photo is-placeholder"><span>${firstName.charAt(0).toUpperCase()}</span></div>`;

  studentReportOutput.innerHTML = `
    <div class="report-card report-dashboard student-monthly-report">
      <div class="report-topline">
        <div class="student-report-title">
          ${photoMarkup}
          <div>
            <p class="eyebrow">Monthly student report</p>
            <h2>${data.studentName} - ${formatStudentMonth(data.month)}</h2>
            <p>${data.className} · ${data.teacher}</p>
          </div>
        </div>
        <div class="score-ring ${gradeClass}"><strong>${data.percent}%</strong><span>${data.grade}</span></div>
      </div>

      <div class="report-stat-grid">
        <article><span>Overall Grade</span><strong>${data.grade}</strong><small>${stars}</small></article>
        <article><span>Total Score</span><strong>${data.total}/${data.max}</strong><small>${data.average.toFixed(1)}/5 average</small></article>
        <article><span>Top Strength</span><strong>${topAreas[0]?.label || "Not available"}</strong><small>${topAreas[0]?.score || 0}/5</small></article>
        <article><span>Focus Area</span><strong>${focusAreas[0]?.label || "Not available"}</strong><small>${focusAreas[0]?.score || 0}/5</small></article>
      </div>

      <section class="report-panel student-feedback-panel">
        <h3>Overall Feedback</h3>
        <p>${data.studentName} has shown ${getStudentReportTone(data)} this month. ${firstName} is strongest in ${topAreas.map((area) => area.label.toLowerCase()).join(", ")}. With continued support in ${focusAreas[0]?.label.toLowerCase() || "key learning habits"}, ${firstName} can build stronger confidence and consistency in the coming month.</p>
        ${teacherRemark}
        ${improvementRemark}
      </section>

      <h3>Area-wise Ratings</h3>
      <div class="score-bars">
        ${data.scores.map((area) => `<div class="score-bar-row"><div><strong>${area.label}</strong><small>${area.score}/5 rating</small></div><span>${"★★★★★".slice(0, area.score)}</span><progress max="5" value="${area.score}"></progress></div>`).join("")}
      </div>

      <div class="report-columns">
        <section class="report-panel strengths-panel"><h3>Strengths</h3><ul>${topAreas.map((area) => `<li>${firstName} ${area.strength}.</li>`).join("")}</ul></section>
        <section class="report-panel improvement-panel"><h3>Areas of Improvement</h3><ul>${focusAreas.map((area) => `<li>${area.improve}.</li>`).join("")}</ul></section>
      </div>

      <div class="report-columns">
        <section class="report-panel suggestion-panel"><h3>Parent Suggestions</h3><ul>${focusAreas.map((area) => `<li>${area.parent}</li>`).join("")}</ul></section>
        <section class="report-panel teacher-suggestion-panel"><h3>Teacher Suggestions</h3><ul>${focusAreas.map((area) => `<li>${area.teacher}</li>`).join("")}</ul></section>
      </div>
    </div>
  `;
}

studentReportForm?.addEventListener("input", () => {
  applyStudentRosterTags();
  updateStudentReportValidation();
});
studentReportForm?.addEventListener("change", () => {
  applyStudentRosterTags();
  updateStudentStarVisuals();
  updateStudentReportValidation();
});

studentPhotoInput?.addEventListener("change", () => {
  const file = studentPhotoInput.files?.[0];
  if (!file) {
    studentPhotoDataUrl = "";
    updateStudentReportValidation();
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    studentPhotoDataUrl = String(reader.result || "");
    updateStudentReportValidation();
  });
  reader.readAsDataURL(file);
});

studentReportForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!updateStudentReportValidation()) return;
  renderStudentReport(getStudentReportData());
});

studentReportPdf?.addEventListener("click", () => {
  const data = getStudentReportData();
  if (!data || !updateStudentReportValidation()) return;
  renderStudentReport(data);
  window.print();
});

if (studentReportForm) {
  const now = new Date();
  studentReportForm.elements.month.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  applyStudentRosterTags();
  updateStudentStarVisuals();
  updateStudentReportValidation();
}

const feedbackCategories = [
  { label: "Teacher", fields: ["teacherAttention", "teacherComfort", "teacherLearning"] },
  { label: "Operations", fields: ["opsUpdates", "opsTechnology", "opsSafety"] },
  { label: "Founders", fields: ["founderApproach", "founderListening", "founderTrust"] },
  { label: "Transport", fields: ["transportTiming", "transportSafety", "transportCommunication"] },
];
const feedbackFields = feedbackCategories.flatMap((category) => category.fields);
const feedbackGoogleFormEndpoint = "https://docs.google.com/forms/d/e/1FAIpQLSd_gtfABfJjeWceDpiXn8msu_oDY44XINnInovsIhdcwf67Kw/formResponse";
const feedbackPendingKey = "kidsversePendingParentFeedback";
const feedbackGoogleEntryMap = {
  parentName: "entry.531725399",
  parentPhone: "entry.1055010208",
  studentName: "entry.30854622",
  childClass: "entry.725294418",
  teacherAttention: "entry.1232646832",
  teacherComfort: "entry.1719162783",
  teacherLearning: "entry.1940244171",
  opsUpdates: "entry.1210229565",
  opsTechnology: "entry.730050687",
  opsSafety: "entry.1060265380",
  founderApproach: "entry.1328171448",
  founderListening: "entry.265137716",
  founderTrust: "entry.1410430860",
  transportTiming: "entry.1085153353",
  transportSafety: "entry.489999209",
  transportCommunication: "entry.1857715293",
  suggestion: "entry.817929326",
};

function getFeedbackData() {
  if (!parentFeedbackForm) return null;
  const formData = new FormData(parentFeedbackForm);
  const fieldValues = Object.fromEntries(
    ["parentName", "parentPhone", "studentName", "childClass", ...feedbackFields, "suggestion"].map((field) => [
      field,
      String(formData.get(field) || "").trim(),
    ])
  );
  const ratings = feedbackFields.map((field) => Number(formData.get(field) || 0));
  const completedRatings = ratings.filter(Boolean);
  const average = completedRatings.length ? completedRatings.reduce((sum, value) => sum + value, 0) / completedRatings.length : 0;
  const percent = Math.round((average / 5) * 100);
  const categories = feedbackCategories.map((category) => {
    const values = category.fields.map((field) => Number(formData.get(field) || 0));
    const completed = values.filter(Boolean);
    const categoryAverage = completed.length ? completed.reduce((sum, value) => sum + value, 0) / completed.length : 0;
    return {
      label: category.label,
      values,
      score: categoryAverage ? Math.round((categoryAverage / 5) * 100) : 0,
      average: categoryAverage ? categoryAverage.toFixed(1) : "0.0",
    };
  });
  return {
    ...fieldValues,
    fieldValues,
    ratings,
    completedRatings,
    categories,
    percent,
  };
}

function getFeedbackGooglePayload(data) {
  const params = new URLSearchParams();
  Object.entries(feedbackGoogleEntryMap).forEach(([field, entry]) => {
    params.set(entry, data.fieldValues[field] || "");
  });
  return params;
}

async function submitFeedbackToGoogleForm(data) {
  if (!feedbackGoogleFormEndpoint) return false;
  const payload = getFeedbackGooglePayload(data);

  if (window.location.protocol === "file:") {
    try {
      localStorage.setItem(feedbackPendingKey, payload.toString());
    } catch (error) {
      console.warn("Kidsverse feedback could not be saved for later submission.", error);
    }
    return false;
  }

  try {
    await fetch(feedbackGoogleFormEndpoint, {
      method: "POST",
      mode: "no-cors",
      body: payload,
    });
    return true;
  } catch (error) {
    console.warn("Kidsverse feedback Google Form submission failed", error);
    return false;
  }
}

function submitPendingFeedbackToGoogleForm() {
  if (!feedbackGoogleFormEndpoint || window.location.protocol === "file:") return;
  const pendingPayload = localStorage.getItem(feedbackPendingKey);
  if (!pendingPayload) return;

  fetch(feedbackGoogleFormEndpoint, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(pendingPayload),
  })
    .then(() => localStorage.removeItem(feedbackPendingKey))
    .catch((error) => {
      console.warn("Pending Kidsverse feedback could not be submitted.", error);
    });
}

function getFeedbackMood(percent, complete) {
  if (!complete) return "Please complete all parent happiness questions.";
  if (percent >= 90) return "Excellent parent happiness";
  if (percent >= 75) return "Good experience with room to improve";
  if (percent >= 60) return "Needs focused improvement";
  return "Needs immediate attention";
}

function updateFeedbackState() {
  const data = getFeedbackData();
  if (!data) return false;
  const complete = Boolean(data.parentName && data.parentPhone && data.studentName && data.childClass && data.completedRatings.length === feedbackFields.length);
  if (feedbackPercent) feedbackPercent.textContent = `${complete ? data.percent : 0}%`;
  if (feedbackProgress) feedbackProgress.value = complete ? data.percent : 0;
  if (feedbackMood) feedbackMood.textContent = getFeedbackMood(data.percent, complete);
  if (feedbackSubmit) feedbackSubmit.disabled = !complete;
  if (feedbackValidation) feedbackValidation.hidden = complete;
  return complete;
}

parentFeedbackForm?.addEventListener("input", updateFeedbackState);
parentFeedbackForm?.addEventListener("change", updateFeedbackState);

parentFeedbackForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!updateFeedbackState()) return;
  const data = getFeedbackData();
  if (!data) return;
  const allGreat = data.ratings.every((rating) => rating === 5);
  const submitted = await submitFeedbackToGoogleForm(data);
  if (feedbackThankYou) {
    feedbackThankYou.hidden = false;
    feedbackThankYou.innerHTML = allGreat
      ? `<strong>Thank you for sharing your valuable feedback.</strong><p>${submitted ? "Your feedback has been recorded." : "Your feedback has been saved and will sync when the website is opened online."} We will definitely work on making Kidsverse the best school for your child education.</p><a class="primary-button" href="https://g.co/kgs/Q9A7iHY" target="_blank" rel="noopener noreferrer">Please rate us 5 star on Google</a>`
      : `<strong>Thank you for sharing your valuable feedback.</strong><p>${submitted ? "Your feedback has been recorded." : "Your feedback has been saved and will sync when the website is opened online."} We will definitely work on making Kidsverse the best school for your child education.</p>`;
    feedbackThankYou.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

if (parentFeedbackForm) {
  updateFeedbackState();
  submitPendingFeedbackToGoogleForm();
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
