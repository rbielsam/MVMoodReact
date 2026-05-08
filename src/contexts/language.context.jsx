import { createContext, useState } from "react";
import en from "../languages/en";
import es from "../languages/es";
import cat from "../languages/cat";


const LanguageContext = createContext();

function LanguageProviderWrapper (props) {

    const translations = [        
        {lang: "en", name: "English", icon: "", content: en},
        {lang: "es", name: "Spanish", icon: "", content: es},
        {lang: "cat", name: "Catalan", icon: "", content: cat}
    ];

    const savedLang = localStorage.getItem("language");
    const [lang, setLang] = useState(savedLang ? JSON.parse(savedLang) : translations[0]);

    return (
        <LanguageContext.Provider value={{lang, setLang, translations}}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export {LanguageContext, LanguageProviderWrapper};