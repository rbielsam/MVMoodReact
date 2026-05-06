import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY, // O tu variable de entorno
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    // Como usamos PrivateChannels, necesitamos pasar el token de Sanctum
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth', 
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
        },
    },
});

export default echo;