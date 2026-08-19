import { addDoc, collection } from "firebase/firestore";
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

        try {
            await addDoc(collection(db, "attendance_records"), {
                sessionId,
                fullName: formData.fullName,
                rollNo: formData.rollNo,
                submittedAt: Date.now()
            });
            alert("Attendance saved successfully!");
        } catch (error) {
            console.error("Error saving attendance:", error);
            alert("Could not save attendance.");
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

                            <input
                                type="text"
                                name="rollNo"
                                placeholder="Enter Roll Number"
                                value={formData.rollNo}
                                onChange={handleChange}
                            />

                        </div>
                    </div>
                </div>

                {/* Buttons */}

                <div className="button-group">

                    <button
                        className="save-btn"
                        type="submit"
                    >
                        Save Profile
                    </button>

                    <button
                        className="reset-btn"
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>

                </div>
            </form>
        </div>
    );
}

export default StudentForm;