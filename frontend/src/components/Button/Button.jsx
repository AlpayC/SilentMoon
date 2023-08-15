import "./Button.css";

const Button = props => {
	return (
		<>
			<button className='main-btn'>{props.text}</button>
		</>
	);
};

export default Button;
