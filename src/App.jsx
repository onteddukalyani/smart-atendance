import './App.css'
import { useEffect, useState } from 'react'
import BottomNav from './components/bottomnav'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import Navbar from './components/navbar';
import LecturerPage from './components/generateqr';
import StudentForm from './components/studentform';
import Settings from './components/settings';
import AttendanceData from './components/attendancedata';
import FaceScanner from './components/facescanner';
import ClassesData, { SessionAttendanceData } from './components/sessionsdata';
import Login from './components/login';
import ActiveSessions from './components/activesessions';
import { useAuth } from './components/authcontext';
function App() {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth <= 800);
  const [guestLoginPending, setGuestLoginPending] = useState(false);
  const { user, loginAsGuest } = useAuth();
  const isStudentScan = window.location.pathname === '/student-form';

  useEffect(() => {
    if (isStudentScan && !user && !guestLoginPending) {
      setGuestLoginPending(true);
      loginAsGuest().catch((error) => {
        console.error('Guest sign-in failed:', error);
        setGuestLoginPending(false);
      });
    }
  }, [guestLoginPending, isStudentScan, loginAsGuest, user]);

  const [formData, setFormData] = useState({
    image: "",
    fullName: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    semester: "",
    dob: "",
    gender: "",
    bio: ""
  });

  if (isStudentScan && (guestLoginPending || !user)) {
    return <div className="card"><h2>Opening attendance form...</h2></div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className='app'>
      <Sidebar
        hidden={sidebarHidden}
        onClose={() => setSidebarHidden(true)}
      />
      <div className='app-content'>
        <Navbar formData={formData}
          sidebarHidden={sidebarHidden}
          onMenuClick={() => setSidebarHidden((hidden) => !hidden)} />
        <Routes>
          <Route path="/" element={<Dashboard />}>Dashboard</Route>
          <Route path="/lecturerpage" element={<LecturerPage />}>Lecturer Page</Route>
          <Route path="/student-form" element={<StudentForm formData={formData} setFormData={setFormData} />}>Student Form</Route>
          <Route path="/settings" element={<Settings />} >Settings</Route>
          <Route path="/attendance-data" element={<AttendanceData />}>Attendance Data</Route>
          <Route path="/facedetection" element={<FaceScanner />}>Face Detection</Route>
          <Route path="/attendance-sessions" element={<ClassesData />}>Classes</Route>
          <Route path="/active-sessions" element={<ActiveSessions />}>Active Sessions</Route>
          <Route path="/attendance-sessions/:sessionId" element={<SessionAttendanceData />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
