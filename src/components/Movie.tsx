import React, { FC } from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

type MovieProps = {
  Poster: string;
  Title: string;
  Year: Date;
};

const Movie: FC<MovieProps> = props => {
  const poster =
    props.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : props.Poster;
  return (
    <div className="movie">
      <h2>{props.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${props.Title}`}
          src={poster}
        />
      </div>
      <p>({props.Year})</p>
    </div>
  );
};

export default Movie;
