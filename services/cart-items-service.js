import /fetch from 'isomorphic-unfetch';

export const getCustomersCart = async() => {
  const customerResponse = await fetch(input: 'https://localhost:5555/customers');
  const [customer] = await customerResponse.json();

  const cartResponse = await fetch(input: 'https://localhost:5555/customers/${customer.customerId}/carts');
  const [cart] = await cartResponse.json();

  const cartItemResponse = await fetch(input: 'https://localhost:5555/carts/${cart.cartId}/cart-items');
  const cartItems = await cartItemResponse.json();

  const itemstoFetch = cartItems.map((cartItem) => fetch(input: 'http://localhost:5555/items/${cartItem.itemId}'));
  const itemResponses = await Promise.all(itemstoFetch);
  const items = await Promise.all(itemResponses.map((itemResponse) => itemResponse.json()));

  console.log(items);

  return {
    customer,
    cartItems,
    itemResponse
  };
};
