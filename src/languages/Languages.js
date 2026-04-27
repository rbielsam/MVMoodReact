const translations = {
  es: {
    home: 'Inicio',
    notifications: 'Notificaciones',
    messages: 'Mensajes',
    create: 'Crear',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    profile_edit: 'Editar Perfil',
    change_password: 'Cambiar Contraseña',
    terms_conditions: 'Términos y Condiciones',
    help_support: 'Ayuda y Soporte',
    about: 'Acerca de',
    delete_account: 'Eliminar Cuenta',
    back_to_messages: 'Volver a Mensajes',
    chat_with: 'Chat con',
    type_message: 'Escribe un mensaje...',
    send: 'Enviar',
    no_posts: 'No hay publicaciones todavía. ¡Sé el primero en publicar!',
    no_messages: 'No hay mensajes todavía.',
    no_notifications: 'No hay notificaciones todavía.',
    welcome: 'Bienvenido a MVMood!',
    like: 'Me gusta',
    comment: 'Comentar',
    delete: 'Eliminar',
    comments: 'Comentarios',
    select_language: 'Seleccionar idioma',
  },
  ca: {
    home: 'Inici',
    notifications: 'Notificacions',
    messages: 'Missatges',
    create: 'Crear',
    settings: 'Configuració',
    logout: 'Tancar Sessió',
    profile_edit: 'Editar Perfil',
    change_password: 'Canviar Contrasenya',
    terms_conditions: 'Termes i Condicions',
    help_support: 'Ajuda i Suport',
    about: 'Sobre Nosaltres',
    delete_account: 'Eliminar Compte',
    back_to_messages: 'Tornar a Missatges',
    chat_with: 'Xat amb',
    type_message: 'Escriu un missatge...',
    send: 'Enviar',
    no_posts: 'No hi ha publicacions encara. Sigues el primer en publicar!',
    no_messages: 'No hi ha missatges encara.',
    no_notifications: 'No hi ha notificacions encara.',
    welcome: 'Benvingut a MVMood!',
    like: 'M\'agrada',
    comment: 'Comentar',
    delete: 'Eliminar',
    comments: 'Comentaris',
    select_language: 'Selecciona idioma',
  },
  en: {
    home: 'Home',
    notifications: 'Notifications',
    messages: 'Messages',
    create: 'Create',
    settings: 'Settings',
    logout: 'Log out',
    profile_edit: 'Profile Edit',
    change_password: 'Change Password',
    terms_conditions: 'Terms and Conditions',
    help_support: 'Help and Support',
    about: 'About',
    delete_account: 'Delete Account',
    back_to_messages: 'Back to Messages',
    chat_with: 'Chat with',
    type_message: 'Type a message...',
    send: 'Send',
    no_posts: 'No posts yet. Be the first to post!',
    no_messages: 'No messages yet.',
    no_notifications: 'No notifications yet.',
    welcome: 'Welcome to MVMood!',
    like: 'Like',
    comment: 'Comment',
    delete: 'Delete',
    comments: 'Comments',
    select_language: 'Select language',
  },
};

export const getTranslation = (lang, key) => {
  return translations[lang][key] || key;
};

export const useLanguage = () => {
  const storedLang = localStorage.getItem('language');
  const lang = storedLang || 'en';
  
  const setLanguage = (newLang) => {
    localStorage.setItem('language', newLang);
    window.location.reload();
  };

  const t = (key) => getTranslation(lang, key);

  return { lang, setLanguage, t };
};
