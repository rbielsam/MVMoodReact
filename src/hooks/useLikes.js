import { use, useContext } from "react";
import { UserContext } from "../contexts/user.context";


export function useLikes () {
    
    const {token, setError} = useContext(UserContext);

    const like = async (uuid)  => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/publicaciones/${uuid}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                const errorResponse = data.message;
                console.error("Error editando el POST: ", errorResponse);
                setError("Error editando el POST: ", errorResponse);
            }

            return data;

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }

    };

    return { like };
}