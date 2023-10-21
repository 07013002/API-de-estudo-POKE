import React, { useState } from "react";

const Searchbar = (props) => {
  const [search, setSearch] = useState(undefined);
  const {onSearch} = props;

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if(e.target.value.length === 0){
      onSearch(undefined);
    }
  };

  const OnButtonClickHandler = () => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Buscar Pokemon" onChange={onChangeHandler} />
      </div>
      <div className="searchbar-btn">
        <button onClick={OnButtonClickHandler}>Buscar</button>
      </div>
    </div>
  );
};

export default Searchbar;
