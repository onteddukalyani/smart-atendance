import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import './attendancedata.css'

function AttendanceData() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAttendance = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "attendance_records")
                );

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRecords(data);

            } catch (error) {
                console.error("Error getting attendance:", error);
            } finally {
                setLoading(false);
            }
        };

        getAttendance();
    }, []);

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
                                    <td>CS162</td>
                                    <td>C003</td>
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