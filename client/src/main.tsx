import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GlobalProvider } from './context/GlobalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
)