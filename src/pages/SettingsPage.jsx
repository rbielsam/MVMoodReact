import { useState } from 'react';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages//Languages';
import '../indexZara.css';
import Footer from '../components/Footer';
import TermConditions from '../components/TermConditions';

export default function SettingsPage() {
    const [profilePic, setProfilePic] = useState('/images/user.png');
    const [nickname, setNickname] = useState('User');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const handlePasswordInput = (event) => {
        const { name, value } = event.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        if (!passwords.current || !passwords.next || !passwords.confirm) {
            setPasswordError(t('fill_all_fields'));
            setPasswordMessage('');
            return;
        }

        if (passwords.next !== passwords.confirm) {
            setPasswordError(t('password_mismatch'));
            setPasswordMessage('');
            return;
        }

        if (passwords.next.length < 6) {
            setPasswordError(t('password_too_short'));
            setPasswordMessage('');
            return;
        }

        setPasswordError('');
        setPasswordMessage(t('password_updated'));
        setPasswords({ current: '', next: '', confirm: '' });
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
                                    <div className="section-label">{t('nickname')}</div>
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
                        <button className="settings-button" onClick={() => setShowPasswordForm((prev) => !prev)}>
                            {t('change_password')}
                        </button>
                        <button className="settings-button" onClick={() => setShowTerms(true)}>{t('terms_conditions')}</button>
                        <button className="settings-button" onClick={() => setShowHelp(true)}>{t('help_support')}</button>
                        <button className="settings-button delete">{t('delete_account')}</button>
                    </div>

                    {showPasswordForm && (
                        <div className="modal-overlay" onClick={() => setShowPasswordForm(false)}>
                            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('change_password')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowPasswordForm(false)}>
                                        ×
                                    </button>
                                </div>
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="current">{t('current_password')}</label>
                                        <input
                                            id="current"
                                            name="current"
                                            type="password"
                                            value={passwords.current}
                                            onChange={handlePasswordInput}
                                            placeholder={t('current_password')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="next">{t('new_password')}</label>
                                        <input
                                            id="next"
                                            name="next"
                                            type="password"
                                            value={passwords.next}
                                            onChange={handlePasswordInput}
                                            placeholder={t('new_password')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm">{t('retype_password')}</label>
                                        <input
                                            id="confirm"
                                            name="confirm"
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={handlePasswordInput}
                                            placeholder={t('retype_password')}
                                        />
                                    </div>
                                    {passwordError && <p className="error">{passwordError}</p>}
                                    {passwordMessage && <p className="message">{passwordMessage}</p>}
                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">{t('confirm_password')}</button>
                                        <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showHelp && (
                        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('help_support')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowHelp(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="help-content">
                                    <h4>Ayuda y soporte de MVMood</h4>
                                    <p>Estamos aquí para resolver tus dudas, ayudarte con tu cuenta y acompañarte en el uso diario de la plataforma.</p>
                                    <ul>
                                        <li><strong>¿Problemas para iniciar sesión?</strong> Comprueba tu correo institucional y contraseña.</li>
                                        <li><strong>Cambio de contraseña:</strong> Usa el botón “Cambiar contraseña” para renovar tu acceso de forma segura.</li>
                                        <li><strong>Publicaciones y mensajes:</strong> Mantén siempre el respeto y evita compartir datos personales.</li>
                                    </ul>
                                    <p>Si necesitas ayuda personalizada, contacta con:</p>
                                    <p><strong>Email:</strong> welcomemvmood@gmail.com</p>
                                    <p>También puedes enviar tus preguntas desde dentro de la plataforma y te responderemos lo antes posible.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {showTerms && (
                        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('terms_conditions')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowTerms(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="terms-content">
                                    <TermConditions></TermConditions>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}