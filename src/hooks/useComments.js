import { useContext } from "react";
import { UserContext } from "../contexts/user.context";


export function useComments () {

    const API_URL = import.meta.env.VITE_API_URL;

    const {token, setError} = useContext(UserContext);

    // Función para obtener los comentarios de un post
    const getComments = async (uuid) => {
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/comentarios`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if(!response.ok) {
                const errorResponse = data.message;
                console.error(`Error cargando los POSTS: ${errorResponse}`);
                setError(`Error cargando los POSTS: ${errorResponse}`);

                return;
            }

            return data;

        } catch (err) {
            console.error(`Error en la petición al servidor: ${err.message}`);
            setError(`Error en la petición al servidor: ${err.message}`);
        }
    }


    // Función para guardar comentario de un POST
    const createComment = async (uuid, contenido) => {
        try {
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/comentarios`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({contenido})
            });

            const data = await response.json();

            if(!response.ok) {
                const errorResponse = data.message;
                console.error(`Error creando el comentario: ${errorResponse}`);
                setError(`Error creando el comentario: ${errorResponse}`);

                return;
            }

            console.log("Comentario creado correctamente");
            return data;

        } catch (err) {
            console.error(`Error en la petición al servidor: ${err.message}`);
            setError(`Error en la petición al servidor: ${err.message}`);
        }
    }

    return { getComments, createComment };
}