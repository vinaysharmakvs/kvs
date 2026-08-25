(() => {
  const root = document.querySelector("[data-fluency-voice-reader]");
  if (!root) return;

  const synth = window.speechSynthesis;
  const passage = root.querySelector("[data-reading-passage]");
  const playButton = root.querySelector("[data-fluency-voice-play]");
  let voices = [];
  let activeUtterance = null;
  let retryingWithFallback = false;

  const loadVoices = () => {
    voices = synth?.getVoices() || [];
    playButton.disabled = false;
  };

  const finishPlayback = () => {
    playButton.classList.remove("is-speaking");
    playButton.setAttribute("aria-label", "Listen to this paragraph");
    activeUtterance = null;
  };

  const findFallbackVoice = (text) => {
    const wantsHindi = /\p{Script=Devanagari}/u.test(text);
    const preferredLanguage = wantsHindi ? "hi-IN" : "en-IN";
    return voices.find((voice) => voice.lang === preferredLanguage)
      || voices.find((voice) => voice.lang.startsWith(wantsHindi ? "hi" : "en"))
      || voices.find((voice) => voice.default)
      || voices[0];
  };

  const readPassage = (forceFallback = false) => {
    const text = passage?.textContent.trim().replace(/\s+/g, " ");
    if (!text || !synth) return;
    if (!voices.length) voices = synth.getVoices() || [];
    synth.cancel();
    const googleHindi = voices.find((voice) => /google/i.test(voice.name) && /^hi-IN$/i.test(voice.lang));
    const hindi = voices.find((voice) => /^hi-IN$/i.test(voice.lang));
    const selected = forceFallback ? findFallbackVoice(text) : (googleHindi || hindi || findFallbackVoice(text));
    activeUtterance = new SpeechSynthesisUtterance(text);
    if (selected) activeUtterance.voice = selected;
    activeUtterance.lang = selected?.lang || (/\p{Script=Devanagari}/u.test(text) ? "hi-IN" : "en-IN");
    activeUtterance.rate = 0.88;
    activeUtterance.pitch = 1.12;
    playButton.classList.add("is-speaking");
    playButton.setAttribute("aria-label", "Stop listening");
    activeUtterance.onstart = () => { retryingWithFallback = false; };
    activeUtterance.onend = finishPlayback;
    activeUtterance.onerror = (event) => {
      if (!forceFallback && !retryingWithFallback && event.error !== "canceled" && event.error !== "interrupted") {
        retryingWithFallback = true;
        window.setTimeout(() => readPassage(true), 80);
        return;
      }
      finishPlayback();
    };
    const queuedUtterance = activeUtterance;
    window.setTimeout(() => {
      if (activeUtterance !== queuedUtterance) return;
      synth.speak(queuedUtterance);
      synth.resume();
    }, 60);
  };

  playButton.addEventListener("click", () => {
    if (synth?.speaking) {
      synth.cancel();
      finishPlayback();
      return;
    }
    readPassage();
  });
  if (synth && "SpeechSynthesisUtterance" in window) {
    playButton.disabled = false;
    loadVoices();
    synth.addEventListener?.("voiceschanged", loadVoices);
  } else {
    playButton.disabled = true;
  }
  window.addEventListener("beforeunload", () => synth?.cancel());
})();
