import {
    FaUserGraduate,
    FaEnvelope,
    FaPhoneAlt,
    FaGraduationCap,
    FaBook,
    FaCalendarAlt,
    FaIdCard, FaEdit
} from "react-icons/fa";
import { Link } from "react-router-dom";


function ProfilePreview({ formData }) {

    return (

        <div className="card profile-card">

            <div className="profile-top">

                {
                    formData.image ?

                        <img
                            src={formData.image}
                            alt="Profile"
                            className="preview-image"
                        />
                        :
                        <div className="preview-placeholder">

                            <FaUserGraduate />
                        </div>

                }

                <h2>
                    {formData.fullName || "Student Name"}
                </h2>

                <p>
                    {formData.branch || "Branch"}
                </p>
                <br></br>

                <div className="profile-edit">
                    <Link to="/profileform">
                        <FaEdit />
                        <span>Edit Profile</span>
                    </Link>
                </div>


            </div>

            <div className="info-list">

                <div className="info-item">
                    <FaIdCard />
                    <span>
                        Roll Number : {formData.rollNo || ""}
                    </span>
                </div>

                <div className="info-item">
                    <FaEnvelope />
                    <span>
                        Email : {formData.email || ""}
                    </span>
                </div>

                <div className="info-item">
                    <FaPhoneAlt />
                    <span>
                        Phone Number : {formData.phone || ""}
                    </span>
                </div>

                <div className="info-item">
                    <FaGraduationCap />
                    <span>
                        Branch : {formData.branch || ""}
                    </span>
                </div>

                <div className="info-item">
                    <FaBook />
                    <span>
                        Semester : {formData.semester || ""}
                    </span>
                </div>

                <div className="info-item">
                    <FaCalendarAlt />
                    <span>
                        Date of Birth : {formData.dob || ""}
                    </span>
                </div>

            </div>

            <div className="bio-card">

                <h3>About</h3>

                <p>

                    {
                        formData.bio ||

                        "Tell everyone something about yourself. Your bio will appear here."
                    }

                </p>

            </div>
        </div>

    );

}

export default ProfilePreview;