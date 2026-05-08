import HeaderLogged from '../components/HeaderLogged';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import Footer from '../components/Footer';


export default function NotificationsPage({ data }) {
    const { t } = useLanguage();

    return (
        <>
            <HeaderLogged />

            <div className="container">
                <Sidebar />

                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

                    <h2>{t('notifications')}</h2>

                    {!data?.notificaciones || data.notificaciones.length === 0 ? (
                        <div className="post">
                            <p>{t('no_notifications')}</p>
                        </div>
                    ) : (
                        data.notificaciones.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification ${notification.unread ? 'unread' : ''}`}
                            >
                                <h4>{notification.title}</h4>
                                <p>{notification.body}</p>
                                <div className="notification-time">{notification.tiempo}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}