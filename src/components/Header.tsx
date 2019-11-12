import React, { FC } from "react";

type HeaderProps = {
  text: string;
};

const Header: FC<HeaderProps> = props => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};

export default Header;
