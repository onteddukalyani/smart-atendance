import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "./authcontext";
import "./settings.css";

function Settings() {
    const { user } = useAuth();
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("smartattend-theme");
        return savedTheme === "midnight" ? "midnight" : "light";
    });
    const [profileImageFailed, setProfileImageFailed] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("smartattend-theme", theme);
    }, [theme]);

    const displayName = user?.displayName || (user?.isAnonymous ? "Guest student" : "Profile not set");
    const provider = user?.isAnonymous ? "Guest access" : user?.providerData?.[0]?.providerId === "google.com" ? "Google" : "Authenticated account";

    return (
        <main className="settings-page">
            <header className="settings-header">
                <p className="settings-eyebrow">ACCOUNT & PREFERENCES</p>
                <h1>Settings</h1>
                <p>Manage your profile and choose how SmartAttend looks.</p>
            </header>

            <div className="settings-grid">
                <section className="settings-card">
                    <h2>Profile details</h2>
                    <p>Information provided by your signed-in account.</p>
                    <div className="profile-summary">
                        {user?.photoURL && !profileImageFailed ? (
                            <img className="profile-avatar" src={user.photoURL} alt="Profile" onError={() => setProfileImageFailed(true)} />
                        ) : (
                            <div className="profile-avatar-fallback" aria-hidden="true"><FaUserCircle /></div>
                        )}
                        <div>
                            <h3>{displayName}</h3>
                            <p>{user?.email || "No email available"}</p>
                        </div>
                    </div>
                    <dl className="profile-details">
                        <div className="profile-detail"><dt>Sign-in method</dt><dd>{provider}</dd></div>
                        <div className="profile-detail"><dt>Email verified</dt><dd>{user?.emailVerified ? "Yes" : "Not available"}</dd></div>
                        <div className="profile-detail"><dt>Account ID</dt><dd>{user?.uid}</dd></div>
                    </dl>
                </section>

                <section className="settings-card">
                    <h2>Appearance</h2>
                    <p>Choose a workspace theme for this device.</p>
                    <div className="theme-options" role="radiogroup" aria-label="Workspace theme">
                        <div className="theme-option">
                            <input id="theme-light" type="radio" name="theme" value="light" checked={theme === "light"} onChange={() => setTheme("light")} />
                            <label htmlFor="theme-light">Light workspace</label>
                        </div>
                        <div className="theme-option">
                            <input id="theme-midnight" type="radio" name="theme" value="midnight" checked={theme === "midnight"} onChange={() => setTheme("midnight")} />
                            <label htmlFor="theme-midnight">Midnight workspace</label>
                        </div>
                    </div>
                    <p className="theme-note">Your preference is saved on this device.</p>
                </section>
            </div>
        </main>
    );
}

export default Settings;