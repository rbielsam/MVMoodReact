import '../index.css';
import Header from "../components/Header";
import DivContainer from '../components/DivContainer';
import LeftSection from '../components/LeftSection';
import ImgLogo from '../components/ImgLogo';
import RightSection from '../components/RightSection';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Footer from '../components/Footer';
import { useState } from 'react';


export default function ForgotPassword () {

    const [error, setError] = useState("");

    const getError = (err) => {
        console.error(err);
        setError(err);        
    }

    const deleteError = () => {
        setError("");
    }

    return (
        <>
            <Header />
            <DivContainer>
                <LeftSection imgLogo={<ImgLogo />} />
                <RightSection forgotPasswordForm={<ForgotPasswordForm sendError={getError} deleteErrorMsg={deleteError} />} />
                {error && <p className="error">{error}</p>}
            </DivContainer>
            <Footer />
        </>
    );
}