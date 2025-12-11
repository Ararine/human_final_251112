import { useEffect, useState, useRef } from "react";

export default function useKoreanSpeaker() {
  const [voice, setVoice] = useState(null);
  const isLoadedRef = useRef(false);

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return false;

    const koreanVoice = voices.find(
      (v) =>
        v.name ===
        "Microsoft HyunsuMultilingual Online (Natural) - Korean (Korea)"
    );

    setVoice(koreanVoice || null);
    isLoadedRef.current = true;
    return true;
  };

  useEffect(() => {
    // 1) 즉시 한 번 시도
    if (loadVoices()) return;

    // 2) onvoiceschanged 이벤트로 다시 시도
    window.speechSynthesis.onvoiceschanged = () => {
      if (!isLoadedRef.current) {
        loadVoices();
      }
    };

    // 3) 폴링: getVoices가 로드될 때까지 재시도
    const interval = setInterval(() => {
      if (isLoadedRef.current) {
        clearInterval(interval);
      } else {
        loadVoices();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";

    if (voice) utter.voice = voice;
    else console.warn("Korean voice not loaded yet");

    window.speechSynthesis.speak(utter);
  };

  return speak;
}
