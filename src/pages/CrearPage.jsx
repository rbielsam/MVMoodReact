//import Header from './Header';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import { useContext, useState } from 'react';
import {UserContext} from "../contexts/user.context";


export default function CrearPage({ data }) {
    const { t } = useLanguage();

    const [publicacion, setPublicacion] = useState("");
    const {user, setUser, error, setError} = useContext(UserContext);

    const create = async (e, publicacion) => {

        setPublicacion(e.target.value);
       //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            const response = await fetch("http://localhost:8000/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(publicacion)           
            });

            const data = await response.json();
            console.log("Publicación creada: ",  data);
            setMessage("Publicación creada: ",  data);

            if (!response.ok) {
                const errorResponse = data.messsage;
                throw new Error("Error en el registro: ", errorResponse.message);
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

                        <form onSubmit={create}>
                            <textarea
                                name="contenido"
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