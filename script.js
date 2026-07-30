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
const teacherResourceLogin = document.querySelector("[data-resource-login]");
const teacherResourceLock = document.querySelector("[data-resource-lock]");
const teacherResourceError = document.querySelector("[data-resource-lock-error]");
const teacherResourceClassSelect = document.querySelector("[data-resource-class-select]");
const teacherResourceActiveLabel = document.querySelector("[data-resource-active-label]");
const teacherResourceSwitch = document.querySelector("[data-resource-switch]");
const teacherResourceClassButtons = document.querySelectorAll("[data-resource-class-jump]");
const teacherResourcePasscodes = {
  playway: "Playway@2026",
  nursery: "Nursery@2026",
  lkg: "LKG@2026",
  ukg: "UKG@2026",
  grade1: "Grade1@2026",
};
const teacherResourceLabels = {
  playway: "Playway",
  nursery: "Nursery",
  lkg: "LKG",
  ukg: "UKG",
  grade1: "Grade 1",
};
const teacherResourceAccessKey = "kidsverseTeacherResourceAccess";

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

function getRootPath() {
  return window.location.pathname.includes("/after-school/") ? "../" : "";
}

function enhanceAfterSchoolMenu() {
  document.querySelectorAll(".nav-links").forEach((nav) => {
    const hasAfterSchoolDropdown = [...nav.querySelectorAll(".nav-dropdown .nav-parent")].some(
      (link) => link.textContent.trim().toLowerCase() === "after school"
    );
    if (hasAfterSchoolDropdown) return;

    const afterSchoolLink = [...nav.children].find(
      (child) => child.matches?.("a") && child.textContent.trim().toLowerCase() === "after school"
    );
    if (!afterSchoolLink) return;

    const root = getRootPath();
    const dropdown = document.createElement("div");
    dropdown.className = "nav-dropdown after-school-nav-dropdown";
    dropdown.innerHTML = `
      <a class="nav-parent" href="${root}after-school.html">After School</a>
      <div class="nav-menu nav-menu-learning">
        <a href="${root}after-school.html">After School Overview</a>
        <a class="nav-menu-label" href="${root}after-school/present-tense.html">English Learning Lab</a>
        <a class="nav-sub-link" href="${root}after-school/present-tense.html">Present Tense</a>
        <a class="nav-sub-link" href="${root}after-school/past-tense.html">Past Tense</a>
        <a class="nav-sub-link" href="${root}after-school/future-tense.html">Future Tense</a>
        <a class="nav-sub-link" href="${root}after-school/daily-routine-verbs.html">Daily Routine Verbs</a>
        <a class="nav-sub-link" href="${root}after-school/reading-fluency.html">Reading Fluency</a>
      </div>
    `;
    afterSchoolLink.replaceWith(dropdown);
  });
}

enhanceAfterSchoolMenu();

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

function enhanceKiyaLearningLinks() {
  document.querySelectorAll(".kiya-links").forEach((links) => {
    const labRoot = window.location.pathname.includes("/after-school/") ? "" : "after-school/";
    const learningLinks = [
      { href: `${labRoot}present-tense.html`, label: "Present Tense Lab" },
      { href: `${labRoot}past-tense.html`, label: "Past Tense Lab" },
      { href: `${labRoot}future-tense.html`, label: "Future Tense Lab" },
      { href: `${labRoot}daily-routine-verbs.html`, label: "Daily Routine Verbs" },
      { href: `${labRoot}reading-fluency.html`, label: "Reading Fluency" },
    ];

    learningLinks.forEach((item) => {
      const alreadyExists = [...links.querySelectorAll("a")].some((link) => link.getAttribute("href") === item.href || link.textContent.trim() === item.label);
      if (alreadyExists) return;
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      links.appendChild(link);
    });
  });

  document.querySelectorAll(".kiya-body > p").forEach((intro) => {
    if (intro.dataset.learningUpdated) return;
    intro.textContent = "Namaste. I can help you open admission, programmes, English grammar labs, daily verbs and reading fluency practice.";
    intro.dataset.learningUpdated = "true";
  });
}

enhanceKiyaLearningLinks();

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

function showTeacherResourceClass(classKey) {
  const label = teacherResourceLabels[classKey] || "Selected class";
  document.body.classList.remove("is-locked");
  if (teacherResourceLock) teacherResourceLock.hidden = true;
  if (teacherResourceActiveLabel) teacherResourceActiveLabel.textContent = `${label} resource opened`;
  document.querySelectorAll("[data-resource-class]").forEach((section) => {
    section.hidden = section.dataset.resourceClass !== classKey;
  });
  teacherResourceClassButtons.forEach((button) => {
    const active = button.dataset.resourceClassJump === classKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function lockTeacherResource(preselectClass = "") {
  document.body.classList.add("is-locked");
  if (teacherResourceLock) teacherResourceLock.hidden = false;
  if (teacherResourceClassSelect && preselectClass) teacherResourceClassSelect.value = preselectClass;
  if (teacherResourceLogin) teacherResourceLogin.reset();
  if (teacherResourceClassSelect && preselectClass) teacherResourceClassSelect.value = preselectClass;
  if (teacherResourceError) teacherResourceError.hidden = true;
}

function getTeacherResourceQueryAccess() {
  const params = new URLSearchParams(window.location.search);
  const classKey = String(params.get("resourceClass") || "").trim().toLowerCase();
  const passcode = String(params.get("passcode") || "").trim();
  if (teacherResourcePasscodes[classKey] && teacherResourcePasscodes[classKey] === passcode) return classKey;
  return "";
}

if (teacherResourceLogin) {
  const queryClass = getTeacherResourceQueryAccess();
  const savedClass = sessionStorage.getItem(teacherResourceAccessKey);
  if (queryClass) {
    sessionStorage.setItem(teacherResourceAccessKey, queryClass);
    showTeacherResourceClass(queryClass);
  } else if (savedClass && teacherResourcePasscodes[savedClass]) showTeacherResourceClass(savedClass);
  else document.querySelectorAll("[data-resource-class]").forEach((section) => {
    section.hidden = true;
  });
}

teacherResourceLogin?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(teacherResourceLogin);
  const classKey = data.get("resourceClass");
  const passcode = data.get("passcode");
  if (teacherResourcePasscodes[classKey] && teacherResourcePasscodes[classKey] === passcode) {
    sessionStorage.setItem(teacherResourceAccessKey, classKey);
    if (teacherResourceError) teacherResourceError.hidden = true;
    showTeacherResourceClass(classKey);
    return;
  }
  if (teacherResourceError) teacherResourceError.hidden = false;
});

teacherResourceSwitch?.addEventListener("click", () => {
  sessionStorage.removeItem(teacherResourceAccessKey);
  lockTeacherResource();
});

teacherResourceClassButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const classKey = button.dataset.resourceClassJump;
    const savedClass = sessionStorage.getItem(teacherResourceAccessKey);
    if (savedClass === classKey) {
      showTeacherResourceClass(classKey);
      return;
    }
    sessionStorage.removeItem(teacherResourceAccessKey);
    lockTeacherResource(classKey);
  });
});

function initTeacherResourceAudio() {
  document.querySelectorAll(".teacher-resource-page .resource-card-grid li, .teacher-resource-page .resource-card-grid article > p").forEach((line) => {
    if (line.querySelector("[data-resource-audio]")) return;
    const text = line.textContent.trim();
    if (!text) return;
    const button = document.createElement("button");
    button.className = "resource-audio-button";
    button.type = "button";
    button.dataset.resourceAudio = text;
    button.textContent = "Listen";
    button.setAttribute("aria-label", `Listen to: ${text}`);
    button.addEventListener("click", () => speakRoutineText(text, button));
    line.appendChild(button);
  });
}

initTeacherResourceAudio();

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
const teacherReadingForm = document.querySelector("[data-teacher-reading-form]");
const teacherReadingName = document.querySelector("[data-teacher-reading-name]");
const teacherReadingOtherWrap = document.querySelector("[data-teacher-reading-other-wrap]");
const teacherReadingOther = document.querySelector("[data-teacher-reading-other]");
const teacherReadingPhotoInput = document.querySelector("[data-teacher-reading-photo]");
const teacherReadingPhotoPreview = document.querySelector("[data-teacher-reading-photo-preview]");
const teacherReadingPassageWrap = document.querySelector("[data-teacher-reading-passages]");
const teacherReadingReport = document.querySelector("[data-teacher-reading-report]");
const teacherReadingValidation = document.querySelector("[data-teacher-reading-validation]");
const teacherReadingPrint = document.querySelector("[data-teacher-reading-print]");
let studentPhotoDataUrl = "";
let teacherReadingPhotoDataUrl = "";
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

const teacherReadingPassages = [
  "A good early years classroom is calm, warm and purposeful. Children learn better when the teacher speaks clearly, gives simple instructions and uses patient encouragement.",
  "Reading aloud is not only about speed. A strong reader uses correct pronunciation, natural pauses, clear voice and expression so that children can understand the meaning.",
  "When a child struggles with a word, the teacher should slow down, break the sound gently and help the child try again with confidence instead of pressure.",
  "Stories help young learners build imagination, vocabulary and listening habits. A teacher who reads with expression can make even a simple paragraph feel interesting.",
  "In a caring school environment, teachers observe every child closely. They notice confidence, comfort, participation and progress before deciding the next learning step.",
];

const teacherReadingState = teacherReadingPassages.map(() => ({ transcript: "", accuracy: 0, attempted: false, missed: [], extra: [] }));

function scoreTeacherReading(expectedText, spokenText) {
  const expectedWords = normalizeReadingWords(expectedText);
  const spokenWords = normalizeReadingWords(spokenText);
  const spokenPool = [...spokenWords];
  let correct = 0;
  const missed = [];

  expectedWords.forEach((word) => {
    const index = spokenPool.indexOf(word);
    if (index >= 0) {
      correct += 1;
      spokenPool.splice(index, 1);
    } else {
      missed.push(word);
    }
  });

  return {
    accuracy: expectedWords.length ? Math.round((correct / expectedWords.length) * 100) : 0,
    missed: uniqueWordList(missed),
    extra: uniqueWordList(spokenPool),
  };
}

function renderTeacherReadingPassages() {
  if (!teacherReadingPassageWrap) return;
  teacherReadingPassageWrap.innerHTML = teacherReadingPassages
    .map(
      (text, index) => `
        <article class="teacher-reading-passage-card" data-teacher-reading-card="${index}">
          <div>
            <span>Passage ${index + 1} of 5</span>
            <p>${text}</p>
          </div>
          <div class="teacher-reading-card-actions">
            <button class="tense-audio-button" type="button" data-teacher-reading-listen="${index}">Listen sample</button>
            <button class="primary-button" type="button" data-teacher-reading-start="${index}">Start reading</button>
            <button class="secondary-button" type="button" data-teacher-reading-stop="${index}" hidden>Stop</button>
          </div>
          <div class="reading-listening-indicator" data-teacher-reading-indicator="${index}" hidden><i aria-hidden="true"></i><span>I am listening. Read slowly.</span></div>
          <div class="teacher-reading-live-result">
            <strong data-teacher-reading-score="${index}">Not attempted</strong>
            <p data-teacher-reading-transcript="${index}">Transcript will appear here.</p>
          </div>
        </article>
      `
    )
    .join("");
}

function updateTeacherReadingValidation() {
  if (!teacherReadingForm || !teacherReadingValidation) return false;
  const formData = new FormData(teacherReadingForm);
  const teacherValue = String(formData.get("teacherName") || "");
  const otherName = String(formData.get("otherTeacherName") || "").trim();
  const teacherOk = teacherValue && (teacherValue !== "__other" || otherName);
  const valid = Boolean(formData.get("date") && teacherOk && formData.get("observer") && teacherReadingPhotoDataUrl && teacherReadingState.every((item) => item.attempted));
  teacherReadingValidation.hidden = valid;
  return valid;
}

function getTeacherReadingName() {
  const selected = teacherReadingName?.value || "";
  if (selected === "__other") return teacherReadingOther?.value.trim() || "";
  return selected;
}

function getTeacherReadingGrade(percent) {
  if (percent >= 90) return "Excellent";
  if (percent >= 78) return "Strong";
  if (percent >= 65) return "Developing";
  return "Needs Support";
}

function getTeacherReadingSubmitStatus(percent) {
  if (percent >= 78) {
    return {
      label: "Ready to submit",
      text: "Your reading score is up to mark. You can download or print this report and submit it to school.",
      className: "is-ready",
    };
  }
  return {
    label: "Practise before submission",
    text: "Please practise the focus areas and retake the self assessment before submitting it to school.",
    className: "is-practice",
  };
}

function renderTeacherReadingReport() {
  if (!teacherReadingReport || !teacherReadingForm) return;
  const formData = new FormData(teacherReadingForm);
  const name = getTeacherReadingName();
  const micAverage = Math.round(teacherReadingState.reduce((sum, item) => sum + item.accuracy, 0) / teacherReadingState.length);
  const bestScore = Math.max(...teacherReadingState.map((item) => item.accuracy));
  const lowestScore = Math.min(...teacherReadingState.map((item) => item.accuracy));
  const consistencyScore = Math.max(0, 100 - (bestScore - lowestScore));
  const completionScore = teacherReadingState.every((item) => item.attempted) ? 100 : 0;
  const finalScore = Math.round(micAverage * 0.8 + consistencyScore * 0.15 + completionScore * 0.05);
  const grade = getTeacherReadingGrade(finalScore);
  const submitStatus = getTeacherReadingSubmitStatus(finalScore);
  const needs = [];
  if (teacherReadingState.some((item) => item.accuracy < 75)) needs.push("pronunciation clarity");
  if (consistencyScore < 78) needs.push("reading consistency");
  if (lowestScore < 65) needs.push("difficult word practice");
  if (micAverage < 78) needs.push("fluency and clear pauses");
  const photoMarkup = teacherReadingPhotoDataUrl ? `<img class="student-report-photo" src="${teacherReadingPhotoDataUrl}" alt="${name} photo" />` : "";

  teacherReadingReport.innerHTML = `
    <div class="report-card report-dashboard teacher-reading-report-card">
      <div class="report-topline">
        <div class="student-report-title">
          ${photoMarkup}
          <div>
            <p class="eyebrow">Teacher reading assessment</p>
            <h2>${name}</h2>
            <p>${formData.get("date")} · Self assessment for ${formData.get("observer")}</p>
          </div>
        </div>
        <div class="score-ring ${finalScore >= 90 ? "excellent" : finalScore >= 78 ? "good" : finalScore >= 65 ? "needs" : "attention"}"><strong>${finalScore}%</strong><span>${grade}</span></div>
      </div>
      <section class="report-panel teacher-submit-status ${submitStatus.className}">
        <h3>${submitStatus.label}</h3>
        <p>${submitStatus.text}</p>
      </section>
      <div class="report-stat-grid">
        <article><span>Reading Accuracy</span><strong>${micAverage}%</strong><small>5 passage average</small></article>
        <article><span>Consistency</span><strong>${consistencyScore}%</strong><small>Stability across all passages</small></article>
        <article><span>Best Passage</span><strong>${bestScore}%</strong><small>Highest read-aloud match</small></article>
        <article><span>Focus</span><strong>${needs[0] || "Expression"}</strong><small>Next improvement area</small></article>
      </div>
      <section class="report-panel">
        <h3>Overall Reading Feedback</h3>
        <p>${name} has completed the reading self assessment and achieved a ${grade.toLowerCase()} reading profile. This result is auto-calculated from five microphone-based passage checks, reading accuracy and consistency across passages.</p>
      </section>
      <h3>Passage-wise Accuracy</h3>
      <div class="score-bars">
        ${teacherReadingState.map((item, index) => `<div class="score-bar-row"><div><strong>Passage ${index + 1}</strong><small>${item.missed?.length ? `Missed: ${item.missed.join(", ")}` : "No major missed words"}</small></div><span>${item.accuracy}%</span><progress max="100" value="${item.accuracy}"></progress></div>`).join("")}
      </div>
      <div class="report-columns">
        <section class="report-panel strengths-panel"><h3>Strengths</h3><ul><li>Completed all five read-aloud passages.</li><li>Demonstrated classroom reading readiness.</li><li>Manual observation supports a balanced reading profile.</li></ul></section>
        <section class="report-panel improvement-panel"><h3>Improvement Plan</h3><ul>${(needs.length ? needs : ["natural pauses", "expression"]).map((item) => `<li>Practise ${item} through 5-minute daily read-aloud sessions.</li>`).join("")}</ul></section>
      </div>
    </div>
  `;
}

