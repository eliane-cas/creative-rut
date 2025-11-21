import { useState, useEffect, useRef } from "react";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoTile } from "@/components/BentoTile";
import { BrainDumpPopup } from "@/components/BrainDumpPopup";

// Tile content data
const PROMPTS = [
  "Redesign an everyday object as if it were magical.",
  "Create something using only circles.",
  "Imagine a product from the year 2070.",
  "Invent a character based on your favorite snack.",
  "Visualize the sound of rain.",
  "Turn a boring object into a hero.",
  "Design something intentionally ugly — then fix it.",
  "Redesign your morning routine as an app.",
];

const PERSPECTIVES = [
  "How would a 5-year-old approach this?",
  "What if the goal was to make it funny?",
  "What would it look like if it were tiny?",
  "What if the solution were the opposite of what you expect?",
  "How would this look in a fantasy world?",
  "What if you only had 30 seconds to decide?",
  "How would your future self handle this?",
];

const RESET_SUGGESTIONS = [
  "Take slow breaths for one full minute.",
  "Relax every muscle in your face and shoulders.",
  "Shake out your hands, arms, and legs.",
  "Look around and name 5 things you see.",
  "Stretch your neck gently in all directions.",
  "Stand up and move your entire body for a minute.",
  "Sit completely still and notice your breathing.",
];

const CHALLENGES = [
  "Create a logo using only triangles.",
  "Write a tagline based on the word 'storm.'",
  "Sketch a creature made of household items.",
  "Redesign a social media button.",
  "List 5 ideas as fast as possible.",
  "Write a micro-story in one sentence.",
  "Draw something without lifting your finger.",
];

const QUOTES = [
  "You're not stuck — you're charging up.",
  "Your next idea is closer than you think.",
  "It doesn't have to be perfect to be powerful.",
  "Future you is cheering you on.",
  "Creativity grows when you show up.",
  "One small step beats zero steps.",
  "Your spark is still there — keep going.",
];

// Icon components
const IconPrompt = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L15 10H24L18 15L20 23L12 18L4 23L6 15L0 10H9L12 2Z" fill="currentColor" />
  </svg>
);

const IconPerspective = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
  </svg>
);

const IconReset = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

const IconDump = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M9 10h6M9 14h6" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconChallenge = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
  </svg>
);

const IconQuote = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29C2.4 17.89 2 18.94 2 20c0 3.31 2.69 6 6 6 .55 0 1-.45 1-1 0-.38-.22-.71-.54-.88-.55-.32-1.45-.88-1.45-2.12 0-1.38 1.12-2.5 2.5-2.5.46 0 .89.12 1.27.33.86.52 1.73 1.17 1.73 2.17 0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.06-.39-2.11-.97-4.29C21.64 15 22 13.54 22 12c0-5.52-4.48-10-10-10zm-8 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-4c-.83 0-1.5-.67-1.5-1.5S7.17 9 8 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6-6c.83 0 1.5.67 1.5 1.5S18.83 9 18 9s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm4 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

