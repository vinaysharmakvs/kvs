const TEST_BANK = {
  present: {
    title: "Present Tense",
    note: "Simple present, present continuous, present perfect and present perfect continuous.",
    levels: {
      easy: [
        ["I ___ to school every day. (go)", "go"],
        ["She ___ milk every morning. (drink)", "drinks"],
        ["They ___ football on Sundays. (play)", "play"],
        ["He ___ his homework at night. (do)", "does"],
        ["We ___ English in class. (learn)", "learn"]
      ],
      medium: [
        ["She ___ a story now. (read)", "is reading"],
        ["The children ___ in the park. (play)", "are playing"],
        ["I ___ my lunch now. (eat)", "am eating"],
        ["He ___ to the teacher. (listen)", "is listening"],
        ["We ___ for the bus. (wait)", "are waiting"]
      ],
      hard: [
        ["I ___ my work. (finish)", "have finished"],
        ["She ___ the answer. (write)", "has written"],
        ["They ___ the room. (clean)", "have cleaned"],
        ["He ___ his bag. (pack)", "has packed"],
        ["We ___ this lesson. (complete)", "have completed"]
      ],
      expert: [
        ["They ___ cricket for two hours. (play)", "have been playing"],
        ["She ___ since morning. (study)", "has been studying"],
        ["I ___ English for one year. (learn)", "have been learning"],
        ["He ___ in this school since April. (read)", "has been reading"],
        ["We ___ for you for ten minutes. (wait)", "have been waiting"]
      ]
    }
  },
  past: {
    title: "Past Tense",
    note: "Simple past, past continuous, past perfect and past perfect continuous.",
    levels: {
      easy: [["I ___ my friend yesterday. (meet)", "met"], ["She ___ a song. (sing)", "sang"], ["They ___ the match. (win)", "won"], ["He ___ late. (come)", "came"], ["We ___ a movie. (watch)", "watched"]],
      medium: [["She ___ a book when I came. (read)", "was reading"], ["They ___ cricket at 5 pm. (play)", "were playing"], ["I ___ dinner when you called. (eat)", "was eating"], ["He ___ in the class. (write)", "was writing"], ["We ___ to music. (listen)", "were listening"]],
      hard: [["The train ___ before we reached. (leave)", "had left"], ["She ___ lunch before school. (finish)", "had finished"], ["They ___ the room before guests came. (clean)", "had cleaned"], ["He ___ the answer before the bell rang. (write)", "had written"], ["I ___ the book before the test. (read)", "had read"]],
      expert: [["They ___ for an hour before rain started. (play)", "had been playing"], ["She ___ since morning before I arrived. (study)", "had been studying"], ["I ___ there for ten minutes before the bus came. (wait)", "had been waiting"], ["He ___ English for months before the exam. (learn)", "had been learning"], ["We ___ before the teacher entered. (practice)", "had been practicing", "had been practising"]]
    }
  },
  future: {
    title: "Future Tense",
    note: "Simple future, future continuous, future perfect and future perfect continuous.",
    levels: {
      easy: [["I ___ tomorrow. (come)", "will come"], ["She ___ the test. (pass)", "will pass"], ["They ___ cricket. (play)", "will play"], ["He ___ a letter. (write)", "will write"], ["We ___ you. (help)", "will help"]],
      medium: [["I ___ at this time tomorrow. (study)", "will be studying"], ["She ___ dinner at 8 pm. (cook)", "will be cooking"], ["They ___ in the park. (walk)", "will be walking"], ["He ___ the match tomorrow evening. (watch)", "will be watching"], ["We ___ English next week. (practice)", "will be practicing", "will be practising"]],
      hard: [["I ___ my project by next month. (complete)", "will have completed"], ["She ___ the chapter by Monday. (finish)", "will have finished"], ["They ___ the work by evening. (do)", "will have done"], ["He ___ the letter by tomorrow. (write)", "will have written"], ["We ___ the lesson by next week. (learn)", "will have learned", "will have learnt"]],
      expert: [["By next year, I ___ here for five years. (study)", "will have been studying"], ["By 6 pm, she ___ for three hours. (work)", "will have been working"], ["By next month, they ___ for two years. (practice)", "will have been practicing", "will have been practising"], ["By tomorrow, he ___ for ten hours. (travel)", "will have been traveling", "will have been travelling"], ["By 2027, we ___ English for three years. (learn)", "will have been learning"]]
    }
  },
  articles: {
    title: "A, An & The",
    note: "Articles for vowel sounds, consonant sounds and specific nouns.",
    levels: {
      easy: [["I saw ___ elephant.", "an"], ["She has ___ pencil.", "a"], ["He ate ___ apple.", "an"], ["This is ___ book.", "a"], ["I need ___ umbrella.", "an"]],
      medium: [["___ sun rises in the east.", "the"], ["He is ___ honest boy.", "an"], ["She bought ___ uniform.", "a"], ["I saw ___ owl at night.", "an"], ["This is ___ best answer.", "the"]],
      hard: [["I visited ___ Taj Mahal.", "the"], ["He wants to be ___ engineer.", "an"], ["She is ___ European teacher.", "a"], ["Please close ___ door.", "the"], ["I waited for ___ hour.", "an"]],
      expert: [["___ Ganga is a holy river.", "the"], ["He gave me ___ one-rupee coin.", "a"], ["She is ___ MBA student.", "an"], ["This is ___ useful idea.", "a"], ["___ Himalayas are beautiful.", "the"]]
    }
  },
  routine: {
    title: "Daily Routine Verbs",
    note: "Everyday action words and complete speaking sentences.",
    levels: {
      easy: [["I ___ up early. (wake)", "wake"], ["I ___ my teeth. (brush)", "brush"], ["I ___ breakfast. (eat)", "eat"], ["I ___ water. (drink)", "drink"], ["I ___ to school. (go)", "go"]],
      medium: [["She ___ her uniform. (wear)", "wears"], ["He ___ a story at night. (read)", "reads"], ["My brother ___ neatly. (write)", "writes"], ["My sister ___ after school. (play)", "plays"], ["Mother ___ dinner. (cook)", "cooks"]],
      hard: [["I ___ my homework before dinner. (complete)", "complete"], ["She ___ her bag every night. (pack)", "packs"], ["He ___ his shoes before school. (polish)", "polishes"], ["We ___ our classroom clean. (keep)", "keep"], ["They ___ their parents. (help)", "help"]],
      expert: [["After I wake up, I ___ my bed. (make)", "make"], ["Before school, she ___ her timetable. (check)", "checks"], ["Every evening, he ___ what he learned. (revise)", "revises", "reviews"], ["After dinner, I ___ my school bag. (arrange)", "arrange"], ["Before sleeping, we ___ a short prayer. (say)", "say"]]
    }
  }
};

