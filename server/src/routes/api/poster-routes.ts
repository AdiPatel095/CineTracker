import express, { Request, Response } from 'express';

const router = express.Router();

export const movieFetch = async (req: Request, res: Response) => {
    const api_key = process.env.TMDB_API_KEY;
    const { Year: year = "", Genre: genre = "" } = req.body;
  
    // Base URL and fixed end parameters
    const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US`;
    const sortParam = `&sort_by=popularity.desc`;
  
    // Build additional query parameters based on provided values
    const yearParam = year ? `&primary_release_year=${year}` : "";
    const genreParam = genre ? `&with_genres=${genre}` : "";
  
    // Construct final URL
    const finalUrl = `${baseUrl}${yearParam}${genreParam}${sortParam}`;
  
    try {
      const response = await fetch(finalUrl);
      const data = await response.json();
      return res.json(data);
    } catch (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).json({ error: "An error occurred while fetching movies." });
    }
};

export const tvFetch = async (req: Request, res: Response) => {
    const api_key = process.env.TMDB_API_KEY;
  const { Year: year = "", Genre: genre = "" } = req.body;

  // Base URL and fixed end parameters
  const baseUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&page=10`;
  const sortParam = `&sort_by=popularity.desc`;

  // Build additional query parameters based on provided values
  const yearParam = year ? `&primary_release_year=${year}` : "";
  const genreParam = genre ? `&with_genres=${genre}` : "";

  // Construct final URL
  const finalUrl = `${baseUrl}${yearParam}${genreParam}${sortParam}`;

  try {
    const response = await fetch(finalUrl);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error fetching movies:", err);
    return res.status(500).json({ error: "An error occurred while fetching movies." });
  }
};


router.post('/movie', movieFetch);
router.post('/tv', tvFetch);

export { router as posterRouter };