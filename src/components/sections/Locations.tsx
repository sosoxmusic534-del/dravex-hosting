import { useEffect, useRef, useState } from "react";
import "./Locations.css";

/** Adds .is-visible once the element scrolls into view */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/* ---------------------------------------------------------
   EDIT THIS: your server locations
   x / y are positions on the hex map (map size is 111 x 56).
   pingUrl is a tiny URL on that server (see instructions).
--------------------------------------------------------- */
const MAP_W = 111;
const MAP_H = 56;

type Location = {
  id: string;
  city: string;
  country: string;
  code: string;
  x: number;
  y: number;
  note: string;
  pingUrl: string; // e.g. "https://sg.dravexhost.xyz/ping"
};

const LOCATIONS: Location[] = [
  {
    id: "sg",
    city: "Singapore",
    country: "Singapore",
    code: "SG",
    x: 89,
    y: 32.9,
    note: "NVMe nodes · DDoS protected",
    pingUrl: "https://dynamodb.ap-southeast-1.amazonaws.com/ping", // <- put your Singapore ping URL here
  },
];

/* ---------------------------------------------------------
   Ping test (runs in the visitor's browser)
--------------------------------------------------------- */
const SAMPLES = 8;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Time one request to the server (works without CORS headers) */
async function measure(url: string): Promise<number> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  const sep = url.includes("?") ? "&" : "?";
  const t0 = performance.now();
  try {
    await fetch(`${url}${sep}t=${Date.now()}${Math.random().toString(36).slice(2, 6)}`, {
      mode: "no-cors",
      cache: "no-store",
      signal: ctrl.signal,
    });
  } finally {
    clearTimeout(timer);
  }
  return performance.now() - t0;
}

/** Fake numbers, only used while developing before a ping URL exists */
async function fakeMeasure(): Promise<number> {
  await sleep(120 + Math.random() * 120);
  return 58 + Math.random() * 22;
}

function quality(ms: number) {
  if (ms < 70) return { label: "Excellent", tone: "great" };
  if (ms < 120) return { label: "Good", tone: "good" };
  if (ms < 180) return { label: "Fair", tone: "fair" };
  return { label: "High", tone: "high" };
}

type Status = "idle" | "running" | "done" | "error" | "unavailable";

