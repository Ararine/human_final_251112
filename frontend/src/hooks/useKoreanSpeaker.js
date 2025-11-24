import { useEffect, useState } from "react";

export default function useKoreanSpeaker() {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const koreanVoice = voices.find(
        (v) =>
          v.name ===
          "Microsoft HyunsuMultilingual Online (Natural) - Korean (Korea)"
      );
      setVoice(koreanVoice || null);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  return speak;
}
