import "./MasonryItem.css";
import { Link } from "react-router-dom";

const MasonryMeditateItem = ({ item, height }) => {
  return (
    <Link
      to={{
        pathname: `/category/meditation/${item.id}`,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${item.images[0].url})`,
          height: height,
        }}
        className="masonry-item"
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MasonryMeditateItem;
