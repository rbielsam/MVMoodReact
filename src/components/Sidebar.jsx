import '../indexLogged.css';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';


export default function Sidebar() {

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.content.Sidebar;
   // const { t } = useLanguage();

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("language");
    };

    return (
        <div className="sidebar">
            <a href="/home">{language.home}</a>
            <a href="/notifications">{language.notifications}</a>
            <a href="/chat">{language.chat}</a>
            <a href="/profile">{language.profile}</a>

            <div className="logout">
                <a onClick={logOut} href="/">{language.logout}</a>
            </div>
        </div>
    );
}