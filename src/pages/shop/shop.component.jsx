import React from "react";


import CollectionPreview from "../../components/collection-preview/collection-preview.component";



class ShopPage extends React.Component {
    render () {
        
        return (
            <div className="shop-page" >
            
                <CollectionPreview name={this.props.match.params.category} />
                
           
            </div>
            );
    
    }        
};


export default ShopPage;