import { doc,getDoc,setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createAttendanceSession(classCode) {
  const now = Date.now();
  const expiresAt = now + 2 * 60 * 1000;
  const docRef = await addDoc(
    collection(db, "attendance_sessions"),
    {
      classCode: classCode,
      createdAt: now,
      expiresAt: expiresAt,
      active: true
    }
  );
  return docRef.id;
}