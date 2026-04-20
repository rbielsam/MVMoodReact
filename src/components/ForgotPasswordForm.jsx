import '../index.css';
import { useState } from 'react';
import Button from './Button';

export default function ForgotPasswordForm(props) {

    const [email, setEmail] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
        props.deleteErrorMsg("");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Conectando con el servidor...");

        try {
            await fetch('http://localhost:8000/api/forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email
                })
            })

            window.location.replace("/");
        }
        catch (err) {
            console.error("Error en la petición al servidor: ", err);
            props.sendError("Error en la petición al servidor: ", err);
            setEmail("");
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Write your email</p>
                <input type="email" name="email" placeholder="email" className="imputs" value={email} onChange={handleEmail} required /><br/>
                <Button>Reset password</Button><br/><br/>
            </form>
        </>
    );
}