import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HeaderLogged from '../components/HeaderLogged';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import userImg from "../assets/settingsprofile/user.png";
import Footer from "../components/Footer";


export default function ProfilePage({ data }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [actionStatus, setActionStatus] = useState('');
  const { t } = useLanguage();
  const id = Number(userId);

  const userPosts = data?.publicaciones?.filter((post) => post.idUsuario === id) || [];
  const userData = data?.users?.find((user) => user.id === id) || {
    id,
    nickname: userPosts?.[0]?.nickname || t('unknown_user'),
    foto: userPosts?.[0]?.usuario_foto || {userImg},
    bio: t('no_bio'),
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleAction = (type) => {
    setActionStatus(type);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  return (
    <>
      <HeaderLogged />
      <div className="container">
        <Sidebar />

        <div className="main">
          <div className="profile-page-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← {t('back')}
            </button>
            <h2>{t('view_profile')}</h2>
          </div>

          <div className="profile-hero">
            <div className="profile-hero-info">
              <img
                src={userData.foto ? `/images/${userData.foto}` : {userImg}}
                alt={userData.nickname}
                className="profile-avatar hero-avatar"
              />
              <div className="profile-hero-details">
                <div className="profile-hero-title-row">
                  <div>
                    <h2>{userData.nickname}</h2>
                    <p className="profile-handle">@{userData.nickname.toLowerCase()}</p>
                  </div>
                  <div className="profile-menu-wrapper">
                    <button
                      className="profile-menu-toggle"
                      onClick={toggleMenu}
                      aria-label={t('more_options')}
                    >
                      ⋯
                    </button>
                    {menuOpen && (
                      <div className="profile-menu">
                        <button
                          className="profile-menu-item"
                          onClick={() => handleAction('blocked')}
                        >
                          {t('block_user')}
                        </button>
                        <button
                          className="profile-menu-item"
                          onClick={() => handleAction('reported')}
                        >
                          {t('report_user')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="profile-bio">{userData.bio}</p>
                <div className="profile-stats">
                  <div className="profile-stat minimal">
                    <strong>{userPosts.length}</strong>
                    <span>{t('profile_posts')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {actionStatus && (
            <div className={`profile-action-message ${actionStatus}`}>
              {actionStatus === 'blocked' ? t('user_blocked') : t('user_reported')}
            </div>
          )}

          <div className="profile-posts">
            <h3>{t('user_posts')}</h3>
            {userPosts.length === 0 ? (
              <div className="post">
                <p>{t('no_posts')}</p>
              </div>
            ) : (
              userPosts.map((post) => (
                <div className="profile-post-card" key={post.id}>
                  <div className="post-card-header">
                    <Link to={`/profile/${post.idUsuario}`} className="profile-link">
                      <img
                        src={post.usuario_foto ? `/images/${post.usuario_foto}` : {userImg}}
                        alt={post.nickname}
                        className="avatar"
                      />
                    </Link>
                    <div>
                      <Link to={`/profile/${post.idUsuario}`} className="profile-link">
                        <div className="post-author">{post.nickname}</div>
                      </Link>
                      <div className="post-meta">
                        {new Date(post.fecha).toLocaleString('es-ES')}
                      </div>
                    </div>
                  </div>
                  <div className="post-card-text">{post.contenido}</div>
                  <div className="post-card-footer">
                    <span>❤️ {post.likes || 0}</span>
                    <span>💬 {post.comments || 0}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
