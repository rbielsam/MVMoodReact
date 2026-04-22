import '../index.css';
import { useContext } from 'react';
import Button from './Button';
import { UserContext } from '../contexts/user.context.jsx';


export default function ForgotPasswordForm(props) {

    const {user, setUser, error, setError, resetPassword} = useContext(UserContext);


    const handleEmail = (e) => {
        setUser({...user, email: e.target.value});
        setError("");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Conectando con el servidor...");

        resetPassword(user);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">Error en la petición al servidor: {error.message}</p>}
                <p>Write your email</p>
                <input type="email" name="email" placeholder="email" className="imputs" value={user.email} onChange={handleEmail} required /><br/>
                <Button>Reset password</Button><br/><br/>
            </form>
        </>
    );
}