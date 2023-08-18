import "./MasonryItem.css";
import { Link } from "react-router-dom";

const MasonryItem = ({ item, height }) => {
  return (
    <Link
      to={{
        pathname: `/category/yoga/${item._id}`,
      }}
    >
      <div
        style={{ backgroundImage: `url(${item.image_url})`, height: height }}
        className="masonry-item"
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MasonryItem;
