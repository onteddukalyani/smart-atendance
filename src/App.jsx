import './App.css'
import { useState } from 'react'
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
function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
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

  return (
    <div className='app'>
      <Sidebar hidden={sidebarHidden} />
      <div className='app-content'>
        <Navbar formData={formData} onMenuClick={() => setSidebarHidden((hidden) => !hidden)} />
        <Routes>
          <Route path="/" element={<Dashboard />}>Dashboard</Route>
          <Route path="/lecturerpage" element={<LecturerPage/>}>Lecturer Page</Route>
          <Route path="/student-form" element={<StudentForm formData={formData} setFormData={setFormData} />}>Student Form</Route>
          <Route path="/settings" element={<Settings/>} >Settings</Route>
          <Route path="/attendance-data" element={<AttendanceData />}>Attendance Data</Route>
          <Route path="/facedetection" element={<FaceScanner/>}>Face Detection</Route>
          <Route path="/attendance-sessions" element={<ClassesData/>}>Classes</Route>
          <Route path="/attendance-sessions/:sessionId" element={<SessionAttendanceData/>} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
