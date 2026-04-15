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

/*

<div class="div_container">

    <!--<section class="left_section">-->
    <LeftSection>
        <span slot="imgLogo"></span><!--Para que en este caso, no se muestre el icono del logo-->

        <iframe class="terms_conditions" src="/termsAndConditions" title="description"></iframe><br/>

        <form action="index.php?controller=Usuarios&action=signUpProcess" method="POST">
            <input type="checkbox" name="signUp"/>   I accept
        </form>
    </LeftSection>
    <!--</section>-->

    <section class="right_section">

        <LoginContent>

            <ImgLogo logoSignUp />

        <!--<img src="src/lib/assets/imgLogo.png" alt="Logo" class="imgLogo"/>-->



        </LoginContent>

    </section>


</div>


*/