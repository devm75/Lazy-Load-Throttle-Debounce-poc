import { useCallback, useEffect, useRef, useState } from "react";
import { debounced, throttled, uniqBy } from "../../utils";
import { keys } from "../../utils/keys";


export const useHomePageController = () => {

    const [searchString, setSearchString] = useState('spider man');
    const inputRef = useRef(null);
    const [movies, setMovies] = useState([])
    const handleChange = (e) => {

        const value = e.target.value;
        setSearchString(value);
        getDebouncedMovies(value, page);

    }
    const lastMovieRef = useRef(null);
    const [totalResults, setTotalResults] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const calculateScrollProgress = () => {

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;
        setScrollProgress(scrollPercentage);
    }
    const [page, setPage] = useState(1);
    const observerRef = useRef(null);

    const getMovieDetails = async (searchValue, page = 1) => {

        try {
            if (searchValue.length > 0) {

                if (totalResults && totalResults <= page * 10) return
                let response = await fetch(`${keys.OMDB_BASE_URL}&s=${searchValue}&page=${page}`);
                response = await response.json();
                if (response.Response === "True") {

                    let finalMoviesList = [...movies, ...response.Search];
                    finalMoviesList = uniqBy(finalMoviesList, 'imdbID');
                    setMovies(finalMoviesList);
                    setTotalResults(Number(response?.totalResults));
                }
            }
            else {
                setMovies([]);
                setPage(1);
            }

        }
        catch (error) {
            console.log(error, 'error');
        }

    }
    const getDebouncedMovies = useCallback(debounced(getMovieDetails, 1500), [movies, page]);

    useEffect(() => {
        getDebouncedMovies(searchString, page)
    }, [page])

    const callback = useCallback((entries, observer) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setPage(prev => prev + 1)
            }
        });

    }, [])

    useEffect(() => {

        if (movies.length) {
            if (observerRef.current) observerRef.current.disconnect();

            if (lastMovieRef.current) {
                const observer = new IntersectionObserver(callback);
                observerRef.current = observer
                observerRef.current.observe(lastMovieRef.current)
            }

        }

        return () => {
            if (observerRef.current)
                observerRef.current.disconnect();
        }
    }, [movies])

    useEffect(() => {
        window.addEventListener('scroll', throttled(calculateScrollProgress, 600));

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('scroll', throttled(calculateScrollProgress), 600);
        };
    }, []);


    return ({
        data: { searchString, inputRef, lastMovieRef, movies, scrollProgress },
        methods: { handleChange }
    }
    )
}