function initTeacherReadingAssessment() {
  if (!teacherReadingForm || !teacherReadingPassageWrap) return;
  renderTeacherReadingPassages();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (teacherReadingForm.elements.date && !teacherReadingForm.elements.date.value) {
    teacherReadingForm.elements.date.valueAsDate = new Date();
  }

  teacherReadingName?.addEventListener("change", () => {
    const isOther = teacherReadingName.value === "__other";
    if (teacherReadingOtherWrap) teacherReadingOtherWrap.hidden = !isOther;
    if (teacherReadingOther) teacherReadingOther.required = isOther;
    updateTeacherReadingValidation();
  });

  teacherReadingPhotoInput?.addEventListener("change", () => {
    const file = teacherReadingPhotoInput.files?.[0];
    if (!file) {
      teacherReadingPhotoDataUrl = "";
      if (teacherReadingPhotoPreview) teacherReadingPhotoPreview.hidden = true;
      updateTeacherReadingValidation();
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      teacherReadingPhotoDataUrl = String(reader.result || "");
      if (teacherReadingPhotoPreview) {
        teacherReadingPhotoPreview.hidden = false;
        teacherReadingPhotoPreview.innerHTML = `<img src="${teacherReadingPhotoDataUrl}" alt="Teacher preview" />`;
      }
      updateTeacherReadingValidation();
    });
    reader.readAsDataURL(file);
  });

  teacherReadingPassageWrap.addEventListener("click", (event) => {
    const listenButton = event.target.closest("[data-teacher-reading-listen]");
    const startButton = event.target.closest("[data-teacher-reading-start]");
    const stopButton = event.target.closest("[data-teacher-reading-stop]");
    if (listenButton) {
      const index = Number(listenButton.dataset.teacherReadingListen);
      speakRoutineText(teacherReadingPassages[index], listenButton);
      return;
    }
    if (stopButton?._recognition) {
      stopButton._recognition.stop();
      return;
    }
    if (!startButton) return;
    const index = Number(startButton.dataset.teacherReadingStart);
    const card = teacherReadingPassageWrap.querySelector(`[data-teacher-reading-card="${index}"]`);
    const passageStop = card?.querySelector(`[data-teacher-reading-stop="${index}"]`);
    const indicator = card?.querySelector(`[data-teacher-reading-indicator="${index}"]`);
    const transcriptEl = card?.querySelector(`[data-teacher-reading-transcript="${index}"]`);
    const scoreEl = card?.querySelector(`[data-teacher-reading-score="${index}"]`);

    if (!SpeechRecognition) {
      if (transcriptEl) transcriptEl.textContent = "Microphone scoring is not supported in this browser. Please use Chrome.";
      return;
    }

    stopTenseReading();
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = true;
    let finalText = "";
    let latestText = "";
    startButton.disabled = true;
    if (passageStop) {
      passageStop.hidden = false;
      passageStop._recognition = recognition;
    }
    if (indicator) indicator.hidden = false;
    if (transcriptEl) transcriptEl.textContent = "Listening. Read slowly and clearly.";

    recognition.onresult = (speechEvent) => {
      let interim = "";
      for (let resultIndex = speechEvent.resultIndex; resultIndex < speechEvent.results.length; resultIndex += 1) {
        const text = speechEvent.results[resultIndex][0].transcript;
        if (speechEvent.results[resultIndex].isFinal) finalText += ` ${text}`;
        else interim += ` ${text}`;
      }
      latestText = `${finalText} ${interim}`.trim();
      if (transcriptEl) transcriptEl.textContent = latestText || "Listening...";
    };

    recognition.onend = () => {
      startButton.disabled = false;
      if (passageStop) passageStop.hidden = true;
      if (indicator) indicator.hidden = true;
      const result = scoreTeacherReading(teacherReadingPassages[index], latestText || finalText);
      teacherReadingState[index] = { ...result, transcript: latestText || finalText, attempted: Boolean(latestText || finalText) };
      if (scoreEl) scoreEl.textContent = teacherReadingState[index].attempted ? `${result.accuracy}% accuracy` : "Try again";
      if (transcriptEl) transcriptEl.textContent = latestText || "No clear reading captured. Please try again close to the microphone.";
      updateTeacherReadingValidation();
    };

    recognition.onerror = () => {
      startButton.disabled = false;
      if (passageStop) passageStop.hidden = true;
      if (indicator) indicator.hidden = true;
      if (transcriptEl) transcriptEl.textContent = "Could not hear clearly. Please try again in a quiet place.";
    };

    recognition.start();
  });

  teacherReadingForm.addEventListener("input", updateTeacherReadingValidation);
  teacherReadingForm.addEventListener("change", updateTeacherReadingValidation);
  teacherReadingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!updateTeacherReadingValidation()) return;
    renderTeacherReadingReport();
  });

  teacherReadingPrint?.addEventListener("click", () => {
    if (!updateTeacherReadingValidation()) return;
    renderTeacherReadingReport();
    window.print();
  });

  updateTeacherReadingValidation();
}

initTeacherReadingAssessment();

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

const tenseDetails = {
  simple: {
    title: "Present Simple",
    story: "Habit, routine or fact",
    structure: "Subject + V1 / V1+s or es<br />OR Subject + am/is/are + noun/adjective/place",
    examples: ["I go to school every day.", "She reads before bedtime.", "The sun rises in the east."],
    activity: "Look for habits, routines, facts, general truths and present states.",
  },
  continuous: {
    title: "Present Continuous",
    story: "Happening right now",
    structure: "Subject + am/is/are + Verb-ing",
    examples: ["I am going to school now.", "She is reading a story.", "They are playing outside."],
    activity: "Look for now, right now, at this moment or actions happening while we speak.",
  },
  perfect: {
    title: "Present Perfect",
    story: "Finished, but connected with now",
    structure: "Subject + has/have + V3",
    examples: ["I have completed my homework.", "She has finished the book.", "They have cleaned the room."],
    activity: "Look for a finished action that still matters now, like homework completed or a result visible today.",
  },
  perfectContinuous: {
    title: "Present Perfect Continuous",
    story: "Started earlier and still continuing",
    structure: "Subject + has/have been + Verb-ing",
    examples: ["I have been studying for two hours.", "She has been reading since morning.", "They have been practising daily."],
    activity: "Look for since or for. The action began earlier and is still connected to now.",
  },
};

let activeTenseSpeech = null;
let activeTenseSpeechButton = null;

function resetTenseAudioButton(button) {
  if (!button) return;
  const restoreHtml = button.dataset.audioOriginalHtml || button.dataset.audioRestoreHtml;
  if (restoreHtml) {
    button.innerHTML = restoreHtml;
    delete button.dataset.audioOriginalHtml;
  } else {
    button.textContent = button.dataset.audioDefaultText || "Read examples";
  }
  button.classList.remove("is-reading");
  button.setAttribute("aria-pressed", "false");
}

function stopTenseReading() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (activeTenseSpeechButton) resetTenseAudioButton(activeTenseSpeechButton);
  activeTenseSpeech = null;
  activeTenseSpeechButton = null;
}

function renderTenseDetail(key) {
  const panel = document.querySelector("[data-tense-detail]");
  const data = getActiveTenseLab().details[key];
  if (!panel || !data) return;
  stopTenseReading();
  panel.innerHTML = `
    <div>
      <p class="eyebrow">${data.story}</p>
      <h3>${data.title}</h3>
      <code>${data.structure}</code>
    </div>
    <div>
      <p>${data.activity}</p>
      <ul>${data.examples.map((example) => `<li>${example}</li>`).join("")}</ul>
      <button class="tense-audio-button" type="button" data-read-tense="${key}" aria-pressed="false">Read examples</button>
    </div>
  `;
}

