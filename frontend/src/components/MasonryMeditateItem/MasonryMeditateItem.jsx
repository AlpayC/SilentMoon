import "./MasonryItem.css";
import { Link } from "react-router-dom";

const MasonryMeditateItem = ({ item, height }) => {
  return (
    <Link
      to={`/category/meditation/${item.id}`}
      state={{ playlistData: item }}
    >
      <div
        style={{
          backgroundImage: `url(${item?.picture_medium || item?.picture || ''})`,
          height: height,
        }}
        className="masonry-item"
      >
        {item?.title || 'Untitled'}
      </div>
    </Link>
  );
};

export default MasonryMeditateItem;
