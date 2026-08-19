import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createAttendanceSession } from "./createSession";
import "./generateqr.css"
function GenerateQR() {
  const [sessionId, setSessionId] = useState("");

  const handleGenerateQR = async () => {
    try {
      const id = await createAttendanceSession();
      setSessionId(id);
      console.log("Session ID:", id);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  const attendanceUrl = sessionId
    ? `${window.location.origin}/student-form?session=${sessionId}`
    : "";
  return (
    <div className="qrpage">
      <button onClick={handleGenerateQR} className="genqr-btn">
        Generate QR
      </button>
      {sessionId && (
        <div>
          <h3>Scan this QR</h3>
          <QRCodeCanvas
            value={attendanceUrl}
            size={300}
          />
          <p>Valid for 5 minutes</p>
        </div>
      )}
    </div>
  );
}

export default GenerateQR;