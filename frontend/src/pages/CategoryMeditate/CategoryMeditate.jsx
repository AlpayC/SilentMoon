import React, { useState, useEffect, useContext } from "react";
import Logo from "../../components/Logo/Logo";
import NavBar from "../../components/NavBar/NavBar";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import SearchBar from "../../components/Search/Search";

import { MusicDataContext } from "../../context/MusicDataContext";
import MasonryMeditateItem from "../../components/MasonryMeditateItem/MasonryMeditateItem";

import "./CategoryMeditate.css";

import MiniPlayerYoga from "../../components/MiniPlayerYoga/MiniPlayerYoga";

const CategoryMeditate = () => {
  const getRandomHeight = () => {
    const minHeight = 12; // Minimum height in rem
    const maxHeight = 25; // Maximum height in rem
    return (
      (Math.random() * (maxHeight - minHeight) + minHeight).toFixed(2) + "rem"
    );
  };

  const { playlistData } = useContext(MusicDataContext);
  const initialItemsToShow = 4; // Number of items to show initially
  const itemsPerLoad = 2; // Number of items to load per click
  const [visibleItems, setVisibleItems] = useState(initialItemsToShow);

  //NEU
  const [searchInput, setSearchInput] = useState("");
  const [searchResultMessage, setSearchResultMessage] = useState("");
  //Bis HIER

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
  };

  //NEU
  const filteredPlaylists = playlistData?.data?.playlists?.items.filter(
    (item) => item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (filteredPlaylists?.length > 0) {
      setSearchResultMessage("");
    } else {
      setSearchResultMessage("No matching results.");
    }
  }, [filteredPlaylists]);
  //Bis HIER

  return (
    <>
      <div className="main-wrapper center">
        <Logo className={"logo-black"} />
        <h1 className="padding-top-bottom">Meditate</h1>
        <p className="padding-top-bottom-sm padding-left-right">
          Audio-only meditation techniques to help you minimize your screen time
          and practice on the go.
        </p>
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <MiniPlayerYoga category={"meditation"} />
        {/* NEU */}
        <div className="masonry-container">
          {filteredPlaylists?.length > 0 ? (
            filteredPlaylists
              ?.slice(0, visibleItems)
              .map((item) => (
                <MasonryMeditateItem
                  key={item.id}
                  item={item}
                  height={getRandomHeight()}
                />
              ))
          ) : (
            <p>{searchResultMessage || "No matching results."}</p>
          )}
        </div>
        {/* Bis HIER */}
        {visibleItems < (filteredPlaylists?.length || 0) && (
          <LoadMoreButton onClick={loadMoreItems} />
        )}

        <NavBar />
      </div>
    </>
  );
};

export default CategoryMeditate;

/* 	return (
		<>
			<div className='main-wrapper center'>
				<Logo className={"logo-black"} />
				<h1 className='padding-top-bottom'>Meditate</h1>
				<p className='padding-top-bottom-sm padding-left-right'>
					Audio-only meditation techniques to help you minimize your screen time
					and practice on the go.
				</p>
				<SearchBar />
				<MiniPlayerYoga category={"meditation"} />
				<div className='masonry-container'>
					{playlistData?.data?.playlists?.items
						.slice(0, visibleItems)
						.map(item => (
							<MasonryMeditateItem
								key={item.id}
								item={item}
								height={getRandomHeight()}
							/>
						))}
				</div>

				{visibleItems < (playlistData?.data?.playlists?.items.length || 0) && (
					<LoadMoreButton onClick={loadMoreItems} />
				)}

				<NavBar />
			</div>
		</>
	);
};

export default CategoryMeditate;
 */
