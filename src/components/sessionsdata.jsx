import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "./authcontext";
import './attendancedata.css';

function ClassesData() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const removeSession = async (event, session) => {
        event.stopPropagation();
        if (!window.confirm(`Remove the ${session.classCode || "selected"} session?`)) {
            return;
        }

        try {
            const recordsQuery = query(
                collection(db, "attendance_records"),
                where("ownerId", "==", user.uid)
            );
            const recordsSnapshot = await getDocs(recordsQuery);
            const batch = writeBatch(db);

            recordsSnapshot.docs.forEach((recordDoc) => {
                batch.delete(recordDoc.ref);
            });
            batch.delete(doc(db, "attendance_sessions", session.id));
            await batch.commit();
            setSessions((currentSessions) => currentSessions.filter(({ id }) => id !== session.id));
        } catch (error) {
            console.error("Error removing session:", error);
            window.alert("Could not remove this session.");
        }
    };

    useEffect(() => {
        const getSessions = async () => {
            try {
                const snapshot = await getDocs(query(
                    collection(db, "attendance_sessions"),
                    where("ownerId", "==", user.uid)
                ));
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
    }, [user]);

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
                                <th>Actions</th>
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
                                        <button type="button" onClick={() => navigate(`/attendance-sessions/${session.id}`)}>
                                            View Attendance
                                        </button>
                                        <button
                                            type="button"
                                            className="remove-session-btn"
                                            onClick={(event) => removeSession(event, session)}
                                        >
                                            Remove
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
    const { user } = useAuth();

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
                    where("ownerId", "==", user.uid)
                );
                const recordsSnapshot = await getDocs(recordsQuery);
                setRecords(recordsSnapshot.docs.map((recordDoc) => ({
                    id: recordDoc.id,
                    ...recordDoc.data()
                })).filter((record) => record.sessionId === sessionId));
            } catch (error) {
                console.error("Error getting attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        getAttendance();
    }, [sessionId, user]);

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
