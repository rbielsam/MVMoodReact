import { useState } from 'react';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import '../indexZara.css';
import Footer from '../components/Footer';


export default function MessagesPage({ data }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const { t } = useLanguage();

    if (selectedMessage) {
        return <Chat message={selectedMessage} onBack={() => setSelectedMessage(null)} />;
    }

    return (
        <>
            <HeaderZara />
            <div className="container">
                <Sidebar />
                <div className="main">
                    {data?.mensaje && <p className="ok">{data.mensaje}</p>}
                    {data?.error && <p className="error">{data.error}</p>}

                    <h2>{t('messages')}</h2>

                    {!data?.mensajes || data.mensajes.length === 0 ? (
                        <div className="post">
                            <p>{t('no_messages')}</p>
                        </div>
                    ) : (
                        data.mensajes.map((mensaje) => (
                            <div
                                key={mensaje.id}
                                className={`message-item ${mensaje.unread ? 'unread' : ''}`}
                                onClick={() => setSelectedMessage(mensaje)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="message-header">
                                    <div className="message-user">
                                        <img src="/images/user.png" alt={mensaje.nombre} className="message-avatar" />
                                        <div>
                                            <h4>{mensaje.nombre}</h4>
                                            <span className="message-time">{new Date(mensaje.tiempo).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    {mensaje.unread && (
                                        <div className="unread-badge">{mensaje.unreadCount}</div>
                                    )}
                                </div>
                                <p className="message-preview">{mensaje.preview}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

function Chat({ message, onBack }) {
    const { t } = useLanguage();
    
    // Mock conversation with more realistic data
    const conversation = [
        { id: 1, sender: 'You', text: 'Hello! How are you doing?', time: '10:00 AM', avatar: '/images/user.png' },
        { id: 2, sender: message.nombre, text: 'Hi there! I\'m doing great, thanks for asking. How about you?', time: '10:02 AM', avatar: '/images/user.png' },
        { id: 3, sender: 'You', text: 'I\'m good too! Just working on some projects.', time: '10:05 AM', avatar: '/images/user.png' },
        { id: 4, sender: message.nombre, text: 'That sounds interesting! What kind of projects?', time: '10:07 AM', avatar: '/images/user.png' },
        { id: 5, sender: 'You', text: 'Mostly web development stuff. Building some cool apps.', time: '10:10 AM', avatar: '/images/user.png' },
    ];

    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="main chat-main">
                    <div className="chat-header">
                        <button onClick={onBack} className="back-button" title="Back to messages">
                            ←
                        </button>
                        <div className="chat-user-info">
                            <div className="chat-avatar-container">
                                <img src="/images/user.png" alt={message.nombre} className="chat-avatar" />
                                <div className="online-indicator"></div>
                            </div>
                            <div className="chat-user-details">
                                <h3 className="chat-username">{message.nombre}</h3>
                                <span className="chat-status">Active now</span>
                            </div>
                        </div>
                        <div className="chat-actions">
                            <button className="chat-action-btn" title="More options">⋯</button>
                        </div>
                    </div>
                    
                    <div className="chat-messages-container">
                        <div className="chat-messages">
                            {conversation.map((msg) => (
                                <div key={msg.id} className={`message-wrapper ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                    {msg.sender !== 'You' && (
                                        <img src={msg.avatar} alt={msg.sender} className="message-avatar" />
                                    )}
                                    <div className={`chat-message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                        <div className="message-content">
                                            <p className="message-text">{msg.text}</p>
                                            <span className="message-time">{msg.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="chat-input-container">
                        <div className="chat-input-wrapper">
                            <button className="attach-btn" title="Attach file">📎</button>
                            <input 
                                type="text" 
                                placeholder={t('type_message')} 
                                className="chat-input-field"
                            />
                            <button className="emoji-btn" title="Emoji">😊</button>
                            <button className="send-btn">{t('send')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}