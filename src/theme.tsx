import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

// Color context interface
interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

// Create context with default values
const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

// Custom hook to use the color mode context
export const useColorModeContext = () => useContext(ColorModeContext);

// Props interface for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme configuration
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
          primary: {
            main: '#4C6EF5',
            light: '#EEF2FF',
            dark: '#3B5BDB',
          },
          secondary: {
            main: '#F76190',
            light: '#FFEBF1',
            dark: '#E64980',
          },
          background: {
            default: '#F8F9FA',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#212529',
            secondary: '#6C757D',
          },
          divider: '#E9ECEF',
        }
      : {
          // Dark mode palette
          primary: {
            main: '#5C7CFF',
            light: '#2A3752',
            dark: '#7B96FF',
          },
          secondary: {
            main: '#FF6B9A',
            light: '#40303C',
            dark: '#FF85AD',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
          },
          text: {
            primary: '#E9ECEF',
            secondary: '#ADB5BD',
          },
          divider: '#303030',
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
  },
});

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Check user's system preference for dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // State for the current mode
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

  // Color mode context value
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  // Create theme based on the current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Apply CSS variables for colors
  useMemo(() => {
    document.documentElement.setAttribute('data-theme', mode);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--bg-color', mode === 'light' ? '#F8F9FA' : '#121212');
    document.documentElement.style.setProperty('--bg-paper', mode === 'light' ? '#FFFFFF' : '#1E1E1E');
    document.documentElement.style.setProperty('--text-primary', mode === 'light' ? '#212529' : '#E9ECEF');
    document.documentElement.style.setProperty('--text-secondary', mode === 'light' ? '#6C757D' : '#ADB5BD');
    document.documentElement.style.setProperty('--primary-main', mode === 'light' ? '#4C6EF5' : '#5C7CFF');
    document.documentElement.style.setProperty('--primary-light', mode === 'light' ? '#EEF2FF' : '#2A3752');
    document.documentElement.style.setProperty('--divider-color', mode === 'light' ? '#E9ECEF' : '#303030');
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}; 