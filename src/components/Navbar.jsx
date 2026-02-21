import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks'

function Navbar() {
  const { isAuth, authUser } = useAuth()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        {/* Fixed: Replace activeClassName with className function */}
        <NavLink 
          className={({ isActive }) => `navbar-brand ${isActive ? 'active' : ''}`}
          to="/" 
          end
        >
          conduit
        </NavLink>
        
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Fixed: Replace activeClassName with className function */}
            <NavLink 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="/" 
              end
            >
              Home
            </NavLink>
          </li>
          
          {isAuth && (
            <>
              <li className="nav-item">
                {/* Fixed: Replace activeClassName with className function */}
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/editor"
                >
                  <i className="ion-compose" />
                  &nbsp;New Post
                </NavLink>
              </li>
              
              <li className="nav-item">
                {/* Fixed: Replace activeClassName with className function */}
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/settings"
                >
                  <i className="ion-gear-a" />
                  &nbsp;Settings
                </NavLink>
              </li>
              
              <li className="nav-item">
                {/* Note: This link doesn't have activeClassName, but adding className for consistency */}
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to={`/@${authUser?.username}`}
                >
                  <img 
                    style={{ width: 24, height: 24, marginRight: 4, borderRadius: '50%' }} 
                    src={authUser?.image} 
                    alt={authUser?.username}
                  />
                  {authUser?.username}
                </NavLink>
              </li>
            </>
          )}
          
          {!isAuth && (
            <>
              <li className="nav-item">
                {/* Fixed: Replace activeClassName with className function */}
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/register"
                >
                  Sign up
                </NavLink>
              </li>
              
              <li className="nav-item">
                {/* Fixed: Replace activeClassName with className function */}
                <NavLink 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/login"
                >
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar