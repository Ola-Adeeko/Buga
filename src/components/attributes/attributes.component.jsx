import React from "react";

import'./attributes.style.scss';


class Attribute extends React.Component {
    render () {
        const {attribute } = this.props

        if (attribute.type === 'text') {

            return (
           
                <div className="size">
                    <span className="item-size">{attribute.name}:</span>
                        <ul>
                            {
                                attribute.items.map(size => (
                                    <li className='size-item' key={size.id} >{size.value} </li>
                                
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
                                      <li  className='color-item $' style={{backgroundColor:`${swatch.value}`}} key={swatch.id}></li>
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