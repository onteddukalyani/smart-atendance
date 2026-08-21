import { useEffect, useState } from "react";
import { collection, getDocs ,query, where } from "firebase/firestore";
import { db } from "../firebase";
import './attendacedata.css'

function ClassesData() {
    const [records, setRecords] = useState([]);
    const [loadingSessions, setLoadingSessions] = useState(true);
    const [sessions,setSessions]=useState([]);
    const [loadingRecords, setLoadingRecords] = useState(false);

    useEffect(() => {
        const getSessions = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "attendance_sessions")
                );

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setSessions(data);

            } catch (error) {
                console.error("Error getting Sessions:", error);
            } finally {
                setLoadingSessions(false);
            }
        };

        getSessions();
    }, []);
    const getAttendanceForSession=async(session)=>{
        setSelectedSession(session);
        setLoadingRecords(true);
        try{
            const q=query(collection(db,"attendance_records"),where("sessionId","==",session.sessionId));
            const snapshot=await getDocs(q);
            const data=snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
            setRecords(data);
        } catch (error){
            console.log("Error getting attendance:",error);
        } finally {
            setLoadingRecords(false);
        }
    };
    const goBack=()=>{
        setSelectedSession(null);
        setRecords([]);
    };

    if (loadingSessions) {
        return <p>Loading attendance...</p>;
    }

    if (setSelectedSession){
        return(
            <div className="attendance-data-page">
                <button onClick={goBack}>⬅️ Back to Sessions</button>
                <h2>Attendance-{selectedSession.classCode}</h2>
                <p>Session ID: {selectedSession.sessionId}</p>
                {loadingRecords?
                (<p>Loading Attendance.......</p>):
                records.length===0 ? (<p>No Students Submitted attendance for this session.</p>):
                (<div className="attendance-table-scroll">
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
                        <tbody>{records.map((record)=>(
                            <tr key={record.id}>
                                <td>{record.fullName}</td>
                                <td>{record.rollNo}</td>
                                <td>{selectedSession.classCode}</td>
                                <td>{record.submittedAt? new Date(record.submittedAt).toLocaleString():"N/A"}</td>
                            </tr>

                        ))}</tbody>
                    </table>
                </div>)
                }
            </div>
        );
    }
    return (
        <div className="attendance-data-page">
            <h2>Attendance Sessions</h2>
            {sessions.length===0?(<p>No Attendance Sessions yet.</p>):(
                <div className="sessions-container">
                    {
                    sessions.map((session)=>(
                        <div key={session.id} className="session-card" onClick={()=>getAttendanceForSession(session)}>
                            <h3>{session.classCode || "Class"}</h3>
                            <p><strong>Session:</strong>{" "}{session.sessionId}</p>
                            <p><strong>Room No:</strong>{" "}{session.roomNo || "N/A" }</p>
                            <p><strong>Date:</strong>{" "}{session.createdAt?new Date(session.createdAt).toLocaleDateString():"N/A"}</p>
                            <button>View Attendance</button>
                        </div>
                            
                    ))
                }
                </div>
            )
            }
        </div>
    );

    // return (
    //     <div className="attendance-data-page">
    //         <h2>Attendance Records</h2>

    //         {records.length === 0 ? (
    //             <p>No attendance records yet.</p>
    //         ) : (
    //             <div className="attendance-table-scroll">
    //                 <table>
    //                     <thead>
    //                         <tr>
    //                             <th>Name</th>
    //                             <th>Roll Number</th>
    //                             <th>Class Code</th>
    //                             <th>Room No</th>
    //                             <th>Submitted At</th>
    //                         </tr>
    //                     </thead>

    //                     <tbody>
    //                         {records.map((record) => (
    //                             <tr key={record.id}>
    //                                 <td>{record.fullName}</td>
    //                                 <td>{record.rollNo}</td>
    //                                 <td>CS162</td>
    //                                 <td>C003</td>
    //                                 <td>
    //                                     {new Date(
    //                                         record.submittedAt
    //                                     ).toLocaleString()}
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         )}
    //     </div>
    // );
}

export default ClassesData;