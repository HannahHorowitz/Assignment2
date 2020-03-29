const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartbyCartId
} = require('../repositories/cart-repository');

const mapToModel = (cart) => ({
    cartId: cart['cart_id'],
    customerId: cart['customer_id'],
    createdDate: cart['created_date'],
    purchasedDate: cart['purchased_date']
});

const mapToDTO = (cart) => ({
  'cart_id': cart.cartId,
  'customer_id': cart.customerId,
  'created_date': cart.createdDate,
  'purchased_date': cart.purchasedDate
});
const getAllCarts = () => {
    const {rows} = selectCarts();

    return rows.map(mapToModel);
};

const addCart = (cart) => insertCart(mapToDTO(cart));
const modifyCart = (cart) => updateCart(mapToDTO(cart));
const removeCartByCartId = (cartId) => deleteCartByCartId(cartId);

const getCartByCartId = (cartId) => {
    const cart = selectCartByCartId(cartId);

    return mapToModel(cart);
};

const getCartsByCustomerId = (customerId) => {
    const {rows} = selectCartsByCustomerId(customerId);

    return rows.map(mapToModel);
};

module.exports = {
    addCart,
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    modifyCart,
    removeCartByCartId
};
