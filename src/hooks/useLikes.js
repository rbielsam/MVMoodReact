import { use, useContext } from "react";
import { UserContext } from "../contexts/user.context";


export function useLikes () {

    const API_URL = import.meta.env.VITE_API_URL;
    
    const {token, setError} = useContext(UserContext);

    const like = async (uuid)  => {
        try{
            const response = await fetch(`${API_URL}/api/publicaciones/${uuid}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error(`Error al procesar el LIKE: ${errorResponse}`);
                setError(`Error al procesar el LIKE: ${errorResponse}`);

                return;
            }

            console.log("LIKE procesado correctamente");
            return data;

        } catch (err) {
            console.error(`Error en la petición al servidor: ${err.message}`);
            setError(`Error en la petición al servidor: ${err.message}`);
        }

    };

    return { like };
}