import {
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaGraduationCap,
} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import "./sidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar({ hidden }) {
    const menu = [
        { icon: <RiDashboardFill />, text: "Dashboard", path: "/" },
        { icon: <SiGoogleclassroom />, text: "Classes", path: "/attendance-sessions" },
        { icon: <FaCog />, text: "Settings", path: "/settings" }
    ];
    return (
        <aside className={`sidebar ${hidden ? "hidden" : ""}`}>
            <div className="logo">
                <FaGraduationCap className="logo-icon" />
                <h2>SmartAttend</h2>
            </div>
            <ul className="menu">
                {
                    menu.map((item, index) => (
                        <li
                            key={index}
                            className={item.active ? "active" : ""}
                        >
                            <Link to={item.path} >
                                <span className="menu-icon">
                                    {item.icon}
                                </span>
                                {item.text}
                            </Link>
                        </li>

                    ))
                }
            </ul>
            <div className="logout">
                <FaSignOutAlt />
                Logout

            </div>

        </aside>

    );

}

export default Sidebar;