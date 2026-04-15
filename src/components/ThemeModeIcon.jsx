import modoOscuro from "../assets/header/modoOscuro.png";
import styles from '../styles/HeaderIcons.module.css';

const theme = () => {
    console.log("Cambiar tema");
}

export default function ThemeModeIcon () {
        return (
            <>
                <img onClick={theme} className={styles.headerIcon} src={modoOscuro} alt="Theme mode" />
            </>
        );
}