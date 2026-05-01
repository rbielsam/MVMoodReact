//import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import CrearPage from "../pages/CrearPage";


export function usePosts() {

    const {token, error, setError, message, setMessage} = useContext(UserContext);
    const redirectPath = "/home";
    
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
                setContenido(data.message);
                window.location.replace("/home");
                //return <Navigate to={redirectPath} replace />
            }

        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);

        }

    };

    return {create};
}