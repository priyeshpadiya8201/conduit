import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Settings, Editor, Article, Profile, Auth } from './pages'
import { AuthRoute, GuestRoute, Navbar } from './components'

import './App.css'

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />
          
          {/* Guest routes - wrap GuestRoute inside Route element */}
          <Route 
            path="/register" 
            element={<GuestRoute><Auth key="register" /></GuestRoute>} 
          />
          <Route 
            path="/login" 
            element={<GuestRoute><Auth key="login" /></GuestRoute>} 
          />
          
          {/* Protected routes - wrap AuthRoute inside Route element */}
          <Route 
            path="/settings" 
            element={<AuthRoute><Settings /></AuthRoute>} 
          />
          <Route 
            path="/editor" 
            element={<AuthRoute><Editor /></AuthRoute>} 
          />
          <Route 
            path="/editor/:slug" 
            element={<AuthRoute><Editor /></AuthRoute>} 
          />
          
          {/* Public routes with params */}
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          
          {/* Protected route with param */}
          <Route 
            path="/@:username" 
            element={<AuthRoute><Profile /></AuthRoute>} 
          />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App