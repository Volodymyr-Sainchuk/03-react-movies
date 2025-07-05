import SearchBar from "../SearchBar/SearchBar";
import type Movie from "../../types/movie";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoader] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoader(true);
      try {
        console.log("Fetching");
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
          params: { query },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });

        const data = response.data;

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          toast.error("Фільми за цим запитом не знайдено.");
          setMovies([]);
        }
      } catch (error) {
        setHasError(true);
        console.error("Помилка при пошуку фільмів:", error);
        toast.error("Сталася помилка під час пошуку.");
        setMovies([]);
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {loader && <Loader />}
      {hasError ? <ErrorMessage /> : movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </>
  );
}
