import '../index.css';
import styles from "../styles/Button.module.css";
import Header from "../components/Header";
import DivContainer from "../components/DivContainer";
import Footer from "../components/Footer";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import ImgLogo from "../components/ImgLogo";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { useState } from 'react';


export default function Login () {

    const [error, setError] = useState("");
    
    const getError = (err) => {
        console.error("Error al conectar con el servidor para enviar los datos de acceso: ", err);
        setError(err);
    }

    const deleteError = () => {
        setError("");
    }

    return (
        <>
            <Header />
            <DivContainer>
                <LeftSection>
                    <ImgLogo />
                </LeftSection>
                <RightSection>
                    {error && <p className="error">Error al conectar con el servidor para enviar los datos de acceso</p>}
                    <LoginForm sendError={getError} deleteErrorMsg={deleteError} />
                    <Link className={styles.button} to="/signup">sign up</Link>
                    <Link className="a" to="/forgotpassword">forgot password?</Link>
                </RightSection>
            </DivContainer>
            <Footer />
        </>
    );
}