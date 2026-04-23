import styles from "../styles/LanguageMenu.module.css";

export default function LanguegeMenu () {
    const languages = [
        {en: "English",
        es: "Spanish",
        cat: "Catalan"}
    ];

    return (
        <>
            <div className={styles.languageMenu}>
                <ul>
                    {languages.map(language => {
                        return (
                            <li key={language}>{languages.language}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}