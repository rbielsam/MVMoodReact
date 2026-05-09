import { useState, useContext } from 'react';
import { UserContext } from "../contexts/user.context.jsx";
import "../indexChat.css";
import "../indexLogged.css";
import MessagesChat from '../components/MessagesChat.jsx';
import Chat from '../components/Chat.jsx';
import Footer from '../components/Footer.jsx';
import HeaderLogged from "../components/HeaderLogged.jsx";
import Sidebar from '../components/Sidebar.jsx';


export default function ChatPage() {
    const { user } = useContext(UserContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);

    return (
        <div className="app-layout">
            <HeaderLogged />

            <div className="container">
                <Sidebar />

                <div className="main">
                    {!chatSeleccionado ? (
                        <MessagesChat onSelectChat={(chat) => setChatSeleccionado(chat)} currentUser={user} />
                    ) : (
                        <Chat
                            selectedChat={chatSeleccionado}
                            currentUser={user}
                            onBack={() => setChatSeleccionado(null)}
                        />
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}