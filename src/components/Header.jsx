import ThemeModeIcon from "./ThemeModeIcon";
import LanguageIcon from "./LanguageIcon";
import styles from "../styles/Header.module.css";

export default function Header () {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <ThemeModeIcon />
                    <LanguageIcon />
                </div>
            </header>
        </>
    );
}