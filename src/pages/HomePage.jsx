import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../languages/Languages';
import HeaderZara from "../components/HeaderZara";
import "../indexZara.css";
import { usePosts } from '../hooks/usePosts';
//import { UserContext } from '../contexts/user.context';
import Footer from "../components/Footer";
import CreatePostForm from '../components/CreatePostForm';
import Button from '../components/Button';
import Post from '../components/Post';


export default function HomePage() {

    //const {error, setError} = useContext(UserContext);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const { t } = useLanguage();
    const {getPosts, create, publicaciones} = usePosts();


    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (showCreatePost && publicaciones?.data) {
            setShowCreatePost(false);
        }
    }, [publicaciones]);

    const onCreated = () => {
        getPosts();
        setShowCreatePost(false);
    }

    return (
        <>
            <HeaderZara />

            <div className="container">
                <Sidebar />

                <div className="main">
                    {publicaciones?.mensaje && <p className="ok">{publicaciones.mensaje}</p>}
                    {publicaciones?.error && <p className="error">{publicaciones.error}</p>} 

                    <Button onClick={() => setShowCreatePost(!showCreatePost)}>
                        {showCreatePost ? "Close" : "Create Post"}
                    </Button>

                    {showCreatePost && (<CreatePostForm onCreated={onCreated} />)}

                    {!publicaciones?.data || publicaciones.data.length === 0 ? (
                        <div className="post">
                            <p>{t('no_posts')}</p>
                        </div>
                    ) : (
                        publicaciones.data.map((p) => (
                            <div className="post" key={p.id}>
                                <Post post={p} updated={getPosts} deleted={getPosts} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
}