import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { DISCORD_URL, SUPPORT_EMAIL } from "../config/site";
import "./LegalPage.css";

type Doc = {
  title: string;
  intro: string;
  sections: { h: string; p: string[] }[];
};

const UPDATED = "October 24, 2026";

/* CHECK every line below and change it to match how you really run DraveX Host. */
const DOCS: Record<string, Doc> = {
  "/terms": {
    title: "Terms of Service",
    intro: "These terms apply when you order or use any DraveX Host service. By placing an order you agree to them.",
    sections: [
      { h: "1. Our services", p: ["DraveX Host provides game server hosting, Node.js and Python app hosting, and V2Ray services. Features and resources depend on the plan you choose."] },
      { h: "2. Your account and orders", p: ["Orders and support are handled on our Discord server. You must give accurate details and keep your account information safe.", "You are responsible for everything that happens on your server."] },
      { h: "3. Payments", p: ["Prices are in Sri Lankan rupees (LKR). Services are paid in advance for the period you choose and are not started until payment is confirmed.", "Unpaid services may be suspended and then deleted after a reasonable notice."] },
      { h: "4. Acceptable use", p: ["You may not use our servers for anything illegal, for attacking or scanning other networks, for spam or phishing, for mining cryptocurrency, or for content that harms others.", "Resources must be used in a way that does not harm other customers or our network."] },
      { h: "5. Suspension and termination", p: ["We may suspend or end a service that breaks these terms, with or without notice if the problem is serious. You can cancel at any time by contacting us."] },
      { h: "6. Backups and data", p: ["You are responsible for keeping your own backups of important files and worlds. We take care of our systems, but we cannot promise that data will never be lost."] },
      { h: "7. Uptime and support", p: ["We work to keep servers online and respond quickly on Discord, but we cannot guarantee uninterrupted service. Maintenance, network problems and attacks can cause downtime."] },
      { h: "8. Liability", p: ["To the extent the law allows, DraveX Host is not liable for indirect losses such as lost players, income or data. Our total liability is limited to the amount you paid for the affected service in the last month."] },
      { h: "9. Changes", p: ["We may update these terms. The date above shows the latest version. Continuing to use the service means you accept the changes."] },
      { h: "10. Contact", p: [`Questions? Email ${SUPPORT_EMAIL} or message us on Discord.`] },
    ],
  },
  "/refund-policy": {
    title: "Refund Policy",
    intro: "We want you to be happy with your server. If something is wrong, contact us first and we will try to fix it.",
    sections: [
      { h: "1. Fix first", p: ["If your server is not working as described, open a ticket on Discord. Most problems are solved quickly without needing a refund."] },
      { h: "2. When you can get a refund", p: ["You may ask for a refund if the service is not delivered, or if we cannot fix a fault that stops the service from working as described.", "Requests must be made within 3 days of payment."] },
      { h: "3. When we cannot refund", p: ["Refunds are not given for servers that were suspended or removed for breaking our Terms of Service, for problems caused by mods, plugins or settings you added, for services already used for most of the paid period, or for change of mind after the first 3 days."] },
      { h: "4. How refunds are paid", p: ["Approved refunds are returned using the same method you paid with where possible, usually within a few working days."] },
      { h: "5. Upgrades and renewals", p: ["Renewals are not refunded once the new period has started. If you upgrade, contact us and we will work out the difference."] },
      { h: "6. Contact", p: [`Email ${SUPPORT_EMAIL} or message us on Discord with your order details.`] },
    ],
  },
  "/privacy": {
    title: "Privacy Policy",
    intro: "This explains what information DraveX Host collects and how we use it.",
    sections: [
      { h: "1. What we collect", p: ["Your name or Discord username, email address, order details, and the technical data needed to run your server, such as IP address and usage logs."] },
      { h: "2. How we use it", p: ["To set up and run your service, take payments, give support, keep our network secure and stop abuse. We do not sell your personal data."] },
      { h: "3. Sharing", p: ["We only share data with services we need to run the business, such as payment and infrastructure providers, or when the law requires it."] },
      { h: "4. Storage and security", p: ["Our servers are in Singapore. We take reasonable steps to protect your data, but no system is completely secure."] },
      { h: "5. Your choices", p: [`You can ask us to see, correct or delete your data by contacting ${SUPPORT_EMAIL}. Some records may be kept where we have to by law.`] },
      { h: "6. Third-party sites", p: ["Our site links to Discord and Trustpilot. They have their own privacy policies."] },
      { h: "7. Changes", p: ["We may update this policy. The date above shows the latest version."] },
    ],
  },
};

const OTHERS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function LegalPage({ path, onOpenGames }: { path: string; onOpenGames: () => void }) {
  const doc = DOCS[path] ?? DOCS["/terms"];

  useEffect(() => {
    document.title = `${doc.title} | DraveX Host`;
    window.scrollTo(0, 0);
  }, [doc.title]);

  return (
    <div className="lg">
      <header className="lg-hero">
        <Navbar onOpenGames={onOpenGames} />
        <div className="lg-hero-in">
          <span className="lg-eyebrow"><i /> Legal</span>
          <h1>{doc.title}</h1>
          <p>{doc.intro}</p>
          <small>Last updated {UPDATED}</small>
        </div>
      </header>

      <main className="lg-body">
        <aside className="lg-side">
          {OTHERS.map((o) => (
            <a key={o.href} href={o.href} className={o.href === path ? "is-active" : ""}>{o.label}</a>
          ))}
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="lg-help">Need help? Chat on Discord →</a>
        </aside>

        <article className="lg-doc">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((t) => <p key={t}>{t}</p>)}
            </section>
          ))}
        </article>
      </main>

      <Footer />
    </div>
  );
}
