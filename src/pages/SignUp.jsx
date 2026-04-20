import Header from "../components/Header";
import DivContainer from "../components/DivContainer";
import LeftSection from "../components/LeftSection";
import TermConditions from "../components/TermConditions";
import RightSection from "../components/RightSection";
import Footer from "../components/Footer";
import ImgLogo from "../components/ImgLogo";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";


export default function SignUp () {

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
                <LeftSection termConditions={<TermConditions />} />
                <RightSection imgLogo={<ImgLogo />} signUpForm={<SignUpForm sendError={getError} deleteErrorMsg={deleteError} />} />   
            </DivContainer>
            {error && <p className="error">{error}</p>}
            <Footer />
        </>
    );
}