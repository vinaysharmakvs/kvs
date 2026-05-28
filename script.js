const reviews = [
  {
    quote:
      "Kidsverse feels like a second home for our child. The teachers are caring, patient, and genuinely invested in every milestone.",
    parent: "Parent of Nursery student",
  },
  {
    quote:
      "We love the balance of play, discipline, communication, and creativity. Our child became more confident within weeks.",
    parent: "Parent of L.K.G student",
  },
  {
    quote:
      "The school feels modern and safe, but also very personal. The team knows each child beautifully.",
    parent: "Parent of Playway student",
  },
];

let reviewIndex = 0;

const reviewCard = document.querySelector("#reviewCard");
const prevReview = document.querySelector("#prevReview");
const nextReview = document.querySelector("#nextReview");
const closeBanner = document.querySelector("#closeBanner");
const admissionBanner = document.querySelector("#admissionBanner");
const menuButton = document.querySelector("#menuButton");
const siteHeader = document.querySelector(".site-header");
const inquiryForm = document.querySelector(".inquiry-form");

function renderReview() {
  const review = reviews[reviewIndex];
  reviewCard.innerHTML = `<p>“${review.quote}”</p><strong>${review.parent}</strong>`;
}

function moveReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  renderReview();
}

prevReview.addEventListener("click", () => moveReview(-1));
nextReview.addEventListener("click", () => moveReview(1));

closeBanner.addEventListener("click", () => {
  admissionBanner.hidden = true;
});

menuButton.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("is-open");
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.classList.remove("is-open");
    menuButton.textContent = "Menu";
  });
});

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const message = encodeURIComponent(
    `Hello Kidsverse School, I want to book a school visit. Parent: ${data.get("name")}, Phone: ${data.get("phone")}, Child age: ${data.get("age")}, Program: ${data.get("program")}.`
  );
  window.location.href = `https://wa.me/918826758881?text=${message}`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
