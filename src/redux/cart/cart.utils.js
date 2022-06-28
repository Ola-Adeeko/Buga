export const addItemToCart = (cartItems, cartItemToAdd, attribute) => {
    const product = cartItems?.find((cartItem => cartItem?.attributes.find((att => att?.items.find(type => type?.id) === attribute.id))))
    const attributeName  = product?.attributes.find((att => att?.items.find(type => type?.id) === attribute.id));
    const attributeSpec = attributeName?.items.find(type => type?.id === attribute.id)

    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if(attributeSpec?.id === attribute?.id) {
        console.log('checked')
    }
    if (existingCartItem) {
        return cartItems.map(cartItem =>
           ( cartItem.id === cartItemToAdd.id )
            ? ({ ...cartItem, quantity: cartItem.quantity + 1 })
            : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if ( existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity -1 }
        : cartItem
    );
} 
