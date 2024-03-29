import React, { FC, useState } from "react";

type SearchInputChangeEvent = React.FormEvent<HTMLInputElement> & {
  target: HTMLInputElement;
};

type SearchProps = {
  search: (searchValue: string) => void;
};

const Search: FC<SearchProps> = props => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: SearchInputChangeEvent) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
