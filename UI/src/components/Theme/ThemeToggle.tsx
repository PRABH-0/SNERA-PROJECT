import React from 'react';
import { useTheme } from '../../Hooks/Theme/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, toggle, setSystem } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme('light')} className={`btn btn-sm ${theme==='light'?'btn-primary':'btn-ghost'}`}>☀️</button>
      <button onClick={setSystem} className={`btn btn-sm ${theme==='system'?'btn-outline':'btn-ghost'}`}>🖥️</button>
      <button onClick={() => setTheme('dark')} className={`btn btn-sm ${theme==='dark'?'btn-primary':'btn-ghost'}`}>🌙</button>
      <button onClick={toggle} className="btn btn-sm">↕️</button>
    </div>
  );
};
