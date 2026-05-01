import { useContext, useEffect, useState } from 'react';
//import Header from './Header';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import HeaderZara from "../components/HeaderZara";
import "../indexZara.css";
import { usePosts } from '../hooks/usePosts';
import { UserContext } from '../contexts/user.context';
import Footer from "../components/Footer";


export default function HomePage() {

    const {token, error, setError} = useContext(UserContext);
    const [publicaciones, setPublicaciones] = useState();
    const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const { t } = useLanguage();
    const {del} = usePosts();

    const toggleLike = (id) => {
        setLikedPosts((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    const toggleComments = (id) => {
        setShowComments((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const getPosts = async () => {
        try {
            console.log("Token que se envia: ", token);

            const response = await fetch("http://localhost:8000/api/home", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                },
                //body: JSON.stringify({contenido})           
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error("No se pueden cargar las peticiones");
            }

            setPublicaciones(result);

        } catch (err) {
            console.log("Error al conectar con el servidor", err);
            setError(err.message);
        }
    };

    return (
        <>
            <HeaderZara>
                </HeaderZara>

                <div className="container">
                    <Sidebar />

                    <div className="main">
                        {publicaciones?.mensaje && <p className="ok">{publicaciones.mensaje}</p>}
                        {publicaciones?.error && <p className="error">{publicaciones.error}</p>} 

                        {!publicaciones?.data || publicaciones.data.length === 0 ? (
                            <div className="post">
                                <p>{t('no_posts')}</p>
                            </div>
                        ) : (
                            publicaciones.data.map((p) => (
                                <div className="post" key={p.id}>

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
                                            ❤️ {p.likes_count || 0}
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
                                                {(publicaciones?.session?.rol === 'admin' || p.idUsuario === publicaciones?.session?.id) && (
                                                    <button
                                                        className="danger"
                                                        onClick={() => {
                                                            if (confirm('¿Seguro que quieres eliminar esta publicación?')) {
                                                                del(p.id);
                                                                //window.location.href = '/eliminar/' + p.id;
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
            <Footer />
        </>
    );
}