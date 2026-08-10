import {
    FaBars,
    FaBell,
    FaEnvelope,
    FaChevronDown,
    FaUser
} from "react-icons/fa";
import React from "react";

function Navbar({ formData }) {
    return (
        <header className="navbar">

            <div className="left-nav">

                <button className="menu-btn">
                    <FaBars />
                </button>

            </div>

            <div className="right-nav">

                <div className="icon-box">
                    <FaBell />
                    <span className="badge">3</span>
                </div>

                <div className="icon-box">
                    <FaEnvelope />
                    <span className="badge">5</span>
                </div>

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

                    <span>{formData.fullName || <select class="dropdownnav">
                        <option>Student</option>
                        <option>Lecturer</option>
                    </select>}</span>
                </div>

            </div>

        </header>
    );
}

export default React.memo(Navbar);