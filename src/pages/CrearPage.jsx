//import Header from './Header';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';


export default function CrearPage({ data }) {
    const { t } = useLanguage();
    return (
        <>
            <Header>
            </Header>

            <div className="container">
                <Sidebar />

                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

                    <div className="create-post">
                        <h2>{t('create')}</h2>

                        <form method="post" action="/crear">
                            <textarea
                                name="content"
                                placeholder="What's on your mind? Share your thoughts, feelings, or updates..."
                                required
                            />
                            <button type="submit">{t('send')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}