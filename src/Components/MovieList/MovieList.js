import React, { forwardRef } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MovieList.module.css";

export const MovieList = forwardRef((props, ref) => {

    return (
        <div className={styles["outer-container"]}>
            {props?.movies?.map((movie, index) => (
                <MovieCard
                    key={movie.imdbID + index * 3}
                    {...movie}
                    index={index}
                    ref={index === props?.movies?.length - 1 ? ref : null}
                />
            ))}
        </div>
    );
});
