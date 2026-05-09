import { useEffect, useState } from "react";


export default function ChatUserList ({ currentUser, onSelectUser }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {    
        try {

            const response  = await fetch("http://127.0.0.1:8000/api/users", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                }
            });

            const data = await response.json();
            console.log(data);

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
            <li key={user.id} className="user-item" onClick={() => onSelectUser(user)}>
                {/*<img serc="" className="user-foto_perfil" />*/}
                <p>{user.nickname}</p>
            </li>
        ))
    }

    return (
        <>
            <div className="users-list">
                <h3>Users</h3>
                {listUsers()}
            </div>
        </>
    );

}