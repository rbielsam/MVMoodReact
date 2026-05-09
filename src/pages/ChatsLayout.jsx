import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import MessagesPage from './MessagesPage';
import Chat from './Chat';

export default function LayoutMensajeria() {
    const { user } = useContext(UserContext);
    const [chatSeleccionado, setChatSeleccionado] = useState(null);

    return (
        <div className="app-layout">
            <Header />
            <div className="container">
                <Sidebar />
                {}
                {!chatSeleccionado ? (
                    <MessagesPage onSelectChat={(chat) => setChatSeleccionado(chat)} />
                ) : (
                    <Chat
                        selectedChat={chatSeleccionado}
                        currentUser={user}
                        onBack={() => setChatSeleccionado(null)}
                    />
                )}
            </div>
        </div>
    );
}