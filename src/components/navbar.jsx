import {
    FaBars,
    FaBell,
    FaEnvelope,
    FaChevronDown,
    FaUser
} from "react-icons/fa";
import React from "react";
import './navbar.css'

function Navbar({ formData, onMenuClick }) {
    return (
        <header className="navbar">

            <div className="left-nav">

                <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle sidebar">
                    <FaBars />
                </button>

            </div>

            <div className="right-nav">

                <div className="profile">

                    {formData.image ? (
                        <img
                            src={formData.image}
                            alt="Profile"
                            className="nav-profile-img"
                        />
                    ) : (
                        <div className="nav-profile-placeholder">
                            <FaUser />
                        </div>
                    )}

                    <span>{formData.fullName || "Lecturer" }</span>
                </div>

            </div>

        </header>
    );
}

export default React.memo(Navbar);