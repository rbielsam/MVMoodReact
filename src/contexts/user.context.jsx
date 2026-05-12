import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";


const UserContext = createContext();
//const navigate = useNavigate();


function UserProviderWrapper(props) {

    const API_URL = import.meta.env.VITE_API_URL;

    const [user, setUser] = useState({
        id:null,
        email: "",
        password: "",
        repeatPassword: "",
        nickname: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    
    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken && savedToken !== "undefined") {
            setToken(savedToken);
            <Link to="/home" />
            //window.location.replace("/home");
        }
    }, []);


    // Función asíncrona para el Login
    const login = async (user) => {
        
        // Llamada a la API de Laravel (BackEnd)
        try {
            const response = await fetch(`${API_URL}/login`, {
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

                localStorage.setItem("nickname", data.user.nickname);
                window.location.replace("/home");
            }
            
        } catch (err) {
            //console.error("Error en la petición login al servidor: ", err.message);
            //setError(err);

            setUser({
                id:"",
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
            const response = await fetch(`${API_URL}/register`, {
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
                id:"",
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
            const response = await fetch(`${API_URL}/resetpassword`, {
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
                id:"",
                nickname: "",
                email: "",
                password: "",
                repeatPassword: ""
            });
        }
    }

    // Función asíncrona para devolver los datos de usuario para el HeaderLogged
    const getDataLoggedUser = async () => {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Error al recibir datos de usuario: ", errorResponse.message);
                throw new Error("Error al recibir datos de usuario: ", errorResponse.message);
            }

            console.log("Datos de usuario recibidos correctamente");

            setUser({
                id: data.id,
                nickname: data.nickname,
                email: data.email,
                foto_perfil: data.foto_perfil
            });

            return data;

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err);
        }
    }

    // LÓGICA DE PERFIL DE USUARIO
    // Función asíncrona para editar el nickname
    const updateNickname = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/perfil`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //"Content-Type": "application/json",
                    //"Accept": "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error al recibir el Nickname actualizado: ", data.message);
                setError("Error al recibir el Nickname actualizado: ", errorResponse.message);
                throw new Error("Error al recibir el Nickname actualizado");
            }

            console.log("Nickname actualizado recibido correctamente");
            setUser(getDataLoggedUser());
            return data;

        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err.message);
        }
    }

    // Función asíncrona para editar la contraseña
    const updatePassword = async (password_antigua, password_nueva, password_nueva_confirmation) => {
        try {
            const response = await fetch(`${API_URL}/perfil/password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({password_antigua, password_nueva, password_nueva_confirmation})
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error al cambiar la constraseña: ", data.message);
                setError("Error al recibir los datos para el cambio de constraseña: ", data.message);
                //throw new Error("Error al recibir los datos para el cambio de constraseña");
            }

            console.log("Contraseña actualizada correctamente");
            await getDataLoggedUser();
            return data;


        } catch (err) {
            console.error("Error en la petición al servidor: ", err.message);
            setError(err.message);
        }
    }


    //Cargar datos del Usuario
    useEffect(() => {
        if (token) {
            getDataLoggedUser();
        }
    }, [token]);
    
    return (
        <UserContext.Provider value={{ user, setUser, login, error, setError, signUp, resetPassword, message, token, getDataLoggedUser, updateNickname, updatePassword }}>
            {props.children}
        </UserContext.Provider>
    );
}

export {UserContext, UserProviderWrapper}