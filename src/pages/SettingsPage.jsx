import { useState } from 'react';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages//Languages';
import '../indexZara.css';


export default function SettingsPage() {
    const [profilePic, setProfilePic] = useState('/images/user.png');
    const [nickname, setNickname] = useState('User');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const { t } = useLanguage();

    const handleProfilePicChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePic(url);
        }
    };

    const handleNicknameChange = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newNickname = formData.get('nickname');
        if (newNickname.trim()) {
            setNickname(newNickname.trim());
            setIsEditingNickname(false);
        }
    };

    return (
        <>
            <HeaderZara />
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
                                <div className="nickname-section">
                                    <label className="section-label"><nickname></nickname></label>
                                    {!isEditingNickname ? (
                                        <div className="nickname-display">
                                            <span className="nickname-text">{nickname}</span>
                                            <button onClick={() => setIsEditingNickname(true)} className="edit-nickname-btn">
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleNicknameChange} className="nickname-edit-form">
                                            <input 
                                                type="text" 
                                                name="nickname" 
                                                defaultValue={nickname} 
                                                maxLength={20}
                                                required
                                                className="nick-input"
                                                placeholder="Enter nickname"
                                            />
                                            <div className="form-actions">
                                                <button type="submit" className="save-btn">Save</button>
                                                <button type="button" onClick={() => setIsEditingNickname(false)} className="cancel-btn">Cancel</button>
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