function readTenseExamples(key, button) {
  const data = getActiveTenseLab().details[key];
  if (!data || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    if (button) button.textContent = "Audio not supported";
    return;
  }

  if (button?.classList.contains("is-reading")) {
    stopTenseReading();
    return;
  }

  window.speechSynthesis.cancel();
  if (activeTenseSpeechButton && activeTenseSpeechButton !== button) {
    resetTenseAudioButton(activeTenseSpeechButton);
  }
  const text = `${data.title}. ${data.story}. ${data.activity} Examples. ${data.examples.join(" ")}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.86;
  utterance.pitch = 1.08;
  activeTenseSpeech = utterance;
  activeTenseSpeechButton = button;
  if (button) {
    button.dataset.audioDefaultText = "Read examples";
    button.textContent = "Stop reading";
    button.classList.add("is-reading");
    button.setAttribute("aria-pressed", "true");
  }
  utterance.onend = () => {
    if (activeTenseSpeech === utterance) stopTenseReading();
  };
  utterance.onerror = () => {
    if (button) {
      resetTenseAudioButton(button);
      button.textContent = "Try again";
    }
    activeTenseSpeech = null;
    activeTenseSpeechButton = null;
  };
  window.speechSynthesis.speak(utterance);
}

function initTenseCards() {
  const cards = document.querySelectorAll("[data-tense-card]");
  const panel = document.querySelector("[data-tense-detail]");
  if (!cards.length) return;
  renderTenseDetail(cards[0].dataset.tenseCard);
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.toggle("is-active", item === card));
      renderTenseDetail(card.dataset.tenseCard);
    });
  });
  panel?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-read-tense]");
    if (!button) return;
    readTenseExamples(button.dataset.readTense, button);
  });
}

function initTenseChoiceTool() {
  const tool = document.querySelector("[data-tense-choice-tool]");
  const feedback = document.querySelector("[data-choice-feedback]");
  if (!tool || !feedback) return;
  const choiceData = getActiveTenseLab().choice;
  tool.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.choice === choiceData.correct;
      feedback.classList.toggle("is-correct", correct);
      feedback.classList.toggle("is-wrong", !correct);
      feedback.innerHTML = correct ? choiceData.correctText : choiceData.wrongText;
    });
  });
}

const transformerData = {
  habit: {
    label: "Habit",
    sentence: "Rahul plays football.",
    note: "Use Present Simple when the action is a habit or routine.",
  },
  now: {
    label: "Happening now",
    sentence: "Rahul is playing football.",
    note: "Use Present Continuous when the action is happening right now.",
  },
  finished: {
    label: "Finished",
    sentence: "Rahul has played football.",
    note: "Use Present Perfect when the action is finished but still connects with now.",
  },
  continuing: {
    label: "Continuing",
    sentence: "Rahul has been playing football for an hour.",
    note: "Use Present Perfect Continuous when the action started earlier and is still continuing.",
  },
};

function initSentenceTransformer() {
  const transformer = document.querySelector("[data-transformer]");
  if (!transformer) return;
  const label = transformer.querySelector("[data-transform-label]");
  const sentence = transformer.querySelector("[data-transform-sentence]");
  const note = transformer.querySelector("[data-transform-note]");
  function renderTransform(key) {
    const data = getActiveTenseLab().transformer[key];
    if (!data) return;
    label.textContent = data.label;
    sentence.textContent = data.sentence;
    note.textContent = data.note;
  }
  renderTransform(transformer.querySelector(".is-active")?.dataset.transform || "habit");
  transformer.querySelectorAll("[data-transform]").forEach((button) => {
    button.addEventListener("click", () => {
      transformer.querySelectorAll("[data-transform]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderTransform(button.dataset.transform);
    });
  });
}

const practiceIntentData = {
  simple: {
    title: "Present Simple",
    example: "She reads every day.",
    success: "Good. This looks like Present Simple because it shows a habit, fact or current state.",
    guide: "For Present Simple, write a habit, fact or current state: She reads every day. The sun rises. I am happy.",
  },
  continuous: {
    title: "Present Continuous",
    example: "She is reading now.",
    success: "Good. This looks like Present Continuous because it uses am/is/are with a verb ending in ing.",
    guide: "For Present Continuous, use I am, he/she/it is, we/you/they are + verb-ing.",
  },
  perfect: {
    title: "Present Perfect",
    example: "She has finished the book.",
    success: "Good. This looks like Present Perfect because it uses has/have with a completed action.",
    guide: "For Present Perfect, use he/she/it has or I/we/you/they have + V3.",
  },
  perfectContinuous: {
    title: "Present Perfect Continuous",
    example: "She has been reading for two hours.",
    success: "Good. This looks like Present Perfect Continuous because it uses has/have been + verb-ing with a time clue.",
    guide: "For Present Perfect Continuous, use he/she/it has been or I/we/you/they have been + verb-ing with for or since.",
  },
};

const simpleSignalWords = /\b(always|usually|often|sometimes|never|daily|every|on mondays|on sundays|at night|in the morning)\b/i;
const continuousSignalWords = /\b(now|right now|currently|at this moment|today)\b/i;
const perfectSignalWords = /\b(already|just|yet|ever|never|recently|so far)\b/i;
const perfectContinuousSignalWords = /\b(for|since|all day|all morning|all week)\b/i;
const commonV3Words = /\b(done|gone|eaten|written|read|seen|made|taken|given|known|finished|completed|played|studied|learned|learnt|cleaned|checked|watched|visited|opened|closed)\b/i;

function hasSubject(sentence) {
  return /\b(i|we|you|they|he|she|it|[A-Z][a-z]+)\b/.test(sentence.trim());
}

function getSubjectType(sentence) {
  const firstWord = sentence.trim().split(/\s+/)[0]?.replace(/[^a-z]/gi, "").toLowerCase();
  if (!firstWord) return "unknown";
  if (firstWord === "i") return "i";
  if (["he", "she", "it"].includes(firstWord)) return "singular";
  if (["we", "you", "they"].includes(firstWord)) return "plural";
  return "singular";
}

function hasCorrectBeHelper(sentence) {
  const lower = sentence.toLowerCase();
  const subjectType = getSubjectType(sentence);
  if (subjectType === "i") return /\bi\s+am\b/.test(lower);
  if (subjectType === "singular") return /\b(he|she|it|[a-z]+)\s+is\b/.test(lower);
  if (subjectType === "plural") return /\b(we|you|they)\s+are\b/.test(lower);
  return false;
}

function hasCorrectPerfectHelper(sentence) {
  const lower = sentence.toLowerCase();
  const subjectType = getSubjectType(sentence);
  if (subjectType === "singular") return /\b(he|she|it|[a-z]+)\s+has\b/.test(lower);
  if (subjectType === "i" || subjectType === "plural") return /\b(i|we|you|they)\s+have\b/.test(lower);
  return false;
}

function getPracticeChecks(sentence, intent) {
  const normalized = sentence.trim().replace(/\s+/g, " ");
  const lower = normalized.toLowerCase();
  const hasWords = normalized.split(" ").filter(Boolean).length >= 3;
  const subject = hasSubject(normalized);
  const checks = { subject, verb: false, signal: false };
  const mode = getTenseLabMode();
  const correctBeHelper = hasCorrectBeHelper(normalized);
  const correctPerfectHelper = hasCorrectPerfectHelper(normalized);
  const beFactPattern = correctBeHelper && !/\b(am|is|are)\s+\w+ing\b/.test(lower);
  const perfectContinuousPattern = /\b(has|have)\s+been\s+\w+ing\b/.test(lower);

  if (mode === "past") {
    const pastSimpleVerb = /\b(was|were|went|played|read|wrote|ate|studied|visited|finished|completed|made|saw|took|gave|did|had)\b/.test(lower);
    if (intent === "simple") {
      checks.verb = hasWords && pastSimpleVerb && !/\b(was|were)\s+\w+ing\b/.test(lower);
      checks.signal = /\b(yesterday|last|ago|in 202|in 201|before)\b/.test(lower) || checks.verb;
    }
    if (intent === "continuous") {
      checks.verb = /\b(was|were)\s+\w+ing\b/.test(lower);
      checks.signal = /\b(when|while|at that time|yesterday|last)\b/.test(lower) || checks.verb;
    }
    if (intent === "perfect") {
      checks.verb = /\bhad\s+\w+(ed|en|ne|wn)\b/.test(lower) || /\bhad\s+/.test(lower) && commonV3Words.test(lower);
      checks.signal = /\b(before|already|after|by the time)\b/.test(lower) || checks.verb;
    }
    if (intent === "perfectContinuous") {
      checks.verb = /\bhad\s+been\s+\w+ing\b/.test(lower);
      checks.signal = /\b(for|since|before|when)\b/.test(lower);
    }
    return checks;
  }

  if (mode === "future") {
    const beGoingTo = correctBeHelper && /\bgoing\s+to\s+\w+\b/.test(lower);
    if (intent === "simple") {
      checks.verb = /\bwill\s+\w+\b/.test(lower) || beGoingTo;
      checks.signal = /\b(tomorrow|next|soon|later|tonight|in the future)\b/.test(lower) || checks.verb;
    }
    if (intent === "continuous") {
      checks.verb = /\bwill\s+be\s+\w+ing\b/.test(lower) || /\b(am|is|are)\s+going\s+to\s+be\s+\w+ing\b/.test(lower);
      checks.signal = /\b(at|this time|tomorrow|next|later)\b/.test(lower) || checks.verb;
    }
    if (intent === "perfect") {
      checks.verb = /\bwill\s+have\s+\w+(ed|en|ne|wn)\b/.test(lower) || /\bwill\s+have\s+/.test(lower) && commonV3Words.test(lower);
      checks.signal = /\b(by|before|by then|by tomorrow|by next)\b/.test(lower) || checks.verb;
    }
    if (intent === "perfectContinuous") {
      checks.verb = /\bwill\s+have\s+been\s+\w+ing\b/.test(lower);
      checks.signal = /\b(for|since|by|before)\b/.test(lower);
    }
    return checks;
  }

  if (intent === "simple") {
    const actionPattern =
      !/\b(am|is|are|has|have)\s+\w+/.test(lower) &&
      /\b(go|goes|read|reads|play|plays|write|writes|eat|eats|study|studies|come|comes|like|likes|work|works|learn|learns)\b/.test(lower);
    checks.verb =
      hasWords &&
      (actionPattern || beFactPattern);
    checks.signal = actionPattern || simpleSignalWords.test(lower) || beFactPattern;
  }

  if (intent === "continuous") {
    checks.verb = correctBeHelper && /\b(am|is|are)\s+\w+ing\b/.test(lower);
    checks.signal = continuousSignalWords.test(lower) || checks.verb;
  }

  if (intent === "perfect") {
    checks.verb = correctPerfectHelper && !perfectContinuousPattern && (/\b(has|have)\s+\w+(ed|en|ne|wn)\b/.test(lower) || commonV3Words.test(lower));
    checks.signal = perfectSignalWords.test(lower) || checks.verb;
  }

  if (intent === "perfectContinuous") {
    checks.verb = correctPerfectHelper && perfectContinuousPattern;
    checks.signal = perfectContinuousSignalWords.test(lower);
  }

  return checks;
}

function initTensePracticeBox() {
  const practice = document.querySelector("[data-tense-practice]");
  if (!practice) return;
  const input = practice.querySelector("[data-practice-input]");
  const feedback = practice.querySelector("[data-practice-feedback]");
  const intentButtons = practice.querySelectorAll("[data-practice-intent]");
  const ruleBadges = practice.querySelectorAll("[data-practice-rule]");
  let intent = "simple";
  let typingLetter = 0;
  let typingForward = true;

  function updatePlaceholder() {
    input.placeholder = `Example: ${getActiveTenseLab().practice[intent].example}`;
  }

  function validatePractice() {
    const sentence = input.value.trim();
    const data = getActiveTenseLab().practice[intent];
    const checks = getPracticeChecks(sentence, intent);
    const passed = checks.subject && checks.verb && checks.signal;
    const hasText = sentence.length > 0;

    ruleBadges.forEach((badge) => {
      badge.classList.toggle("is-met", Boolean(checks[badge.dataset.practiceRule]));
    });

    feedback.classList.toggle("is-good", passed);
    feedback.classList.toggle("is-guide", hasText && !passed);

    if (!hasText) {
      feedback.innerHTML = `
        <span>${data.title}</span>
        <strong>Start with a clear subject and action.</strong>
        <p>Example: ${data.example}</p>
      `;
      return;
    }

    if (passed) {
      feedback.innerHTML = `
        <span>${data.title}</span>
        <strong>Sentence pattern looks correct.</strong>
        <p>${data.success}</p>
      `;
      return;
    }

    const missing = [];
    if (!checks.subject) missing.push("a clear subject");
    if (!checks.verb) missing.push("the right verb pattern");
    if (!checks.signal) missing.push("a time clue or meaning clue");
    feedback.innerHTML = `
      <span>${data.title}</span>
      <strong>Almost there. Add ${missing.join(", ")}.</strong>
      <p>${data.guide}</p>
    `;
  }

  intentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      intent = button.dataset.practiceIntent;
      typingLetter = 0;
      typingForward = true;
      intentButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      updatePlaceholder();
      validatePractice();
    });
  });

  input.addEventListener("input", validatePractice);
  input.addEventListener("focus", () => input.classList.remove("is-auto-typing"));
  input.addEventListener("blur", () => {
    if (!input.value) input.classList.add("is-auto-typing");
  });
  input.classList.add("is-auto-typing");
  window.setInterval(() => {
    if (input.value || document.activeElement === input) return;
    const examples = Object.values(getActiveTenseLab().practice).map((item) => item.example);
    const activeIndex = Math.max(0, [...intentButtons].findIndex((button) => button.dataset.practiceIntent === intent));
    const example = examples[activeIndex] || examples[0];
    typingLetter += typingForward ? 1 : -1;
    input.placeholder = example.slice(0, typingLetter);
    if (typingLetter >= example.length + 14) typingForward = false;
    if (typingLetter <= 0) {
      typingForward = true;
      typingLetter = 0;
    }
  }, 55);
  updatePlaceholder();
  validatePractice();
}

const tenseQuizQuestions = [
  {
    prompt: "She writes in her diary every night.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Simple",
    explanation: "Every night shows a routine, so we use Present Simple.",
  },
  {
    prompt: "They are watching a science video now.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Continuous",
    explanation: "Now shows the action is happening at this moment.",
  },
  {
    prompt: "I have finished my worksheet.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Perfect",
    explanation: "The worksheet is finished, and the result matters now.",
  },
  {
    prompt: "We have been waiting for ten minutes.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Perfect Continuous",
    explanation: "For ten minutes shows an action that started earlier and continues until now.",
  },
  {
    prompt: "My brother plays chess on Sundays.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Simple",
    explanation: "On Sundays tells us this is a regular activity.",
  },
  {
    prompt: "Riya is drawing a flower.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Continuous",
    explanation: "Is drawing shows the action is going on right now.",
  },
  {
    prompt: "The teacher has checked the notebooks.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Perfect",
    explanation: "Has checked shows a completed action connected with the present.",
  },
  {
    prompt: "He has been learning English since April.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Perfect Continuous",
    explanation: "Since April shows the learning started earlier and is still continuing.",
  },
  {
    prompt: "The bus arrives at 8 o'clock.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Simple",
    explanation: "A timetable or fixed routine uses Present Simple.",
  },
  {
    prompt: "The children are practising for the show.",
    options: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    answer: "Present Continuous",
    explanation: "Are practising shows the action is happening around this time.",
  },
];

const pastTenseDetails = {
  simple: {
    title: "Past Simple",
    story: "Finished action in the past",
    structure: "Subject + V2<br />OR Subject + was/were + noun/adjective/place",
    examples: ["I played football yesterday.", "She visited her grandmother.", "They were happy."],
    activity: "Look for a finished past action, past state or clues like yesterday, last week and ago.",
  },
  continuous: {
    title: "Past Continuous",
    story: "Was happening at a past time",
    structure: "Subject + was/were + Verb-ing",
    examples: ["I was reading at 7 pm.", "They were playing when it rained.", "She was writing a story."],
    activity: "Use it when an action was in progress at a past moment or when another action happened.",
  },
  perfect: {
    title: "Past Perfect",
    story: "Finished before another past action",
    structure: "Subject + had + V3",
    examples: ["I had completed my homework before dinner.", "She had finished the book.", "They had left before I arrived."],
    activity: "Use it for the earlier past action when two past actions are connected.",
  },
  perfectContinuous: {
    title: "Past Perfect Continuous",
    story: "Continued before a past time",
    structure: "Subject + had been + Verb-ing",
    examples: ["I had been studying for two hours.", "She had been reading before lunch.", "They had been practising since morning."],
    activity: "Use it when an action continued for some time before another past moment.",
  },
};

const futureTenseDetails = {
  simple: {
    title: "Future Simple",
    story: "Will happen later",
    structure: "Subject + will + V1<br />OR Subject + am/is/are going to + V1",
    examples: ["I will play football tomorrow.", "She is going to read a book.", "They will visit us next week."],
    activity: "Look for actions planned, expected or decided for a later time.",
  },
  continuous: {
    title: "Future Continuous",
    story: "Will be happening at a future time",
    structure: "Subject + will be + Verb-ing",
    examples: ["I will be studying at 8 pm.", "She will be reading tomorrow morning.", "They will be travelling next week."],
    activity: "Use it when an action will be in progress at a future moment.",
  },
  perfect: {
    title: "Future Perfect",
    story: "Will be finished before a future time",
    structure: "Subject + will have + V3",
    examples: ["I will have completed my homework by evening.", "She will have finished the book.", "They will have reached by noon."],
    activity: "Use it for an action that will be complete before a future deadline.",
  },
  perfectContinuous: {
    title: "Future Perfect Continuous",
    story: "Will have continued until a future time",
    structure: "Subject + will have been + Verb-ing",
    examples: ["I will have been studying for two hours by 8 pm.", "She will have been reading since morning.", "They will have been practising for a month."],
    activity: "Use it when an action will continue up to a future point.",
  },
};

const pastTransformerData = {
  habit: {
    label: "Finished past",
    sentence: "Rahul played football yesterday.",
    note: "Use Past Simple when the action is finished in the past.",
  },
  now: {
    label: "Happening then",
    sentence: "Rahul was playing football at 5 pm.",
    note: "Use Past Continuous when the action was going on at a past time.",
  },
  finished: {
    label: "Earlier past",
    sentence: "Rahul had played football before dinner.",
    note: "Use Past Perfect when one past action happened before another past action.",
  },
  continuing: {
    label: "Continuing before past",
    sentence: "Rahul had been playing football for an hour.",
    note: "Use Past Perfect Continuous when an action continued before a past moment.",
  },
};

const futureTransformerData = {
  habit: {
    label: "Later action",
    sentence: "Rahul will play football tomorrow.",
    note: "Use Future Simple when the action will happen later.",
  },
  now: {
    label: "Happening later",
    sentence: "Rahul will be playing football at 5 pm.",
    note: "Use Future Continuous when the action will be going on at a future time.",
  },
  finished: {
    label: "Finished by then",
    sentence: "Rahul will have played football by evening.",
    note: "Use Future Perfect when the action will be complete before a future time.",
  },
  continuing: {
    label: "Continuing until then",
    sentence: "Rahul will have been playing football for an hour.",
    note: "Use Future Perfect Continuous when the action will continue up to a future point.",
  },
};

const pastPracticeIntentData = {
  simple: {
    title: "Past Simple",
    example: "She played yesterday.",
    success: "Good. This looks like Past Simple because it shows a finished past action or state.",
    guide: "For Past Simple, use V2 or was/were: She played yesterday. They were ready.",
  },
  continuous: {
    title: "Past Continuous",
    example: "She was reading at 7 pm.",
    success: "Good. This looks like Past Continuous because it uses was/were + verb-ing.",
    guide: "For Past Continuous, use was/were + verb-ing: She was reading. They were playing.",
  },
  perfect: {
    title: "Past Perfect",
    example: "She had finished the book.",
    success: "Good. This looks like Past Perfect because it uses had + V3.",
    guide: "For Past Perfect, use had + V3: She had finished the book.",
  },
  perfectContinuous: {
    title: "Past Perfect Continuous",
    example: "She had been reading for two hours.",
    success: "Good. This looks like Past Perfect Continuous because it uses had been + verb-ing.",
    guide: "For Past Perfect Continuous, use had been + verb-ing with for, since, before or when.",
  },
};

const futurePracticeIntentData = {
  simple: {
    title: "Future Simple",
    example: "She will read tomorrow.",
    success: "Good. This looks like Future Simple because it shows an action that will happen later.",
    guide: "For Future Simple, use will + V1 or am/is/are going to + V1.",
  },
  continuous: {
    title: "Future Continuous",
    example: "She will be reading at 7 pm.",
    success: "Good. This looks like Future Continuous because it uses will be + verb-ing.",
    guide: "For Future Continuous, use will be + verb-ing: She will be reading at 7 pm.",
  },
  perfect: {
    title: "Future Perfect",
    example: "She will have finished the book by evening.",
    success: "Good. This looks like Future Perfect because it uses will have + V3.",
    guide: "For Future Perfect, use will have + V3 with a future deadline like by evening.",
  },
  perfectContinuous: {
    title: "Future Perfect Continuous",
    example: "She will have been reading for two hours.",
    success: "Good. This looks like Future Perfect Continuous because it uses will have been + verb-ing.",
    guide: "For Future Perfect Continuous, use will have been + verb-ing with for, since or by.",
  },
};

const pastTenseQuizQuestions = [
  { prompt: "She visited her aunt yesterday.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Simple", explanation: "Visited and yesterday show a finished past action." },
  { prompt: "They were watching a movie at 8 pm.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Continuous", explanation: "Were watching shows an action in progress at a past time." },
  { prompt: "I had finished my work before dinner.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Perfect", explanation: "Had finished shows an action completed before another past time." },
  { prompt: "We had been waiting for ten minutes.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Perfect Continuous", explanation: "Had been waiting shows an action continuing before a past moment." },
  { prompt: "He wrote a letter last night.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Simple", explanation: "Wrote and last night show a completed past action." },
  { prompt: "Riya was drawing when I entered.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Continuous", explanation: "Was drawing was happening when another past action occurred." },
  { prompt: "The teacher had checked the notebooks.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Perfect", explanation: "Had checked shows completion before a past reference point." },
  { prompt: "He had been learning English since April.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Perfect Continuous", explanation: "Had been learning with since shows continued action before a past time." },
  { prompt: "The bus arrived at 8 o'clock.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Simple", explanation: "Arrived is a completed past action." },
  { prompt: "The children were practising for the show.", options: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"], answer: "Past Continuous", explanation: "Were practising shows a past action in progress." },
];

const futureTenseQuizQuestions = [
  { prompt: "She will write in her diary tomorrow.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Simple", explanation: "Will write shows an action that will happen later." },
  { prompt: "They will be watching a science video at 8 pm.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Continuous", explanation: "Will be watching shows an action in progress at a future time." },
  { prompt: "I will have finished my worksheet by evening.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Perfect", explanation: "Will have finished shows completion before a future deadline." },
  { prompt: "We will have been waiting for ten minutes by then.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Perfect Continuous", explanation: "Will have been waiting shows continuation up to a future point." },
  { prompt: "My brother will play chess on Sunday.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Simple", explanation: "Will play shows a future action." },
  { prompt: "Riya will be drawing during the art class.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Continuous", explanation: "Will be drawing shows an action going on at a future time." },
  { prompt: "The teacher will have checked the notebooks by noon.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Perfect", explanation: "Will have checked shows the action will be complete by noon." },
  { prompt: "He will have been learning English for one year.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Perfect Continuous", explanation: "Will have been learning shows continued action up to a future point." },
  { prompt: "The bus will arrive at 8 o'clock.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Simple", explanation: "Will arrive shows a future event." },
  { prompt: "The children will be practising tomorrow morning.", options: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"], answer: "Future Continuous", explanation: "Will be practising shows future action in progress." },
];

function getTenseLabMode() {
  if (document.body.classList.contains("past-tense-page")) return "past";
  if (document.body.classList.contains("future-tense-page")) return "future";
  return "present";
}

function getActiveTenseLab() {
  const labs = {
    present: {
      details: tenseDetails,
      transformer: transformerData,
      practice: practiceIntentData,
      quiz: tenseQuizQuestions,
      completionTitle: "Excellent. You have completed the Present Tense Learning Lab.",
      choice: {
        correct: "habit",
        correctText: "Correct. This is <strong>Present Simple</strong> because it describes Rahul's routine.",
        wrongText: "Almost. The words <strong>every evening</strong> show a routine, so this is Present Simple.",
      },
    },
    past: {
      details: pastTenseDetails,
      transformer: pastTransformerData,
      practice: pastPracticeIntentData,
      quiz: pastTenseQuizQuestions,
      completionTitle: "Excellent. You have completed the Past Tense Learning Lab.",
      choice: {
        correct: "habit",
        correctText: "Correct. This is <strong>Past Simple</strong> because the action finished yesterday.",
        wrongText: "Almost. The word <strong>yesterday</strong> shows a finished past action, so this is Past Simple.",
      },
    },
    future: {
      details: futureTenseDetails,
      transformer: futureTransformerData,
      practice: futurePracticeIntentData,
      quiz: futureTenseQuizQuestions,
      completionTitle: "Excellent. You have completed the Future Tense Learning Lab.",
      choice: {
        correct: "habit",
        correctText: "Correct. This is <strong>Future Simple</strong> because the action will happen tomorrow.",
        wrongText: "Almost. The word <strong>tomorrow</strong> points to a future action, so this is Future Simple.",
      },
    },
  };
  return labs[getTenseLabMode()];
}

function initTenseQuiz() {
  const quiz = document.querySelector("[data-tense-quiz]");
  if (!quiz) return;
  const quizQuestions = getActiveTenseLab().quiz;
  const completionTitle = getActiveTenseLab().completionTitle;
  const card = quiz.querySelector("[data-quiz-card]");
  const progress = quiz.querySelector("[data-quiz-progress]");
  const retry = quiz.querySelector("[data-quiz-retry]");
  const scoreText = quiz.querySelector("[data-quiz-score]");
  let index = 0;
  let score = 0;

  function updateScore() {
    if (scoreText) scoreText.textContent = `Score: ${score}/${quizQuestions.length}`;
    if (progress) progress.value = index;
  }

  function renderQuestion() {
    const question = quizQuestions[index];
    updateScore();
    if (!card || !question) {
      if (card) {
        card.innerHTML = `
          <h3>${completionTitle}</h3>
          <p class="quiz-explanation">Final score: ${score}/${quizQuestions.length}. You can retry the quiz or continue practising in the learning lab.</p>
        `;
      }
      if (progress) progress.value = quizQuestions.length;
      return;
    }

    card.innerHTML = `
      <span class="eyebrow">Question ${index + 1} of ${quizQuestions.length}</span>
      <h3>${question.prompt}</h3>
      <div class="quiz-options">
        ${question.options.map((option) => `<button class="quiz-option" type="button" data-option="${option}">${option}</button>`).join("")}
      </div>
      <p class="quiz-explanation" hidden></p>
    `;

    const explanation = card.querySelector(".quiz-explanation");
    card.querySelectorAll("[data-option]").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = button.dataset.option === question.answer;
        if (correct) score += 1;
        card.querySelectorAll("[data-option]").forEach((optionButton) => {
          optionButton.disabled = true;
          optionButton.classList.toggle("is-correct", optionButton.dataset.option === question.answer);
          optionButton.classList.toggle("is-wrong", optionButton === button && !correct);
        });
        explanation.hidden = false;
        explanation.innerHTML = `${correct ? "Correct." : "Good try."} ${question.explanation}`;
        const nextButton = document.createElement("button");
        nextButton.className = "primary-button";
        nextButton.type = "button";
        nextButton.textContent = index === quizQuestions.length - 1 ? "Show Result" : "Next Question";
        nextButton.addEventListener("click", () => {
          index += 1;
          renderQuestion();
        });
        card.appendChild(nextButton);
        updateScore();
      });
    });
  }

  retry?.addEventListener("click", () => {
    index = 0;
    score = 0;
    renderQuestion();
  });

  renderQuestion();
}

initTenseCards();
initTenseChoiceTool();
initSentenceTransformer();
initTensePracticeBox();
initTenseQuiz();

const routinePrompts = [
  {
    prompt: "Tell me three things you do in the morning.",
    example: "I wake up early. I brush my teeth. I eat breakfast.",
  },
  {
    prompt: "Tell me two things you do after school.",
    example: "I play outside. I study in the evening.",
  },
  {
    prompt: "Tell me what you do before sleeping.",
    example: "I read a story. I sleep early at night.",
  },
  {
    prompt: "Tell me what you do to get ready for school.",
    example: "I bathe. I wear my uniform. I go to school.",
  },
  {
    prompt: "Tell me your full day in five short sentences.",
    example: "I wake up early. I brush my teeth. I go to school. I play after school. I sleep at night.",
  },
];

function speakRoutineText(text, button) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    if (button) button.textContent = "Audio not supported";
    return;
  }

  if (button?.classList.contains("is-reading")) {
    stopTenseReading();
    return;
  }

  stopTenseReading();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 0.86;
  utterance.pitch = 1.08;
  activeTenseSpeech = utterance;
  activeTenseSpeechButton = button;
  if (button) {
    if ((button.dataset.routineSpeak || button.dataset.word || button.children.length) && !button.dataset.audioOriginalHtml) {
      if (!button.dataset.audioRestoreHtml) button.dataset.audioRestoreHtml = button.innerHTML;
      button.dataset.audioOriginalHtml = button.dataset.audioRestoreHtml;
    } else {
      button.dataset.audioDefaultText = button.textContent;
    }
    button.textContent = "Stop reading";
    button.classList.add("is-reading");
    button.setAttribute("aria-pressed", "true");
  }
  utterance.onend = () => {
    if (activeTenseSpeech === utterance) stopTenseReading();
  };
  utterance.onerror = () => {
    if (button) resetTenseAudioButton(button);
    activeTenseSpeech = null;
    activeTenseSpeechButton = null;
  };
  window.speechSynthesis.speak(utterance);
}

function getRoutineVerb(action, subject) {
  const verbMap = {
    "brush my teeth": "brushes her teeth",
    "wake up early": "wakes up early",
    "eat breakfast": "eats breakfast",
    "go to school": "goes to school",
    "study English": "studies English",
    "read a story": "reads a story",
    "play outside": "plays outside",
  };
  if (subject === "He" || subject === "She") return verbMap[action] || action;
  return action;
}

function initRoutineBuilder() {
  const builder = document.querySelector("[data-routine-builder]");
  if (!builder) return;
  const subject = builder.querySelector("[data-routine-subject]");
  const action = builder.querySelector("[data-routine-action]");
  const time = builder.querySelector("[data-routine-time]");
  const output = builder.querySelector("[data-routine-sentence]");
  const readButton = builder.querySelector("[data-routine-read-built]");

  function renderSentence() {
    const sentence = `${subject.value} ${getRoutineVerb(action.value, subject.value)} ${time.value}.`;
    output.textContent = sentence;
    resetTenseAudioButton(readButton);
    readButton.textContent = "Read sentence";
  }

  [subject, action, time].forEach((field) => field.addEventListener("change", renderSentence));
  readButton?.addEventListener("click", () => speakRoutineText(output.textContent, readButton));
  renderSentence();
}

function initRoutineVerbs() {
  document.querySelectorAll("[data-routine-speak]").forEach((button) => {
    button.addEventListener("click", () => speakRoutineText(button.dataset.routineSpeak, button));
  });
}

function initRoutinePrompts() {
  const promptCard = document.querySelector("[data-routine-prompts]");
  if (!promptCard) return;
  const count = promptCard.querySelector("[data-routine-prompt-count]");
  const prompt = promptCard.querySelector("[data-routine-prompt]");
  const example = promptCard.querySelector("[data-routine-prompt-example]");
  const readButton = promptCard.querySelector("[data-routine-read-prompt]");
  const nextButton = promptCard.querySelector("[data-routine-next-prompt]");
  let index = 0;

  function renderPrompt() {
    const data = routinePrompts[index];
    count.textContent = `Prompt ${index + 1} of ${routinePrompts.length}`;
    prompt.textContent = data.prompt;
    example.textContent = `Example: ${data.example}`;
    resetTenseAudioButton(readButton);
    readButton.textContent = "Read Prompt";
  }

  readButton?.addEventListener("click", () => {
    const data = routinePrompts[index];
    speakRoutineText(`${data.prompt} ${data.example}`, readButton);
  });
  nextButton?.addEventListener("click", () => {
    index = (index + 1) % routinePrompts.length;
    stopTenseReading();
    renderPrompt();
  });
  renderPrompt();
}

function initRoutinePractice() {
  const practice = document.querySelector("[data-routine-practice]");
  if (!practice) return;
  const input = practice.querySelector("[data-routine-practice-input]");
  const feedback = practice.querySelector("[data-routine-practice-feedback]");
  const rules = practice.querySelectorAll("[data-routine-rule]");
  const typingExamples = [
    "I wake up early. I brush my teeth. I eat breakfast. I go to school. I sleep early at night.",
    "I study in the evening. I read a story at night. I help my mother. I play after school. I drink water.",
    "She wakes up early. She wears her uniform. She goes to school. She writes neatly. She sleeps at night.",
  ];
  let typingIndex = 0;
  let typingLetter = 0;
  let typingForward = true;
  const verbWords = /\b(wake|brush|bathe|eat|drink|wear|go|study|read|write|play|help|sleep|wakes|brushes|bathes|eats|drinks|wears|goes|studies|reads|writes|plays|helps|sleeps)\b/gi;
  const timeWords = /\b(morning|afternoon|evening|night|daily|usually|every day|every morning|after school|before school|before sleeping|at night)\b/i;

  function validateRoutine() {
    const value = input.value.trim();
    const sentences = value.split(/[.!?]+/).map((item) => item.trim()).filter(Boolean);
    const verbs = value.match(verbWords) || [];
    const checks = {
      sentences: sentences.length >= 5,
      verbs: new Set(verbs.map((verb) => verb.toLowerCase())).size >= 4,
      time: timeWords.test(value),
    };
    const passed = checks.sentences && checks.verbs && checks.time;

    rules.forEach((rule) => rule.classList.toggle("is-met", Boolean(checks[rule.dataset.routineRule])));
    feedback.classList.toggle("is-good", passed);
    feedback.classList.toggle("is-guide", value.length > 0 && !passed);

    if (!value) {
      feedback.innerHTML = `<span>Ready to practise</span><strong>Write your daily routine in simple sentences.</strong><p>Try to include five action words.</p>`;
      return;
    }

    if (passed) {
      feedback.innerHTML = `<span>Speaking ready</span><strong>Good routine paragraph.</strong><p>Now read it aloud slowly and clearly.</p>`;
      return;
    }

    const missing = [];
    if (!checks.sentences) missing.push("five short sentences");
    if (!checks.verbs) missing.push("more action verbs");
    if (!checks.time) missing.push("routine time words");
    feedback.innerHTML = `<span>Almost there</span><strong>Add ${missing.join(", ")}.</strong><p>Use words like morning, after school, evening, night or every day.</p>`;
  }

  input.addEventListener("input", validateRoutine);
  input.addEventListener("focus", () => input.classList.remove("is-auto-typing"));
  input.addEventListener("blur", () => {
    if (!input.value) input.classList.add("is-auto-typing");
  });
  input.classList.add("is-auto-typing");
  window.setInterval(() => {
    if (input.value || document.activeElement === input) return;
    const example = typingExamples[typingIndex];
    typingLetter += typingForward ? 1 : -1;
    input.placeholder = example.slice(0, typingLetter);
    if (typingLetter >= example.length + 18) typingForward = false;
    if (typingLetter <= 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typingExamples.length;
    }
  }, 55);
  validateRoutine();
}

initRoutineVerbs();
initRoutineBuilder();
initRoutinePrompts();
initRoutinePractice();

function makeReadingItem(label, title, text, question, answer, wrongOne, wrongTwo) {
  return {
    label,
    title,
    text,
    questions: [
      { question, options: [answer, wrongOne, wrongTwo], answer },
      { question: "What should the reader practise?", options: ["Read clearly with small pauses", "Skip difficult words", "Read without looking"], answer: "Read clearly with small pauses" },
    ],
  };
}

const readingLevels = {
  beginner: [
    makeReadingItem("Beginner", "My Morning", "I wake up early. I brush my teeth. I eat breakfast. Then I go to school with a happy smile.", "What does the child do first?", "Wake up early", "Play outside", "Sleep late"),
    makeReadingItem("Beginner", "My Pet Cat", "My cat is small and soft. She drinks milk. She sits near me when I read my book.", "What does the cat drink?", "Milk", "Juice", "Tea"),
    makeReadingItem("Beginner", "At the Park", "I go to the park in the evening. I run, play and laugh with my friends.", "Where does the child go?", "To the park", "To the shop", "To the bus stop"),
    makeReadingItem("Beginner", "My Red Bag", "I have a red school bag. I keep my books, pencil and lunch box inside it.", "What color is the bag?", "Red", "Blue", "Green"),
    makeReadingItem("Beginner", "Good Habits", "I wash my hands before food. I sit properly and eat slowly.", "When does the child wash hands?", "Before food", "After sleeping", "During play"),
    makeReadingItem("Beginner", "Rainy Day", "It is raining today. I carry my umbrella and walk carefully.", "What does the child carry?", "An umbrella", "A kite", "A ball"),
    makeReadingItem("Beginner", "My Teacher", "My teacher smiles at us. She helps us read new words every day.", "Who helps the children read?", "The teacher", "The driver", "The shopkeeper"),
    makeReadingItem("Beginner", "Lunch Time", "I eat rice and dal for lunch. I share a small bite with my friend.", "What does the child eat?", "Rice and dal", "Cake and chips", "Only mango"),
    makeReadingItem("Beginner", "Clean Room", "I keep my toys in the box. My room looks clean and nice.", "Where does the child keep toys?", "In the box", "On the road", "Under water"),
    makeReadingItem("Beginner", "My Pencil", "I write with my pencil. I keep it sharp and use it neatly.", "What does the child write with?", "A pencil", "A spoon", "A leaf"),
    makeReadingItem("Beginner", "Story Book", "I read a story book at night. The story has a kind king.", "When does the child read?", "At night", "At lunch", "In the rain"),
    makeReadingItem("Beginner", "Happy Sunday", "On Sunday, I help my mother. Then I draw a sun and a house.", "Who does the child help?", "Mother", "Doctor", "Pilot"),
    makeReadingItem("Beginner", "My Friend", "My friend sits beside me. We share colors and draw flowers.", "Who sits beside the child?", "A friend", "A bird", "A farmer"),
    makeReadingItem("Beginner", "School Bell", "The school bell rings. We stand in a line and walk to class.", "What rings?", "The school bell", "The phone", "The door"),
    makeReadingItem("Beginner", "After School", "After school, I drink water and rest. Then I finish my homework.", "What does the child finish?", "Homework", "A race", "A song"),
    makeReadingItem("Beginner", "My Garden", "I see flowers in my garden. A butterfly sits on a yellow flower.", "What sits on the flower?", "A butterfly", "A pencil", "A shoe"),
    makeReadingItem("Beginner", "Clean Teeth", "I brush my teeth every morning. My teeth feel clean and fresh.", "What feels clean?", "Teeth", "Shoes", "Books"),
    makeReadingItem("Beginner", "Bus Ride", "I sit near the window in the bus. I see trees and shops on the way.", "Where does the child sit?", "Near the window", "Under the seat", "On the roof"),
    makeReadingItem("Beginner", "My Drawing", "I draw a big tree. I color the leaves green and the trunk brown.", "What does the child draw?", "A big tree", "A train", "A phone"),
    makeReadingItem("Beginner", "Bed Time", "At night, I keep my books away. I say good night and sleep.", "What does the child say?", "Good night", "Good morning", "Happy birthday"),
  ],
  explorer: [
    makeReadingItem("Explorer", "A Helpful Friend", "Riya saw a new student in class. The student looked quiet, so Riya shared her book and explained the activity carefully.", "Who helped the new student?", "Riya", "The driver", "The doctor"),
    makeReadingItem("Explorer", "Garden Duty", "Every Saturday, Arjun waters the plants in his garden. He removes dry leaves and feels responsible for keeping the garden clean.", "When does Arjun water the plants?", "Every Saturday", "Every Monday", "Every night"),
    makeReadingItem("Explorer", "The Lost Eraser", "Kabir could not find his eraser. His friend checked under the desk and found it near the chair.", "Where was the eraser found?", "Near the chair", "Inside the bottle", "On the bus"),
    makeReadingItem("Explorer", "Morning Assembly", "The students stood in neat lines for assembly. They sang the prayer and listened to the thought of the day.", "What did the students listen to?", "The thought of the day", "A cooking show", "A cricket score"),
    makeReadingItem("Explorer", "Neat Notebook", "Anaya wrote the date, heading and answers neatly. Her teacher praised her careful notebook work.", "Why was Anaya praised?", "For neat notebook work", "For running fast", "For hiding books"),
    makeReadingItem("Explorer", "Water Bottle", "During games period, Manav drank water slowly. He remembered to close the bottle tightly.", "What did Manav close tightly?", "The bottle", "The window", "The gate"),
    makeReadingItem("Explorer", "Library Visit", "The class visited the library after lunch. Each child selected one story book and sat quietly.", "Where did the class go?", "The library", "The playground", "The kitchen"),
    makeReadingItem("Explorer", "Kind Words", "Meera said thank you to the helper. Her polite words made everyone smile.", "What did Meera say?", "Thank you", "Go away", "Run fast"),
    makeReadingItem("Explorer", "Practice Time", "Dev practised reading one paragraph daily. After a week, he could read louder and clearer.", "What did Dev practise?", "Reading", "Swimming", "Painting walls"),
    makeReadingItem("Explorer", "Clean Desk", "Before leaving class, Simran arranged her books and picked up small paper pieces from the floor.", "What did Simran pick up?", "Paper pieces", "Mangoes", "Shoes"),
    makeReadingItem("Explorer", "Sports Day", "Aarav ran in the race and reached the finish line. He felt proud because he did not give up.", "Why did Aarav feel proud?", "He did not give up", "He slept late", "He missed school"),
    makeReadingItem("Explorer", "Helping Grandmother", "Nisha helped her grandmother carry a light bag. They walked slowly and talked happily.", "Who did Nisha help?", "Her grandmother", "A police officer", "A shopkeeper"),
    makeReadingItem("Explorer", "The Class Plant", "The children named the class plant Greeny. They watered it and watched two new leaves grow.", "What did the children name the plant?", "Greeny", "Sunny", "Rocky"),
    makeReadingItem("Explorer", "Drawing Competition", "Rahul drew a clean village scene. He added mountains, fields and a small river.", "What did Rahul draw?", "A village scene", "A city mall", "A spaceship"),
    makeReadingItem("Explorer", "Quiet Reading", "The teacher asked everyone to read silently for ten minutes. The room became calm and focused.", "How did the room become?", "Calm and focused", "Noisy and messy", "Dark and cold"),
    makeReadingItem("Explorer", "The Lunch Box", "Tara opened her lunch box and shared fruits with her friend. They ate together happily.", "What did Tara share?", "Fruits", "Pencils", "Shoes"),
    makeReadingItem("Explorer", "Clean Shoes", "Before assembly, Rohan cleaned his shoes with a soft cloth. He wanted to look neat.", "What did Rohan clean?", "His shoes", "His bag", "His desk"),
    makeReadingItem("Explorer", "The Little Seed", "A little seed was planted near the wall. After many days, a tiny green shoot came out.", "What came out of the seed?", "A tiny green shoot", "A toy car", "A paper boat"),
    makeReadingItem("Explorer", "Reading Partner", "Ishita and Pari read the same paragraph together. They corrected each other gently.", "How did they correct each other?", "Gently", "Rudely", "Angrily"),
    makeReadingItem("Explorer", "School Notice", "The monitor read the school notice aloud. The class listened carefully to the picnic details.", "What was in the notice?", "Picnic details", "A movie ticket", "A shopping list"),
  ],
  confident: [
    makeReadingItem("Confident Reader", "The Library Monitor", "Naman became the library monitor for his class. He arranged the story books, guided younger children and reminded everyone to return books on time.", "What role did Naman get?", "Library monitor", "Sports captain", "Class artist"),
    makeReadingItem("Confident Reader", "Practice Before Stage", "Before the school assembly, Meera practised her speech slowly. She paused after each sentence and spoke with confidence in front of everyone.", "What did Meera practise?", "Her speech", "A dance step", "A maths sum"),
    makeReadingItem("Confident Reader", "The Clean Classroom", "The students made a small plan to keep their classroom clean. One group arranged books, another cleaned desks and everyone checked the floor before leaving.", "What did the students plan?", "To keep the classroom clean", "To close the school", "To cancel lunch"),
    makeReadingItem("Confident Reader", "A Rainy Walk", "When it started raining, Kavya held her umbrella properly and helped her younger brother cross the wet path safely.", "Who did Kavya help?", "Her younger brother", "Her teacher", "Her neighbour's dog"),
    makeReadingItem("Confident Reader", "The Reading Promise", "Aman promised to read one page every night. Slowly, he started recognizing new words and reading with better speed.", "What did Aman promise?", "To read one page every night", "To watch cartoons all night", "To skip reading"),
    makeReadingItem("Confident Reader", "Science Corner", "The teacher created a science corner with magnets, leaves and stones. Children observed each object and wrote one sentence about it.", "What did children write?", "One sentence about each object", "A long song", "A birthday card"),
    makeReadingItem("Confident Reader", "The Honest Answer", "During the quiz, Sana forgot one answer. She honestly said she did not know and listened carefully when the teacher explained it.", "What did Sana say?", "She did not know", "She was sleeping", "She had finished lunch"),
    makeReadingItem("Confident Reader", "The School Garden", "Our school garden has bright flowers and young plants. Students visit it to learn patience, care and responsibility.", "What does the garden teach?", "Patience, care and responsibility", "Noise and anger", "Shopping and travel"),
    makeReadingItem("Confident Reader", "Team Project", "Four students worked on a chart about healthy food. They divided the work, shared ideas and completed the project before the bell.", "What was the chart about?", "Healthy food", "Old coins", "Fast cars"),
    makeReadingItem("Confident Reader", "Helping at Home", "After finishing homework, Diya helped set the dinner table. Her parents appreciated her responsible habit.", "What did Diya help set?", "The dinner table", "A football goal", "A shop counter"),
    makeReadingItem("Confident Reader", "The New Word", "The word curious was new for Raghav. He asked its meaning, used it in a sentence and remembered it the next day.", "Which word was new?", "Curious", "Dinner", "Window"),
    makeReadingItem("Confident Reader", "A Calm Leader", "The class leader spoke calmly when two friends disagreed. He listened to both sides and helped them solve the problem.", "How did the leader speak?", "Calmly", "Loudly and rudely", "Without listening"),
    makeReadingItem("Confident Reader", "Festival Card", "Children prepared festival cards for their families. They wrote kind messages and decorated each card with care.", "Who were the cards for?", "Their families", "Bus drivers", "Shopkeepers"),
    makeReadingItem("Confident Reader", "The Missed Bus", "Ritika missed the bus but did not panic. She informed her teacher and waited safely near the school gate.", "What did Ritika do?", "Informed her teacher", "Ran away", "Cried all day"),
    makeReadingItem("Confident Reader", "Reading With Expression", "The teacher asked students to change their voice while reading dialogues. The story sounded lively and easier to understand.", "What made the story lively?", "Changing voice while reading", "Closing the book", "Skipping dialogues"),
    makeReadingItem("Confident Reader", "The Helpful Monitor", "The monitor checked if everyone had submitted homework. He made a list and spoke politely to the teacher.", "What did the monitor make?", "A list", "A cake", "A kite"),
    makeReadingItem("Confident Reader", "Small Savings", "Nikhil saved a few coins every week. At the end of the month, he bought a book with his own savings.", "What did Nikhil buy?", "A book", "A bicycle", "A phone"),
    makeReadingItem("Confident Reader", "Nature Walk", "During the nature walk, children noticed different leaves, bird sounds and small insects near the garden path.", "What did children notice?", "Leaves, bird sounds and insects", "Only buses", "Only lunch boxes"),
    makeReadingItem("Confident Reader", "The Brave Try", "Although the paragraph looked long, Vanya read it sentence by sentence. Her confidence improved after the second attempt.", "How did Vanya read it?", "Sentence by sentence", "Without opening the book", "By skipping every line"),
    makeReadingItem("Confident Reader", "The Thank You Note", "After the visit, students wrote a thank you note to the guest speaker. They mentioned what they learned from the session.", "What did students write?", "A thank you note", "A weather report", "A menu card"),
  ],
  challenge: [
    makeReadingItem("Challenge Mode", "The Science Exhibition", "During the science exhibition, Kabir presented a working model of rainwater harvesting. He explained the idea clearly, answered questions patiently and encouraged his friends to save water at home.", "What model did Kabir present?", "Rainwater harvesting", "Traffic lights", "A toy train"),
    makeReadingItem("Challenge Mode", "A Responsible Team", "The class prepared for cleanliness day by making posters, dividing duties and speaking politely to visitors. Their teacher praised the team for planning the work without confusion.", "Why did the teacher praise them?", "They planned without confusion", "They shouted loudly", "They forgot their duties"),
    makeReadingItem("Challenge Mode", "The Debate Practice", "Before the debate, students collected facts, arranged their points and practised speaking with a steady voice. They learned that preparation makes confidence stronger.", "What made confidence stronger?", "Preparation", "Guessing answers", "Avoiding practice"),
    makeReadingItem("Challenge Mode", "The Community Helper Visit", "A nurse visited the classroom and explained basic health habits. Students asked thoughtful questions about cleanliness, nutrition and helping sick people.", "Who visited the classroom?", "A nurse", "A musician", "A shop owner"),
    makeReadingItem("Challenge Mode", "The Reading Circle", "In the reading circle, every student read one paragraph and shared the main idea. The activity helped them listen carefully and speak in complete sentences.", "What did students share?", "The main idea", "Their lunch", "A secret code"),
    makeReadingItem("Challenge Mode", "A Smart Study Plan", "Ishan made a weekly study plan before his exams. He kept time for revision, short breaks and doubt clearing with his teacher.", "What did Ishan make?", "A weekly study plan", "A birthday poster", "A travel ticket"),
    makeReadingItem("Challenge Mode", "The Kind Captain", "The team captain encouraged every player during practice. Even when the team lost, she appreciated effort and discussed how to improve next time.", "What did the captain appreciate?", "Effort", "Noise", "Delay"),
    makeReadingItem("Challenge Mode", "A Visit to the Farm", "Students visited a farm and observed how vegetables grow. The farmer explained soil care, watering and the importance of hard work.", "What did students observe?", "How vegetables grow", "How phones are made", "How cars race"),
    makeReadingItem("Challenge Mode", "The Problem Solver", "When the chart paper tore, Alisha did not complain. She used tape, redesigned the border and helped her group finish the presentation.", "What did Alisha use?", "Tape", "Glue only", "A hammer"),
    makeReadingItem("Challenge Mode", "The History Model", "For the history project, students built a small fort model. They labelled the gate, walls and watch tower, then explained their purpose.", "What did students build?", "A small fort model", "A rocket engine", "A water bottle"),
    makeReadingItem("Challenge Mode", "The Thoughtful Question", "During English class, Harsh asked why some words sound the same but have different meanings. The teacher explained homophones with simple examples.", "What did the teacher explain?", "Homophones", "Fractions", "Weather changes"),
    makeReadingItem("Challenge Mode", "The Confidence Diary", "Every evening, Myra wrote one thing she did well and one thing she wanted to improve. Her diary helped her notice small progress.", "What helped Myra notice progress?", "Her diary", "A loud bell", "A shopping bag"),
    makeReadingItem("Challenge Mode", "The Safety Drill", "The school conducted a safety drill to teach students how to leave classrooms calmly. Teachers guided everyone to the open ground.", "Where did teachers guide everyone?", "The open ground", "The library shelf", "The kitchen"),
    makeReadingItem("Challenge Mode", "The Eco Club", "Members of the eco club collected used paper and made new notebooks. They learned that small actions can reduce waste.", "What did the eco club make?", "New notebooks", "Plastic toys", "Lunch plates"),
    makeReadingItem("Challenge Mode", "The Guest Speaker", "A young engineer spoke about building useful machines. She told students that curiosity, patience and practice are important for innovation.", "What is important for innovation?", "Curiosity, patience and practice", "Laziness and delay", "Skipping questions"),
    makeReadingItem("Challenge Mode", "The News Reader", "Tanvi read the morning news clearly during assembly. She pronounced difficult words carefully and paused after every important sentence.", "What did Tanvi read?", "The morning news", "A recipe", "A comic title"),
    makeReadingItem("Challenge Mode", "The Maths Fair", "At the maths fair, students created games using shapes, numbers and patterns. Visitors learned concepts while playing simple challenges.", "What did students create?", "Games using shapes, numbers and patterns", "Only songs", "Only drawings of food"),
    makeReadingItem("Challenge Mode", "The Patient Artist", "Armaan painted a village scene for two days. He added small details slowly and learned that patient work often looks better.", "What did Armaan learn?", "Patient work often looks better", "Fast work is always perfect", "Details do not matter"),
    makeReadingItem("Challenge Mode", "The Class Newsletter", "The class prepared a monthly newsletter with poems, drawings and event reports. Each child contributed one small piece of work.", "What did each child contribute?", "One small piece of work", "A large machine", "A lunch order"),
    makeReadingItem("Challenge Mode", "The Helpful App Idea", "Students discussed an app that reminds children to drink water, read daily and finish homework. They drew screens and explained how it would help families.", "What would the app remind children to do?", "Drink water, read daily and finish homework", "Buy toys and sleep late", "Forget school work"),
  ],
};

const readingGradeLabels = {
  ukg: "UKG",
  1: "Grade 1",
  2: "Grade 2",
  3: "Grade 3",
  4: "Grade 4",
  5: "Grade 5",
  6: "Grade 6",
  7: "Grade 7",
  8: "Grade 8",
  9: "Grade 9",
  10: "Grade 10",
};

const readingLevelLabels = {
  beginner: "Beginner",
  explorer: "Explorer",
  confident: "Confident Reader",
  challenge: "Challenge Mode",
};

const ukgWordSets = [
  ["cat", "bat", "mat", "hat", "rat"],
  ["sun", "run", "fun", "bun", "cup"],
  ["red", "bed", "pen", "hen", "ten"],
  ["dog", "log", "fog", "box", "fox"],
  ["bag", "tag", "rag", "cap", "map"],
  ["pin", "tin", "win", "sit", "hit"],
  ["top", "hop", "mop", "pot", "hot"],
  ["jam", "ram", "yam", "van", "fan"],
  ["fish", "dish", "ship", "shop", "shell"],
  ["ball", "bell", "doll", "duck", "door"],
  ["apple", "ant", "arrow", "arm", "ask"],
  ["book", "bag", "bus", "boy", "box"],
  ["cake", "cup", "cat", "car", "cap"],
  ["milk", "moon", "mat", "man", "map"],
  ["leaf", "lamp", "lion", "leg", "log"],
  ["tree", "toy", "tap", "top", "ten"],
  ["rain", "rose", "red", "rat", "run"],
  ["kite", "king", "key", "kid", "kit"],
  ["star", "sit", "sun", "sock", "seed"],
  ["home", "hand", "hat", "hen", "hill"],
];

const gradeOneTopics = [
  ["My Daily Routine", "I wake up early. I brush my teeth. I eat breakfast. I go to school happily.", "What does the child do after waking up?", "Brush teeth"],
  ["My School", "My school is clean and bright. I learn, play and read with my friends.", "Where does the child learn and play?", "School"],
  ["My Friend", "My friend sits with me in class. We share pencils and help each other.", "Who sits with the child?", "Friend"],
  ["My Favorite Color", "My favorite color is blue. I like blue sky, blue flowers and my blue bag.", "What is the favorite color?", "Blue"],
  ["My Family", "I love my family. We eat dinner together and talk about our day.", "Who does the child love?", "Family"],
  ["My Lunch Box", "My lunch box has roti and fruit. I eat slowly and keep it clean.", "What is in the lunch box?", "Roti and fruit"],
  ["My Toy", "I have a small toy car. I keep it safely after playing.", "What toy does the child have?", "Toy car"],
  ["My Teacher", "My teacher helps me read new words. She smiles when I try again.", "Who helps the child read?", "Teacher"],
  ["My Birthday", "On my birthday, I wear new clothes. My friends sing a happy song.", "What do friends sing?", "A happy song"],
  ["My Garden", "I see flowers in my garden. I water the plants in the evening.", "What does the child water?", "Plants"],
  ["My Book", "I read my book at night. The story has a brave child.", "When does the child read?", "At night"],
  ["My Pet", "My pet dog runs fast. He plays with a red ball.", "What does the dog play with?", "Red ball"],
  ["My Classroom", "Our classroom has charts and books. We keep it neat every day.", "What is in the classroom?", "Charts and books"],
  ["My Uniform", "I wear my uniform to school. I keep my shoes clean.", "What does the child wear?", "Uniform"],
  ["My Morning Walk", "I walk with my father in the morning. We see trees and birds.", "Who walks with the child?", "Father"],
  ["My Pencil Box", "My pencil box has pencils, eraser and sharpener. I keep it inside my bag.", "What is inside the pencil box?", "Pencils, eraser and sharpener"],
  ["My Playground", "I play on the playground after class. I run and laugh with friends.", "Where does the child play?", "Playground"],
  ["My Favorite Fruit", "My favorite fruit is mango. It is sweet, yellow and juicy.", "Which fruit is favorite?", "Mango"],
  ["My Raincoat", "It rains today. I wear my raincoat and walk carefully.", "What does the child wear?", "Raincoat"],
  ["My Bedtime", "At bedtime, I keep my toys away. I say good night and sleep.", "What does the child say?", "Good night"],
];

const readingGradeThemes = {
  2: ["helping at home", "clean classroom", "school garden", "library visit", "kind words", "healthy lunch", "rainy day", "festival card", "sports practice", "reading partner"],
  3: ["science corner", "community helper", "team chart", "plant growth", "good habits", "water saving", "story circle", "class monitor", "nature walk", "morning assembly"],
  4: ["responsible leader", "cleanliness drive", "school exhibition", "reading challenge", "helpful neighbour", "traffic safety", "healthy routine", "garden project", "library monitor", "art competition"],
  5: ["study plan", "environment project", "public speaking", "team responsibility", "historical place", "science fair", "newspaper reading", "problem solving", "honest choice", "community visit"],
  6: ["time management", "digital safety", "water conservation", "team leadership", "creative writing", "exam preparation", "health awareness", "school newsletter", "science model", "peer support"],
  7: ["climate action", "debate preparation", "responsible technology", "entrepreneurship idea", "research habits", "social responsibility", "reading reflection", "career curiosity", "innovation lab", "public service"],
  8: ["leadership in groups", "financial awareness", "cyber safety", "scientific thinking", "sustainable living", "community research", "critical reading", "presentation skills", "problem analysis", "future planning"],
  9: ["career exploration", "digital discipline", "environment policy", "communication skills", "project research", "personal responsibility", "exam strategy", "social impact", "technology ethics", "leadership decisions"],
  10: ["board exam planning", "career readiness", "responsible AI", "public speaking", "research-based projects", "time ownership", "mental focus", "digital portfolio", "social innovation", "future goals"],
};

const readingLevelPatterns = {
  beginner: {
    intro: "This passage uses clear sentences for early reading practice.",
    detail: "Read slowly and pause after each full stop.",
  },
  explorer: {
    intro: "This passage adds more detail and connects ideas.",
    detail: "Notice the action, reason and result while reading.",
  },
  confident: {
    intro: "This passage uses richer vocabulary and longer sentence flow.",
    detail: "Read with expression and keep the meaning clear.",
  },
  challenge: {
    intro: "This passage asks the reader to handle mature ideas with confidence.",
    detail: "Use steady pace, clear pauses and thoughtful expression.",
  },
};

function titleCaseReadingTopic(topic) {
  return topic.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildUkgReadingLevels() {
  return Object.fromEntries(
    Object.entries(readingLevelLabels).map(([levelKey, label]) => [
      levelKey,
      ukgWordSets.map((words, index) => {
        const levelWords =
          levelKey === "beginner"
            ? words.slice(0, 3)
            : levelKey === "explorer"
              ? words.slice(0, 4)
              : levelKey === "confident"
                ? words
                : [...words, "read", "say"];
        return makeReadingItem(label, `Word Reading ${index + 1}`, levelWords.join(". ") + ".", "Which word should the child read first?", levelWords[0], "school", "garden");
      }),
    ])
  );
}

function buildGradeOneReadingLevels() {
  return Object.fromEntries(
    Object.entries(readingLevelLabels).map(([levelKey, label]) => [
      levelKey,
      gradeOneTopics.map(([title, baseText, question, answer]) => {
        const text =
          levelKey === "beginner"
            ? baseText
            : levelKey === "explorer"
              ? `${baseText} I read the words again and speak clearly.`
              : levelKey === "confident"
                ? `${baseText} I answer one small question and tell the idea in my own words.`
                : `${baseText} I practise the paragraph twice, use clear pauses and explain the main idea confidently.`;
        return makeReadingItem(label, title, text, question, answer, "Lunch box", "Playground");
      }),
    ])
  );
}

function buildHigherGradeReadingLevels(grade) {
  const themes = readingGradeThemes[grade] || readingGradeThemes[2];
  return Object.fromEntries(
    Object.entries(readingLevelLabels).map(([levelKey, label]) => [
      levelKey,
      Array.from({ length: 20 }, (_, index) => {
        const topic = themes[index % themes.length];
        const title = `${titleCaseReadingTopic(topic)} ${index + 1}`;
        const pattern = readingLevelPatterns[levelKey];
        const text =
          levelKey === "beginner"
            ? `Students read about ${topic}. ${pattern.intro} The child understands the main idea and says one clear sentence about it.`
            : levelKey === "explorer"
              ? `Students explore ${topic} through a short classroom situation. ${pattern.intro} The reader finds what happened, why it mattered and how the student responded.`
              : levelKey === "confident"
                ? `${titleCaseReadingTopic(topic)} becomes part of confident learning. ${pattern.intro} The student connects details, explains the purpose and reads the paragraph with natural expression.`
                : `This challenge passage presents ${topic} as a real-life thinking task. ${pattern.intro} The reader must keep a steady pace, understand the message and explain the outcome clearly.`;
        return makeReadingItem(label, title, text, "What is the passage mainly about?", topic, "a picnic menu", "a lost pencil");
      }),
    ])
  );
}

function getReadingLevelsForGrade(grade) {
  if (grade === "ukg") return buildUkgReadingLevels();
  if (grade === "1") return buildGradeOneReadingLevels();
  return buildHigherGradeReadingLevels(Number(grade));
}

function normalizeReadingWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function uniqueWordList(words) {
  return [...new Set(words)].slice(0, 12);
}

function cleanReadingTranscript(text) {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (!words.length) return "";
  const sameChunk = (startA, startB, size) => {
    for (let offset = 0; offset < size; offset += 1) {
      if (words[startA + offset].toLowerCase() !== words[startB + offset].toLowerCase()) return false;
    }
    return true;
  };
  const cleaned = [];
  let index = 0;
  while (index < words.length) {
    let repeatSize = 0;
    const maxSize = Math.min(8, Math.floor((words.length - index) / 2));
    for (let size = maxSize; size >= 1; size -= 1) {
      if (sameChunk(index, index + size, size)) {
        repeatSize = size;
        break;
      }
    }
    if (!repeatSize) {
      cleaned.push(words[index]);
      index += 1;
      continue;
    }
    cleaned.push(...words.slice(index, index + repeatSize));
    index += repeatSize;
    while (index + repeatSize <= words.length && sameChunk(index - repeatSize, index, repeatSize)) {
      index += repeatSize;
    }
  }
  return cleaned.join(" ");
}

function mergeReadingTranscript(baseText, nextText) {
  const baseWords = cleanReadingTranscript(baseText).split(/\s+/).filter(Boolean);
  const nextWords = cleanReadingTranscript(nextText).split(/\s+/).filter(Boolean);
  if (!baseWords.length) return nextWords.join(" ");
  if (!nextWords.length) return baseWords.join(" ");
  let overlap = 0;
  const maxOverlap = Math.min(baseWords.length, nextWords.length);
  for (let size = maxOverlap; size > 0; size -= 1) {
    const baseChunk = baseWords.slice(baseWords.length - size).map((word) => word.toLowerCase()).join(" ");
    const nextChunk = nextWords.slice(0, size).map((word) => word.toLowerCase()).join(" ");
    if (baseChunk === nextChunk) {
      overlap = size;
      break;
    }
  }
  return [...baseWords, ...nextWords.slice(overlap)].join(" ");
}

function getReadingDisplayTranscript(spokenText, expectedText, maxWords = 22) {
  const spokenWords = normalizeReadingWords(cleanReadingTranscript(spokenText));
  const expectedDisplayWords = expectedText.replace(/[^a-zA-Z0-9\s']/g, " ").split(/\s+/).filter(Boolean);
  const matchedWords = [];
  let spokenIndex = 0;
  expectedDisplayWords.forEach((displayWord) => {
    const expectedWord = displayWord.toLowerCase();
    const foundIndex = spokenWords.indexOf(expectedWord, spokenIndex);
    if (foundIndex >= 0) {
      matchedWords.push(displayWord);
      spokenIndex = foundIndex + 1;
    }
  });
  const displayWords = matchedWords.length ? matchedWords : cleanReadingTranscript(spokenText).split(/\s+/);
  const trimmedWords = displayWords.slice(0, maxWords);
  return `${trimmedWords.join(" ")}${displayWords.length > maxWords ? "..." : ""}`;
}

function getReadingPatienceTiming(grade, expectedWordCount) {
  const gradeNumber = grade === "ukg" ? 0 : Number(grade);
  const wordsPerMinute = gradeNumber === 0 ? 18 : gradeNumber === 1 ? 34 : gradeNumber <= 3 ? 55 : gradeNumber <= 5 ? 70 : gradeNumber <= 8 ? 85 : 95;
  const estimatedMs = Math.ceil((expectedWordCount / wordsPerMinute) * 60000);
  return {
    maxListenMs: Math.min(Math.max(estimatedMs + (gradeNumber === 0 ? 18000 : 10000), gradeNumber === 0 ? 42000 : 22000), 90000),
    minBeforeJudgingMs: gradeNumber === 0 ? 16000 : gradeNumber === 1 ? 11000 : gradeNumber <= 4 ? 7500 : 6000,
    restartLimit: gradeNumber === 0 ? 8 : gradeNumber <= 2 ? 6 : 4,
    completionRatio: gradeNumber === 0 ? 0.9 : gradeNumber <= 2 ? 0.92 : 0.95,
    heardEnoughRatio: gradeNumber === 0 ? 0.08 : gradeNumber <= 2 ? 0.16 : 0.22,
    earlyHeardRatio: gradeNumber === 0 ? 0.06 : 0.18,
  };
}

function initReadingFluencyLab() {
  const lab = document.querySelector("[data-reading-lab]");
  if (!lab) return;

  const gradeSelect = lab.querySelector("[data-reading-grade]");
  const levelSelect = lab.querySelector("[data-reading-level]");
  const levelLabel = lab.querySelector("[data-reading-level-label]");
  const studentNameInput = lab.querySelector("[data-reading-student-name]");
  const title = lab.querySelector("[data-reading-title]");
  const passage = lab.querySelector("[data-reading-passage]");
  const listenButton = lab.querySelector("[data-reading-listen]");
  const startButton = lab.querySelector("[data-reading-start]");
  const stopButton = lab.querySelector("[data-reading-stop]");
  const nextButton = lab.querySelector("[data-reading-next]");
  const listeningIndicator = lab.querySelector("[data-reading-listening]");
  const countdown = lab.querySelector("[data-reading-countdown]");
  const support = lab.querySelector("[data-reading-support]");
  const score = lab.querySelector("[data-reading-score]");
  const progress = lab.querySelector("[data-reading-progress]");
  const transcript = lab.querySelector("[data-reading-transcript]");
  const missed = lab.querySelector("[data-reading-missed]");
  const extra = lab.querySelector("[data-reading-extra]");
  const tip = lab.querySelector("[data-reading-tip]");
  const certificateCard = lab.querySelector("[data-reading-certificate]");
  const certificateName = lab.querySelector("[data-reading-certificate-name]");
  const certificateMessage = lab.querySelector("[data-reading-certificate-message]");
  const certificateGrade = lab.querySelector("[data-reading-certificate-grade]");
  const certificateScore = lab.querySelector("[data-reading-certificate-score]");
  const certificateToday = lab.querySelector("[data-reading-certificate-today]");
  const certificateStreak = lab.querySelector("[data-reading-certificate-streak]");
  const shareButton = lab.querySelector("[data-reading-share]");
  const shareNote = lab.querySelector("[data-reading-share-note]");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let grade = gradeSelect?.value || "ukg";
  let level = levelSelect?.value || "beginner";
  let passageIndex = 0;
  let recognition = null;
  let currentReadingLevels = getReadingLevelsForGrade(grade);
  let readingTimer = null;
  let countdownTimer = null;
  let readingSessionId = 0;
  let latestCertificateText = "";
  let latestCertificateData = null;
  const micSessionKey = "kidsverseReadingMicPermission";
  const streakStorageKey = "kidsverseReadingPracticeStreak";
  const studentNameStorageKey = "kidsverseReadingStudentName";

  function activePassage() {
    return currentReadingLevels[level][passageIndex];
  }

  function renderPassage() {
    const data = activePassage();
    stopTenseReading();
    readingSessionId += 1;
    recognition?.abort();
    window.clearTimeout(readingTimer);
    window.clearTimeout(countdownTimer);
    levelLabel.textContent = `${readingGradeLabels[grade]} - ${data.label}`;
    title.textContent = data.title;
    passage.textContent = data.text;
    score.textContent = "--";
    progress.value = 0;
    transcript.textContent = "Click Start Reading and read the paragraph aloud.";
    missed.textContent = "Words will appear here after reading.";
    extra.textContent = "Extra spoken words will appear here.";
    tip.textContent = "Listen once, then read slowly and clearly.";
    if (certificateCard) certificateCard.hidden = true;
    stopButton.hidden = true;
    if (countdown) countdown.hidden = true;
    if (listeningIndicator) listeningIndicator.hidden = true;
    startButton.disabled = false;
  }

  function showReadingResult(spokenText) {
    const cleanSpokenText = cleanReadingTranscript(spokenText);
    const expectedText = activePassage().text;
    const expectedWords = normalizeReadingWords(expectedText);
    const spokenWords = normalizeReadingWords(cleanSpokenText);
    const spokenPool = [...spokenWords];
    let correct = 0;
    const missedWords = [];

    expectedWords.forEach((word) => {
      const foundIndex = spokenPool.indexOf(word);
      if (foundIndex >= 0) {
        correct += 1;
        spokenPool.splice(foundIndex, 1);
      } else {
        missedWords.push(word);
      }
    });

    const accuracy = expectedWords.length ? Math.round((correct / expectedWords.length) * 100) : 0;
    score.textContent = `${accuracy}%`;
    progress.value = accuracy;
    transcript.textContent = getReadingDisplayTranscript(cleanSpokenText, expectedText, 22) || "We could not hear enough words. Please try again close to the microphone.";
    missed.textContent = missedWords.length ? uniqueWordList(missedWords).join(", ") : "Great. No important missing words found.";
    extra.textContent = spokenPool.length ? uniqueWordList(spokenPool).join(", ") : "No extra words found.";
    if (accuracy >= 90) {
      tip.textContent = "Excellent reading. Now practise expression and clear pauses.";
    } else if (accuracy >= 70) {
      tip.textContent = "Good reading. Try the missed words once, then read again slowly.";
    } else {
      tip.textContent = "Listen once more, read one sentence at a time and try again.";
    }
    updateReadingCertificate(accuracy);
  }

  function getStudentName() {
    const name = studentNameInput?.value.trim() || "Reading Star";
    return name.replace(/\s+/g, " ").slice(0, 40);
  }

  function getTodayDateKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getPreviousDateKey(dateKey) {
    const date = new Date(`${dateKey}T00:00:00`);
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
  }

  function loadReadingStreak() {
    try {
      return JSON.parse(localStorage.getItem(streakStorageKey)) || { lastDate: "", streak: 0, todayCount: 0 };
    } catch {
      return { lastDate: "", streak: 0, todayCount: 0 };
    }
  }

  function saveReadingStreak(data) {
    try {
      localStorage.setItem(streakStorageKey, JSON.stringify(data));
    } catch {
      /* Local storage can be unavailable; certificate still works without saved streak. */
    }
  }

  function recordReadingStreak() {
    const today = getTodayDateKey();
    const saved = loadReadingStreak();
    let streak = 1;
    let todayCount = 1;
    if (saved.lastDate === today) {
      streak = Math.max(1, Number(saved.streak) || 1);
      todayCount = (Number(saved.todayCount) || 0) + 1;
    } else if (saved.lastDate === getPreviousDateKey(today)) {
      streak = (Number(saved.streak) || 0) + 1;
    }
    const next = { lastDate: today, streak, todayCount };
    saveReadingStreak(next);
    return next;
  }

  function updateReadingCertificate(accuracy) {
    const streak = recordReadingStreak();
    const name = getStudentName();
    const gradeLabel = readingGradeLabels[grade] || "Student";
    const levelText = activePassage().label || readingLevelLabels[level] || "Reading Practice";
    latestCertificateData = {
      name,
      gradeLabel,
      levelText,
      accuracy,
      streak: streak.streak,
      todayCount: streak.todayCount,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    latestCertificateText = `${name} earned a Kidsverse Reading Star certificate today with ${accuracy}% reading accuracy. Current streak: ${streak.streak} day${streak.streak === 1 ? "" : "s"}.`;
    if (studentNameInput) {
      try {
        localStorage.setItem(studentNameStorageKey, name);
      } catch {
        /* Name saving is optional. */
      }
    }
    if (certificateName) certificateName.textContent = name;
    if (certificateMessage) certificateMessage.textContent = `${gradeLabel} - ${levelText} completed with confident effort.`;
    if (certificateGrade) certificateGrade.innerHTML = `Grade & Level<br>${gradeLabel}<br>${levelText}`;
    if (certificateScore) certificateScore.innerHTML = `Reading Accuracy<br>${accuracy}%`;
    if (certificateToday) certificateToday.innerHTML = `Today's Practice<br>${streak.todayCount}<br>Sessions`;
    if (certificateStreak) certificateStreak.innerHTML = `Current Streak<br>${streak.streak}<br>Day${streak.streak === 1 ? "" : "s"}`;
    if (shareNote) shareNote.textContent = "Certificate ready. Share it with family or friends.";
    if (certificateCard) certificateCard.hidden = false;
  }

  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = text.split(/\s+/);
    let line = "";
    let lines = 0;
    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (context.measureText(testLine).width > maxWidth && line) {
        if (lines < maxLines) context.fillText(line, x, y + lines * lineHeight);
        lines += 1;
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line && lines < maxLines) context.fillText(line, x, y + lines * lineHeight);
  }

  function createReadingCertificateBlob() {
    return new Promise((resolve) => {
      if (!latestCertificateData) {
        resolve(null);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = 1500;
      canvas.height = 900;
      const context = canvas.getContext("2d");
      if (!context.roundRect) {
        context.roundRect = function roundRectFallback(x, y, width, height, radius) {
          const corner = Math.min(radius, width / 2, height / 2);
          this.moveTo(x + corner, y);
          this.lineTo(x + width - corner, y);
          this.quadraticCurveTo(x + width, y, x + width, y + corner);
          this.lineTo(x + width, y + height - corner);
          this.quadraticCurveTo(x + width, y + height, x + width - corner, y + height);
          this.lineTo(x + corner, y + height);
          this.quadraticCurveTo(x, y + height, x, y + height - corner);
          this.lineTo(x, y + corner);
          this.quadraticCurveTo(x, y, x + corner, y);
          this.closePath();
        };
      }
      const data = latestCertificateData;
      const gradient = context.createLinearGradient(0, 0, 1500, 900);
      gradient.addColorStop(0, "#16106f");
      gradient.addColorStop(0.32, "#5b16b6");
      gradient.addColorStop(0.68, "#1b2fa8");
      gradient.addColorStop(1, "#130a55");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 1500, 900);
      for (let index = 0; index < 90; index += 1) {
        const x = (index * 173) % 1500;
        const y = (index * 97) % 900;
        const size = 4 + (index % 4) * 2;
        context.fillStyle = ["#ffd86f", "#27b9a7", "#ff73b7", "#ffffff"][index % 4];
        context.save();
        context.translate(x, y);
        context.rotate((index % 8) * 0.4);
        context.fillRect(-size / 2, -size / 2, size, size);
        context.restore();
      }
      context.fillStyle = "#fffdf5";
      context.beginPath();
      context.roundRect(305, 42, 890, 810, 26);
      context.fill();
      context.strokeStyle = "#f2c95b";
      context.lineWidth = 7;
      context.stroke();
      context.strokeStyle = "rgba(242, 201, 91, 0.42)";
      context.lineWidth = 3;
      context.strokeRect(337, 76, 826, 742);

      function drawStar(x, y, radius, color) {
        context.save();
        context.translate(x, y);
        context.fillStyle = color;
        context.beginPath();
        for (let point = 0; point < 10; point += 1) {
          const angle = -Math.PI / 2 + point * (Math.PI / 5);
          const length = point % 2 === 0 ? radius : radius * 0.46;
          context.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
        }
        context.closePath();
        context.fill();
        context.restore();
      }

      function drawCartoonChild(x, y, accent, isGirl = false) {
        context.save();
        context.translate(x, y);
        context.fillStyle = "rgba(0,0,0,0.18)";
        context.beginPath();
        context.ellipse(0, 238, 92, 28, 0, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = accent;
        context.beginPath();
        context.roundRect(-62, 92, 124, 152, 36);
        context.fill();
        context.fillStyle = "#ffd0b8";
        context.beginPath();
        context.arc(0, 42, 70, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#3b1e17";
        context.beginPath();
        context.arc(-24, 22, 62, Math.PI, 0);
        context.arc(28, 24, 52, Math.PI, 0);
        context.fill();
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(-26, 42, 15, 0, Math.PI * 2);
        context.arc(28, 42, 15, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#221714";
        context.beginPath();
        context.arc(-22, 44, 7, 0, Math.PI * 2);
        context.arc(32, 44, 7, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#a94438";
        context.lineWidth = 5;
        context.beginPath();
        context.arc(3, 72, 24, 0.08, Math.PI - 0.08);
        context.stroke();
        if (isGirl) {
          context.fillStyle = "#ff73b7";
          context.beginPath();
          context.moveTo(32, -20);
          context.lineTo(90, -56);
          context.lineTo(74, 4);
          context.closePath();
          context.fill();
        } else {
          context.fillStyle = "#f5a400";
          context.beginPath();
          context.roundRect(54, -46, 78, 86, 10);
          context.fill();
          context.fillStyle = "#ffd86f";
          context.beginPath();
          context.arc(93, -7, 26, 0, Math.PI * 2);
          context.fill();
          drawStar(93, -7, 18, "#f5a400");
        }
        context.restore();
      }

      drawCartoonChild(150, 520, "#1d8ee8", false);
      drawCartoonChild(1348, 520, "#ff73b7", true);
      drawStar(210, 130, 20, "#ffd86f");
      drawStar(1302, 132, 20, "#ffd86f");
      drawStar(472, 235, 13, "#ffbf2f");
      drawStar(1050, 218, 13, "#27b9a7");

      const ribbon = context.createLinearGradient(470, 62, 1030, 132);
      ribbon.addColorStop(0, "#5e18b8");
      ribbon.addColorStop(0.5, "#b933ff");
      ribbon.addColorStop(1, "#5e18b8");
      context.fillStyle = ribbon;
      context.beginPath();
      context.roundRect(470, 58, 560, 78, 18);
      context.fill();
      context.textAlign = "center";
      context.fillStyle = "#ffffff";
      context.font = "900 54px Nunito, Arial, sans-serif";
      context.fillText("CERTIFICATE", 750, 112);
      context.font = "900 25px Nunito, Arial, sans-serif";
      context.fillStyle = "#6d25cb";
      context.fillText("OF READING EXCELLENCE", 750, 172);
      drawStar(570, 164, 12, "#ffbf2f");
      drawStar(930, 164, 12, "#ffbf2f");
      context.fillStyle = "#283748";
      context.font = "800 22px Nunito, Arial, sans-serif";
      context.fillText("Proudly presented to", 750, 226);
      context.font = "900 72px 'Baloo 2', Nunito, Arial, sans-serif";
      context.fillStyle = "#7a22dc";
      wrapCanvasText(context, data.name, 750, 320, 760, 72, 2);
      context.strokeStyle = "rgba(154, 54, 255, 0.35)";
      context.setLineDash([10, 9]);
      context.beginPath();
      context.moveTo(480, 356);
      context.lineTo(1020, 356);
      context.stroke();
      context.setLineDash([]);
      context.fillStyle = "#283748";
      context.font = "900 28px Nunito, Arial, sans-serif";
      context.fillText("You are a", 610, 418);
      context.fillStyle = "#9b36ff";
      context.beginPath();
      context.roundRect(690, 384, 245, 52, 26);
      context.fill();
      context.fillStyle = "#ffffff";
      context.fillText("Reading Star!", 812, 419);
      drawStar(930, 410, 22, "#ffd86f");

      const metrics = [
        { icon: "🎓", label: "Grade & Level", value: data.gradeLabel, sub: data.levelText, color: "#6d25cb" },
        { icon: "🎯", label: "Reading Accuracy", value: `${data.accuracy}%`, sub: data.accuracy >= 90 ? "Excellent!" : "Great effort!", color: "#099952" },
        { icon: "📅", label: "Today's Practice", value: `${data.todayCount}`, sub: "Sessions", color: "#0876ca" },
        { icon: "🔥", label: "Current Streak", value: `${data.streak}`, sub: "Days in a row!", color: "#e14d20" },
      ];
      metrics.forEach((metric, index) => {
        const x = 410 + index * 225;
        context.fillStyle = "rgba(255,255,255,0.86)";
        context.beginPath();
        context.roundRect(x - 92, 485, 184, 185, 18);
        context.fill();
        context.strokeStyle = "rgba(216, 174, 87, 0.28)";
        context.lineWidth = 2;
        context.stroke();
        context.font = "34px Arial, sans-serif";
        context.fillText(metric.icon, x, 532);
        context.fillStyle = "#283748";
        context.font = "900 18px Nunito, Arial, sans-serif";
        context.fillText(metric.label, x, 566);
        context.fillStyle = metric.color;
        context.font = "900 48px Nunito, Arial, sans-serif";
        context.fillText(metric.value, x, 626);
        context.fillStyle = metric.color;
        context.beginPath();
        context.roundRect(x - 62, 640, 124, 32, 16);
        context.fill();
        context.fillStyle = "#ffffff";
        context.font = "900 17px Nunito, Arial, sans-serif";
        context.fillText(metric.sub.slice(0, 18), x, 662);
      });

      context.fillStyle = "#6d25cb";
      context.beginPath();
      context.roundRect(505, 720, 490, 56, 18);
      context.fill();
      drawStar(540, 748, 19, "#ffd86f");
      drawStar(960, 748, 19, "#ffd86f");
      context.fillStyle = "#ffffff";
      context.font = "900 31px 'Baloo 2', Nunito, Arial, sans-serif";
      context.fillText("Keep shining and keep reading!", 750, 758);
      context.fillStyle = "rgba(255,255,255,0.9)";
      context.font = "800 18px Nunito, Arial, sans-serif";
      context.fillText(`Created on ${data.date} | Kidsverse School Rehan`, 750, 830);
      canvas.toBlob((blob) => resolve(blob), "image/png", 0.95);
    });
  }

  function getSavedMicPermission() {
    try {
      return sessionStorage.getItem(micSessionKey);
    } catch {
      return "";
    }
  }

  function saveMicPermission(value) {
    try {
      sessionStorage.setItem(micSessionKey, value);
    } catch {
      /* Session storage can be blocked in private modes; reading still works without it. */
    }
  }

  try {
    const savedName = localStorage.getItem(studentNameStorageKey);
    if (savedName && studentNameInput) studentNameInput.value = savedName;
  } catch {
    /* Optional student name restore. */
  }

  async function getCurrentMicPermission() {
    if (!navigator.permissions?.query) return getSavedMicPermission();
    try {
      const status = await navigator.permissions.query({ name: "microphone" });
      saveMicPermission(status.state);
      status.onchange = () => saveMicPermission(status.state);
      return status.state;
    } catch {
      return getSavedMicPermission();
    }
  }

  function runReadingCountdown(sessionId) {
    return new Promise((resolve) => {
      if (!countdown) {
        resolve(true);
        return;
      }
      const steps = ["3", "2", "1", "Start"];
      let index = 0;
      countdown.hidden = false;
      countdown.textContent = steps[index];
      function tick() {
        if (sessionId !== readingSessionId) {
          countdown.hidden = true;
          resolve(false);
          return;
        }
        index += 1;
        if (index >= steps.length) {
          countdown.textContent = "Start";
          countdownTimer = window.setTimeout(() => {
            countdown.hidden = true;
            resolve(sessionId === readingSessionId);
          }, 420);
          return;
        }
        countdown.textContent = steps[index];
        countdownTimer = window.setTimeout(tick, 720);
      }
      countdownTimer = window.setTimeout(tick, 720);
    });
  }

  levelSelect?.addEventListener("change", () => {
    level = levelSelect.value || "beginner";
    passageIndex = 0;
    renderPassage();
  });

  gradeSelect?.addEventListener("change", () => {
    grade = gradeSelect.value || "ukg";
    passageIndex = 0;
    currentReadingLevels = getReadingLevelsForGrade(grade);
    renderPassage();
  });

  listenButton?.addEventListener("click", () => speakRoutineText(activePassage().text, listenButton));

  shareButton?.addEventListener("click", async () => {
    const labLink = window.location.href;
    const shareText = `${latestCertificateText || `${getStudentName()} completed Kidsverse Reading Fluency practice today.`}\nPractice here: ${labLink}`;
    const certificateBlob = await createReadingCertificateBlob();
    if (certificateBlob) {
      const file = new File([certificateBlob], "kidsverse-reading-star-certificate.png", { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ title: "Kidsverse Reading Star Certificate", text: shareText, url: labLink, files: [file] });
          if (shareNote) shareNote.textContent = "Certificate image shared successfully.";
          return;
        } catch {
          if (shareNote) shareNote.textContent = "Sharing was cancelled. You can try again.";
          return;
        }
      }
    }
    if (navigator.share) {
      try {
        await navigator.share({ title: "Kidsverse Reading Star Certificate", text: shareText, url: labLink });
        if (shareNote) shareNote.textContent = "Certificate shared successfully.";
        return;
      } catch {
        if (shareNote) shareNote.textContent = "Sharing was cancelled. You can try again.";
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      if (shareNote) shareNote.textContent = "Certificate message copied. You can paste it on WhatsApp or social media.";
    } catch {
      if (shareNote) shareNote.textContent = shareText;
    }
  });

  nextButton?.addEventListener("click", () => {
    passageIndex = (passageIndex + 1) % currentReadingLevels[level].length;
    renderPassage();
  });

  startButton?.addEventListener("click", async () => {
    if (!SpeechRecognition) {
      support.textContent = "Microphone reading check is not supported in this browser. Please open this page in Chrome.";
      support.classList.add("is-warning");
      return;
    }

    const permission = await getCurrentMicPermission();
    if (permission === "denied") {
      support.textContent = "Microphone is blocked for this page. Please allow microphone access from Chrome site settings, then try again.";
      support.classList.add("is-warning");
      return;
    }

    stopTenseReading();
    recognition?.abort();
    window.clearTimeout(readingTimer);
    window.clearTimeout(countdownTimer);
    let finalText = "";
    let latestTranscript = "";
    let committedText = "";
    let readingFailed = false;
    let manualStop = false;
    let countdownActive = true;
    let recognitionStarted = false;
    let restartCount = 0;
    let recognitionStartedAt = 0;
    const sessionStartedAt = Date.now();
    const expectedWordCount = normalizeReadingWords(activePassage().text).length;
    const timing = getReadingPatienceTiming(grade, expectedWordCount);
    readingSessionId += 1;
    const sessionId = readingSessionId;

    startButton.disabled = true;
    stopButton.hidden = false;
    transcript.textContent = "Get ready. Reading will start after the countdown.";
    support.textContent =
      permission === "granted" ? "Microphone is ready. Start after the countdown." : "Please allow microphone access if Chrome asks, then start after the countdown.";
    support.classList.remove("is-warning");
    if (countdown) countdown.hidden = false;
    if (listeningIndicator) listeningIndicator.hidden = true;

    function finishReading() {
      if (sessionId !== readingSessionId) return;
      window.clearTimeout(readingTimer);
      window.clearTimeout(countdownTimer);
      startButton.disabled = false;
      stopButton.hidden = true;
      if (countdown) countdown.hidden = true;
      if (listeningIndicator) listeningIndicator.hidden = true;
      showReadingResult(latestTranscript || finalText);
    }

    function beginRecognition() {
      if (sessionId !== readingSessionId) return;
      recognitionStarted = true;
      recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = true;
      recognition.continuous = true;
      recognitionStartedAt = Date.now();

      recognition.onstart = () => {
        if (sessionId !== readingSessionId) return;
        saveMicPermission("granted");
        support.textContent = "Listening patiently. Slow reading is okay.";
      };

      recognition.onresult = (event) => {
        if (sessionId !== readingSessionId) return;
        const finalParts = [];
        const interimParts = [];
        for (let index = 0; index < event.results.length; index += 1) {
          const text = event.results[index][0].transcript;
          if (event.results[index].isFinal) {
            finalParts.push(text);
          } else {
            interimParts.push(text);
          }
        }
        finalText = mergeReadingTranscript(committedText, finalParts.join(" "));
        latestTranscript = mergeReadingTranscript(finalText, interimParts.join(" "));
        const displayText = getReadingDisplayTranscript(latestTranscript, activePassage().text, 16);
        transcript.textContent = displayText || "Listening now. You can begin when ready.";
      };

      recognition.onerror = (event) => {
        if (sessionId !== readingSessionId) return;
        const elapsed = Date.now() - recognitionStartedAt;
        const heardEnough = normalizeReadingWords(latestTranscript || finalText).length >= Math.max(grade === "ukg" ? 1 : 2, Math.ceil(expectedWordCount * timing.earlyHeardRatio));
        if ((event.error === "no-speech" || event.error === "audio-capture") && elapsed < timing.minBeforeJudgingMs && restartCount < timing.restartLimit) {
          restartCount += 1;
          support.textContent = "Still listening. Start slowly when ready.";
          return;
        }
        readingFailed = true;
        startButton.disabled = false;
        stopButton.hidden = true;
        if (listeningIndicator) listeningIndicator.hidden = true;
        getCurrentMicPermission().then((state) => {
          support.textContent =
            state === "denied"
              ? "Microphone is blocked for this page. Please allow access from Chrome site settings."
              : heardEnough
                ? "We heard some words. Press Start Reading again when the child is ready to continue."
                : "We could not hear clearly yet. Let the child sit close to the microphone and try again slowly.";
        });
        support.classList.add("is-warning");
      };

      recognition.onend = () => {
        if (sessionId !== readingSessionId) return;
        if (manualStop) {
          finishReading();
          return;
        }
        if (readingFailed) return;

        const recognitionElapsed = Date.now() - recognitionStartedAt;
        const sessionElapsed = Date.now() - sessionStartedAt;
        const heardWords = normalizeReadingWords(latestTranscript || finalText).length;
        const completedEnough = heardWords >= Math.max(grade === "ukg" ? 1 : 3, Math.ceil(expectedWordCount * timing.completionRatio));
        const stillHasTime = sessionElapsed < timing.maxListenMs - 1200;
        const shouldContinue =
          !completedEnough &&
          stillHasTime &&
          restartCount < timing.restartLimit &&
          (recognitionElapsed < timing.minBeforeJudgingMs || heardWords < expectedWordCount);
        if (shouldContinue) {
          restartCount += 1;
          committedText = latestTranscript || finalText;
          support.textContent = "Still listening. Continue reading slowly.";
          window.setTimeout(beginRecognition, 180);
          return;
        }
        finishReading();
      };

      recognition.start();
    }

    stopButton.onclick = () => {
      manualStop = true;
      window.clearTimeout(countdownTimer);
      if (countdown) countdown.hidden = true;
      if (listeningIndicator) listeningIndicator.hidden = true;
      if (countdownActive || !recognitionStarted) {
        readingSessionId += 1;
        startButton.disabled = false;
        stopButton.hidden = true;
        transcript.textContent = "Reading cancelled. Click Start Reading when ready.";
        support.textContent = "Take your time. Start again when the child is ready.";
        return;
      }
      recognition?.stop();
    };

    const shouldStart = await runReadingCountdown(sessionId);
    if (!shouldStart) return;
    countdownActive = false;
    transcript.textContent = "Listening now. Read slowly. Take your time.";
    support.textContent = "Listening patiently. Slow reading is okay.";
    if (listeningIndicator) listeningIndicator.hidden = false;

    readingTimer = window.setTimeout(() => {
      support.textContent = "Good effort. Checking what was read so far.";
      if (listeningIndicator) listeningIndicator.hidden = true;
      recognition?.stop();
    }, timing.maxListenMs);

    beginRecognition();
  });
  renderPassage();
}

function initReadingWordHelper() {
  document.querySelectorAll("[data-word]").forEach((button) => {
    button.dataset.audioRestoreHtml = button.innerHTML;
    button.addEventListener("click", () => {
      const word = button.querySelector("strong")?.textContent || button.dataset.word;
      const meaning = button.querySelector("span")?.textContent || "";
      speakRoutineText(`${word}. ${meaning}`, button);
    });
  });
}

initReadingFluencyLab();
initReadingWordHelper();
