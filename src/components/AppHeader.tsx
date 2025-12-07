import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "All Movies", path: "/movies" },
  { label: "Watchlist", path: "/watchlist" },
];

export function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  const isActive = useMemo(
    () => (path: string) => {
      if (path === "/") return activePath === "/";
      return activePath.startsWith(path);
    },
    [activePath]
  );

  return (
    <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50 bg-gray-950/80">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 focus:outline-none group rounded-md px-2 py-1 -mx-2 transition-colors hover:bg-gray-800/40 active:scale-[0.98]"
            aria-label="CineScope Home"
        >
          <Film className="w-8 h-8 text-orange-500" />
          <span className="inline-block text-xl font-normal text-white group-hover:font-bold group-hover:text-orange-50 transition-colors transition-transform group-hover:scale-[1.03] hover:underline underline-offset-4 decoration-orange-500/50">
            CineScope
          </span>
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={
                isActive(item.path)
                  ? "text-white bg-gray-800/40 border border-gray-700/60 hover:text-white"
                  : "text-gray-300 hover:text-white"
              }
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}