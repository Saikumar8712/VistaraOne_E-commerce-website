import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

// Prevent browsers from jumping to cached scroll positions on page reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ShopProvider>
  </BrowserRouter>
)
