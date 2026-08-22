import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./authcontext";
import './attendancedata.css'

function AttendanceData() {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAttendance = async () => {
            try {
                const [recordsSnapshot, sessionsSnapshot] = await Promise.all([
                    getDocs(query(collection(db, "attendance_records"), where("ownerId", "==", user.uid))),
                    getDocs(query(collection(db, "attendance_sessions"), where("ownerId", "==", user.uid)))
                ]);

                const sessions = new Map(
                    sessionsSnapshot.docs.map((sessionDoc) => [
                        sessionDoc.id,
                        sessionDoc.data()
                    ])
                );

                const data = recordsSnapshot.docs.map((recordDoc) => ({
                    id: recordDoc.id,
                    ...recordDoc.data(),
                    session: sessions.get(recordDoc.data().sessionId)
                }));

                setRecords(data);

            } catch (error) {
                console.error("Error getting attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        getAttendance();
    }, [user]);

    if (loading) {
        return <p>Loading attendance...</p>;
    }

    return (
        <div className="attendance-data-page">
            <h2>Attendance Records</h2>

            {records.length === 0 ? (
                <p>No attendance records yet.</p>
            ) : (
                <div className="attendance-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Class Code</th>
                                <th>Room No</th>
                                <th>Submitted At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.fullName}</td>
                                    <td>{record.rollNo}</td>
                                    <td>{record.session?.classCode || "N/A"}</td>
                                    <td>{record.session?.roomNo || "N/A"}</td>
                                    <td>
                                        {new Date(
                                            record.submittedAt
                                        ).toLocaleString()}
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

export default AttendanceData;