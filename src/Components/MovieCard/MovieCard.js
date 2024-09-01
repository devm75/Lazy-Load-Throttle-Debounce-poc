import React, { forwardRef } from 'react'
import styles from './MovieCard.module.css';

export const MovieCard = forwardRef((movieDetails, ref) => {


    const { Title, Year, imdbID, Poster, index, } = movieDetails;

    return (
        <div ref={ref} className={styles['outer-container']} id={`movie-${index}`}>
            <div className={styles['inner-container']}>
                <img className={styles['image-movie']} src={Poster} />
                <h2 className={styles['movie-title']}>{Title}</h2>
                <p className={styles['movie-year']}>{Year}</p>
            </div>
        </div>
    )
})
