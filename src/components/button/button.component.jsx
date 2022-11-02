import React from "react";

import "./button.style.css";

export const BUTTON_TYPE_CLASSES = {
  checkOut: "check-out",
  viewBag: "view-bag",
};

class Button extends React.Component {
    render(){
        const { children, buttonType, ...otherProps } = this.props;
        return (
            <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
            >
            {children}
            </button>
        )
    }
  
};

export default Button;