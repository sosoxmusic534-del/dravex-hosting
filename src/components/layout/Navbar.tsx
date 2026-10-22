import { useState } from "react";
import "./Navbar.css";

type NavbarProps = {
  onOpenGames?: () => void;
};

export default function Navbar({ onOpenGames }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <a href="/" className="nav-brand">
          <img src="/logo.png" alt="DraveX Host logo" />
          <span className="nav-brand-text">Drave<b>X</b></span>
          <small>Host</small>
        </a>

        <ul className={`nav-links ${open ? "is-open" : ""}`}>
          <li>
            <button
              type="button"
              className="nav-link"
              onClick={() => {
                setOpen(false);
                onOpenGames?.();
              }}
            >
              Games
            </button>
          </li>
          <li><a className="nav-link" href="/#pricing">Pricing</a></li>
          <li><a className="nav-link" href="/#features">Features</a></li>
          <li><a className="nav-link" href="/about">About</a></li>
          <li><a className="nav-link" href="/#faq">FAQ</a></li>
        </ul>

        <div className="nav-right">
          <a href="#" className="nav-cta">Client Area</a>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}