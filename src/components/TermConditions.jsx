import styles from '../styles/TermConditions.module.css';
import { useState } from 'react';

export default function TermConditions ({ accepted, setAccepted }) {

    const handleCheckbox = (e) => {
        //console.log(e);
        setAccepted(e.target.checked);
    }

    return (
        <>
            <iframe className={styles.termConditions} src='/TermConditions.html'></iframe>
            <label>
                <input type="checkbox" checked={accepted} onChange={handleCheckbox} />
                <span> I accept terms and conditions</span>
            </label>
        </>
    );
}