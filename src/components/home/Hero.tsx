import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import "./Hero.css";

const WORDS = ["Minecraft", "Rust", "FiveM", "Discord bots", "Python"];

/** Types a word, pauses, deletes it, then moves to the next one. */
function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 40 : 95;
    if (!deleting && text === word) delay = 1500;
    if (deleting && text === "") delay = 320;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

type Game = {
  name: string;
  tag: string;
  icon: string; // small logo shown on the card
  bg: string; // big game background image for the card
  c1: string; // fallback gradient colours (used until your image exists)
  c2: string;
  contain?: boolean;
};
type Pos = "tl" | "bl" | "tr" | "br";

/*
  Put your game background images here:
    public/games/bg/minecraft.jpg
    public/games/bg/rust.jpg
    public/games/bg/nodejs.jpg
    public/games/bg/fivem.jpg
*/
const GAMES: Record<Pos, Game> = {
  tl: {
    name: "Minecraft",
    tag: "Java + Bedrock",
    icon: "/games/minecraft.png",
    bg: "/games/bg/minecraft.jpg",
    c1: "#3f8f2f",
    c2: "#3a2414",
  },
  bl: {
    name: "Rust",
    tag: "Survival servers",
    icon: "/games/game-rust.jpg",
    bg: "/games/bg/rust.webp",
    c1: "#c8452a",
    c2: "#2a0f0a",
  },
  tr: {
    name: "Hytale",
    tag: "Adventure servers",
    icon: "/games/hytale.jpg",
    bg: "/games/bg/hytale.jpg",
    c1: "#3d8bff",
    c2: "#1b0f4a",
  },
  br: {
    name: "FiveM",
    tag: "Roleplay servers",
    icon: "/games/FiveM-Logo.png",
    bg: "/games/bg/fivem.jpg",
    c1: "#ff7a1a",
    c2: "#1a0d05",
    contain: true,
  },
};

function GameCard({ game, pos }: { game: Game; pos: Pos }) {
  const style = {
    "--c1": game.c1,
    "--c2": game.c2,
    "--bg": `url("${game.bg}")`,
  } as React.CSSProperties;

  return (
    <div className={`hero-pos hero-pos-${pos}`} aria-hidden="true">
      <div className="gcard" style={style}>
        <div className="gcard-in">
          <div className="gcard-art" />
          <div className="gcard-shade" />
          <div className="gcard-shine" />

          <div className="gcard-top">
            <div className={`gcard-icon ${game.contain ? "is-contain" : ""}`}>
              <img src={game.icon} alt="" />
            </div>
            <span className="gcard-live"><i /> Live</span>
          </div>

          <div className="gcard-bottom">
            <h3>{game.name}</h3>
            <p>{game.tag}</p>
            <div className="gcard-meta">
              <div className="gcard-bars"><span /><span /><span /><span /><span /></div>
              <em>Online</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Data-flow circuit lines (drawn on a 1920x1080 canvas that scales to cover) */
const CIRCUITS: { d: string; node: [number, number]; delay: number }[] = [
  { d: "M0 300 H260 L330 370 H620", node: [620, 370], delay: 0 },
  { d: "M0 760 H180 L260 680 H520 V560", node: [520, 560], delay: -1.6 },
  { d: "M300 1080 V900 L360 840 H700", node: [700, 840], delay: -3.1 },
  { d: "M1920 220 H1650 L1580 290 H1300", node: [1300, 290], delay: -0.8 },
  { d: "M1920 820 H1700 L1620 740 H1400 V640", node: [1400, 640], delay: -2.4 },
  { d: "M1500 0 V160 L1440 220 H1200", node: [1200, 220], delay: -3.9 },
];

const SLASHES = [
  { left: "3%", w: 70 },
  { left: "10%", w: 22 },
  { left: "16%", w: 40 },
  { left: "79%", w: 34 },
  { left: "86%", w: 18 },
  { left: "91%", w: 80 },
  { left: "98%", w: 26 },
];

export default function Hero({ onOpenGames }: { onOpenGames?: () => void }) {
  const word = useTyping(WORDS);

  return (
    <section className="hero">
      {/* ---------- background design ---------- */}
      <div className="bg" aria-hidden="true">
        <div className="bg-hatch" />
        <div className="bg-horizon" />

        {/* giant DraveX logo watermark */}
        <img className="bg-logo-glow" src="/logo.png" alt="" />
        <img className="bg-logo" src="/logo.png" alt="" />

        {/* slanted light bars (same angle as the logo) */}
        <div className="bg-slashes">
          {SLASHES.map((s, i) => (
            <i
              key={i}
              style={{
                left: s.left,
                width: s.w,
                animationDelay: `${i * -1.7}s`,
                animationDuration: `${9 + (i % 4) * 2}s`,
              }}
            />
          ))}
        </div>

        {/* circuit lines with data pulses and server nodes */}
        <svg className="bg-circuits" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {CIRCUITS.map((c, i) => (
            <g key={i}>
              <path className="circuit-line" d={c.d} />
              <path
                className="circuit-pulse"
                d={c.d}
                pathLength={1}
                style={{ animationDelay: `${c.delay}s` }}
              />
              <circle className="circuit-node" cx={c.node[0]} cy={c.node[1]} r="5" />
              <circle
                className="circuit-ping"
                cx={c.node[0]}
                cy={c.node[1]}
                r="5"
                style={{ animationDelay: `${c.delay}s` }}
              />
            </g>
          ))}
        </svg>

        <div className="bg-particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 9) * -1.3}s`,
                animationDuration: `${8 + (i % 5) * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="bg-vignette" />
      </div>

      {/* ---------- floating game cards (left + right) ---------- */}
      <GameCard pos="tl" game={GAMES.tl} />
      <GameCard pos="bl" game={GAMES.bl} />
      <GameCard pos="tr" game={GAMES.tr} />
      <GameCard pos="br" game={GAMES.br} />

      <Navbar onOpenGames={onOpenGames} />

      {/* ---------- center content ---------- */}
      <main className="hero-center">
        <div className="hero-icons rise d1">
          <div className="hero-icon hero-icon-a"><img src="/games/minecraft.png" alt="Minecraft" /></div>
          <div className="hero-icon hero-icon-b"><img src="/games/game-rust.jpg" alt="Rust" /></div>
          <div className="hero-icon hero-icon-c"><img src="/games/hytale.jpg" alt="Hytale" /></div>
        </div>

        <div className="hero-badge rise d1">
          <span className="hero-badge-dot" />
          Sri Lankan hosting · Clear LKR plans
        </div>

        <h1 className="hero-title rise d2">
          <span className="hero-line">Your next server,</span>
          <span className="hero-line hero-line-italic">
            (hosted for <span className="hero-word">{word}<i className="hero-caret" /></span>)
          </span>
          <span className="hero-line">built to stay online</span>
        </h1>

        <p className="hero-sub rise d3">
          Fast NVMe servers, DDoS protection and one-click mods.
          <br />
          No surprise invoices, and a team you can actually reach.
        </p>

        <div className="hero-buttons rise d4">
          <button type="button" className="hero-btn hero-btn-primary" onClick={onOpenGames}>
            Choose a game <span>→</span>
          </button>
          <a href="#pricing" className="hero-btn hero-btn-ghost">View pricing</a>
        </div>

        <ul className="hero-stats rise d5">
          <li><b>10 Gbps</b><span>Network</span></li>
          <li><b>99.9%</b><span>Uptime</span></li>
          <li><b>24/7</b><span>Support</span></li>
        </ul>
      </main>
    </section>
  );
}