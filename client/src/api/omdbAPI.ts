// api/omdbAPI.ts

// Define the structure of the movie details data based on OMDB API response
export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    imdbID: string;
    Type: string;
    Response: string;
  }
  
  export const getMovieDetails = async (movieID: string): Promise<MovieDetails> => {
    const apiKey = '6c7a3f86';  // Replace with your OMDB API key
    const url = `http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`;
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
  
    const data: MovieDetails = await response.json();  // Type the response as MovieDetails
    return data;
  };
  