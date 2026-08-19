import "./bottomnav.css";
import {
  FaHome,
  FaUser,
  FaBook,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function BottomNav() {
  return (
    <div className="bottom-nav">
      <div className="nav-item">
        <Link to="/" className="menu-link">
        <div className="bottomicons"><FaHome />
          <span>Home</span></div>

        </Link>
      </div>

      <div className="nav-item">
        {/* <Link to="/resources" className="menu-link"> */}
        <div className="bottomicons">
          <FaBook />
          <span>Courses</span>
        </div>

        {/* </Link> */}

      </div>

      <div className="nav-item">
        <Link to="/ProfilePreview">
          <div className="bottomicons">
            <FaUser />
            <span>Profile</span>
          </div>
        </Link>
      </div>

      <div className="nav-item">
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