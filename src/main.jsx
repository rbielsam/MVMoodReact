import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProviderWrapper } from './contexts/user.context.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProviderWrapper>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </UserProviderWrapper>
  </StrictMode>,
)