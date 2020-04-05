const uuid = require('uuid');

const {
    addCart,
    getAllCarts,
    getCartByCartId,
    getCartsByCustomerId,
    modifyCart,
    removeCartByCartId
} = require('../../services/cart-service');
const {
    insertCart,
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    updateCart,
    deleteCartByCartId
} = require('../../repositories/cart-repository');

jest.mock('../../repositories/cart-repository');

describe('cart service', () => {
    let expectedFirstCart,
        expectedFirstCartId,
        expectedCustomerId,
        expectedSecondCart,
        expectedCartFromDatabase;

    beforeEach(() => {
        expectedFirstCartId = uuid.v4();
        expectedCustomerId = uuid.v4();

        expectedFirstCart = {
            cartId: expectedFirstCartId,
            customerId: expectedCustomerId
        };

        expectedCartFromDatabase ={
          'cartId': expectedCartId,
          'customerId': expectedCart.customerId,
          'created_date': expectedCart.created_date,
          'purchased_date': expectedCart.purchased_date
        };

        insertCart.mockReturnValue(expectedCart);

        selectCarts.mockReturnValue({
            rows: [expectedCartFromDatabase]
        });

        selectCartsByCustomerId.mockReturnValue({
            rows: [{
                'cart_id': expectedFirstCartId,
                'customer_id': expectedCustomerId
            }]
        });

        selectCartByCartId.mockReturnValue(expectedCartFromDatabase);
        updateCart.mockReturnValue(expectedCartFromDatabase);
        deleteCartByCartId.mockReturnValue(expectedCartFromDatabase);
    });

    it('should insert a new customer', () => {
      const actualNewCart = addCart(expectedCart);

      expect(insertCart).toHaveBeenCalledTimes(1);
      expect(insertCart).toHaveBeenCalledWith(expectedCart);
    });

    it('should get all the carts', () => {
        const actualCarts = getAllCarts();

        expect(selectCarts).toHaveBeenCalledTimes(1);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });

    it('should get a cart by a specific cartId', () => {
        const actualCart = getCartByCartId(expectedFirstCartId);

        expect(selectCartByCartId).toHaveBeenCalledTimes(1);
        expect(selectCartByCartId).toHaveBeenCalledWith(expectedFirstCartId);

        expect(actualCart).toEqual(expectedFirstCart);
    });

    it('should get all the carts by customerId', () => {
        const actualCarts = getCartsByCustomerId(expectedCustomerId);

        expect(selectCartsByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });

    it('should return null if there is no cart by cartId', () => {
      selectCartByCartId.mockReturnValue(null);

      const actualCart = getCartByCartId(expectedCartId);

      expect(actualCart).toBeNull();
    });

    it('should be able to update a cart by cartId', () => {
      const actualCart = modifyCart(expectedCart);

      expect(updateCart).toHaveBeenCalledTimes(1);
      expect(updateCart).toHaveBeenCalledWith(expectedCartFromDatabase);

      expect(actualCart).toEqual(expectedCartFromDatabase);
    });

    it('should be able to delete a cart by cartId', () => {
      const actualCart = removeCartByCartId(expectedCartId);

      expect(deleteCartByCartId).toHaveBeenCalledTimes(1);
      expect(deleteCartByCartId).toHaveBeenCalledWith(expectedCartId);

      expect(actualCart).toEqual(expectedCartFromDatabase);
    });

});
