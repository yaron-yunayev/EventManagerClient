import { useTheme } from "../providers/ThemeProvider";

export default function ThemeToggleButton() {
  const { toggleTheme, mode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-[#0077B6] hover:bg-[#023E8A] text-white rounded-lg"
    >
      {mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
