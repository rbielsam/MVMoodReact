import '../index.css';
import { useContext } from 'react';
import Button from '../components/Button';
import { UserContext } from '../contexts/user.context.jsx';
//import { Navigate } from 'react-router-dom';


export default function SignUpForm (props) {

    const {user, setUser, error, setError, signUp} = useContext(UserContext);


    const handleUserProps = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setError("");
        //props.deleteErrorMsg("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulario de registro enviado");

        signUp(user);        
    } 

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">Error en la petición de registro al servidor: {error.message}</p>}
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