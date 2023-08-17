import "./MasonryItem.css";

const MasonryItem = ({ item, height }) => {
  return (
    <div
      style={{ backgroundImage: `url(${item.image_url})`, height: height }}
      className="masonry-item"
    >
      {item.title}
    </div>
  );
};

export default MasonryItem;
