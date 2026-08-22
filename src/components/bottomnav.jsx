import "./bottomnav.css";
import {
  FaHome,
  FaUser,
  FaBook,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
function BottomNav() {
  const location = useLocation();
  return (
    <div className="bottom-nav">
      <div className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
        <Link to="/" className="menu-link">
        <div className="bottomicons"><FaHome />
          <span>Home</span></div>

        </Link>
      </div>

      <div className={`nav-item ${location.pathname === "/attendance-sessions" ? "active" : ""}`}>
        <Link to="/attendance-sessions" className="menu-link">
          <div className="bottomicons">
            <FaBook />
            <span>Courses</span>
          </div>
        </Link>
      </div>


      <div className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`}>
        <Link to="/settings" className="menu-link">
        <div className="bottomicons">

          <FaCog />
          <span>Settings</span>
        </div>

        </Link>

      </div>
    </div>
  );
}

export default BottomNav;