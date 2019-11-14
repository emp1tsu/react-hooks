import React, { FC, useEffect, useReducer, Reducer } from "react";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

enum ActionType {
  SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST",
  SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS",
  SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE"
}

type movie = {
  Poster: string;
  Title: string;
  Year: Date;
};

type IState = {
  loading: boolean;
  movies?: movie[];
  errorMessage?: string;
};

type IAction = {
  type: ActionType;
  payload?: movie[];
  error?: string;
};

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: ""
};

const reducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };
    case ActionType.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case ActionType.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App: FC = () => {
  const [{ movies, errorMessage, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json)
      .then((jsonResponse: any) => {
        dispatch({
          type: ActionType.SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES_REQUEST
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then((jsonResponse: any) => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: ActionType.SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: ActionType.SEARCH_MOVIES_FAILURE,
            error: jsonResponse.Error
          });
        }
      });
  };

  return (
    <div className="App">
      <Header text="react hooks" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies &&
          movies.map((movie: movie, index: number) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
