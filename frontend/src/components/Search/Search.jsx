import { useState } from "react";
import "./Search.css";

const SearchBar = ({ searchProp }) => {
  const [searchInput, setSearchInput] = useState("");

  const search = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    searchProp(value);
    console.log(value);
  };
  return (
    <>
      <section className="searchBar">
        <input
          type="text"
          className="searchInput"
          value={searchInput}
          onChange={search}
        />
      </section>
    </>
  );
};

export default SearchBar;
