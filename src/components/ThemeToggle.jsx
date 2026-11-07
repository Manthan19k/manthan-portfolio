import { useTheme } from "../context/useTheme";
import { SunIcon, MoonIcon } from "./Icons";
import "./ThemeToggle.css";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode (currently ${theme} mode)`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="theme-toggle-track">
        <span className={`theme-toggle-thumb ${isDark ? "dark" : "light"}`}>
          {isDark ? <MoonIcon size={14} /> : <SunIcon size={14} />}
        </span>
      </div>
      <span className="theme-toggle-label font-mono">
        {isDark ? "DARK" : "LIGHT"}
      </span>
    </button>
  );
}
