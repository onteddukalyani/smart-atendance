import "./dashboard.css";
import { SiGoogleclassroom } from "react-icons/si";
import { IoQrCodeOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

function Dashboard() {
    const dashcards = [
        { icon: <SiGoogleclassroom />, name: "Classes", value: "",text:"No data yet" ,path: "/" },/* classes*/
        { icon: <IoQrCodeOutline />, name: "Active Sessions", value: "",text:"No active session", path: "/lecturerpage" },/* qr*/
        { icon: <GoPeople />, name: "Total Students", value: "",text:"No data yet", path: "/" }, /*students*/
        { icon: <LuClipboardList />, name: "Atttendance Today", value: "",text:"No data yet", path: "/attendance-data" },
    ];
    return (
        <div className="dashboard-page">
            <div className="dash-cards">
                {
                    dashcards.map((item, index) => (
                        <div key={index}>
                            <Link to={item.path} className="dash-link dash-card" >
                                <span className="dash-icons">
                                    {item.icon}
                                </span>
                                <div className="card-details">
                                    <p>{item.name}</p>
                                    <p>{item.value || "---"}</p>
                                    <p>{item.value || item.text}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <div className="dash-recent-activity">
                <h2>Recent Attendace Sessions</h2>
                <div className="recent-card">
                    <SlCalender className="icon"/>
                <p>No Sessions yet</p>
                <p>Start a new Attendace session to see it here.</p>
                <button >Start Attendance</button>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;