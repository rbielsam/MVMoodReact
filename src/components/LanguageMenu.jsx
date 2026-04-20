import styles from "../styles/LanguageMenu.module.css";

export default function LanguegeMenu () {
    const languages = [
        {en: "EN",
        es: "ES",
        cat: "CAT"}
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