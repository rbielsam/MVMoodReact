import { useLanguage } from '../languages/Languages';
import "../indexZara.css";


export default function Sidebar() {
    const { t } = useLanguage();

    const logOut = () => {
        localStorage.removeItem("token");
    };

    return (
        <div className="sidebar">
            <a href="/home">{t('home')}</a>
            <a href="/notifications">{t('notifications')}</a>
            <a href="/chat">{t('chat')}</a>
            <a href="/messages">{t('messages')}</a>
            <a href="/settings">{t('settings')}</a>

            <div className="logout">
                <a onClick={logOut} href="/">{t('logout')}</a>
            </div>
        </div>
    );
}