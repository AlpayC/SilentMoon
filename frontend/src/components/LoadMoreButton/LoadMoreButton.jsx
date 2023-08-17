import "./LoadMoreButton.css"

const LoadMoreButton = ({onClick}) => {
    return (
        <button className="load-more-button" onClick={onClick}>
        • • •
      </button>
    );
}
 
export default LoadMoreButton;