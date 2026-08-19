import { doc, getDoc, setDoc } from "firebase/firestore";
import {
    FaUser,
    FaIdCard
} from "react-icons/fa";
import { db } from "../firebase";

function StudentForm({ formData, setFormData }) {
    const sessionId = new URLSearchParams(window.location.search).get("session");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionId) {
            alert("This QR code does not contain a session.");
            return;
        }

        if (!formData.rollNo.trim()) {
            alert("Please enter your roll number.");
            return;
        }

        try {
            const attendanceId = `${sessionId}_${formData.rollNo.trim()}`;

            console.log("Attendance ID:", attendanceId);

            const attendanceRef = doc(
                db,
                "attendance_records",
                attendanceId
            );

            const existingRecord = await getDoc(attendanceRef);

            console.log("Already exists:", existingRecord.exists());

            if (existingRecord.exists()) {
                alert("❌ You have already submitted attendance for this session.");
                return;
            }

            await setDoc(attendanceRef, {
                sessionId: sessionId,
                fullName: formData.fullName,
                rollNo: formData.rollNo.trim(),
                submittedAt: Date.now()
            });

            alert("✅ Attendance saved successfully!");

        } catch (error) {
            console.error("Attendance error:", error);
            alert("❌ Could not save attendance: " + error.message);
        }
    };
    const handleReset = () => {
        setFormData({
            fullName: "",
            rollNo: "",
        });
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Name */}
                    <div className="input-group">
                        <label>Full Name</label>
                        <div className="input-icon">
                            <FaUser />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Roll */}
                    <div className="input-group">
                        <label>Roll Number</label>
                        <div className="input-icon">
                            <FaIdCard />
                            <input type="text" name="rollNo" placeholder="Enter Roll Number"value={formData.rollNo} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="button-group">
                    <button className="save-btn" type="submit" onClick={handleSubmit}>Submit</button>
                    <button className="reset-btn" type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default StudentForm;