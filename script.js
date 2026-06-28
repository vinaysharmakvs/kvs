const menuButton = document.querySelector("[data-menu-button]");
const siteHeader = document.querySelector(".site-header");
const gradeButtons = document.querySelectorAll("[data-grade]");
const gradeResult = document.querySelector("[data-grade-result]");
const inquiryForm = document.querySelector(".inquiry-form");
const kiyaWidget = document.querySelector("[data-kiya-widget]");
const kiyaToggle = document.querySelector("[data-kiya-toggle]");
const kiyaPanel = document.querySelector("[data-kiya-panel]");
const kiyaClose = document.querySelector("[data-kiya-close]");

const gradeData = {
  "1-3": {
    label: "Foundation Support",
    title: "Reading, writing, maths and homework rhythm.",
    text: "For young school learners, we focus on daily study habits, neat work, concept clarity and confidence.",
  },
  "4-5": {
    label: "Upper Primary Support",
    title: "Concept clarity with stronger study discipline.",
    text: "Students get support in core subjects, written practice, revision habits and communication confidence.",
  },
  "6-8": {
    label: "Middle School Support",
    title: "Deeper concepts, regular practice and confidence.",
    text: "We help students manage subjects, assignments, projects, doubts and exam preparation in a structured way.",
  },
  "9-10": {
    label: "Board Foundation Support",
    title: "Focused academic support for higher classes.",
    text: "For Grade 9 and 10, the focus moves toward subject clarity, disciplined practice, revision and exam confidence.",
  },
};

function renderGrade(key) {
  const data = gradeData[key] || gradeData["1-3"];
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
