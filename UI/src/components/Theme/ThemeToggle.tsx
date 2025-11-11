import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../Hooks/Theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full transition bg-card  shadow-theme hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={26} className="text-[#f57c00] transition-transform duration-300 hover:scale-110 hover:bg-[var(--bg-tertairy)] " />
      ) : (
        <Moon size={26} className="text-[#4dabf7] fill-[#4dabf7] stroke-none transition-transform duration-300 hover:scale-110 hover:bg-[var(--bg-tertairy)] " />
      )}
    </button>
  )
}
