import React from "react";
import { Input } from "../Input/Input";
import { MovieList } from "../MovieList/MovieList";
import { useHomePageController } from "./useHomePageController";
import styles from "./Homepage.module.css";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const HomePage = () => {
    const {
        data: { movies, lastMovieRef, searchString, scrollProgress },
        methods: { handleChange },
    } = useHomePageController();

    return (
        <div className={styles.container}>
            <Input onChange={handleChange} value={searchString} />
            <ProgressBar scrollProgress={scrollProgress} />
            <MovieList movies={movies} ref={lastMovieRef} />
        </div>
    );
};
