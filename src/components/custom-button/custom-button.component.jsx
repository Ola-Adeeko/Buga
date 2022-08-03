import React from "react";

import "./custom-button.style.scss";

class CustomButton extends React.Component {
  render() {
    const { children, inverted, outStock, ...otherProps } = this.props;
    return (
      <button
        className={`${inverted ? "inverted" : ""}  ${
          outStock ? "out-stock" : ""
        } custom-button`}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default CustomButton;
