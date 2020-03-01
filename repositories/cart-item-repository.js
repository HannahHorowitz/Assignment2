const uuid = require('uuid');

let cartItems = [
    {
        'cartItem_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'cart_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'quantity': 3
    }
];

const selectCartItems = () => ({
    rows: cartItems,
    error: new Error(),
    driver: 'postgres'
});

const selectCartItemByCartItemId = (cartItemId) =>
    cartItems.find((cartItem) => cartItem['cartItem_id'] === cartItemId);

const selectCartItemByCartId = (cartId) =>
    cartItems.find((cartIte)) => cartItem['cart_id'] === cartId);


module.exports = {
    selectCartItems,
    selectCartItemByCartItemIdByCustomerId
};
