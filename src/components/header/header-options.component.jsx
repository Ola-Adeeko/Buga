import React from "react";
import { NavLink } from "react-router-dom";

import "./header.style.scss";

class HeaderOptions extends React.Component {
  render() {
    const { category, onClick } = this.props;
    return (
      <NavLink to={`/shop/${category.name}`}>
        <div
          // className={
          //   window.location.pathname === `/shop/${category.name}`
          //     ? "option-active"
          //     : "option"
          // }
          onClick={onClick}
          className="option"
        >
          {category.name}
        </div>
      </NavLink>
    );
  }
}

export default HeaderOptions;
