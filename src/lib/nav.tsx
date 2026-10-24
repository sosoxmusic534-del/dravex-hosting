import { useEffect, useState, type AnchorHTMLAttributes } from "react";

export const cleanPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

/** Go to another page without reloading the site */
export function navigate(to: string) {
  if (to === window.location.pathname + window.location.search) return;
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("dx:nav"));
  window.scrollTo(0, 0);
}

/** Current path, updates when navigate() or the back button is used */
export function usePath() {
  const [path, setPath] = useState(cleanPath());
  useEffect(() => {
    const f = () => setPath(cleanPath());
    window.addEventListener("popstate", f);
    window.addEventListener("dx:nav", f);
    return () => {
      window.removeEventListener("popstate", f);
      window.removeEventListener("dx:nav", f);
    };
  }, []);
  return path;
}

export function Link({ to, onClick, ...rest }: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}