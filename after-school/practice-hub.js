const practiceData = {
  grammar: [
    { id: "present", label: "Present Tense", questions: [
      ["Riya ___ to school every day.", ["go", "goes", "went", "going"], 1, "Use goes for a regular action done by Riya."],
      ["The children ___ playing now.", ["is", "are", "was", "be"], 1, "Are playing describes what the children are doing now."],
      ["I ___ my homework already.", ["complete", "completed", "have completed", "am complete"], 2, "Have completed connects a finished action with the present."],
    ]},
    { id: "past", label: "Past Tense", questions: [
      ["We ___ the museum yesterday.", ["visit", "visited", "will visit", "visiting"], 1, "Yesterday tells us the action is finished."],
      ["She ___ when I called.", ["studies", "was studying", "will study", "has study"], 1, "Was studying describes an action in progress in the past."],
      ["They ___ before the rain started.", ["leave", "had left", "are leaving", "will leave"], 1, "Had left shows the earlier of two past actions."],
    ]},
    { id: "future", label: "Future Tense", questions: [
      ["I ___ you tomorrow.", ["call", "called", "will call", "calling"], 2, "Will call describes a future action."],
      ["At 8 PM, we ___ dinner.", ["eat", "will be eating", "ate", "have eaten"], 1, "Will be eating describes an action in progress at a future time."],
      ["By Friday, she ___ the project.", ["finishes", "will have finished", "finished", "is finishing"], 1, "Will have finished describes completion before a future deadline."],
    ]},
    { id: "articles", label: "A, An & The", questions: [
      ["I saw ___ elephant at the zoo.", ["a", "an", "the", "no article"], 1, "Elephant begins with a vowel sound, so use an."],
      ["Please close ___ door.", ["a", "an", "the", "no article"], 2, "Use the when both people know which door is meant."],
      ["She wants ___ new pencil.", ["a", "an", "the", "no article"], 0, "New begins with a consonant sound, so use a."],
    ]},
  ],
  vocabulary: [{ id: "routine", label: "Daily Routine Verbs", questions: [
    ["Which verb means to make your teeth clean?", ["brush", "pack", "wear", "drink"], 0, "We brush our teeth."],
    ["Complete: I ___ my school bag at night.", ["sleep", "pack", "wash", "read"], 1, "We pack a bag by putting the needed things inside."],
    ["Which sentence is correct?", ["I wears my uniform.", "I wear my uniform.", "I wearing uniform.", "I worn my uniform."], 1, "Use wear with I in the simple present."],
  ]}],
  reading: [{ id: "comprehension", label: "Quick Comprehension", questions: [
    ["Mina waters the plants every morning. What does Mina water?", ["Books", "Plants", "Shoes", "Toys"], 1, "The sentence directly says that Mina waters the plants."],
    ["Arun carried an umbrella because the sky was dark. Why did he carry it?", ["It might rain", "It was hot", "He was late", "He wanted to play"], 0, "A dark sky can be a clue that rain is coming."],
    ["The puppy slept after playing all afternoon. What happened first?", ["The puppy slept", "The puppy played", "It ate dinner", "It went outside"], 1, "The word after shows that playing happened before sleeping."],
  ]}],
  tests: [{ id: "mixed", label: "Mixed Tenses Challenge", questions: [
    ["Yesterday I ___ a story; today I ___ a poem.", ["read / write", "read / am writing", "will read / wrote", "reading / write"], 1, "Read is past here; am writing is happening today."],
    ["By next month, they ___ the course.", ["complete", "completed", "will have completed", "are complete"], 2, "The action will be complete before a future point."],
    ["She usually ___ early, but today she ___ late.", ["arrives / is coming", "arrived / came", "arrive / come", "will arrive / comes"], 0, "Arrives is routine; is coming describes today’s current situation."],
  ]}],
};

const areaSelect = document.querySelector("[data-practice-area]");
const topicSelect = document.querySelector("[data-practice-topic]");
const gradeSelect = document.querySelector("[data-practice-grade]");
const picker = document.querySelector(".practice-picker");
const session = document.querySelector("[data-practice-session]");
const result = document.querySelector("[data-practice-result]");
let activeTopic = null;
let questionIndex = 0;
let selectedAnswer = null;
let checked = false;
let score = 0;

