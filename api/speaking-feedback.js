
const fallbackFeedback = (transcript = "", duration = 0) => {
  const words = transcript.toLowerCase().match(/[a-z']+/g) || [];
  const uniqueWords = new Set(words);
  const fluencyScore = Math.min(90, 55 + words.length * 2);
  const grammarScore = transcript.trim().length > 35 ? 76 : 64;
  const vocabularyScore = Math.min(90, 55 + uniqueWords.size * 2);
  const confidenceScore = duration >= 20 ? 80 : 68;
  const overallScore = Math.round((fluencyScore + grammarScore + vocabularyScore + confidenceScore) / 4);

  return {
    overallScore,
    fluencyScore,
    grammarScore,
    vocabularyScore,
    confidenceScore,
    strengths: ["You made a clear speaking attempt.", "You shared your idea in simple words."],
    improvements: ["Try to add one more detail.", "Use two or three complete sentences."],
    betterWords: [{ used: "good", suggestion: "enjoyable" }],
    correctedResponse: transcript || "My favourite hobby is reading because it helps me learn new words.",
    encouragement: "Great effort. Try once more with one stronger word.",
    followUpQuestion: "Can you share one more detail about this topic?",
  };
};

const clampScore = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 70;
  return Math.max(0, Math.min(100, Math.round(number)));
};

const normalizeFeedback = (data, transcript, duration) => {
  const fallback = fallbackFeedback(transcript, duration);
  return {
    overallScore: clampScore(data?.overallScore ?? fallback.overallScore),
    fluencyScore: clampScore(data?.fluencyScore ?? fallback.fluencyScore),
    grammarScore: clampScore(data?.grammarScore ?? fallback.grammarScore),
    vocabularyScore: clampScore(data?.vocabularyScore ?? fallback.vocabularyScore),
    confidenceScore: clampScore(data?.confidenceScore ?? fallback.confidenceScore),
    strengths: Array.isArray(data?.strengths) ? data.strengths.slice(0, 2) : fallback.strengths,
    improvements: Array.isArray(data?.improvements) ? data.improvements.slice(0, 3) : fallback.improvements,
    betterWords: Array.isArray(data?.betterWords) ? data.betterWords.slice(0, 3) : fallback.betterWords,
    correctedResponse: String(data?.correctedResponse || fallback.correctedResponse),
    encouragement: String(data?.encouragement || fallback.encouragement),
    followUpQuestion: String(data?.followUpQuestion || fallback.followUpQuestion),
  };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { studentLevel, topic, transcript, duration, goal, previousScore } = req.body || {};
  const cleanTranscript = String(transcript || "").trim();
  const cleanTopic = String(topic || "Speaking practice").trim();
  const safeDuration = Number(duration) || 0;

  if (!cleanTranscript || cleanTranscript.length < 3) {
    return res.status(400).json({ error: "Transcript is required." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json(fallbackFeedback(cleanTranscript, safeDuration));
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are Kidsverse SpeakSmart AI, a friendly English-speaking coach for school students. Always use age-appropriate and encouraging language. Begin with something the student did well. Give no more than three improvements. Explain corrections in simple language. Provide one corrected example. Suggest stronger vocabulary when appropriate. Ask one natural follow-up question. Never shame, insult or compare the student. Never make judgments about the student's appearance. Keep feedback short and actionable. Return valid JSON using the requested schema.",
          },
          {
            role: "user",
            content: JSON.stringify({
              studentLevel,
              topic: cleanTopic,
              transcript: cleanTranscript,
              duration: safeDuration,
              selectedImprovementGoal: goal,
              previousScore,
              schema: {
                overallScore: "number 0-100",
                fluencyScore: "number 0-100",
                grammarScore: "number 0-100",
                vocabularyScore: "number 0-100",
                confidenceScore: "number 0-100",
                strengths: ["two short positive observations"],
                improvements: ["maximum three simple suggestions"],
                betterWords: [{ used: "word used by student", suggestion: "better word" }],
                correctedResponse: "one corrected student response",
                encouragement: "one friendly sentence",
                followUpQuestion: "one natural question",
              },
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      return res.status(200).json(fallbackFeedback(cleanTranscript, safeDuration));
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    return res.status(200).json(normalizeFeedback(parsed, cleanTranscript, safeDuration));
  } catch (error) {
    return res.status(200).json(fallbackFeedback(cleanTranscript, safeDuration));
  }
}
