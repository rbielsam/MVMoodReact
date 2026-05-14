import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../contexts/language.context";


export default function ChatUserList ({ currentUser, onSelectUser }) {

    const API_URL = import.meta.env.VITE_API_URL;

    const {translations, lang, setLang} = useContext(LanguageContext);
    //const language = lang.content.ChatUserList;
    const language = lang.ChatUserList;
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {    
        try {

            const response  = await fetch(`${API_URL}/api/users`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();
            //console.log(data);

            setUsers(data);

            if (!response.ok) {
                const errorResponse = data.message;
                console.log(errorResponse);
                throw new Error("Error al recibir la lista de usuarios: ", errorResponse);
                console.error("Error al recibir la lista de usuarios: ", errorResponse);
                //setError("Error al recibir la lista de usuarios: ", errorResponse);
            }
        

        } catch (err) {
            console.error("Error al conectar con el servidor: ", err.message);
        }  
    }

    const listUsers = () => {
        return users.map(user => (
            <li key={user.id} className="user-item" onClick={() => {/*console.log("Usuario del chat seleccionado: ", user);*/ onSelectUser(user)}}>
                {/*<img serc="" className="user-foto_perfil" />*/}
                <p>{user.nickname}</p>
            </li>
        ))
    }

    return (
        <>
            <div className="users-list">
                <h3>{language.users}</h3>
                {listUsers()}
            </div>
        </>
    );

}