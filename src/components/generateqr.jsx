import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createAttendanceSession } from "./createsession";
import "./generateqr.css"
function GenerateQR() {
  const [sessionId, setSessionId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleGenerateQR = async () => {
    if (!classCode) {
        alert("Please select a class.");
        return;
    }
  setIsGenerating(true);
  setErrorMessage("");
    try {
        const id = await createAttendanceSession(classCode);
        setSessionId(id);
        console.log("Session ID:", id);
        console.log("Class Code:", classCode);
    } catch (error) {
        console.error("Error creating session:", error);
    setErrorMessage(error.message || "Could not create an attendance session.");
  } finally {
    setIsGenerating(false);
    }
};
  const attendanceUrl = sessionId
    ? `https://smart-atendance.vercel.app//student-form?session=${sessionId}`
    : "";
    const [classCode, setClassCode] = useState("");
  return (
    <div className="qrpage">
      <select
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
      >
        <option value="">Select Class</option>
        <option value="CSE-A">CSE-A</option>
        <option value="CSE-B">CSE-B</option>
        <option value="DSAI">DSAI</option>
        <option value="ECE">ECE</option>
      </select>
      <button onClick={handleGenerateQR} className="genqr-btn" disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate QR"}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      {sessionId && (
        <div>
          <h3>Scan this QR</h3>
          <QRCodeCanvas
            value={attendanceUrl}
            size={300}
          />
          <p>Valid for 2 minutes</p>
        </div>
      )}
    </div>
  );
}

export default GenerateQR;