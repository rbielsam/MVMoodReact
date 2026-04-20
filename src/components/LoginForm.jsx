import "../index.css";
import Button from "./Button";
import { useState } from "react";

export default function LoginForm (props) {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que se recargue toda la página al enviar el formulario

        console.log("Haciendo log in...");

        // Llamada a la API de Laravel (BackEnd)
        try {
            await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });
            
        } catch (err) {
            console.error("Error en la petición al servidor: ", err);
            props.sendError("Error al conectar con el servidor para enviar los datos de acceso: ", err);
            setUser({
                email: "",
                password: ""
            });
        }
    }

    const handleUserEmail = (e) => {
        setUser({...user, email: e.target.value}); // Recoge los datos que haya mas el nuevo
        props.deleteErrorMsg("");
    }

    const handleUserPassword = (e) => {
        setUser({...user, password: e.target.value});
        props.deleteErrorMsg("");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="pLogin">Log in to MVMood</p>
                <input type="email" name="email" placeholder="email" className="imputs" value={user.email} onChange={handleUserEmail} required />
                <br/>
                <input type="password" name="password" placeholder="password" className="imputs" value={user.password} onChange={handleUserPassword} required  />
                <br/><br/>
                <Button>log in</Button>
                <br/>
            </form>
        </>
    );
}