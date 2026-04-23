import { createContext, useState } from "react";


const UserContext = createContext();


function UserProviderWrapper(props) {

    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // Función asíncrona para el Login
    const login = async (user) => {
        
        // Llamada a la API de Laravel (BackEnd)
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
                /*body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })*/
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error("Error en el login: ", errorResponse.message);
                console.error("Error en el login: ", errorResponse.message);
                setError("Error en el login: ", errorResponse.message);
            }

            const data = await response.json();
            console.log("Login correcto: ", data); //Recibe el objeto con sus atributos
            setMessage("Login correcto: ", data);

            localStorage.setItem("token", data.token);

            window.location.replace("/home");
            
        } catch (err) {
            console.error("Error en la petición login al servidor: ", err.message);
            setError(err);

            setUser({
                email: "",
                password: "",
                repeatPassword: "",
                username: ""
            });
        }

    }

    // Función asíncrona para el Sign Up
    const signUp = async (user) => {

        //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            const response = await fetch("http://localhost:8000/api/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)/*{
                    username: user.username,
                    email: user.email,
                    user: user.password,
                    repeatPassword: user.repeatPassword
                })*/                    
            });

            if (!response.ok) {
                const errorResponse = response.json();
                throw new Error("Error en el registro: ", errorResponse.message);
                console.error("Error en el registro: ", errorResponse.message);
                setError("Error en el registro: ", errorResponse.message);
            }

            const data = await response.json();
            console.log("Registro correcto: ",  data);
            setMessage("Registro correcto: ",  data);

            window.location.replace("/");
            //<Navigate to={"/"} replace />
        
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

    // Función asíncrona para restablecer la constraseña
    const resetPassword = async (user) => {
        // Llamada al Backend
        try {
            const response = await fetch("http://localhost:8000/api/resetpassword", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error("Error al actualizar la contraseña: ", errorResponse.message);
                setError("Error al actualizar la contraseña: ", errorResponse.message);
            }

            const data = response.json();
            console.log("Contraseña actualizada: ", data);
            setMessage("Contraseña actualizada: ", data);

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
        <UserContext.Provider value={{ user, setUser, login, error, setError, signUp, resetPassword, message }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProviderWrapper}