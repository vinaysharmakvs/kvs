(() => {
  const questions = [
    { hindi: "मैं हर दिन सुबह जल्दी उठता हूँ।", tense: "Simple Present", answer: "I wake up early every morning.", variants: ["I get up early every morning."], must: [["wake", "get up"], ["early"], ["every morning", "every day"]], tip: "Habit words like every day use Simple Present: subject + base verb." },
    { hindi: "वह अभी अपना होमवर्क कर रही है।", tense: "Present Continuous", answer: "She is doing her homework now.", variants: ["She is doing her homework right now."], must: [["is doing"], ["homework"], ["now", "right now"]], tip: "Work happening now uses is/am/are + verb-ing." },
    { hindi: "मैंने अपना खाना खा लिया है।", tense: "Present Perfect", answer: "I have eaten my food.", variants: ["I have had my meal."], must: [["have eaten", "have had"], ["food", "meal"]], tip: "A completed action connected to now uses has/have + past participle." },
    { hindi: "वह दो घंटे से क्रिकेट खेल रहा है।", tense: "Present Perfect Continuous", answer: "He has been playing cricket for two hours.", variants: ["She has been playing cricket for two hours."], must: [["has been playing"], ["cricket"], ["for two hours"]], tip: "For a duration continuing till now, use has/have been + verb-ing." },
    { hindi: "हम कल बाज़ार गए थे।", tense: "Simple Past", answer: "We went to the market yesterday.", variants: [], must: [["went"], ["market"], ["yesterday"]], tip: "A finished action in the past uses the second form of the verb." },
    { hindi: "जब मैंने उसे देखा, वह रो रही थी।", tense: "Past Continuous", answer: "When I saw her, she was crying.", variants: ["When I saw him, he was crying."], must: [["when i saw"], ["was crying"]], tip: "An action in progress at a past moment uses was/were + verb-ing." },
    { hindi: "मेरे पहुँचने से पहले वह घर जा चुका था।", tense: "Past Perfect", answer: "He had gone home before I reached.", variants: ["She had gone home before I reached."], must: [["had gone", "had left"], ["home"], ["before"]], tip: "The earlier past action uses had + past participle." },
    { hindi: "वह सुबह से मेरा इंतज़ार कर रही थी।", tense: "Past Perfect Continuous", answer: "She had been waiting for me since morning.", variants: ["He had been waiting for me since morning."], must: [["had been waiting"], ["since morning"]], tip: "An action continuing before a past time uses had been + verb-ing." },
    { hindi: "मेरे पिता हर रविवार अखबार पढ़ते हैं।", tense: "Simple Present", answer: "My father reads the newspaper every Sunday.", variants: ["My father reads a newspaper every Sunday."], must: [["father"], ["reads"], ["newspaper"], ["every sunday"]], tip: "Regular habits use Simple Present. With he/she/it, add s/es." },
    { hindi: "बच्चे अभी मैदान में खेल रहे हैं।", tense: "Present Continuous", answer: "The children are playing in the field now.", variants: ["Children are playing in the ground now."], must: [["children"], ["are playing"], ["field", "ground"], ["now"]], tip: "Plural subject children takes are + verb-ing." },
    { hindi: "उसने अभी तक अपना काम पूरा नहीं किया है।", tense: "Present Perfect Negative", answer: "He has not completed his work yet.", variants: ["She has not completed her work yet.", "He hasn't completed his work yet."], must: [["has not completed", "hasn't completed"], ["work"], ["yet"]], tip: "Use has not/have not + past participle + yet for unfinished negative actions." },
    { hindi: "मैं पिछले तीन साल से यहाँ रह रहा हूँ।", tense: "Present Perfect Continuous", answer: "I have been living here for the last three years.", variants: ["I have been living here for three years."], must: [["have been living"], ["here"], ["three years"]], tip: "For time duration from past to present, use have been + verb-ing." },
    { hindi: "उसने कल मुझे फोन नहीं किया।", tense: "Simple Past Negative", answer: "He did not call me yesterday.", variants: ["She did not call me yesterday.", "He didn't call me yesterday."], must: [["did not call", "didn't call"], ["yesterday"]], tip: "Past negative uses did not + base verb." },
    { hindi: "जब शिक्षक कक्षा में आए, बच्चे बातें कर रहे थे।", tense: "Past Continuous", answer: "When the teacher came into the class, the children were talking.", variants: ["When the teacher entered the class, the children were talking."], must: [["teacher came", "teacher entered"], ["children"], ["were talking"]], tip: "The longer action in progress uses were + verb-ing." },
    { hindi: "बारिश शुरू होने से पहले हम घर पहुँच चुके थे।", tense: "Past Perfect", answer: "We had reached home before it started raining.", variants: [], must: [["had reached"], ["home"], ["before"], ["raining"]], tip: "Use had reached because reaching home happened before the rain started." },
    { hindi: "वह पिछले दो घंटे से पढ़ रही थी।", tense: "Past Perfect Continuous", answer: "She had been studying for the last two hours.", variants: ["He had been studying for the last two hours."], must: [["had been studying"], ["two hours"]], tip: "Use had been studying for an action continuing before a past point." },
    { hindi: "मैं अगले सप्ताह दिल्ली जाऊँगा।", tense: "Simple Future", answer: "I will go to Delhi next week.", variants: ["I shall go to Delhi next week."], must: [["will go", "shall go"], ["delhi"], ["next week"]], tip: "Future plans can be written with will + base verb." },
    { hindi: "वह कल इस समय पढ़ रही होगी।", tense: "Future Continuous", answer: "She will be studying at this time tomorrow.", variants: ["He will be studying at this time tomorrow."], must: [["will be studying"], ["this time"], ["tomorrow"]], tip: "An action in progress at a future time uses will be + verb-ing." },
    { hindi: "मैं शाम तक अपना काम पूरा कर चुका होऊँगा।", tense: "Future Perfect", answer: "I will have completed my work by evening.", variants: ["I will have finished my work by evening."], must: [["will have completed", "will have finished"], ["work"], ["by evening"]], tip: "An action completed before a future deadline uses will have + past participle." },
    { hindi: "अगले महीने तक वह यहाँ पाँच साल से काम कर रहा होगा।", tense: "Future Perfect Continuous", answer: "By next month, he will have been working here for five years.", variants: ["By next month, she will have been working here for five years."], must: [["will have been working"], ["here"], ["five years"], ["by next month"]], tip: "Future duration up to a future point uses will have been + verb-ing." },
    { hindi: "क्या तुम रोज़ स्कूल जाते हो?", tense: "Simple Present Question", answer: "Do you go to school every day?", variants: [], must: [["do you go"], ["school"], ["every day"]], tip: "Simple Present questions usually start with do/does." },
    { hindi: "क्या वह अभी खाना बना रही है?", tense: "Present Continuous Question", answer: "Is she cooking food now?", variants: ["Is he cooking food now?"], must: [["is she cooking", "is he cooking"], ["food"], ["now"]], tip: "Present Continuous questions start with is/am/are." },
    { hindi: "क्या तुमने अपना होमवर्क पूरा कर लिया है?", tense: "Present Perfect Question", answer: "Have you completed your homework?", variants: ["Have you finished your homework?"], must: [["have you completed", "have you finished"], ["homework"]], tip: "Present Perfect questions start with has/have." },
    { hindi: "क्या वह सुबह से पढ़ रहा है?", tense: "Present Perfect Continuous Question", answer: "Has he been studying since morning?", variants: ["Has she been studying since morning?"], must: [["has he been studying", "has she been studying"], ["since morning"]], tip: "Question form: Has/Have + subject + been + verb-ing." },
    { hindi: "क्या तुमने कल उसे देखा था?", tense: "Simple Past Question", answer: "Did you see him yesterday?", variants: ["Did you see her yesterday?"], must: [["did you see"], ["yesterday"]], tip: "Simple Past questions use did + base verb." },
    { hindi: "जब तुमने उसे फोन किया, क्या वह सो रही थी?", tense: "Past Continuous Question", answer: "When you called her, was she sleeping?", variants: ["When you called him, was he sleeping?"], must: [["when you called"], ["was"], ["sleeping"]], tip: "Use was/were before the subject when asking a Past Continuous question." },
    { hindi: "क्या ट्रेन आने से पहले वे स्टेशन पहुँच चुके थे?", tense: "Past Perfect Question", answer: "Had they reached the station before the train arrived?", variants: ["Had they reached the station before the train came?"], must: [["had they reached"], ["station"], ["before"], ["train"]], tip: "Past Perfect questions begin with had." },
    { hindi: "क्या वह कई दिनों से बीमार महसूस कर रही थी?", tense: "Past Perfect Continuous Question", answer: "Had she been feeling ill for many days?", variants: ["Had she been feeling sick for many days?", "Had he been feeling ill for many days?"], must: [["had she been feeling", "had he been feeling"], ["ill", "sick"], ["many days"]], tip: "Use had been feeling for a feeling continuing before a past time." },
    { hindi: "क्या तुम कल मेरे साथ आओगे?", tense: "Simple Future Question", answer: "Will you come with me tomorrow?", variants: [], must: [["will you come"], ["with me"], ["tomorrow"]], tip: "Future questions can start with will." },
    { hindi: "क्या वह कल इस समय यात्रा कर रही होगी?", tense: "Future Continuous Question", answer: "Will she be travelling at this time tomorrow?", variants: ["Will she be traveling at this time tomorrow?", "Will he be travelling at this time tomorrow?"], must: [["will she be travelling", "will she be traveling", "will he be travelling", "will he be traveling"], ["this time"], ["tomorrow"]], tip: "Future Continuous question form: Will + subject + be + verb-ing?" },
    { hindi: "मैं चाय नहीं पीता हूँ।", tense: "Simple Present Negative", answer: "I do not drink tea.", variants: ["I don't drink tea."], must: [["do not drink", "don't drink"], ["tea"]], tip: "Simple Present negative uses do not/does not + base verb." },
    { hindi: "वह अभी टीवी नहीं देख रहा है।", tense: "Present Continuous Negative", answer: "He is not watching TV now.", variants: ["She is not watching TV now.", "He isn't watching television now."], must: [["is not watching", "isn't watching"], ["tv", "television"], ["now"]], tip: "Present Continuous negative uses is/am/are not + verb-ing." },
    { hindi: "हमने अभी तक उससे बात नहीं की है।", tense: "Present Perfect Negative", answer: "We have not talked to him yet.", variants: ["We have not spoken to him yet.", "We haven't talked to her yet."], must: [["have not talked", "haven't talked", "have not spoken", "haven't spoken"], ["yet"]], tip: "Use have not + past participle for a present perfect negative." },
    { hindi: "वह सोमवार से स्कूल नहीं जा रही है।", tense: "Present Perfect Continuous Negative", answer: "She has not been going to school since Monday.", variants: ["He has not been going to school since Monday.", "She hasn't been going to school since Monday."], must: [["has not been going", "hasn't been going"], ["school"], ["since monday"]], tip: "Since Monday shows the starting point, so use has been + verb-ing." },
    { hindi: "वे कल क्रिकेट नहीं खेले।", tense: "Simple Past Negative", answer: "They did not play cricket yesterday.", variants: ["They didn't play cricket yesterday."], must: [["did not play", "didn't play"], ["cricket"], ["yesterday"]], tip: "After did not, use the base verb play, not played." },
    { hindi: "जब मैं घर पहुँचा, मेरी माँ खाना नहीं बना रही थीं।", tense: "Past Continuous Negative", answer: "When I reached home, my mother was not cooking food.", variants: ["When I reached home, my mother wasn't cooking food."], must: [["when i reached home"], ["mother"], ["was not cooking", "wasn't cooking"]], tip: "The action was not happening at that past moment." },
    { hindi: "पुलिस के आने से पहले चोर भाग चुका था।", tense: "Past Perfect", answer: "The thief had run away before the police came.", variants: ["The thief had escaped before the police came."], must: [["thief"], ["had run away", "had escaped"], ["before"], ["police"]], tip: "The thief ran away first, so use had run away." },
    { hindi: "परीक्षा शुरू होने से पहले छात्र एक घंटे से इंतज़ार कर रहे थे।", tense: "Past Perfect Continuous", answer: "The students had been waiting for one hour before the exam started.", variants: ["The students had been waiting for an hour before the exam started."], must: [["students"], ["had been waiting"], ["one hour", "an hour"], ["before"], ["exam"]], tip: "The waiting continued before another past action." },
    { hindi: "वह अगले साल नई कार खरीदेगा।", tense: "Simple Future", answer: "He will buy a new car next year.", variants: ["She will buy a new car next year."], must: [["will buy"], ["new car"], ["next year"]], tip: "Will + base verb is enough for simple future." },
    { hindi: "अगले सोमवार तक हम यह काम पूरा कर चुके होंगे।", tense: "Future Perfect", answer: "We will have completed this work by next Monday.", variants: ["We will have finished this work by next Monday."], must: [["will have completed", "will have finished"], ["this work"], ["by next monday"]], tip: "By next Monday is a future deadline, so use Future Perfect." },
    { hindi: "जब मैं छोटा था, मैं रोज़ अपने दोस्तों के साथ खेलता था।", tense: "Past Habit", answer: "When I was young, I used to play with my friends every day.", variants: ["When I was small, I used to play with my friends every day."], must: [["when i was young", "when i was small"], ["used to play"], ["friends"], ["every day"]], tip: "Past habits are often written with used to." },
    { hindi: "वह आमतौर पर समय पर आती है, लेकिन आज वह देर से आ रही है।", tense: "Simple Present + Present Continuous", answer: "She usually comes on time, but today she is coming late.", variants: [], must: [["usually comes"], ["on time"], ["is coming late"]], tip: "Usually shows habit; today shows what is happening now." },
    { hindi: "मैंने उसे कई बार समझाया है, लेकिन वह मेरी बात नहीं सुनता है।", tense: "Present Perfect + Simple Present", answer: "I have explained to him many times, but he does not listen to me.", variants: ["I have explained to her many times, but she does not listen to me."], must: [["have explained"], ["many times"], ["does not listen", "doesn't listen"]], tip: "The first action connects to now; the second part is a habit." },
    { hindi: "जब बारिश शुरू हुई, हम एक घंटे से क्रिकेट खेल रहे थे।", tense: "Past Perfect Continuous", answer: "When it started raining, we had been playing cricket for an hour.", variants: [], must: [["started raining"], ["had been playing"], ["cricket"], ["for an hour"]], tip: "The cricket had already been continuing before rain started." },
    { hindi: "तुम्हारे आने तक मैं अपना काम पूरा कर चुका होऊँगा।", tense: "Future Perfect", answer: "I will have completed my work by the time you come.", variants: ["I will have finished my work by the time you come."], must: [["will have completed", "will have finished"], ["work"], ["by the time you come"]], tip: "The work will be completed before another future action." },
    { hindi: "वह कब से अंग्रेज़ी सीख रही है?", tense: "Present Perfect Continuous Question", answer: "How long has she been learning English?", variants: ["Since when has she been learning English?"], must: [["how long has she been learning", "since when has she been learning"], ["english"]], tip: "Kab se can be translated as how long or since when." },
    { hindi: "तुम कल शाम पाँच बजे क्या कर रहे थे?", tense: "Past Continuous Question", answer: "What were you doing at five o'clock yesterday evening?", variants: ["What were you doing at 5 pm yesterday evening?"], must: [["what were you doing"], ["five", "5"], ["yesterday evening"]], tip: "A specific past time with an ongoing action uses Past Continuous." },
    { hindi: "तुम्हारे पहुँचने से पहले वे कितनी देर से इंतज़ार कर रहे थे?", tense: "Past Perfect Continuous Question", answer: "How long had they been waiting before you reached?", variants: [], must: [["how long had they been waiting"], ["before you reached"]], tip: "Use had been waiting because the waiting continued before you arrived." },
    { hindi: "अगले साल इस समय तुम कहाँ रह रहे होगे?", tense: "Future Continuous Question", answer: "Where will you be living at this time next year?", variants: [], must: [["where will you be living"], ["this time next year"]], tip: "At this time next year points to an action in progress in the future." },
    { hindi: "वह हर दिन इतनी देर से स्कूल क्यों आता है?", tense: "Simple Present Question", answer: "Why does he come to school so late every day?", variants: ["Why does she come to school so late every day?"], must: [["why does he come", "why does she come"], ["school"], ["so late"], ["every day"]], tip: "With he/she in a Simple Present question, use does + base verb." }
  ];

  const form = document.querySelector("[data-test-form]");
  if (!form) return;

  const additionalBanks = window.KidsverseTenseQuestionBanks || {};
  const questionBanks = {
    beginner: questions,
    medium: additionalBanks.medium || [],
    difficult: additionalBanks.difficult || [],
  };
  Object.entries(questionBanks).forEach(([difficulty, bank]) => {
    if (bank.length !== 50) throw new Error(`${difficulty} tense test must contain exactly 50 questions.`);
  });

  const difficultyLabels = { beginner: "Beginner", medium: "Medium", difficult: "Difficult" };
  const difficultySelect = document.querySelector("[data-test-difficulty]");
  const countSelect = document.querySelector("[data-question-count]");
  const currentCount = document.querySelector("[data-current-count]");
  const answeredCount = document.querySelector("[data-answered-count]");
  const scorePreview = document.querySelector("[data-score-preview]");
  const coverageLabel = document.querySelector("[data-coverage-label]");
  const testSizeLabels = document.querySelectorAll("[data-test-size-label]");
  const resultCard = document.querySelector("[data-result-card]");

  let activeQuestions = [];
  let checkedResults = [];
  let difficulty = difficultySelect?.value || "beginner";
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let activeRecognition = null;
  let activeMicButton = null;

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\bi'm\b/g, "i am")
      .replace(/\bcan't\b/g, "cannot")
      .replace(/\bwon't\b/g, "will not")
      .replace(/n't\b/g, " not")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  };

  const distance = (first, second) => {
    const a = normalize(first);
    const b = normalize(second);
    const matrix = Array.from({ length: a.length + 1 }, () => []);
    for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const similarity = (first, second) => {
    const a = normalize(first);
    const b = normalize(second);
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    return 1 - distance(a, b) / Math.max(a.length, b.length);
  };

  const phraseFound = (answer, phrase) => normalize(answer).includes(normalize(phrase));

  const gradeAnswer = (question, studentAnswer) => {
    const cleanStudent = normalize(studentAnswer);
    if (!cleanStudent) {
      return { score: 0, status: "blank", label: "Not attempted", note: "Try writing the sentence first, then compare with the solution." };
    }

    const acceptedAnswers = [question.answer, ...(question.variants || [])];
    const exact = acceptedAnswers.some((accepted) => normalize(accepted) === cleanStudent);
    const bestSimilarity = Math.max(...acceptedAnswers.map((accepted) => similarity(cleanStudent, accepted)));
    const matchedGroups = question.must.filter((group) => group.some((phrase) => phraseFound(cleanStudent, phrase))).length;
    const mustRatio = matchedGroups / question.must.length;

    if (exact) {
      return { score: 100, status: "correct", label: "Excellent", note: "Perfect tense and sentence structure." };
    }

    const score = Math.min(98, Math.round(bestSimilarity * 48 + mustRatio * 52));
    if (score >= 82) return { score, status: "correct", label: "Very good", note: "Your answer is very close. Check the model answer for smoother wording." };
    if (score >= 60) return { score, status: "close", label: "Almost there", note: "Good attempt. Focus on tense helping verb and time phrase." };
    return { score, status: "wrong", label: "Needs practice", note: "Read the tense hint and rewrite the sentence once." };
  };

  const chooseBalancedQuestions = (count) => {
    const selectedBank = questionBanks[difficulty] || questionBanks.beginner;
    if (count >= selectedBank.length) return shuffle(selectedBank);
    const groups = selectedBank.reduce((map, question) => {
      const key = question.tense.replace(/ Question| Negative|\s\+.*/g, "");
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(question);
      return map;
    }, new Map());

    const selected = [];
    shuffle([...groups.values()]).forEach((group) => {
      if (selected.length < count) selected.push(shuffle(group)[0]);
    });

    const remaining = shuffle(selectedBank.filter((question) => !selected.includes(question)));
    return shuffle([...selected, ...remaining.slice(0, count - selected.length)]);
  };

  const updateProgress = () => {
    const inputs = [...form.querySelectorAll("[data-answer-input]")];
    const answered = inputs.filter((input) => normalize(input.value)).length;
    currentCount.textContent = String(activeQuestions.length);
    answeredCount.textContent = String(answered);
    const checkButton = document.querySelector("[data-check-test]");
    if (checkButton) {
      const ready = answered === activeQuestions.length && activeQuestions.length > 0;
      checkButton.disabled = !ready;
      checkButton.textContent = ready ? "Check My Test" : `Complete All ${activeQuestions.length} Questions`;
    }
  };

  const renderQuestions = () => {
    if (activeRecognition) {
      try { activeRecognition.stop(); } catch { /* Recognition may already be stopping. */ }
      activeRecognition = null;
      activeMicButton = null;
    }
    const count = Number(countSelect?.value || 20);
    activeQuestions = chooseBalancedQuestions(count);
    checkedResults = [];
    form.innerHTML = activeQuestions.map((question, index) => `
      <article class="tense-question-card" data-question-index="${index}">
        <div class="question-topline">
          <span class="question-number">${index + 1}</span>
          <span class="feedback-pill" data-feedback>Type your answer</span>
        </div>
        <p class="question-hindi">${question.hindi}</p>
        <div class="answer-entry-row">
          <textarea class="answer-input" data-answer-input placeholder="Type or speak the English translation here..." rows="2"></textarea>
          <button class="answer-mic-button" type="button" data-answer-mic aria-label="Speak answer for question ${index + 1}" title="Speak your answer" ${SpeechRecognition ? "" : "disabled"}>
            <span class="answer-mic-icon" aria-hidden="true">🎤</span>
            <span data-mic-label>${SpeechRecognition ? "Speak" : "Not supported"}</span>
          </button>
        </div>
        <p class="answer-mic-status" data-mic-status aria-live="polite">${SpeechRecognition ? "Tap Speak, then say the English answer clearly." : "Voice answers need Chrome or another browser with speech recognition."}</p>
        <div class="answer-feedback-row" data-answer-meta hidden>
          <span class="tense-pill">Tense: ${question.tense}</span>
          <span class="feedback-pill" data-score-pill>Score: --</span>
        </div>
        <div class="solution-panel" data-solution-panel>
          <div class="solution-head">
            <span>Model Solution</span>
            <span>${question.tense}</span>
          </div>
          <p class="model-answer">${question.answer}</p>
          <p class="kid-tip">${question.tip}</p>
        </div>
      </article>
    `).join("");

    updateProgress();
    resultCard.hidden = true;
    scorePreview.textContent = "--";
    coverageLabel.textContent = `${difficultyLabels[difficulty]} · ${count === 50 ? "All tenses" : "Mixed"}`;
    testSizeLabels.forEach((label) => {
      label.textContent = `${count} ${difficultyLabels[difficulty]} question${count === 1 ? "" : "s"}`;
    });
  };

  const showSolutions = () => {
    activeQuestions.forEach((question, index) => {
      const card = form.querySelector(`[data-question-index="${index}"]`);
      if (!card) return;
      card.querySelector("[data-solution-panel]")?.classList.add("is-visible");
      card.querySelector("[data-answer-meta]").hidden = false;
      card.querySelector("[data-feedback]").textContent = "Solution shown";
    });
  };

  const getResultTitle = (score) => {
    if (score >= 90) return "Excellent tense control";
    if (score >= 75) return "Strong attempt, small polish needed";
    if (score >= 55) return "Good practice round";
    return "Keep going, the tense pattern will improve";
  };

  const checkTest = () => {
    const inputs = [...form.querySelectorAll("[data-answer-input]")];
    const answered = inputs.filter((input) => normalize(input.value)).length;
    if (answered !== activeQuestions.length) {
      resultCard.hidden = false;
      resultCard.innerHTML = `
        <h3>Finish the full test first</h3>
        <p>Please answer all ${activeQuestions.length} questions before checking the paper. Solutions stay locked until the full test is completed.</p>
      `;
      resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    checkedResults = activeQuestions.map((question, index) => {
      const result = gradeAnswer(question, inputs[index]?.value || "");
      const card = form.querySelector(`[data-question-index="${index}"]`);
      if (card) {
        card.classList.remove("is-correct", "is-close", "is-wrong", "is-blank");
        card.classList.add(`is-${result.status}`);
        card.querySelector("[data-feedback]").textContent = result.label;
        card.querySelector("[data-score-pill]").textContent = `Score: ${result.score}%`;
        card.querySelector("[data-answer-meta]").hidden = false;
        const solution = card.querySelector("[data-solution-panel]");
        solution.classList.remove("is-visible");
        solution.querySelector(".kid-tip").textContent = `${result.note} ${question.tip}`;
      }
      return result;
    });

    const total = Math.round(checkedResults.reduce((sum, item) => sum + item.score, 0) / checkedResults.length);
    scorePreview.textContent = `${total}%`;
    resultCard.hidden = false;
    resultCard.innerHTML = `
      <h3>${getResultTitle(total)}</h3>
      <p>You completed all ${activeQuestions.length} questions. Your current score is <strong>${total}%</strong>. Review your result first, then open the solutions if you want to learn from the corrections.</p>
      <div class="tense-result-actions">
        <button class="primary-button" type="button" data-show-solutions-after-test>Show Solutions</button>
        <button class="primary-button" type="button" data-scroll-first-mistake>Review First Correction</button>
        <a class="secondary-button" href="https://wa.me/918826758881?text=${encodeURIComponent(`Hello Kidsverse School, I completed the Mixed Tenses Test. Score: ${total}%. Please guide me for English grammar practice.`)}" target="_blank" rel="noopener noreferrer">Ask for Guidance</a>
      </div>
    `;

    resultCard.querySelector("[data-show-solutions-after-test]")?.addEventListener("click", () => {
      showSolutions();
      const firstMistake = form.querySelector(".is-close, .is-wrong, .is-blank");
      (firstMistake || form).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    resultCard.querySelector("[data-scroll-first-mistake]")?.addEventListener("click", () => {
      const firstMistake = form.querySelector(".is-close, .is-wrong, .is-blank");
      (firstMistake || form).scrollIntoView({ behavior: "smooth", block: "center" });
    });
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-new-test]")) renderQuestions();
    if (event.target.closest("[data-check-test]")) checkTest();
  });

  const stopActiveRecognition = () => {
    if (activeRecognition) {
      try { activeRecognition.stop(); } catch { /* Recognition may already be stopping. */ }
    }
  };

  form.addEventListener("click", (event) => {
    const micButton = event.target.closest("[data-answer-mic]");
    if (!micButton || !SpeechRecognition) return;
    const card = micButton.closest("[data-question-index]");
    const input = card?.querySelector("[data-answer-input]");
    const status = card?.querySelector("[data-mic-status]");
    const label = micButton.querySelector("[data-mic-label]");
    if (!input || !status || !label) return;

    if (micButton === activeMicButton && micButton.classList.contains("is-listening")) {
      stopActiveRecognition();
      return;
    }
    stopActiveRecognition();

    const recognition = new SpeechRecognition();
    activeRecognition = recognition;
    activeMicButton = micButton;
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    const originalAnswer = input.value.trim();

    recognition.onstart = () => {
      micButton.classList.add("is-listening");
      label.textContent = "Listening...";
      status.textContent = "Listening now — speak the complete English sentence.";
      input.focus();
    };
    recognition.onresult = (recognitionEvent) => {
      let spokenAnswer = "";
      for (let index = recognitionEvent.resultIndex; index < recognitionEvent.results.length; index += 1) {
        spokenAnswer += recognitionEvent.results[index][0].transcript;
      }
      spokenAnswer = spokenAnswer.trim();
      if (!spokenAnswer) return;
      input.value = originalAnswer ? `${originalAnswer} ${spokenAnswer}` : spokenAnswer;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      status.textContent = recognitionEvent.results[recognitionEvent.results.length - 1].isFinal
        ? "Answer added. You can edit it before checking the test."
        : "Listening... your words are appearing in the answer box.";
    };
    recognition.onerror = (recognitionEvent) => {
      const messages = {
        "not-allowed": "Microphone permission was blocked. Allow microphone access and try again.",
        "audio-capture": "No microphone was found. Check your device microphone.",
        "no-speech": "We could not hear an answer. Tap Speak and try again clearly.",
        network: "Voice recognition is unavailable right now. Please type the answer.",
      };
      status.textContent = messages[recognitionEvent.error] || "Voice answer stopped. Please try again or type your answer.";
    };
    recognition.onend = () => {
      micButton.classList.remove("is-listening");
      label.textContent = "Speak";
      if (activeRecognition === recognition) activeRecognition = null;
      if (activeMicButton === micButton) activeMicButton = null;
    };

    try {
      recognition.start();
    } catch {
      status.textContent = "The microphone is already active. Please wait a moment and try again.";
    }
  });

  countSelect?.addEventListener("change", renderQuestions);
  difficultySelect?.addEventListener("change", () => {
    difficulty = difficultySelect.value || "beginner";
    renderQuestions();
  });
  form.addEventListener("input", updateProgress);

  renderQuestions();
})();
