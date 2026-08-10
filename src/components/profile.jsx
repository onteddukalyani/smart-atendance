import ProfilePreview from "./ProfilePreview";

function Profile({ formData }) {
    return (
        <div className="content">
            <ProfilePreview formData={formData} />
        </div>
    );
}

export default Profile;