const levels = ["easy", "medium", "hard", "expert"];
let activeTopic = "present";
let activeLevel = "easy";
const answers = JSON.parse(localStorage.getItem("kidsverseEnglishTestAnswers") || "{}");
const checkedLevels = JSON.parse(localStorage.getItem("kidsverseEnglishCheckedLevels") || "{}");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const normalize = (value) => String(value || "").trim().toLowerCase().replace(/[?.!,;:]/g, "").replace(/\s+/g, " ");

function save() {
  localStorage.setItem("kidsverseEnglishTestAnswers", JSON.stringify(answers));
  localStorage.setItem("kidsverseEnglishCheckedLevels", JSON.stringify(checkedLevels));
}
function key(topic, level, index) { return `${topic}.${level}.${index}`; }
function levelKey(topic = activeTopic, level = activeLevel) { return `${topic}.${level}`; }
function questionSet(topic = activeTopic, level = activeLevel) { return TEST_BANK[topic].levels[level]; }
function isCorrect(topic, level, index) {
  const row = questionSet(topic, level)[index];
  const typed = normalize(answers[key(topic, level, index)]);
  return Boolean(typed && row.slice(1).some((answer) => normalize(answer) === typed));
}
function isLevelChecked(topic = activeTopic, level = activeLevel) {
  return Boolean(checkedLevels[levelKey(topic, level)]);
}
function levelPercent(topic, level) {
  if (!isLevelChecked(topic, level)) return 0;
  const rows = TEST_BANK[topic].levels[level];
  const correct = rows.filter((_, index) => isCorrect(topic, level, index)).length;
  return Math.round((correct / rows.length) * 100);
}
function topicPercent(topic) {
  const all = levels.flatMap((level) => TEST_BANK[topic].levels[level].map((_, index) => [level, index]));
  const correct = all.filter(([level, index]) => isCorrect(topic, level, index)).length;
  return Math.round((correct / all.length) * 100);
}
function overallPercent() {
  const topicKeys = Object.keys(TEST_BANK);
  return Math.round(topicKeys.reduce((sum, topic) => sum + topicPercent(topic), 0) / topicKeys.length);
}

