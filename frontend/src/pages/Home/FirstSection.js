import { useState, useEffect } from "react";
const FirstSection = ({ images, texts, handleStart }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <section className="sec-1">
        <div className="image-container">
          <img src={images[current]} key={current} alt="banner" />

          {/* <p className="hero-overlay-text">{texts[current]}</p> */}
          <div>
            <button className="start-btn" onClick={handleStart}>
              바로 시작하기
            </button>
          </div>
        </div>
        <div>
          <h1>당신만을 위한 최적의 운동 루틴</h1>
          <p>운동 추천부터 식단 분석, ROM까지—홈트의 모든 것을 한곳에서.</p>
        </div>
      </section>
    </>
  );
};
export default FirstSection;
