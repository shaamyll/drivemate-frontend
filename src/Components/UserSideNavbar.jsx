import React, { useState } from 'react'
import './UserSideNavbar.css'

function UserSideNavbar() {



    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    }
  return (
    <div>
        <div className={`sidebar-container ${isOpen ? "open" : ""}`} >
      <div className="logo-section">
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="logo">Logo</h1>
      </div>
      <nav className="nav-links">
        <a href="#home" className="nav-link">Home</a>
        <a href="#profile" className="nav-link">Profile</a>
        <a href="#logout" className="nav-link">Logout</a>
      </nav>
    </div>
    </div>
  )
}

export default UserSideNavbar