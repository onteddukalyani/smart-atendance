import {
    FaBars,
    FaTimes,
    FaUser
} from "react-icons/fa";
import React, { useState } from "react";
import './navbar.css'
import { useAuth } from './authcontext';

function Navbar({ formData, sidebarHidden, onMenuClick }) {
    const { user } = useAuth();
    const [profileImageFailed, setProfileImageFailed] = useState(false);
    const profileName = user?.displayName || formData.fullName || (user?.isAnonymous ? "Guest" : "Profile");
    const profileImage = user?.photoURL || formData.image;
    return (
        <header className="navbar">

            <div className="left-nav">

                <button
                    className="menu-btn"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                >
                    <FaBars />
                </button>

            </div>

            <div className="right-nav">

                <div className="profile">

                    {profileImage && !profileImageFailed ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="nav-profile-img"
                            onError={() => setProfileImageFailed(true)}
                        />
                    ) : (
                        <div className="nav-profile-placeholder">
                            <FaUser />
                        </div>
                    )}

                    <span>{profileName}</span>
                </div>

            </div>

        </header>
    );
}

export default React.memo(Navbar);