import { useState } from 'react';
import HeaderLogged from '../components/HeaderLogged';
import Sidebar from '../components/Sidebar';
import '../indexZara.css';
import "../index.css";
import Footer from '../components/Footer';


export default function Chat () {
    //

    return (
        <>
            <HeaderLogged />
            
            <div className="container">
                <Sidebar />
            </div>

            <Footer />
        </>
    );
}