import React from "react";
import { NavLink } from "react-router-dom";

import "./header.style.scss";

class HeaderOptions extends React.Component {
  render() {
    const { category } = this.props;
    return (
      <NavLink to={`/shop/${category.name}`}>
        <div className="option">{category.name}</div>
      </NavLink>
    );
  }
}

export default HeaderOptions;
