//import Header from './Header';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import { useContext, useState } from 'react';
import {UserContext} from "../contexts/user.context";
import Button from '../components/Button';
import styles from "../styles/Button.module.css";


export default function CrearPage({ data }) {
    const { t } = useLanguage();

    const [contenido, setContenido] = useState("");
    const {error, setError, token} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Publicación envianda...");
        create();
    };

    const handleContenido = (e) => {
        setContenido(e.target.value);
    };

    const create = async () => {


       //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            const response = await fetch("http://localhost:8000/api/create", {
                
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(contenido)           
            });

            const data = await response.json();
            console.log("Publicación creada: ",  data);
            setMessage("Publicación creada: ",  data);

            if (!response.ok) {
                const errorResponse = data.messsage;
                console.error("Error en el registro: ", errorResponse.message);
                setError("Error en el registro: ", errorResponse.message);
            }

            else {
                window.location.replace("/home");
                //<Navigate to={"/"} replace />
            }

        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);

        }

    }

    return (
        <>
            <HeaderZara>
            </HeaderZara>

            <div className="container">
                <Sidebar />

                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

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
                            <Button className={styles.button}>{t('send')}</Button>
                            {/*<button>{t('send')}</button>*/}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}