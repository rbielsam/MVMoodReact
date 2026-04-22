import Header from "../components/Header";
import DivContainer from "../components/DivContainer";
import LeftSection from "../components/LeftSection";
import TermConditions from "../components/TermConditions";
import RightSection from "../components/RightSection";
import Footer from "../components/Footer";
import ImgLogo from "../components/ImgLogo";
import SignUpForm from "../components/SignUpForm";


export default function SignUp () {

    return (
        <>
            <Header />
            <DivContainer>
                <LeftSection termConditions={<TermConditions />} />
                <RightSection imgLogo={<ImgLogo />} signUpForm={<SignUpForm />} />   
            </DivContainer>
            <Footer />
        </>
    );
}