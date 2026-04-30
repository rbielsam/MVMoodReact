import { useState } from 'react';
//import Header from './Header';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import HeaderZara from "../components/HeaderZara";
import "../indexZara.css";


export default function HomePage({ data }) {

    /*const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);*/
    const { t } = useLanguage();

    /*const toggleLike = (id) => {
        setLikedPosts((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleComments = (id) => {
        setShowComments((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };*/

    return (
        <>
            <HeaderZara>
            </HeaderZara>

            <div className="container">
                <Sidebar />

                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

                    {!data?.publicaciones || data.publicaciones.length === 0 ? (
                        <div className="post">
                            <p>{t('no_posts')}</p>
                        </div>
                    ) : (
                        data.publicaciones.map((p) => (
                            <div className="post" key={p.id}>
                                <div className="post-header">
                                    <img src={p.usuario_foto ? `/images/${p.usuario_foto}` : '/images/user.png'} alt={p.nickname} className="avatar" />
                                    <div>
                                        <div className="post-author">{p.nickname}</div>
                                        <div className="post-meta">
                                            {new Date(p.fecha).toLocaleString('es-ES')}
                                        </div>
                                    </div>
                                </div>

                                <div className="post-content">{p.contenido}</div>

                                {showComments.includes(p.id) && (
                                    <div className="comment-section">
                                        <form>
                                            <textarea placeholder={t('type_message')} rows={2}></textarea>
                                            <button type="submit">{t('comment')}</button>
                                        </form>
                                    </div>
                                )}

                                <div className="post-actions">
                                    <button
                                        className={`like-btn ${likedPosts.includes(p.id) ? 'liked' : ''}`}
                                        onClick={() => toggleLike(p.id)}
                                        title={t('like')}
                                    >
                                        ❤️ {p.likes || 0}
                                    </button>
                                    <button
                                        className="comment-btn"
                                        onClick={() => toggleComments(p.id)}
                                        title={t('comment')}
                                    >
                                        💬 {p.comments || 0}
                                    </button>
                                    <div className="menu-container" style={{ position: 'relative' }}>
                                        <button
                                            className="menu-btn"
                                            title="More options"
                                            onClick={(event) => {
                                                const next = event.currentTarget.nextElementSibling;
                                                next?.classList.toggle('show');
                                            }}
                                        >
                                            ⋮
                                        </button>
                                        <div className="menu-options">
                                            {(data?.session?.rol === 'admin' || p.idUsuario === data?.session?.id) && (
                                                <button
                                                    className="danger"
                                                    onClick={() => {
                                                        if (confirm('¿Seguro que quieres eliminar esta publicación?')) {
                                                            window.location.href = '/eliminar/' + p.id;
                                                        }
                                                    }}
                                                >
                                                    {t('delete')}
                                                </button>
                                            )}
                                            <button>Reportar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}