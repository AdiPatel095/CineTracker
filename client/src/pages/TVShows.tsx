import { CardData } from "../interfaces/CardData";
import { PosterReqData } from "../interfaces/PosterReqData";
import { useEffect, useState } from "react";
import YearDropdown from "../components/YearDropdown";
import GenreDropdown from "../components/GenreDropdown";
import { getPosters } from "../api/postersAPI";
import CardSection from "../components/Cards";

const TVShows = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [reqData, setReqData] = useState<PosterReqData>({ Type: "tv" });


  // Handlers for updating the request data
  const handleYearChange = (year: string) => {
    setReqData((prevReqData) => ({
      ...prevReqData,
      Year: year,
    }));
  };

  const handleGenreChange = (genreId: number | null) => {
    setReqData((prevReqData) => ({
      ...prevReqData,
      Genre: genreId === null ? undefined : genreId,
    }));
  };

  useEffect(() => {
    getPosters(reqData)
      .then((data) => {
        console.log(data);
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reqData]);

  return (
    <>
      <YearDropdown onYearChange={handleYearChange}/>
      <GenreDropdown onGenreChange={handleGenreChange} type={reqData.Type as "movie" | "tv"}/>
      <div className="card-parent-container">
        {cards.map((card, index) => (
                  <CardSection {...card} key={index}/>
                ))}
      </div>
    </>
  );
};

export default TVShows;
