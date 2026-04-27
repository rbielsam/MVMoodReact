import { useState, useEffect } from 'react';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import imgLogo from "../assets/imgLogo.png";
import modoOscuro from "../assets/header/modoOscuro.png";
import tierra from "../assets/header/tierra.png";


export default function HeaderZara({ children }) {
    const [isDark, setIsDark] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const { lang, setLanguage, t } = useLanguage();

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const dark = theme === 'dark';
        setIsDark(dark);
        document.documentElement.classList.toggle('dark-mode', dark);
    }, []);

    const modeTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        document.documentElement.classList.toggle('dark-mode', newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    };

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
    };

    return (
        <header className="topbar">
            <div className="brand">
                <img src={imgLogo} alt="MVM Mood Logo" width="32" height="32" />
                {children}
            </div>

            <div className="header-content">
                <div className="language-menu-container">
                    <button id="mode-icon" type="button" onClick={modeTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }} title="Toggle dark mode">
                        <img src={modoOscuro} alt="Mode icon" width="32" height="32" />
                    </button>

                    <button 
                        id="languaje-icon" 
                        type="button" 
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
                        title={t('select_language')}
                    >
                        <img src={tierra} alt="Language icon" width="32" height="32" />
                    </button>
                    
                    {showLanguageMenu && (
                        <div className="language-menu">
                            <button 
                                onClick={() => { handleLanguageChange('es'); setShowLanguageMenu(false); }}
                                className={lang === 'es' ? 'active' : ''}
                            >
                                Español
                            </button>
                            <button 
                                onClick={() => { handleLanguageChange('ca'); setShowLanguageMenu(false); }}
                                className={lang === 'ca' ? 'active' : ''}
                            >
                                Català
                            </button>
                            <button 
                                onClick={() => { handleLanguageChange('en'); setShowLanguageMenu(false); }}
                                className={lang === 'en' ? 'active' : ''}
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}