import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import './attendancedata.css';

function ClassesData() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getSessions = async () => {
            try {
                const snapshot = await getDocs(collection(db, "attendance_sessions"));
                setSessions(snapshot.docs.map((sessionDoc) => ({
                    id: sessionDoc.id,
                    ...sessionDoc.data()
                })));
            } catch (error) {
                console.error("Error getting sessions:", error);
            } finally {
                setLoading(false);
            }
        };

        getSessions();
    }, []);

    if (loading) {
        return <p>Loading sessions...</p>;
    }

    return (
        <div className="attendance-data-page">
            <h2>Attendance Sessions</h2>
            {sessions.length === 0 ? <p>No attendance sessions yet.</p> : (
                <div className="attendance-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Class Code</th>
                                <th>Room No</th>
                                <th>Session ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session) => (
                                <tr key={session.id} onClick={() => navigate(`/attendance-sessions/${session.id}`)}>
                                    <td>{session.classCode || "Class"}</td>
                                    <td>{session.roomNo || "N/A"}</td>
                                    <td>{session.id}</td>
                                    <td>{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : "N/A"}</td>
                                    <td>{session.createdAt ? new Date(session.createdAt).toLocaleTimeString() : "N/A"}</td>
                                    <td>
                                        <button onClick={() => navigate(`/attendance-sessions/${session.id}`)}>
                                            View Attendance
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export function SessionAttendanceData() {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getAttendance = async () => {
            try {
                const sessionSnapshot = await getDoc(doc(db, "attendance_sessions", sessionId));
                if (!sessionSnapshot.exists()) {
                    return;
                }

                setSession({ id: sessionSnapshot.id, ...sessionSnapshot.data() });
                const recordsQuery = query(
                    collection(db, "attendance_records"),
                    where("sessionId", "==", sessionId)
                );
                const recordsSnapshot = await getDocs(recordsQuery);
                setRecords(recordsSnapshot.docs.map((recordDoc) => ({
                    id: recordDoc.id,
                    ...recordDoc.data()
                })));
            } catch (error) {
                console.error("Error getting attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        getAttendance();
    }, [sessionId]);

    if (loading) {
        return <p>Loading attendance...</p>;
    }

    if (!session) {
        return (
            <div className="attendance-data-page">
                <button className="back-to-sessions-btn" onClick={() => navigate("/attendance-sessions")}>⬅️ Back to Sessions</button>
                <p>Session not found.</p>
            </div>
        );
    }

    return (
        <div className="attendance-data-page">
            <button className="back-to-sessions-btn" onClick={() => navigate("/attendance-sessions")}>⬅️ Back to Sessions</button>
            <h2>Attendance - {session.classCode}</h2>
            <p>Session ID: {session.id}</p>
            {records.length === 0 ? <p>No students submitted attendance for this session.</p> : (
                <div className="attendance-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Class Code</th>
                                <th>Room No</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.fullName}</td>
                                    <td>{record.rollNo}</td>
                                    <td>{session.classCode}</td>
                                    <td>{session.roomNo || "N/A"}</td>
                                    <td>{record.submittedAt ? new Date(record.submittedAt).toLocaleDateString() : "N/A"}</td>
                                    <td>{record.submittedAt ? new Date(record.submittedAt).toLocaleTimeString() : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ClassesData;
