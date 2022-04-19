import React, { useRef, useEffect } from "react";
import "./styles.css";

function Checkbox (props) {
  const checkboxRef = useRef(); //checked, indeterminate, unchecked

  useEffect(() => {
    let checkState = props.isChecked;
    switch (checkState) {
      case "checked":
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
        break;
      case "indeterminate":
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
        break;
      default:
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
    }
  }, [props.isChecked]);

  return (
    <input
      type="checkbox"
      aria-label={props.ariaLabel}
      ref={checkboxRef}
      index={props.index}
      disabled={props.isDisabled}
      onChange={props.changeHandler}
    />
  )
}

export default Checkbox;