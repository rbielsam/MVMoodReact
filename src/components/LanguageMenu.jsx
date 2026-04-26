import styles from "../styles/LanguageMenu.module.css";

export default function LanguageMenu ({ onClose }) {

    const languages = [
        {lang: "en", name: "English", icon: ""},
        {lang: "es", name: "Spanish", icon: ""},
        {lang: "cat", name: "Catalan", icon: ""}
    ];

    return (
        <>
            <div className={styles.languageMenu}>
                <ul>
                    {languages.map(language => (
                        <li key={language.lang} onClick={() => {onClose()}}>{language.name}</li>
                    ))}                    
                </ul>
            </div>
        </>
    );
}