function renderLevels() {
  const list = $("[data-level-list]");
  list.innerHTML = levels.map((level) => {
    const label = level.charAt(0).toUpperCase() + level.slice(1);
    const percent = levelPercent(activeTopic, level);
    return `<button class="level-button ${level === activeLevel ? "is-active" : ""}" type="button" data-level="${level}"><strong>${label}</strong><span>${percent}% done</span></button>`;
  }).join("");
  $$("[data-level]").forEach((button) => button.addEventListener("click", () => {
    activeLevel = button.dataset.level;
    render();
  }));
}

function renderQuestions() {
  const rows = questionSet();
  const checked = isLevelChecked();
  $("[data-question-list]").innerHTML = rows.map((row, index) => {
    const value = answers[key(activeTopic, activeLevel, index)] || "";
    const correct = checked && isCorrect(activeTopic, activeLevel, index);
    const attempted = checked && normalize(value);
    return `<article class="test-question ${correct ? "is-correct" : attempted ? "is-wrong" : checked ? "is-wrong" : ""}">
      <div class="q-number">${index + 1}</div>
      <label>
        <span>${row[0]}</span>
        <div class="answer-row">
          <input type="text" value="${value.replace(/"/g, "&quot;")}" placeholder="Type answer here" data-answer="${index}" autocomplete="off" />
          <b class="check-state">${checked ? correct ? "Correct" : "Wrong" : "Answer saved"}</b>
        </div>
        <small class="hint">Correct answer: ${checked ? row[1] : "Hidden until you check the test"}</small>
      </label>
    </article>`;
  }).join("");
  $$('[data-answer]').forEach((input) => input.addEventListener("input", () => {
    const index = Number(input.dataset.answer);
    answers[key(activeTopic, activeLevel, index)] = input.value;
    checkedLevels[levelKey()] = false;
    save();
    const article = input.closest(".test-question");
    const state = article?.querySelector(".check-state");
    article?.classList.remove("is-correct", "is-wrong");
    if (state) state.textContent = "Answer saved";
    renderLevels();
    renderProgress();
  }));
}

function renderProgress() {
  const overall = overallPercent();
  $("[data-overall-score]").textContent = `${overall}%`;
  $("[data-overall-copy]").textContent = overall >= 80 ? "Excellent. Keep the streak going." : overall >= 40 ? "Good start. Continue level by level." : "Attempt questions to unlock your level progress.";
  $("[data-mini-bars]").innerHTML = Object.entries(TEST_BANK).map(([topic, data]) => {
    const percent = topicPercent(topic);
    return `<div><span>${data.title} ${percent}%</span><i><b style="width:${percent}%"></b></i></div>`;
  }).join("");
  const currentPercent = levelPercent(activeTopic, activeLevel);
  $("[data-level-score]").textContent = isLevelChecked() ? `${currentPercent}%` : "--";
  $("[data-level-status]").textContent = isLevelChecked() ? currentPercent >= 80 ? "Mastered" : "Checked" : "Not checked";
}

function bindTestActions() {
  const checkButton = $("[data-check-level]");
  if (checkButton) {
    checkButton.onclick = () => {
      checkedLevels[levelKey()] = true;
      save();
      render();
      $("[data-question-list]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  const resetButton = $("[data-reset-level]");
  if (resetButton) {
    resetButton.onclick = () => {
      questionSet().forEach((_, index) => delete answers[key(activeTopic, activeLevel, index)]);
      checkedLevels[levelKey()] = false;
      save();
      render();
    };
  }
}

function render() {
  const data = TEST_BANK[activeTopic];
  $("[data-topic-title]").textContent = data.title;
  $("[data-topic-note]").textContent = data.note;
  $("[data-level-eyebrow]").textContent = `${activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1)} Level`;
  $("[data-level-title]").textContent = `${data.title} practice`;
  $$("[data-topic]").forEach((button) => button.classList.toggle("is-active", button.dataset.topic === activeTopic));
  renderLevels();
  renderQuestions();
  renderProgress();
  bindTestActions();
}

$$("[data-topic]").forEach((button) => button.addEventListener("click", () => {
  activeTopic = button.dataset.topic;
  activeLevel = "easy";
  render();
}));

render();
