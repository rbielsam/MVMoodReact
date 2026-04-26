import styles from "../styles/LanguageMenu.module.css";
import { useContext } from "react";
import { LanguageContext } from "../contexts/language.context.jsx";


export default function LanguageMenu ({ onClose }) {

    const { translations } = useContext(LanguageContext);

    return (
        <>
            <div className={styles.languageMenu}>
                <ul>
                    {translations.map(language => (
                        <li key={language.lang} onClick={() => {onClose()}}>{language.name}</li>
                    ))}                    
                </ul>
            </div>
        </>
    );
}