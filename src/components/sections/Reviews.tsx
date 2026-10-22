import { useEffect, useRef } from "react";
import "./Reviews.css";

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
   EDIT THIS: your Trustpilot links
   (these work once your business page exists on Trustpilot)
--------------------------------------------------------- */
const TRUSTPILOT_PAGE = "https://www.trustpilot.com/review/dravexhost.xyz";
const TRUSTPILOT_WRITE = "https://www.trustpilot.com/evaluate/dravexhost.xyz";

type Review = {
  name: string;
  country?: string; // e.g. "LK"
  stars: 1 | 2 | 3 | 4 | 5;
  title: string;
  text?: string; // some reviews only have a title
  date: string; // e.g. "Oct 12, 2026"
  verified?: boolean;
  url?: string; // link to this review on Trustpilot
};

/*
  REAL reviews copied exactly from the DraveX Host Trustpilot page.
  Only add reviews that really exist there, and keep the wording unchanged.
*/
const REVIEWS: Review[] = [
  {
    name: "Sasvindu Babaranda",
    country: "LK",
    stars: 5,
    title: "Bought a 6gb mc server",
    text: "Bought a 6gb mc server , running without any issue, recommended and very friendly customer service throughout the purchase!",
    date: "Oct 12, 2026",
    url: "https://www.trustpilot.com/reviews/6accf3714e795cbdc0c1e920",
  },
  {
    name: "Risith Siwhas",
    country: "LK",
    stars: 5,
    title: "Best v2ray service, highly recommend",
    text: "Best v2ray service, good ping",
    date: "Sep 29, 2026",
    url: "https://www.trustpilot.com/reviews/6abbbf7df33a35a2de8b4445",
  },
  {
    name: "Pamoth Umayanga",
    country: "LK",
    stars: 5,
    title: "Best hosting",
    date: "Sep 29, 2026",
    url: "https://www.trustpilot.com/reviews/6abb60ec82697bfd981854d6",
  },
];

/* TrustScore shown on your Trustpilot page. Update it when it changes. */
const RATING = { score: 4.0, count: 3, label: "Great" } as { score: number; count: number; label: string } | null;

/* ---------- small pieces ---------- */

const Star = ({ on }: { on: boolean }) => (
  <span className={`rv-star ${on ? "is-on" : ""}`}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.5l6.1-.7L12 3.2Z" />
    </svg>
  </span>
);

const Stars = ({ value }: { value: number }) => (
  <div className="rv-stars" role="img" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} on={n <= Math.round(value)} />
    ))}
  </div>
);

export default function Reviews() {
  const headRef = useInView<HTMLDivElement>();
  const bodyRef = useInView<HTMLDivElement>();
  const hasReviews = REVIEWS.length > 0;

  return (
    <section className="rv" id="reviews">
      <div className="rv-inner">
        <div className="rv-head rv-reveal" ref={headRef}>
          <span className="rv-eyebrow"><i /> Reviews</span>
          <h2>
            What customers
            <span className="rv-italic"> <em>really</em> say</span>
          </h2>
        </div>

        <div className="rv-body rv-reveal" ref={bodyRef}>
          {/* ---------- Trustpilot summary ---------- */}
          <div className="rv-card rv-summary">
            <div className="rv-card-in">
              <div className="rv-brand">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.1L12 17.7 5.8 21.3l1.6-7.1L2 9.5l7.1-.6L12 2Z" /></svg>
                Trustpilot
              </div>

              {RATING ? (
                <>
                  <div className="rv-score">{RATING.score.toFixed(1)}<small>/ 5</small></div>
                  <Stars value={RATING.score} />
                  <p className="rv-count">
                    <b>{RATING.label}</b> · based on {RATING.count} review{RATING.count === 1 ? "" : "s"}
                  </p>
                </>
              ) : (
                <>
                  <div className="rv-score rv-score-empty">—</div>
                  <Stars value={0} />
                  <p className="rv-count">No reviews yet. Be one of the first.</p>
                </>
              )}

              <div className="rv-actions">
                <a href={TRUSTPILOT_WRITE} target="_blank" rel="noopener noreferrer" className="rv-btn">
                  Write a review
                </a>
                {(RATING || hasReviews) && (
                  <a href={TRUSTPILOT_PAGE} target="_blank" rel="noopener noreferrer" className="rv-btn rv-btn-ghost">
                    View all on Trustpilot
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ---------- real reviews, or an honest empty state ---------- */}
          {hasReviews ? (
            <div className="rv-list">
              {REVIEWS.slice(0, 4).map((r) => (
                <article className="rv-review" key={r.name + r.date}>
                  <div className="rv-review-top">
                    <Stars value={r.stars} />
                    <span className="rv-date">{r.date}</span>
                  </div>
                  <h3>{r.title}</h3>
                  {r.text && <p>{r.text}</p>}
                  <div className="rv-by">
                    <span className="rv-avatar">{r.name.charAt(0).toUpperCase()}</span>
                    <span className="rv-who">
                      <b>{r.name}</b>
                      {r.country && <small>{r.country}</small>}
                    </span>
                    {r.verified && <em>Verified</em>}
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="rv-src">
                        On Trustpilot ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rv-empty">
              <div className="rv-ghost">
                <div className="rv-ghost-top"><i /><i /><i /><i /><i /></div>
                <span /><span /><span className="rv-ghost-short" />
              </div>
              <h3>Your review could be here</h3>
              <p>
                We only show real reviews from real customers, never made-up ones. Used DraveX Host? Tell others what it was like.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}