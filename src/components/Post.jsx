import '../indexZara.css';
//import { usePosts } from '../hooks/usePosts';
import { useState } from 'react';
import { useLanguage } from '../languages/Languages';
import Button from './Button';


export default function Post({ post, updated, deleted, del, update, publicaciones, like, getComments, createComment }) {
    
    //const {del, update, publicaciones} = usePosts();
    const { t } = useLanguage();
    const [editPost, setEditPost] = useState(false);
    const [editPostContent, setEditPostContent] = useState(post.contenido);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [contenido, setContenido] = useState("");


    // Guardar editar POST
    const handleSave = async () => {
        const response = await update(post.id, editPostContent);

        if (!response?.error) {
            updated();
            setEditPost(false);
        }
    }


    // Recibir like del Backend
    const handleLike = async () => {
        const response = await like(post.id);

        if (!response?.error) {
            setLiked(true);
            updated();
        }
        else {
            console.log("No se puede dar a like: ", response.message);
        }
    }


    // Lógica para comentarios
    const handleComment = (id) => {
        setShowComments(!showComments);
    };

    /*const showCommentsMenu = async () => { // Abrir menú y cargar comentarios
        setShowComments(!showComments);

        if (!showComments) {
            const response = await getComments(post.id);

            if (!response?.error) {
                setCommentList(response);
            }
        }
    };*/

    const showCommentsMenu = () => {
        setShowComments((prev) => {
            const next = !prev;

            if (next) {
                getComments(post.id).then((response) => {
                    if (!response?.error) {
                        setCommentList(response);
                    }
                });
            }
            return next;
        });
    };


    const handleComments = async (e) => { // Hacer comentario y guardar
        e.preventDefault();

        const response = await createComment(post.id, contenido);

        if (!response?.error) {
            setContenido("");
            setShowComments(false);

            const updateListComments = await getComments(post.id);
            setCommentList(updateListComments);
            updated();
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

                {showComments && (
                    <div className="comment-section">
                        <form onSubmit={handleComments}>

                            <textarea placeholder={t('type_message')}
                                rows={2}
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}>
                            </textarea>

                            <button type="submit">{t('comment')}</button>
                        </form>

                        <div className='comments-list'>
                            {commentList.length === 0 ? (
                                <p>No hay comentarios</p>
                            ) : (
                                commentList.map((comment) => (
                                    <div key={comment.uuid} className="comment">
                                        <p>
                                            <strong>{comment.user?.nickname}</strong>:
                                        </p>
                                        <p>{comment.contenido}</p>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                )}

                <div className="post-actions">
                    {/* Botón like */}
                    <button className='like-btn' onClick={handleLike} title={t('like')}>
                        ❤️ {post.likes_count || 0}
                    </button>

                    {/* Botón comentarios */}
                    <button className="comment-btn" onClick={showCommentsMenu} title={t('comment')}>                    
                        💬 {post.comentarios_count || 0}
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