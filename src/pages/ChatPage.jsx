import { useState, useContext } from 'react';
import { UserContext } from "../contexts/user.context.jsx";
import "../indexChat.css";
import "../indexLogged.css";
import ConversacionesChat from '../components/ConversacionesChat.jsx';
import Chat from '../components/Chat.jsx';
import Footer from '../components/Footer.jsx';
import HeaderLogged from "../components/HeaderLogged.jsx";
import Sidebar from '../components/Sidebar.jsx';
import ChatUserList from "../components/ChatUserList";
import { LanguageContext } from "../contexts/language.context.jsx";


export default function ChatPage() {

    const {translations, lang, setLang} = useContext(LanguageContext);
    const language = lang.content.ChatPage;

    const { user } = useContext(UserContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);


    const startChatWithUser = async (user) => {
        try {
            console.log("receptor_id que se envía: ", user.id);
            const response = await fetch("http://127.0.0.1:8000/api/chats/enviar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    receptor_id: user.id,
                    contenido: "Hola"
                })
            });

            const data = await response.json();
            console.log("Chat creado o existente: ", data);

            if (data.chat) {
                setChatSeleccionado(data.chat);
            }
            else {
                console.error("El chat devuelto no és válido: ", data);
            }
        

        } catch (err) {
            throw new Error ("Error al conectar con el servidor: ", err.message);
            console.error("Error al conectar con el servidor: ", err.message);
        }
    }

    return (
        <>
            <div className="app-layout">
                <HeaderLogged />

                <div className="chat-layout">
                    <Sidebar />

                    <div className="chat-left-column">
                        <div className="chat-left-users">
                            <ChatUserList 
                                    currentUser={user}
                                    onSelectUser={startChatWithUser}
                            />
                        </div>

                        <div className="chat-left-chats">
                            <ConversacionesChat onSelectChat={(chat) => setChatSeleccionado(chat)} currentUser={user} />
                        </div>
                    </div>

                    <div className="chat-right-column">
                        {chatSeleccionado ? (
                            <Chat
                                selectedChat={chatSeleccionado}
                                currentUser={user}
                                onBack={() => setChatSeleccionado(null)}
                            />
                        ) : (
                            <div className="chat-placeholder">
                                <p>{language.chats}</p>
                            </div>
                        )}
                    </div>

                </div>

                <Footer />
            </div>
        </>
    );
}