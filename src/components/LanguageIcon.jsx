import tierra from "../assets/header/tierra.png";
import styles from "../styles/HeaderIcons.module.css";
import LanguageMenu from "../components/LanguageMenu";


export default function LanguageIcon ({ changeLanguage }) {



    /*const changeLanguage = () => {
        console.log("Cambiar idioma");
    }*/

    return (
        <>
            <img onClick={changeLanguage} className={styles.headerIcon} src={tierra} alt="Languages" />
        </>
    );
}