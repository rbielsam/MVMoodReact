import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import HeaderZara from "../components/HeaderZara";
import "../indexZara.css";
import { usePosts } from '../hooks/usePosts';
import { UserContext } from '../contexts/user.context';
import Footer from "../components/Footer";
import CreatePostForm from '../components/CreatePostForm';
import Button from '../components/Button';
import EditPostForm from '../components/EditPostForm';


export default function HomePage() {

    //const {error, setError} = useContext(UserContext);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [editPostContent, setEditPostContent] = useState("");

    const { t } = useLanguage();
    const {getPosts, del, publicaciones} = usePosts();


    const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);

    const toggleLike = (id) => {
        setLikedPosts((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleComments = (id) => {
        setShowComments((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    useEffect(() => {
        getPosts();
    }, []);


    return (
        <>
            <HeaderZara />

            <div className="container">
                <Sidebar />

                <div className="main">
                    {publicaciones?.mensaje && <p className="ok">{publicaciones.mensaje}</p>}
                    {publicaciones?.error && <p className="error">{publicaciones.error}</p>} 

                    <Button onClick={() => setShowCreatePost(!showCreatePost)}>
                        {showCreatePost ? "Close" : "Create Post"}
                    </Button>

                    {showCreatePost && (<CreatePostForm />)}

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
                            

                                            <button onClick={() => {
                                                setEditPostId(p.id);
                                                setEditPostContent(p.contenido);
                                            }}>{t('edit')}</button>

                                            {editPostId === p.id && (
                                                <EditPostForm
                                                    postId={editPostId}
                                                    initialContent={editPostContent}
                                                    onCancel={() => setEditPostId(null)}
                                                    onSuccess={() => {getPosts(); setEditPostId(null);}}
                                                />
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