import React from 'react'
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ scrollProgress }) => {

    return (
        <div className={styles['outer-container']}>
            <div className={styles['inner-container']} style={{
                width: `${scrollProgress}%`
            }}>
            </div>
        </div>
    )
}
