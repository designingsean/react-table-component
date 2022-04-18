import React from "react";
import "./styles.css";

function Button (props) {
  return (
    <button
      onClick={props.clickHandler}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;