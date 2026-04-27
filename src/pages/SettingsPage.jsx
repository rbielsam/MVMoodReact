import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages//Languages';
import '../indexZara.css';


export default function SettingsPage() {
    const [profilePic, setProfilePic] = useState('/images/user.png');
    const [username, setUsername] = useState('User');
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const { t } = useLanguage();

    const handleProfilePicChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePic(url);
        }
    };

    const handleUsernameChange = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newUsername = formData.get('username');
        if (newUsername.trim()) {
            setUsername(newUsername.trim());
            setIsEditingUsername(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="main">
                    <h2>{t('settings')}</h2>

                    <div className="settings-section profile-section">
                        <h3>{t('profile_edit')}</h3>
                        <div className="profile-card">
                            <div className="profile-picture-section">
                                <div className="profile-picture-container">
                                    <img src={profilePic} alt="Profile" className="profile-picture" />
                                    <div className="profile-picture-overlay">
                                        <label htmlFor="profile-pic-input" className="change-photo-btn">
                                            <span>📷</span>
                                        </label>
                                        <input 
                                            id="profile-pic-input"
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleProfilePicChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-details">
                                <div className="username-section">
                                    <label className="section-label">Username</label>
                                    {!isEditingUsername ? (
                                        <div className="username-display">
                                            <span className="username-text">{username}</span>
                                            <button onClick={() => setIsEditingUsername(true)} className="edit-username-btn">
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleUsernameChange} className="username-edit-form">
                                            <input 
                                                type="text" 
                                                name="username" 
                                                defaultValue={username} 
                                                maxLength={20}
                                                required
                                                className="username-input"
                                                placeholder="Enter username"
                                            />
                                            <div className="form-actions">
                                                <button type="submit" className="save-btn">Save</button>
                                                <button type="button" onClick={() => setIsEditingUsername(false)} className="cancel-btn">Cancel</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <button className="settings-button">{t('change_password')}</button>
                        <button className="settings-button">{t('terms_conditions')}</button>
                        <button className="settings-button">{t('help_support')}</button>
                        <button className="settings-button">{t('about')}</button>
                        <button className="settings-button delete">{t('delete_account')}</button>
                    </div>
                </div>
            </div>
        </>
    );
}