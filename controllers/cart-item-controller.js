const {
    getAllCartItems,
    getCartItemByCartItemId
} = require('../services/cart-item-service');
const {getCartItemByCartItemId} = require('../services/cart-item-service');

const getCartItemsByCartItemsRoute = (server) => {
    server.route({
        path: '/cartItems/{cartItemId}/cartItems',
        method: 'GET',
        handler: (request, h) => {
            const cartItemId = request.params.cartItemId;
            const cartItem = getCartItemByCartItemId(cartItemId);

            if (!cartItem) {
                return h.response().code(404);
            }

            return getCartItemByCartItemId(cartItemId);
        }
    });
};

const getCartItemsRoute = (server) => {
    server.route({
        path: '/cartItems',
        method: 'GET',
        handler: (request, h) => {
            return getAllCartItems();
        }
    });
};

const getCartItemByCartItemIdRoute = (server) => {
    server.route({
        path: '/cartItems/{cartItemId}',
        method: 'GET',
        handler: (request, h) => {
            const cartItem = getCartItemByCartItemId(request.params.cartItemId);

            if (!cartItem) {
                return h.response().code(404);
            }

            return cartItem;
        }
    });
};

const getCartItemByCartIdRoute = (server) => {
    server.route({
        path: '/cartItems/{cartId}',
        method: 'GET',
        handler: (request, h) => {
            const cartItem = getCartItemByCartId(request.params.cartId);

            if(!cartItem){
              return h.response().code(404);
            }

            return cartItem;
        }
    });
};

const initCartItemControllers = (server) => {
    getCartItemsRoute(server);
    getCartItemByCartItemIdRoute(server);
    getCartItemByCartIdRoute(server);
};

module.exports = {
    initCartItemControllers
};
