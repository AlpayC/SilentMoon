import React from "react";
import "./Button.css";

const Button = React.memo(({ 
  text, 
  onClick, 
  type = "button", 
  className = "main-btn", 
  disabled = false 
}) => {
  return (
    <button 
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
