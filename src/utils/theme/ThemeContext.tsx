import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MMKV } from 'react-native-mmkv';
import { AppTheme, lightTheme, darkTheme } from './theme';
import { Appearance } from 'react-native';
import { storage } from '../storage';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
});


interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(lightTheme);
    //console.log('themeContext rendered' ,theme.mode)
  useEffect(() => {
    const savedMode = storage.getString('themeMode'); 
    if (savedMode === 'dark') {
      setTheme(darkTheme);
    } else if (savedMode === 'light') {
      setTheme(lightTheme);
    }else {
      const systemScheme = Appearance.getColorScheme();
      setTheme(systemScheme === 'dark' ? darkTheme : lightTheme);
    }

  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev.mode === 'dark' ? lightTheme : darkTheme;
      storage.set('themeMode', newTheme.mode);
      //console.log('theme changed')
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
