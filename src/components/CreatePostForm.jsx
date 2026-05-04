import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import { useState, useContext } from 'react';
import {UserContext} from "../contexts/user.context";
import Button from '../components/Button';
import { usePosts } from '../hooks/usePosts';


export default function CreatePostForm({ onCreated }) {

    const [contenido, setContenido] = useState("");
    const { t } = useLanguage();

    const {error, setError, token} = useContext(UserContext);
    const {create} = usePosts();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creando publicación...");

        const response = await create(contenido);

        if (response?.error) {
            return;
        }
        
        setContenido("");
        onCreated();

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
                <h2>{t('create')}</h2>

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