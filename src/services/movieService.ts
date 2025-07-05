import axios from "axios";
import type Movie from "../types/movie";

// Базова конфігурація axios
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

/**
 * Пошук фільмів за ключовим словом
 * @param query - текст запиту
 * @returns масив фільмів
 */
export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axiosInstance.get("/search/movie", {
    params: { query },
  });

  return response.data.results ?? [];
}
