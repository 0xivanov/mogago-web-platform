import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    width: 100vw;
  }

  body {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    line-height: 1.5;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    width: 100%;
    position: relative;
  }

  button {
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  input, button, textarea, select {
    max-width: 100%;
    font-family: inherit;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
