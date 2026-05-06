import React, { useState, useEffect, useRef } from 'react';
import echo from '../lib/echo'; // Tu instancia de Laravel Echo
import { useLanguage } from '../languages/Languages';

export default function Chat({ message, onBack, currentUser }) {
    const { t } = useLanguage();
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [cargando, setCargando] = useState(true);
    const scrollRef = useRef(null);

    // 1. Cargar historial y suscribirse a Pusher
    useEffect(() => {
        // Cargar mensajes previos desde la API
        const cargarHistorial = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/chats/${message.uuid}/mensajes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                // Laravel paginate devuelve los datos en .data.data
                // Los invertimos para que el más reciente esté abajo
                setMensajes(data.data.reverse());
            } catch (error) {
                console.error("Error cargando historial:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarHistorial();

        // Suscripción a Pusher (Canal Privado)
        echo.private(`chat.${message.uuid}`)
            .listen('.nuevo-mensaje', (e) => {
                setMensajes((prev) => [...prev, e.mensaje]);
            });

        return () => {
            echo.leave(`chat.${message.uuid}`);
        };
    }, [message.uuid]);

    // 2. Scroll automático al final
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    // 3. Enviar mensaje a la API
    const handleSend = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim()) return;

        const textoParaEnviar = nuevoMensaje;
        setNuevoMensaje(""); // Optimismo: limpiamos el input

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chats/enviar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    receptor_uuid: message.uuid, // O el UUID del chat según tu lógica
                    contenido: textoParaEnviar
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Añadimos nuestro propio mensaje a la lista local
                setMensajes((prev) => [...prev, data]);
            }
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    };

    return (
        <div className="main chat-main">
            <div className="chat-header">
                <button onClick={onBack} className="back-button">←</button>
                <div className="chat-user-info">
                    <img src={message.foto || "/images/user.png"} alt={message.nombre} className="chat-avatar" />
                    <div className="chat-user-details">
                        <h3 className="chat-username">{message.nombre}</h3>
                        <span className="chat-status">{cargando ? t('loading') : 'Active now'}</span>
                    </div>
                </div>
            </div>

            <div className="chat-messages-container">
                <div className="chat-messages">
                    {mensajes.map((msg) => (
                        <div 
                            key={msg.uuid} 
                            className={`message-wrapper ${msg.emisor_id === currentUser.id ? 'sent' : 'received'}`}
                        >
                            <div className={`chat-message ${msg.emisor_id === currentUser.id ? 'sent' : 'received'}`}>
                                <div className="message-content">
                                    <p className="message-text">{msg.contenido}</p>
                                    <span className="message-time">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </div>

            <form onSubmit={handleSend} className="chat-input-container">
                <div className="chat-input-wrapper">
                    <input 
                        type="text" 
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        placeholder={t('type_message')} 
                        className="chat-input-field"
                    />
                    <button type="submit" className="send-btn">{t('send')}</button>
                </div>
            </form>
        </div>
    );
}