import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import Theme from './Components/Theme'
import { DriverStandingsContextProvider } from './Contexts/DriverStandings';
import { AuthContextProvider } from './Contexts/AuthContext';
import { ConstructorStandingsContextProvider } from './Contexts/ConstructorStandings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={Theme} cssVarsRoot='body'>
    <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
    <AuthContextProvider>
      <DriverStandingsContextProvider>
        <ConstructorStandingsContextProvider>
          <App />
        </ConstructorStandingsContextProvider>
      </DriverStandingsContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

