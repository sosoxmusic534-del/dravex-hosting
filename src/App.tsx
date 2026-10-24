import { useEffect } from "react";
import Hero from "./components/home/Hero";
import Games from "./components/sections/Games";
import Pricing from "./components/sections/Pricing";
import Features from "./components/sections/Features";
import Locations from "./components/sections/Locations";
import Reviews from "./components/sections/Reviews";
import Faq from "./components/sections/Faq";
import Footer from "./components/layout/Footer";
import MinecraftPage from "./pages/MinecraftPage";
import RustPage from "./pages/RustPage";
import FiveMPage from "./pages/FiveMPage";
import AboutPage from "./pages/AboutPage";
import LegalPage from "./pages/LegalPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const onHome = path === "/";

  // "Choose a game" / navbar "Games": scroll on the home page, otherwise go home first
  const openGames = () => {
    if (onHome) document.getElementById("games")?.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/#games";
  };

  // links like /#pricing should scroll once the page has rendered
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => clearTimeout(t);
  }, []);

  if (path === "/games/minecraft") return <MinecraftPage onOpenGames={openGames} />;
  if (path === "/games/rust") return <RustPage onOpenGames={openGames} />;
  if (path === "/games/fivem") return <FiveMPage onOpenGames={openGames} />;
  if (path === "/about") return <AboutPage onOpenGames={openGames} />;
  if (["/terms", "/refund-policy", "/privacy"].includes(path)) return <LegalPage path={path} onOpenGames={openGames} />;

  return (
    <div className="app">
      <Hero onOpenGames={openGames} />
      <Games />
      <Pricing />
      <Features />
      <Locations />
      <Reviews />
      <Faq />
      <Footer />
    </div>
  );
}