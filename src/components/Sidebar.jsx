import {
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaGraduationCap, FaTasks
} from "react-icons/fa";
import "./sidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar() {
    const menu = [
        { icon: <RiDashboardFill />, text: "Dashboard", path: "/" },
        { icon: <FaTasks />, text: "Tasks", path: "/tasks" },
        { icon: <FaCog />, text: "Settings", path: "/settings" }
    ];
    return (
        <aside className="sidebar">
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