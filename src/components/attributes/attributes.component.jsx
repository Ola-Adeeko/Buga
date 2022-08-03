import React from "react";

import "./attributes.style.scss";

class Attribute extends React.Component {
  handleChoice = (attributeName, itemID) => {
    if (!this.props.isCart) {
      this.props.onChange(attributeName, itemID);
    }
  };

  render() {
    const { attribute, selected } = this.props;
    const className = attribute.type === "text" ? "size" : "color";
    const showText = className !== "color";
    return (
      <div className={className}>
        <span className="item-size">{attribute.name}:</span>
        <ul>
          {attribute.items.map((item) => (
            <>
              <input
                type="radio"
                className="radio-item"
                key={item.id}
                id={item.id}
                name={attribute.id}
                checked={selected ? selected[attribute.id] === item.id : false}
                disabled={this.props.isCart}
                onChange={() => this.handleChoice(attribute.name, item.id)}
              />
              <label
                htmlFor={item.id}
                className={
                  attribute.id === "Color" ? "color-item" : "radio-label"
                }
                disabled={this.props.isCart}
                style={
                  attribute.id === "Color"
                    ? { backgroundColor: `${item.value}` }
                    : {}
                }
                onClick={() => this.handleChoice(attribute.name, item.id)}
              >
                {showText ? item.value : ""}
              </label>
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default Attribute;
