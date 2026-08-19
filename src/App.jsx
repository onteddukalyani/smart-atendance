import './App.css'
import { useState } from 'react'
import BottomNav from './components/bottomnav'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import ProfileForm from './components/profileform';
import ProfilePreview from './components/ProfilePreview';
import Navbar from './components/navbar';
import LecturerPage from './components/generateqr';
import StudentForm from './components/studentform';
import Settings from './components/settings';
function App() {
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
      <Sidebar />
      <div className='app-content'>
        <Navbar formData={formData}/>
        <Routes>
          <Route path="/" element={<Dashboard />}>Dashboard</Route>
          <Route path="/profile" element={<Profile formData={formData} />}>Profile</Route>
          <Route path="/profileform" element={<ProfileForm formData={formData} setFormData={setFormData} />}>Profile</Route>
          <Route path="/profilepreview" element={< ProfilePreview formData={formData} />}>Profile</Route>
          <Route path="/lecturerpage" element={<LecturerPage/>}>Lecturer Page</Route>
          <Route path="/student-form" element={<StudentForm formData={formData} setFormData={setFormData} />}>Student Form</Route>
          <Route path="/settings" element={<Settings/>} >Settings</Route>
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
