import { createContext, useState } from "react";


const UserContext = createContext();


function UserProviderWrapper(props) {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [error, setError] = useState("");


    // Función asíncrona para el Login
    const login = async (user) => {
        
        // Llamada a la API de Laravel (BackEnd)
        try {
            await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
                /*body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })*/
            });
            
        } catch (err) {
            console.error("Error en la petición login al servidor: ", err.message);
            setError(err);

            setUser({
                email: "",
                password: "",
                username: ""
            });
        }

    }

    // Función asíncrona para el Sign Up
    const signUp = async (user) => {

        //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            await fetch("http://localhost:8000/api/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)/*{
                    username: user.username,
                    email: user.email,
                    user: user.password,
                    repeatPassword: user.repeatPassword
                })*/                    
            });

            window.location.replace("/");
            //<Navigate to={"/"} replace />
        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
            //props.sendError("Error al conectar con el servidor para enviar los datos de registro: ", err);


            setUser({
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }

    }

    // Función asíncrona para restablecer la constraseña
    const resetPassword = async (user) => {
        // Llamada al Backend
        try {
            await fetch("http://localhost:8000/api/resetpassword", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify(user)
            });

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);

            setUser({
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }
    }
    
    return (
        <UserContext.Provider value={{ user, setUser, login, error, setError, signUp, resetPassword }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProviderWrapper}