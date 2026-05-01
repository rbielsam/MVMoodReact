import { createContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";


const UserContext = createContext();
//const navigate = useNavigate();


function UserProviderWrapper(props) {

    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        nickname: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    
    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedToken !== "undefined") {
            setToken(savedToken);
            //window.location.replace("/home");
        }
    }, [token]);


    // Función asíncrona para el Login
    const login = async (user) => {
        
        // Llamada a la API de Laravel (BackEnd)
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user)
                /*body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })*/
            });

            const data = await response.json();
            console.log("Login correcto: ", data); //Recibe el objeto con sus atributos
            setMessage("Login correcto: ", data);

            if (!response.ok) {
                const errorResponse = data.message;
                console.log(errorResponse);
                throw new Error("Error en el login: ", errorResponse);
                console.error("Error en el login: ", errorResponse);
                setError("Error en el login: ", errorResponse);

            } else {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                window.location.replace("/home");
            }
            
        } catch (err) {
            //console.error("Error en la petición login al servidor: ", err.message);
            //setError(err);

            setUser({
                email: "",
                password: "",
                repeatPassword: "",
                nickname: ""
            });
        }

    }
    

    // Función asíncrona para el Sign Up
    const signUp = async (user) => {

        //const response = await axios.post("http://localhost:8000/api/signup", {user});
        // Llamada al Back End (Laravel)
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(user)/*{
                    nickname: user.nickname,
                    email: user.email,
                    user: user.password,
                    repeatPassword: user.repeatPassword
                })*/                    
            });

            const data = await response.json();
            console.log("Registro correcto: ",  data);
            setMessage("Registro correcto: ",  data);

            if (!response.ok) {
                const errorResponse = data.messsage;
                throw new Error("Error en el registro: ", errorResponse.message);
                console.error("Error en el registro: ", errorResponse.message);
                setError("Error en el registro: ", errorResponse.message);
            }

            else {
                window.location.replace("/");
                //<Navigate to={"/"} replace />
                //navigate("/");
            }

        
        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);

            setUser({
                nickname: "",
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
                nickname: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }
    }
    
    return (
        <UserContext.Provider value={{ user, setUser, login, error, setError, signUp, resetPassword, message, token }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProviderWrapper}