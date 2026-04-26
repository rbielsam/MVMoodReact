import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../contexts/language.context";


export default function ErrorPage () {

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.content.ErrorPage;

    return(
        <>
            <h1>{language.title}</h1>
            <Link to="/">{language.ReturnHome}</Link>
        </>
    );
}