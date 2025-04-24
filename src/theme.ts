import { createTheme, PaletteMode } from '@mui/material';
import { useState, useMemo, createContext, useContext } from 'react';

// Create a simple theme with light mode default
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4C6EF5', // Indigo
    },
    secondary: {
      main: '#FF8A65', // Coral-like color
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Context for theme mode
type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

// Hook for theme toggle
export const useColorMode = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? '#4C6EF5' : '#748FFC',
        },
        secondary: {
          main: mode === 'light' ? '#FF8A65' : '#FFAB91',
        },
        background: {
          default: mode === 'light' ? '#F8F9FA' : '#212529',
          paper: mode === 'light' ? '#FFFFFF' : '#343A40',
        },
      },
      typography: {
        fontFamily: [
          'Inter',
          'Arial',
          'sans-serif',
        ].join(','),
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
            },
          },
        },
      },
    }), 
    [mode]
  );

  return { theme, colorMode };
};

// Hook to use the context
export const useColorModeContext = () => useContext(ColorModeContext); 