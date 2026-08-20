import ProfilePreview from "./ProfilePreview";
import './profileform.css'
function Profile({ formData }) {
    return (
        <div className="profile-content">
            <ProfilePreview formData={formData} />
        </div>
    );
}

export default Profile;