function fillTopics() {
  topicSelect.innerHTML = practiceData[areaSelect.value].map((topic) => `<option value="${topic.id}">${topic.label}</option>`).join("");
}

function applyRequestedTopic() {
  const requested = new URLSearchParams(window.location.search).get("topic");
  if (!requested) return;
  const matchingArea = Object.entries(practiceData).find(([, topics]) => topics.some((topic) => topic.id === requested));
  if (!matchingArea) return;
  areaSelect.value = matchingArea[0];
  fillTopics();
  topicSelect.value = requested;
}

function currentQuestion() { return activeTopic.questions[questionIndex]; }

function renderQuestion() {
  const [question, options] = currentQuestion();
  selectedAnswer = null;
  checked = false;
  document.querySelector("[data-session-progress]").textContent = `Question ${questionIndex + 1} of ${activeTopic.questions.length}`;
  document.querySelector("[data-session-progress-bar]").style.width = `${((questionIndex + 1) / activeTopic.questions.length) * 100}%`;
  document.querySelector("[data-question-text]").textContent = question;
  const optionWrap = document.querySelector("[data-question-options]");
  optionWrap.innerHTML = options.map((option, index) => `<button type="button" data-answer="${index}">${option}</button>`).join("");
  document.querySelector("[data-question-feedback]").hidden = true;
  const next = document.querySelector("[data-practice-next]");
  next.disabled = true;
  next.textContent = "Check Answer";
  optionWrap.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    if (checked) return;
    selectedAnswer = Number(button.dataset.answer);
    optionWrap.querySelectorAll("button").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    next.disabled = false;
  }));
}

function startSession() {
  activeTopic = practiceData[areaSelect.value].find((topic) => topic.id === topicSelect.value);
  questionIndex = 0;
  score = 0;
  picker.hidden = true;
  result.hidden = true;
  session.hidden = false;
  document.querySelector("[data-session-grade]").textContent = gradeSelect.value;
  document.querySelector("[data-session-topic]").textContent = activeTopic.label;
  renderQuestion();
  session.scrollIntoView({ behavior: "smooth", block: "start" });
}

areaSelect.addEventListener("change", fillTopics);
document.querySelector("[data-practice-start]").addEventListener("click", startSession);
document.querySelector("[data-practice-next]").addEventListener("click", (event) => {
  if (selectedAnswer === null) return;
  if (!checked) {
    checked = true;
    const [, , correct, explanation] = currentQuestion();
    const buttons = document.querySelectorAll("[data-question-options] button");
    buttons[correct].classList.add("is-correct");
    if (selectedAnswer !== correct) buttons[selectedAnswer].classList.add("is-wrong");
    else score += 1;
    const feedback = document.querySelector("[data-question-feedback]");
    feedback.textContent = `${selectedAnswer === correct ? "Correct!" : "Almost."} ${explanation}`;
    feedback.hidden = false;
    event.currentTarget.textContent = questionIndex + 1 === activeTopic.questions.length ? "See Result" : "Next Question";
    return;
  }
  questionIndex += 1;
  if (questionIndex < activeTopic.questions.length) return renderQuestion();
  session.hidden = true;
  result.hidden = false;
  document.querySelector("[data-result-score]").textContent = `${score}/${activeTopic.questions.length}`;
  document.querySelector("[data-result-title]").textContent = score === activeTopic.questions.length ? "Excellent work!" : score >= 2 ? "Good progress!" : "A useful first step.";
  document.querySelector("[data-result-copy]").textContent = score === activeTopic.questions.length ? "You understood this topic clearly. Try another topic next." : "Review the feedback and practise this topic once more to build confidence.";
  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("[data-practice-again]").addEventListener("click", startSession);
document.querySelector("[data-change-topic]").addEventListener("click", () => {
  result.hidden = true;
  picker.hidden = false;
  picker.scrollIntoView({ behavior: "smooth", block: "center" });
});

fillTopics();
applyRequestedTopic();
