//import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import CrearPage from "../pages/CrearPage";


export function usePosts() {

    const {token, error, setError, message, setMessage} = useContext(UserContext);
    const redirectPath = "/home";
    
    // Función para crear POSTS
    const create = async (contenido) => {

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
                body: JSON.stringify({contenido})           
            });

            const data = await response.json();
            console.log("Publicación creada: ",  data);
            //setMessage("Publicación creada: ",  data);

            if (!response.ok) {
                const errorResponse = data.messsage;
                console.error("Error en la creación del POST: ", errorResponse);
                setError("Error en la creación del POST: ", errorResponse);
            }

            else {
                window.location.replace("/home");
                //return <Navigate to={redirectPath} replace />
            }

        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);

        }

    };


    // Función para eliminar POSTS
    const del = async (id) => {

        // Llamada al BackEnd (Laravel)
        try {
            const response = await fetch(`http://localhost:8000/api/publicaciones/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            const data = await response.json();
            console.log("Estado de la publicación: ", data);

            if (!response.ok) {
                const errorResponse = data.message;
                console.error("Error eliminando el POST: ", errorResponse);
                setError("Error eliminando el POST: ", errorResponse);
            }

            else {
                window.location.replace("/home"); // MEJORAR ESTA LÍNEA ! ! !
            }

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }

    };


    // Función para editar POSTS
    const update = async (id) => {

        // Llamada al BackEnd (Laravel)
        try {
            const response = await fetch(`http://localhost:8000/api/publicaciones/${id}`, {
                method: "PUT",
                headers: {
                    "Äuthorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            const data = await response.json();
            console.log("Estado de la publicación: ", data);

            if (!response.ok) {
                const errorResponse = data.message;
                console.error("Error editando el POST: ", errorResponse);
                setError("Error editando el POST: ", errorResponse);
            }

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }
    };


    return {create, del};
}