export default function Index() {
  const [prompt, setPrompt] = useState<string>("");
  const [perspective, setPerspective] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerVisible, setIsTimerVisible] = useState<boolean>(false);
  const [currentResetSuggestion, setCurrentResetSuggestion] = useState<string>("");
  const [isBrainDumpOpen, setIsBrainDumpOpen] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const getRandomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const handlePromptClick = () => {
    setPrompt(getRandomItem(PROMPTS));
  };

  const handlePerspectiveClick = () => {
    setPerspective(getRandomItem(PERSPECTIVES));
  };

  const handleResetClick = () => {
    setCurrentResetSuggestion(getRandomItem(RESET_SUGGESTIONS));
    setIsTimerRunning(true);
    setTimerSeconds(60);
    setIsTimerVisible(true);
  };

  const handleChallengeClick = () => {
    setChallenge(getRandomItem(CHALLENGES));
  };

  const handleQuoteRefresh = () => {
    setQuote(getRandomItem(QUOTES));
  };

  // Initialize with a quote on mount
  useEffect(() => {
    setQuote(getRandomItem(QUOTES));
  }, []);

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.41)",
        backgroundImage:
          "url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F2d4fa59f0d804d74aa748f36c63862bd)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <div className="px-4 md:px-6 pt-9 md:pt-16 pb-9 md:pb-12 text-center">
        <h1
          className="mb-3 tracking-tight"
          style={{
            color: "rgb(23, 23, 23)",
            letterSpacing: "-1.2px",
            fontFamily: "Amarante, display",
            fontSize: "48px",
            lineHeight: "48px",
            fontWeight: "300",
          }}
        >
          Get Rid of Your Creative Rut
        </h1>
        <p
          className="max-w-[1151px] mx-auto"
          style={{
            color: "rgb(82, 82, 82)",
            fontWeight: "300",
            borderBottom: "solid 1px",
            paddingBottom: "12px",
          }}
        >
          Tap a tile to get unstuck instantly.
        </p>
      </div>

      {/* Main container with constraints */}
      <div className="px-4 md:px-6 pb-8 md:pb-12 max-w-[1400px] mx-auto">
        <BentoGrid>
          {/* Tile 1: Random Creativity Prompt */}
          <BentoTile
            dataId="prompt"
            icon={<IconPrompt />}
            label="Random Creativity Prompt"
            subtext="Tap to reveal a new idea."
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F2bf3095d55914a059b22fd616e6546e2)"
            onRefresh={handlePromptClick}
            onClick={handlePromptClick}
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            <button
              onClick={handlePromptClick}
              className="flex-grow flex items-center justify-center min-h-[120px]"
            >
              {prompt && (
                <p className="text-2xl md:text-3xl font-light text-neutral-800 text-center leading-relaxed animate-fade-in">
                  {prompt}
                </p>
              )}
              {!prompt && (
                <p
                  style={{
                    color: "rgba(74, 74, 74, 1)",
                    borderWidth: "1.5px",
                    borderStyle: "solid",
                    borderRadius: "20px",
                    overflow: "hidden",
                    padding: "6px 12px",
                    fontFamily: "Amarante, display",
                    fontSize: "18px",
                    fontWeight: "300",
                    lineHeight: "28px",
                    borderColor: "rgba(74, 74, 74, 1)",
                    margin: "0",
                  }}
                >
                  Click to reveal
                </p>
              )}
            </button>
          </BentoTile>

          {/* Tile 2: Perspective Shifter */}
          <BentoTile
            dataId="perspective"
            icon={<IconPerspective />}
            label="Perspective Shifter"
            subtext="See your problem differently."
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F66326389df294d7f8c2f8c3b6d012aa5)"
            onRefresh={handlePerspectiveClick}
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            <button
              onClick={handlePerspectiveClick}
              className="flex-grow flex items-center justify-center min-h-[120px]"
            >
              {perspective && (
                <p className="text-2xl md:text-3xl font-light text-neutral-800 text-center leading-relaxed animate-fade-in">
                  {perspective}
                </p>
              )}
              {!perspective && (
                <p
                  style={{
                    color: "rgba(74, 74, 74, 1)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    padding: "6px 12px",
                    fontFamily: "Amarante, display",
                    fontSize: "18px",
                    fontWeight: "300",
                    lineHeight: "28px",
                    border: "1.5px solid rgba(74, 74, 74, 1)",
                    margin: "0",
                  }}
                >
                  Click to reveal
                </p>
              )}
            </button>
          </BentoTile>

          {/* Tile 3: 1-Minute Energy Reset */}
          <BentoTile
            dataId="reset"
            icon={<IconReset />}
            label="1-Minute Reset"
            subtext="Click to start a 1-minute refresh."
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F2e5b16a4f79641fcb8586f5df7d860cb)"
            onRefresh={handleResetClick}
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            {isTimerVisible && (
              <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                <div
                  style={{
                    color: "rgb(38, 38, 38)",
                    fontVariantNumeric: "tabular-nums",
                    font: "tabular-nums 300 38px/60px Roboto, sans-serif",
                  }}
                >
                  {Math.floor(timerSeconds / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(timerSeconds % 60).toString().padStart(2, "0")}
                </div>
                <p
                  style={{
                    color: "rgba(0, 0, 0, 1)",
                    marginTop: "16px",
                    maxWidth: "320px",
                    textAlign: "center",
                    fontFamily: "Amarante, display",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    margin: "0",
                    marginTop: "16px",
                  }}
                >
                  {currentResetSuggestion}
                </p>
                <div className="flex gap-3 mt-2" style={{ display: "flex", fontWeight: "300", gap: "12px", marginTop: "16px" }}>
                  {!isTimerRunning && timerSeconds > 0 && (
                    <div
                      onClick={() => setIsTimerRunning(true)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "9999px",
                        color: "rgb(38, 38, 38)",
                        display: "block",
                        transitionDuration: "0.15s",
                        transitionProperty:
                          "color, background-color, border-color, text-decoration-color, fill, stroke",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        padding: "8px 16px",
                        fontFamily: "Amarante, display",
                        fontSize: "14px",
                        fontWeight: "300",
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Start
                    </div>
                  )}
                  {isTimerRunning && (
                    <div
                      onClick={() => setIsTimerRunning(false)}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "9999px",
                        color: "rgb(38, 38, 38)",
                        display: "block",
                        transitionDuration: "0.15s",
                        transitionProperty:
                          "color, background-color, border-color, text-decoration-color, fill, stroke",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        padding: "8px 16px",
                        fontFamily: "Amarante, display",
                        fontSize: "14px",
                        fontWeight: "300",
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Pause
                    </div>
                  )}
                  {!isTimerRunning && timerSeconds === 60 && (
                    <div
                      onClick={handleResetClick}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: "9999px",
                        color: "rgb(38, 38, 38)",
                        display: "block",
                        transitionDuration: "0.15s",
                        transitionProperty:
                          "color, background-color, border-color, text-decoration-color, fill, stroke",
                        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        borderColor: "rgba(0, 0, 0, 0)",
                        padding: "8px 16px",
                        fontFamily: "Amarante, display",
                        fontSize: "14px",
                        fontWeight: "300",
                        lineHeight: "20px",
                        cursor: "pointer",
                      }}
                    >
                      Start Again
                    </div>
                  )}
                </div>
              </div>
            )}
            {!isTimerVisible && (
              <button
                onClick={handleResetClick}
                className="flex-grow flex items-center justify-center"
              >
                <p className="text-base md:text-lg font-light text-neutral-500 text-center italic">
                  Click to begin
                </p>
              </button>
            )}
          </BentoTile>

          {/* Tile 4: Brain Dump */}
          <BentoTile
            dataId="braindump"
            icon={<IconDump />}
            label="Brain Dump"
            subtext="Empty your mind of all that clutter."
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2Fd1df6814818d4513837c654c59fa74fe)"
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            <button
              onClick={() => setIsBrainDumpOpen(true)}
              className="flex-grow flex items-center justify-center"
            >
              <div
                className="px-4 py-3 bg-white/40 hover:bg-white/60 text-neutral-800 rounded-full text-sm md:text-base font-light transition-colors"
                style={{
                  fontFamily: "Amarante, display",
                }}
              >
                Open Brain Dump
              </div>
            </button>
          </BentoTile>

          {/* Tile 5: Quick Challenge */}
          <BentoTile
            dataId="challenge"
            icon={<IconChallenge />}
            label="Quick Challenge"
            subtext="Click to get a challenge."
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F3c40bf9c2a4e40a4ab1b723663dc6050)"
            onRefresh={handleChallengeClick}
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            <button
              onClick={handleChallengeClick}
              className="flex-grow flex items-center justify-center min-h-[120px]"
            >
              {challenge && (
                <p className="text-2xl md:text-3xl font-light text-neutral-800 text-center leading-relaxed animate-fade-in">
                  {challenge}
                </p>
              )}
              {!challenge && (
                <p
                  style={{
                    color: "rgba(74, 74, 74, 1)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginLeft: "2px",
                    padding: "6px 12px",
                    fontFamily: "Amarante, display",
                    fontSize: "18px",
                    fontWeight: "300",
                    lineHeight: "28px",
                    border: "1px solid rgba(74, 74, 74, 1)",
                    margin: "0",
                  }}
                >
                  Click to reveal
                </p>
              )}
            </button>
          </BentoTile>

          {/* Tile 6: Motivational Quote */}
          <BentoTile
            dataId="quote"
            icon={<IconQuote />}
            label="Motivational Quote"
            subtext=""
            gradient="url(https://cdn.builder.io/api/v1/image/assets%2Fbf29734f12f74dae8834c2d0533c98b3%2F508dcba25eb24a6f92b23a4fd0c15b68)"
            onRefresh={handleQuoteRefresh}
            className="cursor-pointer hover:shadow-lg md:col-span-1 md:row-span-1"
          >
            <div className="flex-grow flex items-center justify-center min-h-[120px]">
              {quote && (
                <p
                  className="animate-fade-in"
                  style={{
                    animationDuration: "0.3s",
                    animationTimingFunction: "ease-out",
                    color: "rgb(38, 38, 38)",
                    fontSize: "30px",
                    fontWeight: "300",
                    lineHeight: "36px",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  "
                  <div
                    style={{
                      fontFamily: "Amaranth, sans-serif",
                      color: "rgba(124, 52, 51, 1)",
                      display: "inline",
                    }}
                  >
                    {quote}
                  </div>
                  "
                </p>
              )}
            </div>
          </BentoTile>
        </BentoGrid>
      </div>

      {/* Brain Dump Popup */}
      <BrainDumpPopup
        isOpen={isBrainDumpOpen}
        onClose={() => setIsBrainDumpOpen(false)}
      />
    </div>
  );
}
