import axios from "axios";
import type { Movie } from "../types/movie";

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Базова конфігурація axios
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axiosInstance.get<SearchMoviesResponse>("/search/movie", {
    params: { query },
  });

  return response.data.results ?? [];
}
