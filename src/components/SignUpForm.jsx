import '../index.css';
import { useState } from 'react';
//import axios from "axios";
import Button from '../components/Button';
//import { Navigate } from 'react-router-dom';


export default function SignUpForm (props) {

    const [user, setUser] = useState(
        {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    );

    const handleUserProps = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        props.deleteErrorMsg("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario de registro enviado");

        //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            await fetch("http://localhost:8000/api/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    user: user.password,
                    repeatPassword: user.repeatPassword
                })  
                
            });

            window.location.replace("/");
            //<Navigate to={"/"} replace />
        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err);
            props.sendError("Error al conectar con el servidor para enviar los datos de registro: ", err);


            setUser({
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }
        
    } 

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className="pLogin">Sign up to MVMood</p>
                <input type="text" name="username" placeholder="username" className="imputs" value={user.username} onChange={handleUserProps} />
                <input type="email" name="email" placeholder="email" className="imputs" value={user.email} onChange={handleUserProps} required />
                <br/>
                <input type="password" name="password" placeholder="password" className="imputs" value={user.password} onChange={handleUserProps} required  />
                <br/>
                <input type="password" name="repeatPassword" placeholder="repeat password" className="imputs" value={user.repeatPassword} onChange={handleUserProps} required  />
                <br/><br/>
                <Button>sign in</Button>
                <br/>
            </form>
        </>
    );
}