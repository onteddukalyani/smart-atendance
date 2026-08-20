import { useRef } from "react";
import {
    FaCamera,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaIdCard,
    FaGraduationCap,
    FaBook
} from "react-icons/fa";
import "./profileform.css";

function ProfileForm({ formData, setFormData }) {

    const fileInput = useRef();

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {

            if (files && files[0]) {

                setFormData({
                    ...formData,
                    image: URL.createObjectURL(files[0])
                });

            }

        } else {

            setFormData({
                ...formData,
                [name]: value
            });

        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile Saved Successfully!");
    };

    const handleReset = () => {

        setFormData({
            image: "",
            fullName: "",
            rollNo: "",
            email: "",
            phone: "",
            branch: "",
            semester: "",
            dob: "",
            gender: "",
            bio: ""
        });

    };

    return (

        <div className="profile-form">
            <div className="card">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">
                    Student Profile
                </h2>
                {/* Image */}

                <div className="image-upload">

                    {
                        formData.image ?
                            <img
                                src={formData.image}
                                alt=""
                                className="profile-image"
                            />
                            :
                            <div className="profile-placeholder">
                                <FaUser />
                            </div>
                    }

                    <button
                        type="button"
                        className="camera-btn"
                        onClick={() => fileInput.current.click()}
                    >
                        <FaCamera />
                    </button>

                    <input
                        ref={fileInput}
                        type="file"
                        name="image"
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                    />

                </div>

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

                    </div>

                    {/* Email */}

                    <div className="input-group">

                        <label>Email</label>

                        <div className="input-icon">

                            <FaEnvelope />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Phone */}

                    <div className="input-group">

                        <label>Phone</label>

                        <div className="input-icon">

                            <FaPhoneAlt />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Branch */}

                    <div className="input-group">

                        <label>Branch</label>

                        <div className="input-icon">

                            <FaGraduationCap />

                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                            >

                                <option value="">Select Branch</option>

                                <option>CSE</option>

                                <option>ECE</option>

                                <option>IT</option>

                                <option>AIML</option>

                                <option>AI & DS</option>

                            </select>

                        </div>

                    </div>

                    {/* Semester */}

                    <div className="input-group">

                        <label>Semester</label>

                        <div className="input-icon">

                            <FaBook />

                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                            >

                                <option value="">Semester</option>

                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>

                            </select>

                        </div>

                    </div>
                    {/* Date of Birth */}

                    <div className="input-group">

                        <label>Date of Birth</label>

                        <div className="input-icon">

                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Gender */}

                    <div className="input-group">

                        <label>Gender</label>

                        <div className="gender-group">

                            <label className="radio-box">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />

                                Male

                            </label>

                            <label className="radio-box">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />

                                Female

                            </label>

                            <label className="radio-box">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={formData.gender === "Other"}
                                    onChange={handleChange}
                                />

                                Other

                            </label>

                        </div>

                    </div>

                </div>

                {/* Bio */}

                <div className="bio-group">

                    <label>About Yourself</label>

                    <textarea
                        name="bio"
                        rows="5"
                        placeholder="Write something about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                        maxLength={2500}
                    />

                    <small className="counter">
                        {formData.bio.length}/2500 Characters
                    </small>

                </div>

                {/* Buttons */}

                <div className="button-group">

                    <button
                        className="save-btn"
                        type="submit"
                    >
                        Save Profile
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
        </div>

    );

}

export default ProfileForm;