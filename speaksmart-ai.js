(() => {
  const page = document.querySelector(".speaksmart-page");
  if (!page) return;

  const storageKey = "kidsverseSpeakSmartProfile";
  const progressKey = "kidsverseSpeakSmartProgress";
  const profileForm = document.querySelector("[data-smart-profile-form]");
  const setupSection = document.querySelector("[data-smart-setup]");
  const dashboard = document.querySelector("[data-smart-dashboard]");
  const video = document.querySelector("[data-smart-video]");
  const videoEmpty = document.querySelector("[data-smart-video-empty]");
  const cameraButton = document.querySelector("[data-smart-camera]");
  const cameraOffButton = document.querySelector("[data-smart-camera-off]");
  const startButton = document.querySelector("[data-smart-start]");
  const stopButton = document.querySelector("[data-smart-stop]");
  const quickResult = document.querySelector("[data-smart-quick-result]");
  const quickOverall = document.querySelector("[data-smart-quick-overall]");
  const quickFluency = document.querySelector("[data-smart-quick-fluency]");
  const quickConfidence = document.querySelector("[data-smart-quick-confidence]");
  const quickDuration = document.querySelector("[data-smart-quick-duration]");
  const quickReportButton = document.querySelector("[data-smart-open-report]");
  const recordingPill = document.querySelector("[data-smart-recording-pill]");
  const timerNode = document.querySelector("[data-smart-timer]");
  const progressBar = document.querySelector("[data-smart-progress-bar]");
  const transcript = document.querySelector("[data-smart-transcript]");
  const speechStatus = document.querySelector("[data-smart-speech-status]");
  const activitySelect = document.querySelector("[data-smart-activity-select]");
  const topicLabel = document.querySelector("[data-smart-topic-label]");
  const topicTitle = document.querySelector("[data-smart-topic-title]");
  const topicPoints = document.querySelector("[data-smart-topic-points]");
  const hintButton = document.querySelector("[data-smart-hint]");
  const hintOutput = document.querySelector("[data-smart-hint-output]");
  const prompterLine = document.querySelector("[data-smart-prompter-line]");
  const prompterToggle = document.querySelector("[data-smart-prompter-toggle]");
  const feedbackButton = document.querySelector("[data-smart-feedback]");
  const retryButton = document.querySelector("[data-smart-retry]");
  const feedbackPanel = document.querySelector("[data-smart-feedback-panel]");
  const progressPanel = document.querySelector("[data-smart-progress]");
  const activityButtons = document.querySelectorAll("[data-smart-activity]");
  const bars = document.querySelector("[data-smart-audio-bars]");
  let stream = null;
  let recognition = null;
  let timer = null;
  let seconds = 0;
  let selectedMission = null;
  let interimText = "";

  video?.addEventListener("loadedmetadata", () => {
    if (!stream) return;
    videoEmpty.hidden = true;
    video.classList.add("is-camera-on");
  });

  video?.addEventListener("playing", () => {
    videoEmpty.hidden = true;
    video.classList.add("is-camera-on");
  });

  function setSwitchState(button, isOn, onText = "On", offText = "Off") {
    if (!button) return;
    button.classList.toggle("is-on", isOn);
    button.classList.toggle("is-off", !isOn);
    button.setAttribute("aria-pressed", String(isOn));
    const state = button.querySelector("em");
    if (state) state.textContent = isOn ? onText : offText;
  }

  const missions = [
    ["Introduce yourself", "Tell us your name, class, school and one thing you enjoy.", ["Say your name", "Share your class", "Tell one favourite thing"], "Begin with: My name is..."],
    ["Describe your school", "Speak about your school and what you like there.", ["Where it is", "Your classroom", "A favourite place"], "Think about one place in school you like."],
    ["Talk about your best friend", "Describe your friend in complete sentences.", ["Friend's name", "What you do together", "Why you like them"], "Use describing words like helpful, kind or cheerful."],
    ["Explain your morning routine", "Tell what you do after waking up.", ["Wake up time", "Getting ready", "Going to school"], "Use order words: first, then, after that."],
    ["Describe your favourite food", "Speak about a food you enjoy.", ["What it is", "Taste", "Who makes it"], "Try words like delicious, spicy, sweet or crunchy."],
    ["Talk about your favourite subject", "Explain which subject you enjoy and why.", ["Subject name", "Why you like it", "What you learn"], "Give one example from class."],
    ["Explain what you did yesterday", "Speak about one thing from yesterday.", ["Where you were", "What happened", "How you felt"], "Use past words like went, played, saw, learned."],
    ["Describe your family", "Tell us about your family members.", ["Who is in your family", "What you do together", "One happy moment"], "Keep each sentence short and clear."],
    ["Talk about a memorable day", "Share one day you remember happily.", ["What happened", "Who was there", "Why it was special"], "Tell it like a small story."],
    ["Explain your favourite game", "Describe how the game is played.", ["Game name", "Rules", "Why it is fun"], "Use action words like run, catch, score or solve."],
    ["Describe your classroom", "Speak about what you can see in your classroom.", ["Board", "Desks", "Friends", "Teacher"], "Start with: In my classroom, I can see..."],
    ["Talk about a teacher you admire", "Speak about a teacher respectfully.", ["Teacher name", "Subject", "What you learn"], "Mention one good quality."],
    ["Describe a festival", "Talk about a festival you enjoy.", ["Festival name", "Food", "Family", "Celebration"], "Use feeling words like joyful or exciting."],
    ["Explain how to make a sandwich", "Give steps clearly.", ["Bread", "Filling", "Serving"], "Use first, next and finally."],
    ["Talk about your future dream", "Share what you want to become.", ["Dream", "Reason", "How you will work"], "Say one action you can start now."],
    ["Describe a rainy day", "Speak about rain, weather and feelings.", ["Sky", "Sound", "What people do"], "Use sensory words like cool, cloudy and fresh."],
    ["Share your weekend plan", "Tell what you want to do this weekend.", ["Where", "With whom", "Why"], "Use future words like will or going to."],
    ["Talk about a good habit", "Explain one habit everyone should follow.", ["Habit", "Why it matters", "How to practise"], "Give one simple example."],
    ["Describe a picture", "Imagine a park picture and speak.", ["People", "Actions", "Weather"], "Use: I can see... They are..."],
    ["Tell a short story", "Create a story with a beginning, middle and end.", ["Character", "Problem", "Happy ending"], "Keep the story simple."],
    ["Why exercise is important", "Give your opinion in simple words.", ["Health", "Energy", "Games"], "Use because to explain your reason."],
    ["Talk about saving water", "Explain how children can save water.", ["Close taps", "Use less water", "Tell others"], "Give two small actions."],
    ["Describe your hometown", "Talk about where you live.", ["Place", "People", "Special thing"], "Mention one thing visitors should see."],
    ["How you help at home", "Speak about one helpful action.", ["Task", "When", "How parents feel"], "Use complete sentences."],
    ["Favourite book", "Tell us about a book or story you like.", ["Book name", "Character", "Lesson"], "Share what you learned."],
    ["School event", "Describe an event in your school.", ["Event name", "Your role", "Best moment"], "Use past tense if it already happened."],
    ["Opinion on homework", "Share your opinion politely.", ["Good side", "Challenge", "Suggestion"], "Use: I think... because..."],
    ["New invention", "Present one useful invention idea.", ["Name", "Problem it solves", "Who can use it"], "Be creative but clear."],
    ["News reporter", "Speak like a news reporter for one minute.", ["Opening", "Main news", "Closing"], "Use a clear reporting voice."],
    ["One-minute speech", "Give a short speech on confidence.", ["Main idea", "Example", "Ending"], "End with one strong sentence."],
  ].map(([title, prompt, points, hint], index) => ({ id: `mission-${index + 1}`, label: "Daily Mission", title, prompt, points, hint }));

  const activityPrompts = {
    mirror: { id: "mirror", label: "Mirror Practice", title: "Speak about yourself with confidence.", prompt: "Introduce yourself while looking near the camera.", points: ["Your name and class", "One strength", "One goal"], hint: "Speak slowly and pause after each sentence." },
    picture: { id: "picture", label: "Picture Speaking", title: "Describe a park scene.", prompt: "Imagine children playing in a park and describe what you see.", points: ["What you can see", "What people are doing", "What may happen next"], hint: "Use starters: I can see, There is, They are, I think." },
    story: { id: "story", label: "Storytelling", title: "Make a story using rain, dog and school.", prompt: "One morning, Riya was walking to school when...", points: ["Beginning", "Problem", "Ending"], hint: "Give your story a clear ending." },
    public: { id: "public", label: "Public Speaking", title: "Give a short speech on good habits.", prompt: "Explain why good habits help students grow.", points: ["One habit", "Why it helps", "How to practise"], hint: "Use one real example from daily life." },
  };

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "") || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("SpeakSmart storage unavailable", error);
    }
  }

  function getProfile() {
    return readJson(storageKey, null);
  }

  function getProgress() {
    return readJson(progressKey, { sessions: [], streak: 0, bestStreak: 0, xp: 0, words: [] });
  }

  function levelForClass(group) {
    if (group === "ukg-2") return "Beginner";
    if (group === "3-5") return "Beginner Plus";
    if (group === "6-8") return "Intermediate";
    if (group === "9-12") return "Advanced Student";
    if (group === "college") return "College Speaker";
    if (group === "parent") return "Parent Communicator";
    if (group === "professional") return "Professional Speaker";
    return "Confidence Starter";
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function renderProfile() {
    const profile = getProfile();
    const progress = getProgress();
    if (!profile) {
      setupSection.hidden = false;
      dashboard.hidden = true;
      return;
    }
    setupSection.hidden = true;
    dashboard.hidden = false;
    const sessions = progress.sessions || [];
    const totalSeconds = sessions.reduce((sum, item) => sum + (item.duration || 0), 0);
    const average = sessions.length ? Math.round(sessions.reduce((sum, item) => sum + (item.overallScore || 0), 0) / sessions.length) : 0;
    document.querySelector("[data-smart-greeting]").textContent = `Ready for today's speaking mission, ${profile.studentName}?`;
    document.querySelector("[data-smart-profile-summary]").textContent = `${levelForClass(profile.classGroup)} | ${profile.goal}`;
    document.querySelector("[data-smart-level]").textContent = levelForClass(profile.classGroup);
    document.querySelector("[data-smart-streak]").textContent = String(progress.streak || 0);
    document.querySelector("[data-smart-minutes]").textContent = String(Math.round(totalSeconds / 60));
    document.querySelector("[data-smart-missions]").textContent = String(sessions.length);
    document.querySelector("[data-smart-average]").textContent = `${average}%`;
    document.querySelector("[data-smart-words]").textContent = String((progress.words || []).length);
    renderProgress();
  }

  function currentMissionForToday() {
    const index = Math.floor(Date.now() / 86400000) % missions.length;
    return missions[index];
  }

  function populateActivities() {
    const profile = getProfile();
    const rolePrompts = {
      college: { id: "college", label: "College Speaking", title: "Introduce your skills and learning goal.", prompt: "Speak like you are introducing yourself in a college club or internship discussion.", points: ["Your name and course", "One skill", "One goal"], hint: "Use: I am currently learning... My goal is..." },
      parent: { id: "parent", label: "Parent Confidence", title: "Speak clearly with a teacher or school team.", prompt: "Practise explaining one concern or question about your child's learning.", points: ["Child's need", "Your question", "What support you want"], hint: "Start politely: I wanted to understand..." },
      professional: { id: "professional", label: "Workplace Speaking", title: "Share a short workplace update.", prompt: "Speak like you are giving a clear team update in a meeting.", points: ["What is done", "What is pending", "What help is needed"], hint: "Use: Completed, next step, support needed." },
    };
    const rolePrompt = rolePrompts[profile?.classGroup];
    const items = [rolePrompt || currentMissionForToday(), activityPrompts.mirror, activityPrompts.picture, activityPrompts.story, activityPrompts.public];
    activitySelect.innerHTML = items.map((item) => `<option value="${item.id}">${item.label}: ${item.title}</option>`).join("");
    selectedMission = items[0];
    renderMission(selectedMission);
  }

  function findActivity(id) {
    if (id?.startsWith("mission")) return currentMissionForToday();
    return activityPrompts[id] || currentMissionForToday();
  }

  function renderMission(mission) {
    selectedMission = mission;
    topicLabel.textContent = mission.label;
    topicTitle.textContent = mission.title;
    topicPoints.innerHTML = mission.points.map((point) => `<li>${point}</li>`).join("");
    if (prompterLine) {
      const cue = mission.points?.length
        ? `Say: ${mission.points.join("  •  ")}`
        : mission.hint || "Speak slowly and share one clear idea.";
      prompterLine.textContent = cue;
    }
    hintOutput.hidden = true;
    hintOutput.textContent = mission.hint;
  }

  async function startCamera() {
    if (stream) return;
    const mediaDevices = window.navigator?.mediaDevices;
    if (!window.isSecureContext) {
      videoEmpty.innerHTML = "<strong>Secure page needed</strong><span>Please open this page on https to use the camera.</span>";
      return;
    }
    if (!mediaDevices?.getUserMedia) {
      videoEmpty.innerHTML = "<strong>Camera unavailable</strong><span>This browser does not allow camera access here. You can continue with audio-only or typed practice.</span>";
      return;
    }
    try {
      stream = await mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
    } catch (firstError) {
      try {
        stream = await mediaDevices.getUserMedia({ video: true, audio: false });
      } catch (error) {
        const errorName = error?.name || firstError?.name || "";
        const message =
          errorName === "NotAllowedError"
            ? "Camera permission was blocked. Please allow camera access from the browser address bar and try again."
            : errorName === "NotFoundError"
              ? "No camera was found on this device. You can continue with audio-only or typed practice."
              : "Camera could not start. Close other apps using the camera, then try again.";
        videoEmpty.innerHTML = `<strong>Camera not started</strong><span>${message}</span>`;
        return;
      }
    }

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.srcObject = stream;
    videoEmpty.hidden = true;
    video.classList.add("is-camera-on");
    cameraOffButton && (cameraOffButton.disabled = false);
    setSwitchState(cameraButton, true);

    const playPromise = video.play?.();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        videoEmpty.hidden = false;
        videoEmpty.innerHTML = "<strong>Tap the video area</strong><span>Camera permission worked. Tap here once to show the preview.</span>";
      });
    }
  }

  function stopCamera() {
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    video.srcObject = null;
    video.classList.remove("is-camera-on");
    videoEmpty.hidden = false;
    videoEmpty.innerHTML = "<strong>Mirror Practice</strong><span>Camera preview will appear here.</span>";
    cameraOffButton && (cameraOffButton.disabled = true);
    setSwitchState(cameraButton, false);
  }

  function createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speechStatus.textContent = "Speech recognition is not supported in this browser. Please type your spoken answer after recording.";
      return null;
    }
    const instance = new SpeechRecognition();
    instance.lang = "en-IN";
    instance.interimResults = true;
    instance.continuous = true;
    instance.onresult = (event) => {
      let finalText = "";
      interimText = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const text = event.results[index][0].transcript;
        if (event.results[index].isFinal) finalText += `${text} `;
        else interimText += `${text} `;
      }
      if (finalText) transcript.value = `${transcript.value.trim()} ${finalText}`.trim();
      speechStatus.textContent = interimText ? `Listening: ${interimText}` : "Listening. Keep speaking clearly.";
    };
    instance.onerror = () => {
      speechStatus.textContent = "Speech recognition paused. You can continue typing your answer.";
    };
    return instance;
  }

  function updateTimer() {
    seconds += 1;
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerNode.textContent = `${minutes}:${secs}`;
    progressBar.style.width = `${Math.min(100, (seconds / 120) * 100)}%`;
  }

  function startSpeaking() {
    seconds = 0;
    interimText = "";
    timerNode.textContent = "00:00";
    progressBar.style.width = "0%";
    transcript.value = "";
    if (quickResult) quickResult.hidden = true;
    recordingPill.hidden = false;
    bars.classList.add("is-listening");
    startButton.disabled = true;
    stopButton.disabled = false;
    speechStatus.textContent = "I am listening. Speak when you are ready.";
    timer = window.setInterval(updateTimer, 1000);
    recognition = createRecognition();
    try {
      recognition?.start();
    } catch (error) {
      speechStatus.textContent = "Speech recognition could not start. You can type your answer.";
    }
  }

  function stopSpeaking() {
    window.clearInterval(timer);
    timer = null;
    recognition?.stop?.();
    recognition = null;
    recordingPill.hidden = true;
    bars.classList.remove("is-listening");
    startButton.disabled = false;
    stopButton.disabled = true;
    const capturedText = (transcript.value || interimText || "").trim();
    const scoringText = capturedText || "I started speaking practice and will try again with a clearer answer.";
    renderQuickResult(fallbackFeedback(scoringText));
    speechStatus.textContent = capturedText
      ? "Quick score is ready. Click Full Confidence Report for detailed feedback."
      : "Quick score is ready. If words were not captured, type your answer below before opening the full report.";
  }

  function renderQuickResult(feedback) {
    if (!quickResult) return;
    quickOverall.textContent = `${feedback.overallScore || 0}%`;
    quickFluency.textContent = `${feedback.fluencyScore || 0}%`;
    quickConfidence.textContent = `${feedback.confidenceScore || 0}%`;
    quickDuration.textContent = `${seconds}s`;
    quickResult.hidden = false;
  }

  function fallbackFeedback(text) {
    const words = text.toLowerCase().match(/[a-z']+/g) || [];
    const uniqueWords = new Set(words);
    const sentenceCount = Math.max(1, (text.match(/[.!?]/g) || []).length);
    const lengthScore = Math.min(92, 48 + words.length * 2);
    const vocabularyScore = Math.min(92, 50 + uniqueWords.size * 2);
    const grammarScore = text.length > 40 && /^[A-Z]/.test(text.trim()) ? 78 : 66;
    const fluencyScore = Math.max(55, Math.min(94, lengthScore - (sentenceCount > 4 ? 0 : 4)));
    const confidenceScore = seconds >= 20 ? 82 : 68;
    const weakWord = words.find((word) => ["good", "nice", "bad", "thing"].includes(word));
    return {
      overallScore: Math.round((fluencyScore + grammarScore + vocabularyScore + confidenceScore) / 4),
      fluencyScore,
      grammarScore,
      vocabularyScore,
      confidenceScore,
      strengths: ["You made a clear speaking attempt.", words.length > 20 ? "You shared enough details for practice." : "You started with simple words."],
      improvements: [
        words.length < 25 ? "Try to add two more details in your next answer." : "Try to pause after each full idea.",
        sentenceCount < 2 ? "Use two or three complete sentences." : "Keep your sentence order clear.",
      ],
      betterWords: weakWord ? [{ used: weakWord, suggestion: weakWord === "good" ? "enjoyable" : "clearer word" }] : [{ used: "very good", suggestion: "excellent, enjoyable or helpful" }],
      correctedResponse: text.trim() || "My favourite hobby is reading because it helps me learn new words and speak better.",
      encouragement: "Great effort. Try once more using one stronger word.",
      followUpQuestion: "Can you share one more detail about this topic?",
    };
  }

  async function getFeedback() {
    const profile = getProfile();
    const text = transcript.value.trim();
    if (!text) {
      speechStatus.textContent = "Please speak or type an answer before asking for feedback.";
      return;
    }
    feedbackButton.disabled = true;
    if (quickReportButton) quickReportButton.disabled = true;
    feedbackButton.textContent = "Checking...";
    let feedback = fallbackFeedback(text);
    try {
      const response = await fetch("/api/speaking-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentLevel: levelForClass(profile?.classGroup),
          topic: selectedMission?.title,
          transcript: text,
          duration: seconds,
          goal: profile?.goal,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.overallScore) feedback = data;
      }
    } catch (error) {
      // Static/local previews use the built-in safe feedback.
    }
    feedbackButton.disabled = false;
    if (quickReportButton) quickReportButton.disabled = false;
    feedbackButton.textContent = "Get Confidence Feedback";
    saveSession(feedback);
    renderFeedback(feedback);
  }

  function saveSession(feedback) {
    const progress = getProgress();
    const sessions = progress.sessions || [];
    const last = sessions[sessions.length - 1];
    const today = todayKey();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let streak = progress.streak || 0;
    if (!last || last.date !== today) {
      streak = last?.date === yesterday ? streak + 1 : 1;
    }
    const betterWords = (feedback.betterWords || []).map((item) => item.suggestion).filter(Boolean);
    sessions.push({
      date: today,
      activity: selectedMission?.label || "Speaking Practice",
      title: selectedMission?.title || "Speaking Practice",
      duration: seconds,
      overallScore: feedback.overallScore,
      fluencyScore: feedback.fluencyScore,
      grammarScore: feedback.grammarScore,
      vocabularyScore: feedback.vocabularyScore,
      confidenceScore: feedback.confidenceScore,
    });
    writeJson(progressKey, {
      sessions: sessions.slice(-30),
      streak,
      bestStreak: Math.max(progress.bestStreak || 0, streak),
      xp: (progress.xp || 0) + Math.max(10, Math.round((feedback.overallScore || 60) / 5)),
      words: Array.from(new Set([...(progress.words || []), ...betterWords])).slice(-50),
    });
    renderProfile();
  }

  function listItems(node, items) {
    node.innerHTML = (items || []).slice(0, 3).map((item) => `<li>${item}</li>`).join("");
  }

  function renderFeedback(feedback) {
    const profile = getProfile();
    document.querySelector("[data-smart-feedback-title]").textContent = `Great effort, ${profile?.studentName || "speaker"}.`;
    document.querySelector("[data-smart-encouragement]").textContent = feedback.encouragement || "Keep practising.";
    document.querySelector("[data-smart-overall-score]").textContent = `${feedback.overallScore || 0}%`;
    document.querySelector("[data-score-fluency]").textContent = `${feedback.fluencyScore || 0}%`;
    document.querySelector("[data-score-grammar]").textContent = `${feedback.grammarScore || 0}%`;
    document.querySelector("[data-score-vocabulary]").textContent = `${feedback.vocabularyScore || 0}%`;
    document.querySelector("[data-score-confidence]").textContent = `${feedback.confidenceScore || 0}%`;
    document.querySelector("[data-score-duration]").textContent = `${seconds}s`;
    listItems(document.querySelector("[data-smart-strengths]"), feedback.strengths);
    listItems(document.querySelector("[data-smart-improvements]"), feedback.improvements);
    document.querySelector("[data-smart-better-words]").innerHTML = (feedback.betterWords || [])
      .slice(0, 3)
      .map((item) => `<p><span>Instead of: ${item.used}</span><strong>Try: ${item.suggestion}</strong></p>`)
      .join("") || "<p><strong>Try adding one fresh describing word in the next attempt.</strong></p>";
    document.querySelector("[data-smart-corrected]").textContent = feedback.correctedResponse || transcript.value;
    feedbackPanel.hidden = false;
    feedbackPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderProgress() {
    const progress = getProgress();
    const sessions = progress.sessions || [];
    const chart = document.querySelector("[data-smart-chart]");
    const badges = document.querySelector("[data-smart-badges]");
    if (chart) {
      chart.innerHTML = sessions.length
        ? sessions.slice(-8).map((item) => `<span style="height:${Math.max(18, item.overallScore)}%"><b>${item.overallScore}%</b></span>`).join("")
        : "<p>No practice yet. Complete one speaking mission to see progress.</p>";
    }
    const badgeList = [
      ["First Speech", sessions.length >= 1],
      ["Three-Day Streak", (progress.streak || 0) >= 3],
      ["Confident Speaker", sessions.some((item) => item.overallScore >= 80)],
      ["Vocabulary Champion", (progress.words || []).length >= 5],
      ["One-Hour Speaker", sessions.reduce((sum, item) => sum + (item.duration || 0), 0) >= 3600],
      ["Seven-Day Streak", (progress.streak || 0) >= 7],
    ];
    if (badges) {
      badges.innerHTML = badgeList.map(([label, earned]) => `<span class="${earned ? "is-earned" : ""}">${label}</span>`).join("");
    }
  }

  profileForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(profileForm);
    writeJson(storageKey, {
      studentName: String(data.get("studentName") || "").trim(),
      classGroup: String(data.get("classGroup") || ""),
      goal: String(data.get("goal") || ""),
    });
    renderProfile();
    dashboard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  activitySelect?.addEventListener("change", () => renderMission(findActivity(activitySelect.value)));
  cameraButton?.addEventListener("click", () => {
    if (stream) stopCamera();
    else startCamera();
  });
  cameraOffButton?.addEventListener("click", stopCamera);
  prompterToggle?.addEventListener("click", () => {
    const isOff = page.classList.toggle("is-prompter-off");
    setSwitchState(prompterToggle, !isOff);
  });
  videoEmpty?.addEventListener("click", () => {
    if (!stream) {
      startCamera();
      return;
    }
    video.play?.().then(() => {
      videoEmpty.hidden = true;
      video.classList.add("is-camera-on");
    }).catch(() => {
      videoEmpty.innerHTML = "<strong>Preview still blocked</strong><span>Please refresh, allow Camera from the browser lock icon, then tap Start Camera again.</span>";
    });
  });
  startButton?.addEventListener("click", startSpeaking);
  stopButton?.addEventListener("click", stopSpeaking);
  quickReportButton?.addEventListener("click", () => {
    if (!transcript.value.trim() && interimText.trim()) {
      transcript.value = interimText.trim();
    }
    if (!transcript.value.trim()) {
      transcript.value = "I started speaking practice and will try again with a clearer answer.";
    }
    getFeedback();
  });
  hintButton?.addEventListener("click", () => {
    hintOutput.hidden = false;
  });
  feedbackButton?.addEventListener("click", getFeedback);
  retryButton?.addEventListener("click", () => {
    transcript.value = "";
    feedbackPanel.hidden = true;
    if (quickResult) quickResult.hidden = true;
    document.querySelector("[data-smart-room]").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("[data-smart-reset-profile]")?.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    renderProfile();
    setupSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("[data-smart-show-progress]")?.addEventListener("click", () => {
    progressPanel.hidden = false;
    progressPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("[data-smart-dashboard-link]")?.addEventListener("click", () => dashboard.scrollIntoView({ behavior: "smooth", block: "start" }));
  document.querySelector("[data-smart-another]")?.addEventListener("click", () => document.querySelector("[data-smart-room]").scrollIntoView({ behavior: "smooth", block: "start" }));
  document.querySelector("[data-smart-follow-up]")?.addEventListener("click", () => {
    transcript.value = "";
    renderMission({ ...selectedMission, title: "Follow-up question", prompt: "Can you share one more detail about this topic?", points: ["Answer clearly", "Give one reason", "Use a complete sentence"], hint: "Add one example to make your answer stronger." });
    document.querySelector("[data-smart-room]").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("[data-smart-print]")?.addEventListener("click", () => window.print());
  document.querySelector("[data-smart-delete]")?.addEventListener("click", () => {
    localStorage.removeItem(progressKey);
    renderProfile();
  });
  document.querySelectorAll("[data-smart-tilt]").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      item.style.setProperty("--smart-tilt-x", `${(-y * 7).toFixed(2)}deg`);
      item.style.setProperty("--smart-tilt-y", `${(x * 9).toFixed(2)}deg`);
      item.style.transform = `rotateX(var(--smart-tilt-x)) rotateY(var(--smart-tilt-y))`;
    });
    item.addEventListener("pointerleave", () => {
      item.style.removeProperty("--smart-tilt-x");
      item.style.removeProperty("--smart-tilt-y");
      item.style.transform = "";
    });
  });
  activityButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.smartActivity;
      const mission = id === "mission" ? currentMissionForToday() : activityPrompts[id];
      renderMission(mission);
      if (activitySelect) activitySelect.value = mission.id;
      document.querySelector("[data-smart-room]").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  populateActivities();
  renderProfile();
})();
