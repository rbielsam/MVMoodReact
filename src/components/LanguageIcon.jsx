import tierra from "../assets/header/tierra.png";
import styles from "../styles/HeaderIcons.module.css";
import LanguageMenu from "../components/LanguageMenu";
import { useEffect, useState } from "react";


export default function LanguageIcon () {

    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    useEffect(() => {
        //
    }, [showLanguageMenu])

    const changeLanguage = () => {
        console.log("Cambiar idioma");
        const newShowLanguageMenu = true;
        setShowLanguageMenu(newShowLanguageMenu);
        {newShowLanguageMenu && <LanguageMenu />}
    }

    return (
        <>
            <img onClick={changeLanguage} className={styles.headerIcon} src={tierra} alt="Languages" />
        </>
    );
}