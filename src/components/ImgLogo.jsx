import imgLogo from "../assets/imgLogo.png";
import styles from "../styles/ImgLogo.module.css";

export default function ImgLogo () {
    return (
        <img className={styles.imgLogo} src={imgLogo} alt="Logo MVMood" />
    );
}