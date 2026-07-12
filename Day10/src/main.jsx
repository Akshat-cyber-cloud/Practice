import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SignupProvider } from './context/SignupContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignupProvider>
      <App />
    </SignupProvider>
  </StrictMode>,
)
