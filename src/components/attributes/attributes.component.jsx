import React from "react";

import'./attributes.style.scss';


class Attribute extends React.Component {
    render () {
        const {attribute } = this.props
        console.log(this.props)

        if (attribute.type === 'text') {

            return (
           
                <div className="size">
                    <span className="item-size">{attribute.name}:</span>
                        <ul>
                            {
                                attribute.items.map(size => (
                                    <><input type="radio"
                                        className="radio-item"
                                        id={size.id}
                                        name={attribute.id}
                                        key={size.id}
                                        value={size.value} />
                                        <label for={size.id}
                                        className="radio-label"
                                        key={size.index} 
                                        onClick={() => this.props.onClick(size) }>

                                        {size.value}
                                        </label>
                                        
                                    </>
                                ) )
                            }
                        </ul>
                </div>
            )
            } else if ( attribute.type === 'swatch' ) {
                return ( 
                    <div className="color">
                        <span className="item-size">{attribute.name}:</span>
                            <ul>
                                {
                                    attribute.items.map(swatch => (
                                        <><input type="radio"
                                        className="radio-item"
                                        id={swatch.id}
                                        name={attribute.id}
                                        key={swatch.id}
                                         />
                                        <label for={swatch.id}
                                        className="color-item"
                                        key={swatch.value}
                                        style={{backgroundColor:`${swatch.value}`}}
                                        onClick={() => this.props.onClick(swatch) }
                                        />
                                        
                                    </>
                                     
                                    )
                                    )
                                }
                            </ul>
                    </div>
                )
            }  
    }
}


export default Attribute;