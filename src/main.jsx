import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

// Material UI 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#2e7d32',
    },
    info: {
      main: '#0288d1',
    },
    warning: {
      main: '#ed6c02',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider enableCssLayer>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
)