import tierra from "../assets/header/tierra.png";
import styles from "../styles/HeaderIcons.module.css";

const language = () => {
    console.log("Cambiar idioma");
}

export default function LanguageIcon () {
    return (
        <>
            <img onClick={language} className={styles.headerIcon} src={tierra} alt="Languages" />
        </>
    );
}