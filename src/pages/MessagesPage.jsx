import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../contexts/language.context';
import "../indexLogged.css";
import HeaderLogged from "../components/HeaderLogged";
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';


export default function MessagesPage({ onSelectChat, currentUser }) {

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.content.login;

    const [chats, setChats] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/chats", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await res.json();
                //console.log("Respuesta Back: ", data);
                setChats(data?.data ?? []);
            } catch (err) {
                console.error("Error al obtener chats:", err);
            } finally {
                setCargando(false);
            }
        };
        fetchChats();
    }, []);

    return (
        
        <div className="main messages-main">
            <HeaderLogged />
            <Sidebar />

            <h2>Mensajes</h2>
            {cargando ? (
                <p>Cargando conversaciones...</p>
            ) : chats.length === 0 ? (
                <p>No tienes conversaciones aún.</p>
            ) : (
                <div className="messages-list">
                    {chats.map((chat) => {
                        const receptor = chat.usuarios.find(u => u.id !== currentUser.id);

                        return (
                    
                            <div
                                key={chat.uuid}
                                className="message-item"
                                onClick={() => onSelectChat(chat)}
                            >
                                <img src="/images/user.png" alt="avatar" className="message-avatar" />
                                <div className="message-info">
                                    {}
                                    {/*<h4>{chat.usuarios[0]?.nickname}</h4>*/}
                                    <h4>{receptor?.nickname}</h4>
                                    <p className="preview">{chat.ultimo_mensaje?.contenido || "Sin mensajes aún"}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <Footer />
        </div>
    );
}