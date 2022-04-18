import React from "react";

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