import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation100.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 100;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation200.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 200;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation300.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 300;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation400.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation500.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 500;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation600.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation700.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation800.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 800;
  }

  @font-face {
    font-family: 'Freesentation';
    src: url('/assets/fonts/Freesentation900.woff2') format('woff2'),
    font-display: fallback;
    font-style: normal;
    font-weight: 900;
  }

  * {
    box-sizing: border-box;
  }
    
  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  div {
    transition: background-color 0.3s ease-in-out;
  }

  body {
    margin: 0;
    font-family: 'Freesentation', system-ui, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  } /* Chrome, Safari, and Opera */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
`;
