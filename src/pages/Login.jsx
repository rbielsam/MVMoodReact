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


export default function Login () {

    return (
        <>
            <Header />
            <DivContainer>
                <LeftSection>
                    <ImgLogo />
                </LeftSection>
                <RightSection>
                    <LoginForm />
                    <Link className={styles.button} to="/signup">sign up</Link>
                    <Link className="a" to="/forgotpassword">forgot password?</Link>
                </RightSection>
            </DivContainer>
            <Footer />
        </>
    );
}