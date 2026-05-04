import '../indexZara.css';
import { usePosts } from '../hooks/usePosts';
import { useState } from 'react';
import { useLanguage } from '../languages/Languages';
import Button from './Button';


export default function Post({ post, updated, deleted }) {
    
    const {del, update, publicaciones} = usePosts();

    const [likedPosts, setLikedPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const { t } = useLanguage();
    const [editPost, setEditPost] = useState(false);
    const [editPostContent, setEditPostContent] = useState(post.contenido);


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

    const handleComments = (e) => {
        e.preventDefault();
    }






    const handleSave = async () => {
        const response = await update(post.id, editPostContent);

        if (!response?.error) {
            updated();
            setEditPost(false);
        }
    }


    return (
        <>
            <div className="post">
                {editPost ? (
                    <div className='post-content'>
                        <textarea
                            value={editPostContent}
                            onChange={(e) => setEditPostContent(e.target.value)}
                        />
                    </div>

                ) : (
                    <div className="post-content">{post.contenido}</div>
                )}

                {editPost && (
                    <>
                        <Button onClick={handleSave}>
                            {t('save')}
                        </Button>
                        <Button onClick={() => setEditPost(false)}>
                            {t('cancel')}
                        </Button>
                    </>
                )}

                {showComments.includes(post.id) && (
                    <div className="comment-section">
                        <form onSubmit={handleComemnts}>
                            <textarea placeholder={t('type_message')} rows={2}></textarea>
                            <button type="submit">{t('comment')}</button>
                        </form>
                    </div>
                )}

                <div className="post-actions">
                    <button
                        className={`like-btn ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                        onClick={() => toggleLike(post.id)}
                        title={t('like')}
                    >
                        ❤️ {post.likes_count || 0}
                    </button>
                    <button
                        className="comment-btn"
                        onClick={() => toggleComments(post.id)}
                        title={t('comment')}
                    >
                        💬 {post.comments || 0}
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

                        {/* Menú opciones POSTS */}
                        <div className="menu-options">
                            {(publicaciones?.session?.rol === 'admin' || post.idUsuario === publicaciones?.session?.id) && (
                                
                                // Botón eliminar POST
                                <button
                                    className="danger"
                                    onClick={() => {
                                        if (confirm('¿Seguro que quieres eliminar esta publicación?')) {
                                            del(post.id);
                                            deleted();
                                        }
                                    }}
                                >
                                    {t('delete')}
                                </button>
                            )}
            
                            {/* Botón editar POST */}

                            <Button onClick={() => {setEditPost(true); setEditPostContent(post.contenido)}}>
                                {t('edit')}
                            </Button>
                        
                            {/* Botón reportar POST */}
                            <button>Reportar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}