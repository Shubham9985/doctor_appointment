import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* This line is necessary for routing(react routing) */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