export default function Locations() {
  const [activeId, setActiveId] = useState(LOCATIONS[0].id);
  const [status, setStatus] = useState<Status>("idle");
  const [samples, setSamples] = useState<number[]>([]);
  const [pulse, setPulse] = useState(0);
  const alive = useRef(true);

  const headRef = useInView<HTMLDivElement>();
  const bodyRef = useInView<HTMLDivElement>();

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const active = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];
  const demo = !active.pingUrl && import.meta.env.DEV;

  const choose = (id: string) => {
    if (status === "running") return;
    setActiveId(id);
    setStatus("idle");
    setSamples([]);
  };

  const run = async () => {
    if (status === "running") return;
    if (!active.pingUrl && !import.meta.env.DEV) {
      setStatus("unavailable");
      return;
    }

    setStatus("running");
    setSamples([]);
    setPulse((p) => p + 1);

    const out: number[] = [];
    try {
      if (active.pingUrl) await measure(active.pingUrl); // warm-up (DNS + TLS)
      for (let i = 0; i < SAMPLES; i++) {
        const ms = active.pingUrl ? await measure(active.pingUrl) : await fakeMeasure();
        if (!alive.current) return;
        out.push(ms);
        setSamples([...out]);
        setPulse((p) => p + 1);
        await sleep(220);
      }
      if (alive.current) setStatus("done");
    } catch {
      if (alive.current) setStatus("error");
    }
  };

  /* stats */
  const sorted = [...samples].sort((a, b) => a - b);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const best = sorted.length ? sorted[0] : 0;
  const jitter =
    samples.length > 1
      ? samples.slice(1).reduce((sum, v, i) => sum + Math.abs(v - samples[i]), 0) / (samples.length - 1)
      : 0;
  const shown = status === "running" ? samples[samples.length - 1] ?? 0 : median;
  const q = quality(median);

  return (
    <section className="loc" id="locations">
      <div className="loc-bg" aria-hidden="true">
        <i className="lc-slash lc-slash-1" />
        <i className="lc-slash lc-slash-2" />
        <i className="lc-slash lc-slash-3" />
      </div>

      <div className="loc-inner">
        <div className="lc-head lc-reveal" ref={headRef}>
          <span className="lc-eyebrow"><i /> Our locations</span>
          <h2>
            Close to your players,
            <span className="lc-italic"> (<em>proven</em> by you)</span>
          </h2>
          <p>
            Run a live ping test from your own connection and see how fast your server will feel before you buy.
          </p>
        </div>

        <div className="lc-body lc-reveal" ref={bodyRef}>
          {/* ---------- map ---------- */}
          <div className="lc-mapcard">
            <div className="lc-mapcard-in">
              <div className="lc-mapbar">
                <span className="lc-mapbar-dots"><i /><i /><i /></span>
                <span className="lc-mapbar-title">network.dravexhost.xyz</span>
                <span className="lc-mapbar-live"><i /> {LOCATIONS.length} location{LOCATIONS.length > 1 ? "s" : ""} online</span>
              </div>

              <div className="lc-map" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
                <div className="lc-hex lc-hex-base" />
                <div className="lc-hex lc-hex-sweep" />
                <div
                  className="lc-hex lc-hex-spot"
                  style={{
                    ["--mx" as string]: `${(active.x / MAP_W) * 100}%`,
                    ["--my" as string]: `${(active.y / MAP_H) * 100}%`,
                  }}
                />

                {LOCATIONS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`lc-marker ${l.id === active.id ? "is-active" : ""}`}
                    style={{ left: `${(l.x / MAP_W) * 100}%`, top: `${(l.y / MAP_H) * 100}%` }}
                    onClick={() => choose(l.id)}
                    aria-label={`${l.city} server location`}
                  >
                    <span className="lc-ring" />
                    <span className="lc-ring" />
                    <span className="lc-ring" />
                    {l.id === active.id && pulse > 0 && <span key={pulse} className="lc-ping-ring" />}
                    <span className="lc-dot" />
                    <span className="lc-label">
                      <b>{l.city}</b>
                      <small><i /> Online</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- side: locations + ping test ---------- */}
          <div className="lc-side">
            <div className="lc-list">
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`lc-loc ${l.id === active.id ? "is-active" : ""}`}
                  onClick={() => choose(l.id)}
                >
                  <span className="lc-loc-code">{l.code}</span>
                  <span className="lc-loc-text">
                    <b>{l.city}</b>
                    <small>{l.note}</small>
                  </span>
                  <span className="lc-loc-status"><i /> Online</span>
                </button>
              ))}
            </div>

            <div className="lc-pingcard">
              <div className="lc-pingcard-in">
                <div className="lc-ping-top">
                  <div>
                    <h3>Ping test</h3>
                    <p>From your connection to <b>{active.city}</b></p>
                  </div>
                  {demo && <span className="lc-demo">Demo</span>}
                </div>

                <div className="lc-readout">
                  <div className={`lc-num ${status === "done" ? `tone-${q.tone}` : ""}`}>
                    {status === "idle" || status === "unavailable" || status === "error" ? "—" : Math.round(shown)}
                    <small>ms</small>
                  </div>
                  <div className="lc-quality">
                    {status === "done" && <span className={`lc-q tone-${q.tone}`}>{q.label}</span>}
                    {status === "running" && <span className="lc-q lc-q-run">Testing…</span>}
                    {status === "idle" && <span className="lc-q lc-q-idle">Ready</span>}
                  </div>
                </div>

                <div className="lc-bars" aria-hidden="true">
                  {Array.from({ length: SAMPLES }).map((_, i) => {
                    const v = samples[i];
                    return (
                      <i
                        key={i}
                        className={v !== undefined ? "is-on" : ""}
                        style={{ height: v !== undefined ? `${Math.max(14, Math.min(100, v / 2))}%` : "10%" }}
                      />
                    );
                  })}
                </div>

                <div className="lc-stats">
                  <div><span>Best</span><b>{samples.length ? `${Math.round(best)} ms` : "—"}</b></div>
                  <div><span>Average</span><b>{status === "done" ? `${Math.round(median)} ms` : "—"}</b></div>
                  <div><span>Jitter</span><b>{status === "done" ? `${Math.round(jitter)} ms` : "—"}</b></div>
                </div>

                {status === "unavailable" && <p className="lc-msg">The ping test isn't connected to a server yet.</p>}
                {status === "error" && <p className="lc-msg">Couldn't reach the server. Check your connection and try again.</p>}

                <button type="button" className="lc-btn" onClick={run} disabled={status === "running"}>
                  {status === "running" ? "Testing…" : status === "done" ? "Test again" : "Run ping test"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}