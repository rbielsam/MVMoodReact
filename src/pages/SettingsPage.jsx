import { useState } from 'react';
import HeaderZara from '../components/HeaderZara';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages//Languages';
import '../indexZara.css';
import Footer from '../components/Footer';


export default function SettingsPage() {
    const [profilePic, setProfilePic] = useState('/images/user.png');
    const [nickname, setNickname] = useState('User');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { t } = useLanguage();

    const handleProfilePicChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePic(url);
        }
    };

    const handleNicknameChange = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newNickname = formData.get('nickname');
        if (newNickname.trim()) {
            setNickname(newNickname.trim());
            setIsEditingNickname(false);
        }
    };

    const handlePasswordInput = (event) => {
        const { name, value } = event.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        if (!passwords.current || !passwords.next || !passwords.confirm) {
            setPasswordError(t('fill_all_fields'));
            setPasswordMessage('');
            return;
        }

        if (passwords.next !== passwords.confirm) {
            setPasswordError(t('password_mismatch'));
            setPasswordMessage('');
            return;
        }

        if (passwords.next.length < 6) {
            setPasswordError(t('password_too_short'));
            setPasswordMessage('');
            return;
        }

        setPasswordError('');
        setPasswordMessage(t('password_updated'));
        setPasswords({ current: '', next: '', confirm: '' });
    };

    return (
        <>
            <HeaderZara />
            <div className="container">
                <Sidebar />
                <div className="main">
                    <h2>{t('settings')}</h2>

                    <div className="settings-section profile-section">
                        <h3>{t('profile_edit')}</h3>
                        <div className="profile-card">
                            <div className="profile-picture-section">
                                <div className="profile-picture-container">
                                    <img src={profilePic} alt="Profile" className="profile-picture" />
                                    <div className="profile-picture-overlay">
                                        <label htmlFor="profile-pic-input" className="change-photo-btn">
                                            <span>📷</span>
                                        </label>
                                        <input 
                                            id="profile-pic-input"
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleProfilePicChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-details">
                                <div className="nickname-section">
                                    <div className="section-label">{t('nickname')}</div>
                                    {!isEditingNickname ? (
                                        <div className="nickname-display">
                                            <span className="nickname-text">{nickname}</span>
                                            <button onClick={() => setIsEditingNickname(true)} className="edit-nickname-btn">
                                                ✏️ Edit
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleNicknameChange} className="nickname-edit-form">
                                            <input 
                                                type="text" 
                                                name="nickname" 
                                                defaultValue={nickname} 
                                                maxLength={20}
                                                required
                                                className="nick-input"
                                                placeholder="Enter nickname"
                                            />
                                            <div className="form-actions">
                                                <button type="submit" className="save-btn">Save</button>
                                                <button type="button" onClick={() => setIsEditingNickname(false)} className="cancel-btn">Cancel</button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <button className="settings-button" onClick={() => setShowPasswordForm((prev) => !prev)}>
                            {t('change_password')}
                        </button>
                        <button className="settings-button" onClick={() => setShowTerms(true)}>{t('terms_conditions')}</button>
                        <button className="settings-button" onClick={() => setShowHelp(true)}>{t('help_support')}</button>
                        <button className="settings-button delete">{t('delete_account')}</button>
                    </div>

                    {showPasswordForm && (
                        <div className="modal-overlay" onClick={() => setShowPasswordForm(false)}>
                            <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('change_password')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowPasswordForm(false)}>
                                        ×
                                    </button>
                                </div>
                                <form onSubmit={handlePasswordSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="current">{t('current_password')}</label>
                                        <input
                                            id="current"
                                            name="current"
                                            type="password"
                                            value={passwords.current}
                                            onChange={handlePasswordInput}
                                            placeholder={t('current_password')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="next">{t('new_password')}</label>
                                        <input
                                            id="next"
                                            name="next"
                                            type="password"
                                            value={passwords.next}
                                            onChange={handlePasswordInput}
                                            placeholder={t('new_password')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm">{t('retype_password')}</label>
                                        <input
                                            id="confirm"
                                            name="confirm"
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={handlePasswordInput}
                                            placeholder={t('retype_password')}
                                        />
                                    </div>
                                    {passwordError && <p className="error">{passwordError}</p>}
                                    {passwordMessage && <p className="message">{passwordMessage}</p>}
                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">{t('confirm_password')}</button>
                                        <button type="button" className="cancel-btn" onClick={() => setShowPasswordForm(false)}>
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {showHelp && (
                        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('help_support')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowHelp(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="help-content">
                                    <h4>Ayuda y soporte de MVMood</h4>
                                    <p>Estamos aquí para resolver tus dudas, ayudarte con tu cuenta y acompañarte en el uso diario de la plataforma.</p>
                                    <ul>
                                        <li><strong>¿Problemas para iniciar sesión?</strong> Comprueba tu correo institucional y contraseña.</li>
                                        <li><strong>Cambio de contraseña:</strong> Usa el botón “Cambiar contraseña” para renovar tu acceso de forma segura.</li>
                                        <li><strong>Publicaciones y mensajes:</strong> Mantén siempre el respeto y evita compartir datos personales.</li>
                                    </ul>
                                    <p>Si necesitas ayuda personalizada, contacta con:</p>
                                    <p><strong>Email:</strong> welcomemvmood@gmail.com</p>
                                    <p>También puedes enviar tus preguntas desde dentro de la plataforma y te responderemos lo antes posible.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {showTerms && (
                        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
                            <div className="modal-card modal-card--wide" onClick={(event) => event.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>{t('terms_conditions')}</h3>
                                    <button type="button" className="modal-close" onClick={() => setShowTerms(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="terms-content">
                                    <h4>Términos y Condiciones de Uso de MVMood</h4>
                                    <p><strong>Última actualización:</strong> 2026</p>
                                    <p><strong>Titular del servicio:</strong> Institut Manuel Vázquez Montalbán</p>
                                    <p><strong>Responsable del tratamiento de datos:</strong> Institut Manuel Vázquez Montalbán</p>

                                    <h5>1. Objeto del servicio</h5>
                                    <p>MVMood es una plataforma digital privada destinada exclusivamente a los alumnos del centro educativo [nombre del centro]. Su finalidad es facilitar la comunicación interna, la publicación de contenido escolar y la interacción entre estudiantes en un entorno seguro y controlado.</p>

                                    <h5>2. Requisitos de acceso</h5>
                                    <p>El acceso está limitado a alumnos matriculados en el centro educativo.</p>
                                    <ul>
                                        <li>El registro debe realizarse mediante el correo institucional o un sistema de validación proporcionado por el centro.</li>
                                        <li>Los menores de 14 años solo podrán utilizar MVMood con consentimiento verificable de sus padres o tutores legales, conforme al artículo 7 de la LOPDGDD.</li>
                                        <li>El usuario se compromete a proporcionar información veraz y a no suplantar la identidad de terceros.</li>
                                    </ul>

                                    <h5>3. Uso permitido del servicio</h5>
                                    <p>El usuario podrá:</p>
                                    <ul>
                                        <li>Publicar contenido relacionado con la vida escolar.</li>
                                        <li>Interactuar mediante comentarios, mensajes privados y reacciones.</li>
                                        <li>Participar en actividades, grupos o comunicaciones internas del centro.</li>
                                    </ul>
                                    <p>El uso de MVMood debe realizarse siempre con respeto, responsabilidad y conforme a las normas del centro educativo.</p>

                                    <h5>4. Contenido generado por los usuarios</h5>
                                    <p>El usuario conserva la propiedad intelectual de los contenidos que publique. Al publicar en MVMood, concede al centro educativo una licencia no exclusiva y limitada para mostrar dicho contenido dentro de la plataforma.</p>
                                    <p>Está prohibido publicar contenido que:</p>
                                    <ul>
                                        <li>Vulnere derechos de otros alumnos.</li>
                                        <li>Incluya imágenes de terceros sin permiso.</li>
                                        <li>Sea ofensivo, discriminatorio, violento o sexual.</li>
                                        <li>Promueva actividades ilegales.</li>
                                        <li>Constituya acoso o intimidación.</li>
                                    </ul>
                                    <p>El centro podrá eliminar cualquier contenido que incumpla estas normas.</p>

                                    <h5>5. Moderación y sanciones</h5>
                                    <ul>
                                        <li>Revisar contenido publicado.</li>
                                        <li>Emitir advertencias.</li>
                                        <li>Suspender temporalmente cuentas.</li>
                                        <li>Eliminar cuentas en casos graves o reiterados.</li>
                                        <li>Informar a tutores legales o al equipo directivo cuando sea necesario.</li>
                                    </ul>

                                    <h5>6. Privacidad y protección de datos</h5>
                                    <p>El tratamiento de datos personales se realizará conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD. La información detallada sobre qué datos se recogen, cómo se almacenan, para qué se utilizan, y cómo ejercer derechos se encuentra en la Política de Privacidad de MVMood.</p>

                                    <h5>7. Seguridad del servicio</h5>
                                    <p>El centro educativo implementará medidas técnicas y organizativas para proteger la información de los usuarios. No obstante, el usuario se compromete a:</p>
                                    <ul>
                                        <li>No compartir su contraseña.</li>
                                        <li>No intentar acceder a cuentas ajenas.</li>
                                        <li>No realizar acciones que comprometan la seguridad del sistema.</li>
                                    </ul>

                                    <h5>8. Responsabilidad del usuario</h5>
                                    <p>El usuario es responsable del contenido que publique y de su comportamiento dentro de la plataforma. El centro educativo no se hace responsable de:</p>
                                    <ul>
                                        <li>Contenidos publicados por los alumnos.</li>
                                        <li>Daños derivados del mal uso del servicio por parte de los usuarios.</li>
                                        <li>Interrupciones técnicas inevitables o ajenas al centro.</li>
                                    </ul>

                                    <h5>9. Modificaciones del servicio</h5>
                                    <p>El centro educativo podrá modificar estos Términos y Condiciones cuando sea necesario. Los usuarios serán informados de los cambios a través de la plataforma.</p>

                                    <h5>10. Ley aplicable y jurisdicción</h5>
                                    <p>Estos Términos se rigen por la legislación española. En caso de conflicto, serán competentes los juzgados del domicilio del usuario, conforme a la normativa de consumidores.</p>

                                    <h4>Política de Privacidad de MVMood</h4>
                                    <p>La presente Política de Privacidad explica cómo se recopilan, utilizan y protegen los datos personales de los usuarios de MVMood, la red social interna del centro educativo Institut Manuel Vázquez Montalbán. El tratamiento de datos se realiza conforme al Reglamento General de Protección de Datos (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).</p>

                                    <h5>1. Finalidad del tratamiento</h5>
                                    <p>Los datos personales de los usuarios se utilizan exclusivamente para:</p>
                                    <ul>
                                        <li>Permitir el acceso a la plataforma.</li>
                                        <li>Facilitar la comunicación interna entre alumnos.</li>
                                        <li>Gestionar publicaciones, comentarios, mensajes y actividades escolares.</li>
                                        <li>Garantizar la seguridad y el correcto funcionamiento del servicio.</li>
                                        <li>Aplicar normas de convivencia y moderación.</li>
                                    </ul>
                                    <p>No se utilizarán los datos para publicidad, perfiles comerciales ni fines ajenos al entorno educativo.</p>

                                    <h5>2. Datos personales que se recopilan</h5>
                                    <p>MVMood puede recopilar los siguientes datos:</p>
                                    <ul>
                                        <li>Datos de registro: Nombre y apellidos, Curso y grupo, Correo institucional, Fecha de nacimiento (para verificar edad legal).</li>
                                        <li>Datos de uso: Publicaciones, comentarios y mensajes enviados, Archivos multimedia subidos, Actividad dentro de la plataforma (solo para seguridad y moderación).</li>
                                        <li>Datos técnicos: Dirección IP, Información del dispositivo, Registros de acceso.</li>
                                    </ul>

                                    <h5>3. Base legal del tratamiento</h5>
                                    <p>El tratamiento de datos se basa en:</p>
                                    <ul>
                                        <li>Cumplimiento de una misión educativa del centro.</li>
                                        <li>Consentimiento de los padres o tutores para menores de 14 años (art. 7 LOPDGDD).</li>
                                        <li>Interés legítimo en garantizar la seguridad del entorno digital escolar.</li>
                                    </ul>

                                    <h5>4. Consentimiento de menores</h5>
                                    <p>Los menores de 14 años solo podrán usar MVMood con consentimiento verificable de sus padres o tutores. Los alumnos de 14 a 17 años pueden usar la plataforma, pero con protección reforzada. El centro educativo podrá solicitar documentación para verificar la identidad y la edad del usuario.</p>

                                    <h5>5. Comunicación de datos a terceros</h5>
                                    <p>Los datos personales no se cederán a terceros, salvo:</p>
                                    <ul>
                                        <li>Obligación legal.</li>
                                        <li>Requerimiento de autoridades educativas o judiciales.</li>
                                        <li>Proveedores tecnológicos del centro (únicamente para mantenimiento técnico y bajo contrato de confidencialidad).</li>
                                    </ul>
                                    <p>En ningún caso se venderán datos ni se utilizarán con fines comerciales.</p>

                                    <h5>6. Conservación de los datos</h5>
                                    <p>Los datos se conservarán:</p>
                                    <ul>
                                        <li>Mientras el alumno esté matriculado y utilice MVMood.</li>
                                        <li>Durante un periodo máximo de 1 año tras la baja del alumno, para fines de seguridad y auditoría.</li>
                                    </ul>
                                    <p>Los contenidos publicados podrán eliminarse antes si el usuario lo solicita o si incumplen las normas.</p>

                                    <h5>7. Derechos de los usuarios</h5>
                                    <p>Los usuarios (o sus tutores legales) pueden ejercer los siguientes derechos:</p>
                                    <ul>
                                        <li>Acceso a sus datos.</li>
                                        <li>Rectificación de información incorrecta.</li>
                                        <li>Supresión de datos (“derecho al olvido”).</li>
                                        <li>Limitación del tratamiento.</li>
                                        <li>Oposición al tratamiento.</li>
                                        <li>Portabilidad de los datos.</li>
                                    </ul>
                                    <p>Las solicitudes deberán enviarse a: 📧 [correo del centro o del delegado de protección de datos]</p>

                                    <h5>8. Seguridad de la información</h5>
                                    <p>El centro educativo implementa medidas técnicas y organizativas para proteger los datos, incluyendo:</p>
                                    <ul>
                                        <li>Cifrado de comunicaciones.</li>
                                        <li>Control de acceso mediante credenciales institucionales.</li>
                                        <li>Sistemas de detección de actividad sospechosa.</li>
                                        <li>Copias de seguridad seguras.</li>
                                    </ul>
                                    <p>El usuario también debe proteger su cuenta no compartiendo su contraseña.</p>

                                    <h5>9. Uso de imágenes y contenido multimedia</h5>
                                    <p>Las imágenes o vídeos que incluyan a otros alumnos solo podrán publicarse si cuentan con su consentimiento. El centro podrá retirar cualquier contenido que vulnere derechos de imagen o privacidad. El contenido publicado en MVMood no puede difundirse fuera de la plataforma sin autorización.</p>

                                    <h5>10. Cookies y tecnologías similares</h5>
                                    <p>MVMood utiliza cookies técnicas necesarias para:</p>
                                    <ul>
                                        <li>Mantener la sesión iniciada.</li>
                                        <li>Garantizar la seguridad del sistema.</li>
                                        <li>Mejorar la experiencia de uso.</li>
                                    </ul>
                                    <p>No se utilizan cookies de publicidad ni de seguimiento externo.</p>

                                    <h5>11. Modificaciones de la Política de Privacidad</h5>
                                    <p>El centro educativo podrá actualizar esta Política cuando sea necesario. Los usuarios serán informados a través de la plataforma.</p>

                                    <h5>12. Contacto</h5>
                                    <p>Para cualquier consulta sobre privacidad o protección de datos: 📧 933 81 90 05</p>
                                    <p>🏫 Avinguda d'Eduard Maristany 59, 08930 Sant Adrià de Besòs, Barcelona</p>

                                    <p>Las siguientes normas tienen como objetivo garantizar un espacio seguro, respetuoso y positivo para todos los alumnos que utilizan MVMood. Al usar la plataforma, el usuario acepta cumplir estas reglas.</p>

                                    <h5>1. Respeto entre usuarios</h5>
                                    <p>Todos los miembros de MVMood deben tratarse con respeto. No se tolerarán:</p>
                                    <ul>
                                        <li>Insultos, burlas o lenguaje ofensivo</li>
                                        <li>Comentarios discriminatorios por raza, género, orientación, religión, discapacidad o apariencia</li>
                                        <li>Amenazas o intimidación</li>
                                        <li>Acoso individual o grupal (bullying o ciberbullying)</li>
                                    </ul>
                                    <p>El respeto es obligatorio en publicaciones, comentarios, mensajes privados y cualquier interacción dentro de la plataforma.</p>

                                    <h5>2. Prohibición de acoso y conductas dañinas</h5>
                                    <p>Queda estrictamente prohibido:</p>
                                    <ul>
                                        <li>Enviar mensajes repetitivos o no deseados</li>
                                        <li>Difundir rumores o información falsa sobre otros alumnos</li>
                                        <li>Compartir capturas de pantalla o conversaciones sin permiso</li>
                                        <li>Publicar contenido destinado a humillar o ridiculizar a alguien</li>
                                    </ul>
                                    <p>Cualquier forma de acoso será tratada como falta grave y podrá conllevar sanciones escolares.</p>

                                    <h5>3. Uso adecuado de imágenes y contenido multimedia</h5>
                                    <p>Para proteger la privacidad de todos:</p>
                                    <ul>
                                        <li>No se pueden publicar fotos o vídeos de otros alumnos sin su consentimiento.</li>
                                        <li>No se permite contenido que muestre situaciones comprometidas, inapropiadas o privadas.</li>
                                        <li>No se permite grabar dentro del centro educativo sin autorización.</li>
                                        <li>Está prohibido difundir fuera de MVMood cualquier contenido publicado dentro de la plataforma.</li>
                                    </ul>

                                    <h5>4. Contenido permitido y contenido prohibido</h5>
                                    <p>✔️ Contenido permitido:</p>
                                    <ul>
                                        <li>Publicaciones relacionadas con actividades escolares</li>
                                        <li>Proyectos, logros, eventos, trabajos creativos</li>
                                        <li>Conversaciones respetuosas entre alumnos</li>
                                        <li>Información útil para la comunidad educativa</li>
                                    </ul>
                                    <p>❌ Contenido prohibido:</p>
                                    <ul>
                                        <li>Violencia, amenazas o incitación al daño</li>
                                        <li>Contenido sexual o sugerente</li>
                                        <li>Drogas, alcohol o actividades ilegales</li>
                                        <li>Spam, publicidad o enlaces externos no autorizados</li>
                                        <li>Suplantación de identidad</li>
                                        <li>Lenguaje ofensivo o inapropiado</li>
                                    </ul>

                                    <h5>5. Seguridad y privacidad</h5>
                                    <p>Los usuarios deben:</p>
                                    <ul>
                                        <li>Mantener su contraseña en secreto</li>
                                        <li>No compartir su cuenta con nadie</li>
                                        <li>No intentar acceder a cuentas ajenas</li>
                                        <li>No manipular el sistema ni intentar vulnerar la seguridad</li>
                                    </ul>
                                    <p>El incumplimiento puede suponer la suspensión inmediata de la cuenta.</p>

                                    <h5>6. Uso responsable del chat y mensajes privados</h5>
                                    <p>El chat es una herramienta para comunicarse de forma rápida y respetuosa. Está prohibido:</p>
                                    <ul>
                                        <li>Enviar mensajes ofensivos o inapropiados</li>
                                        <li>Molestar o presionar a otros usuarios</li>
                                        <li>Compartir información personal sensible</li>
                                        <li>Crear grupos con fines de exclusión o burla</li>
                                    </ul>

                                    <h5>7. Moderación y denuncias</h5>
                                    <p>MVMood cuenta con un sistema de moderación gestionado por el centro educativo. Los usuarios pueden denunciar contenido inapropiado. El centro podrá revisar publicaciones, mensajes y actividad cuando sea necesario para garantizar la seguridad. Las denuncias falsas o malintencionadas también pueden ser sancionadas.</p>

                                    <h5>8. Sanciones por incumplimiento</h5>
                                    <p>Dependiendo de la gravedad, las sanciones pueden incluir:</p>
                                    <ul>
                                        <li>Advertencia privada</li>
                                        <li>Eliminación de contenido</li>
                                        <li>Suspensión temporal de la cuenta</li>
                                        <li>Suspensión definitiva</li>
                                        <li>Comunicación al tutor legal</li>
                                        <li>Aplicación de medidas disciplinarias del centro educativo</li>
                                    </ul>

                                    <h5>9. Convivencia y valores del centro</h5>
                                    <p>MVMood es una extensión digital del centro educativo. Por tanto, se aplican los mismos valores y normas de convivencia que en el entorno presencial:</p>
                                    <ul>
                                        <li>Respeto</li>
                                        <li>Inclusión</li>
                                        <li>Responsabilidad</li>
                                        <li>Colaboración</li>
                                        <li>Buen uso de la tecnología</li>
                                    </ul>

                                    <h5>10. Actualización de las normas</h5>
                                    <p>El centro educativo podrá actualizar estas normas cuando sea necesario. Los usuarios serán informados a través de la plataforma.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}