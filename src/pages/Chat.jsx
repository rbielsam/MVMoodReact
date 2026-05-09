import React, { useState, useEffect, useRef } from 'react';
import echo from '../lib/echo'; // Tu instancia de Laravel Echo
//import { useLanguage } from '../languages/Languages';
//import HeaderLogged from "../components/HeaderLogged";


export default function Chat({ selectedChat, onBack, currentUser }) {
    //const { t } = useLanguage();
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        // Cargar mensajes previos desde la API
        const cargarHistorial = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/chats/${selectedChat.uuid}/mensajes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                // Devuelve los datos en .data.data
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
        echo.private(`chat.${selectedChat.uuid}`)
            .listen('.nuevo-mensaje', (e) => {
                setMensajes((prev) => [...prev, e.mensaje]);
            });

        return () => {
            echo.leave(`chat.${message.uuid}`);
        };
    }, [message.uuid]);

    // Scroll automático al final
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    // Enviar mensaje a la API
    const handleSend = async (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim()) return;

        const textoParaEnviar = nuevoMensaje;
        setNuevoMensaje(""); // Limpiamos el input

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chats/enviar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    receptor_uuid: selectedChat.usuarios[0].uuid,
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
        <div className="main chat-container"> 
            <div className="chat-header"> 
                <button onClick={onBack}>← Volver</button> 
                <h3>{selectedChat.usuarios[0]?.nickname}</h3> 
            </div> 
            <div className="chat-messages"> 
                {mensajes.map(msg => ( 
                    <div key={msg.uuid} className={`msg ${msg.emisor_id === currentUser.id ? 'sent' : 'received'}`}> 
                        {msg.contenido} 
                    </div> 
                    ))} 
                <div ref={scrollRef} /> 
            </div> 
            <form onSubmit={handleSend} className="chat-input"> 
                <input value={nuevoMensaje} onChange={(e) => setNuevoMensaje(e.target.value)} /> 
                <button type="submit">Enviar</button> 
            </form> 
        </div> 
    );  
}