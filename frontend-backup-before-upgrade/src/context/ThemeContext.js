import React, { createContext, useContext, useMemo, useState } from 'react';
import { light, dark } from '../theme/palette';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const value = useMemo(() => ({ mode, isDark: mode === 'dark', colors: mode === 'dark' ? dark : light,
    toggle: () => setMode(v => v === 'light' ? 'dark' : 'light') }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
