import { useContext } from "react";
import { UserContext } from "../contexts/user.context";


export function useComments () {

    const {token, setError} = useContext(UserContext);

    // Función para obtener los comentarios de un post
    const getComments = async (uuid) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${uuid}/comentarios`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if(!response.ok) {
                const errorResponse = data.message;
                console.error("Error editando el POST: ", errorResponse);
                setError("Error obteniendo los comentarios: ", errorResponse);
            }

            return data;

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }
    }


    // Función para guardar comentario de un POST
    const createComment = async (uuid, contenido) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${uuid}/comentarios`, {
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
                console.error("Error creando el comentario: ", errorResponse);
                setError("Error creando el comentario: ", errorResponse);
            }

            return data;

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }
    }

    return { getComments, createComment };
}