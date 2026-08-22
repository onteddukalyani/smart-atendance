import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    FaUser,
    FaIdCard
} from "react-icons/fa";
import { db } from "../firebase";
import FaceScanner from "./facescanner";
import './studentform.css';

function StudentForm({ formData, setFormData }) {
    const [checkingSession, setCheckingSession] = useState(true);
    const [expired, setExpired] = useState(false);
    const [sessionError, setSessionError] = useState(false);
    const [sessionErrorMessage, setSessionErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const sessionId = new URLSearchParams(window.location.search).get("session");

    useEffect(() => {
        const checkSession = async () => {
            if (!sessionId) {
                setExpired(true);
                setCheckingSession(false);
                return;
            }

            try {
                const sessionRef = doc(
                    db,
                    "attendance_sessions",
                    sessionId
                );

                const sessionSnapshot =
                    await getDoc(sessionRef);

                if (!sessionSnapshot.exists()) {
                    setExpired(true);
                    setCheckingSession(false);
                    return;
                }

                const sessionData = sessionSnapshot.data();

                if (!sessionData.ownerId) {
                    setSessionErrorMessage("This QR code is outdated. Please ask the lecturer to generate a new QR code.");
                    setSessionError(true);
                    setCheckingSession(false);
                    return;
                }

                const currentTime = Date.now();

                if (
                    currentTime >= sessionData.expiresAt ||
                    sessionData.active === false
                ) {
                    setExpired(true);
                } else {
                    setExpired(false);

                    // Check again when the expiry time is reached
                    const remainingTime =
                        sessionData.expiresAt - currentTime;

                    setTimeout(() => {
                        setExpired(true);
                    }, remainingTime);
                }

            } catch (error) {
                console.error(
                    "Error checking session:",
                    error
                );

                setSessionError(true);
                setSessionErrorMessage("Check your internet connection and scan a newly generated QR code.");

            } finally {
                setCheckingSession(false);
            }
        };

        checkSession();

    }, [sessionId]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) {
            return;
        }

        if (!sessionId) {
            alert("This QR code does not contain a session.");
            return;
        }

        if (!formData.rollNo.trim()) {
            alert("Please enter your roll number.");
            return;
        }

        setSubmitting(true);

        try {

            // CHECK SESSION EXPIRY AGAIN
            const sessionRef = doc(
                db,
                "attendance_sessions",
                sessionId
            );

            const sessionSnapshot =
                await getDoc(sessionRef);

            if (!sessionSnapshot.exists()) {
                alert("❌ QR Code has expired.");
                setExpired(true);
                return;
            }

            const sessionData = sessionSnapshot.data();

            if (!sessionData.ownerId) {
                alert("This QR code is outdated. Please ask the lecturer to generate a new QR code.");
                return;
            }

            if (
                Date.now() >= sessionData.expiresAt ||
                sessionData.active === false
            ) {
                alert("❌ QR Code has expired. Attendance is closed.");
                setExpired(true);
                return;
            }


            // YOUR EXISTING DUPLICATE CHECK
            const attendanceId =
                `${sessionId}_${formData.rollNo.trim()}`;

            console.log("Attendance ID:", attendanceId);

            const attendanceRef = doc(
                db,
                "attendance_records",
                attendanceId
            );

            const existingRecord =
                await getDoc(attendanceRef);

            console.log(
                "Already exists:",
                existingRecord.exists()
            );

            if (existingRecord.exists()) {
                alert(
                    "❌ You have already submitted attendance for this session."
                );

                return;
            }


            // SAVE ATTENDANCE
            await setDoc(attendanceRef, {
                sessionId: sessionId,
                ownerId: sessionData.ownerId,
                roomNo: sessionData.roomNo || "N/A",
                fullName: formData.fullName,
                rollNo: formData.rollNo.trim(),
                submittedAt: Date.now()
            });

            alert("✅ Attendance saved successfully!");

        } catch (error) {

            console.error(
                "Attendance error:",
                error
            );

            alert(
                "❌ Could not save attendance: " +
                error.message
            );
        } finally {
            setSubmitting(false);
        }
    };


    const handleReset = () => {
        setFormData({
            fullName: "",
            rollNo: "",
        });
    };


    // CHECKING SESSION
    if (checkingSession) {
        return (
            <div className="card">
                <h2>Checking QR...</h2>
            </div>
        );
    }


    // EXPIRED QR
    if (sessionError) {
        return (
            <div className="card">
                <h2>Unable to use this QR session</h2>
                <p>{sessionErrorMessage}</p>
            </div>
        );
    }

    if (expired) {
        return (
            <div className="card">
                <h2>❌ QR Code Expired</h2>

                <p>
                    This attendance QR code is no longer valid.
                </p>

                <p>
                    Please ask the lecturer to generate a new QR code.
                </p>
            </div>
        );
    }


    return (
        <div className="card student-form">

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

                        <FaceScanner/>

                    </div>

                </div>


                {/* Buttons */}

                <div className="button-group">

                    <button
                        className="save-btn"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Submit"}
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