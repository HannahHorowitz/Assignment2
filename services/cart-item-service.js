const {
    selectCartItems,
    selectCartItemByCartItemId
} = require('../repositories/cart-item-repository');

const mapToModel = (cartItem) => ({
    cartItemId: cartItem['cartItem_id'],
    cartId: cartItem['cart_id']
    quantity: cartItem['quantity']
});

const getAllCartItems = () => {
    const {rows} = selectCartItems();

    return rows.map(mapToModel);
};

const getCartItemByCartItemId = (cartItemId) => {
    const cartItem = selectCartItemByCartItemId(cartItemId);

    return mapToModel(cartItem);
};

const getCartItemByCartId = (cartId) => {
    const cartItem = selectCartItemByCartId(cartId);

    return mapToModel(cartItem)
}

module.exports = {
    getAllCartItems,
    getCartItemByCartItemId
    getCartItemByCartId
};
