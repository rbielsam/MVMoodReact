import '../indexZara.css';
//import { usePosts } from '../hooks/usePosts';
import { useState, useContext } from 'react';
//import { useLanguage } from '../languages/Languages';
import Button from './Button';
import { LanguageContext } from '../contexts/language.context';


export default function Post({ post, updated, deleted, del, update, publicaciones, like, getComments, createComment }) {
    
    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.content.Post;

    const [editPost, setEditPost] = useState(false);
    const [editPostContent, setEditPostContent] = useState(post.contenido);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [contenido, setContenido] = useState("");
    const [newImagen, setNewImagen] = useState(null);

    //const {del, update, publicaciones} = usePosts();
    //const { t } = useLanguage();


    // Guardar editar POST
    const handleSave = async () => {

        const formData = new FormData();
        formData.append("contenido", editPostContent);

        if (newImagen) {
            formData.append("imagen", newImagen);
        }

        const response = await update(post.id, formData);
        //const response = await update(post.id, editPostContent);

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
            {editPost ? (
                <div className='post-content'>
                    <img src={`http://localhost:8000/storage/${post.imagen}`} />
                    <textarea
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                    />
                    <input type="file" name="imagen" onChange={(e) => setNewImagen(e.target.files[0])} />
                </div>

            ) : (
                <div className="post-content">
                    <p>{post.contenido}</p>

                    {post.imagen && (
                        <img src={`http://localhost:8000/storage/${post.imagen}`} />
                    )}
                </div>

            )}

            {editPost && (
                <>
                    <Button onClick={handleSave}>
                        {language.save}
                    </Button>
                    <Button onClick={() => setEditPost(false)}>
                        {language.language}
                    </Button>
                </>
            )}

            {showComments && (
                <div className="comment-section">
                    <form onSubmit={handleComments}>

                        <textarea placeholder={language.type_message}
                            rows={2}
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}>
                        </textarea>

                        <button type="submit">{language.comment}</button>
                    </form>

                    <div className='comment-list'>
                        {commentList.length === 0 ? (
                            <p>{language.no_comments_yet}</p>
                        ) : (
                            commentList.map((comment) => (
                                <div key={comment.uuid} className="comment-item">
                                    <p>
                                        <strong>{comment.user?.nickname}</strong>
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
                <button className='like-btn' onClick={handleLike} title={language.like}>
                    ❤️ {post.likes_count || 0}
                </button>

                {/* Botón comentarios */}
                <button className="comment-btn" onClick={showCommentsMenu} title={language.comment}>                    
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
                                    if (confirm("{language.sure_delete_post}")) {
                                        del(post.id);
                                        deleted();
                                    }
                                }}
                            >
                                {language.delete}
                            </button>
                        )}
        
                        {/* Botón editar POST */}

                        <Button onClick={() => {setEditPost(true); setEditPostContent(post.contenido)}}>
                            {language.edit}
                        </Button>
                    
                        {/* Botón reportar POST */}
                        <button>{language.report}</button>
                    </div>
                </div>
            </div>
        </>
    );
}