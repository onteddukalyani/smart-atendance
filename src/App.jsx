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
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
