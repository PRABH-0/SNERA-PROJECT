import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../Hooks/Theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full transition bg-card shadow-theme hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-accent" />
      )}
    </button>
  )
}
