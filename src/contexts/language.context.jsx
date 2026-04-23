import { createContext, useState } from "react";


const LanguageContext = createContext();

function LanguageProviderWrapper (props) {

    const [lang, setLang] = useState("en");

    return (
        <LanguageContext.Provider value={{lang, setLang}}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export {LanguageContext, LanguageProviderWrapper};