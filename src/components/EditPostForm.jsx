import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import { useState, useContext } from 'react';
import {UserContext} from "../contexts/user.context";
import Button from '../components/Button';
import { usePosts } from '../hooks/usePosts';


export default function EditPostForm({ postId, initialContent, onCancel, onSuccess }) {

    const [contenido, setContenido] = useState(initialContent);
    const { t } = useLanguage();
    const {error, setError, token} = useContext(UserContext);
    const {update} = usePosts();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Editando publicación...");
        
        const response = await update(postId, contenido);

        if (!response?.error) {
            onSuccess();
        }
    };

    const handleContenido = (e) => {
        setContenido(e.target.value);
    };
/*
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}
*/

    return (
        <>
            <div className="create-post">
                <h2>{t('edit')}</h2>

                <form onSubmit={handleSubmit}>
                    <textarea
                        name="contenido"
                        placeholder="What's on your mind? Share your thoughts, feelings, or updates..."
                        value={contenido}
                        onChange={handleContenido}
                        required
                    />
                    <Button>{t('send')}</Button>
                    {/*<button>{t('send')}</button>*/}
                </form>
            </div>
        </>
    );
}