import '../index.css';
import { useState } from 'react';
import Button from './Button';

export default function ForgotPasswordForm() {

    const [email, setEmail] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
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
        catch (error) {
            console.error("Error en la petición al servidor: ", error);
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