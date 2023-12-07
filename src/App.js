// Import utilities
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import LoginForm from "./components/LoginForm";
import Protected from "./components/Protected";
import Search from "./components/Search";

// Import styling
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css"; 

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#66bb6a',
        contrastText: '#295003',
      },
      secondary: {
        main: '#a5d6a7',
      },
      success: {
        main: '#acca8f',
        dark: '#acca8f',
      },
      info: {
        main: '#89a2d8',
      },
      warning: {
        main: '#efc8b3',
      },
      error: {
        main: '#f3633d',
      },
    },
    typography: {
      h1: {
        fontSize: '3rem',
      },
      h2: {
        fontSize: '1.25rem',
      },
      h3: {
        fontSize: '1rem',
      },
      h4: {
        fontSize: '0.75rem',
      },
    }
})

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/search"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Search />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>

  </ThemeProvider>
  );
};

export default App;

/**
 * routing
 * protected routes, setting state for login to access protected route
 */
