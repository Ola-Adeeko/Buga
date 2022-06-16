import React from "react";

import './custom-button.style.scss';

class CustomButton extends React.Component {
    render() {
        const { children, isGoogleSignIn, inverted, outStock, ...otherProps } = this.props
        return (
            <button
                className={`${inverted ? 'inverted': ''}  ${outStock ? 'out-stock': ''} ${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} 
                {...otherProps}
                >
                {children}
            </button>
        )
    }
}

export default CustomButton;

