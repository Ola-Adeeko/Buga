import React from "react";

import'./selected.style.scss';


class Selected extends React.Component {
    

    handleChoice = (attributeName, itemID) => {
        
        this.props.onChange(attributeName, itemID)
    }

    render () {
        const {attribute } = this.props
        const { selected } = this.props

        const entry = attribute.items.entries()
        console.log(Object.values(selected))

        for (let x of entry) {
            if (Object.values(selected) === Object.values(x) ) {
                console.log(x, "is it")
            } else {
                console.log(Object.values(x))
            }
        }

        
        if (Object.values(attribute.items).includes(selected)){
            console.log('it is correct')
        } else {
            console.log('bobooo')
        }

        console.log(attribute)
        console.log(selected)

        if (attribute.type === 'text') {

            return (
           
                <div className="size">
                    <span className="item-size">{attribute.name}:</span>
                        <ul>
                            {
                                attribute.items.map((text, index) => (
                                    <><input type="radio"
                                        className="radio-item"
                                        id={text.id}
                                        name={attribute.id}
                                        key={text.id}
                                        value={text} />
                                        <label for={text.id} className="radio-label"  key={index} 
                                            onClick={() => this.handleChoice(attribute.name, text.value )}
                                        >
                                            {text.value}
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
                                        onClick={() => this.handleChoice(attribute.name, swatch.id )}
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


export default Selected;