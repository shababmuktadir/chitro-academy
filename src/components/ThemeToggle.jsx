import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
    >
      {darkMode ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}