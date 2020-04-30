import fetch from 'isomorphic-unfetch';
import uuid from 'uuid'
import {getCustomersCart} from '../services/cart-item-service';

const addItemToCart = async(itemId) => {
  const customerResponse = await fetch(input: 'https://localhost:5555/customers');
  const [customer] = await customerResponse.json();

  const cartResponse = await fetch(input: 'https://localhost:5555/customers/${customer.customerId}/carts');
  const [cart] = await cartResponse.json();

  await fetch(input: 'http://localhost:5555/cart-items' init:{
    method: 'POST',
    body: JSON.stringify( value:{
      cartItemId: uuid.v4(),
      cartId: cart.cartId,
      itemId,
      quantity: 1
    }),
    headers: {
      'Content-Type':  'application/json'
    }
  })
};

const Index = props => (
  <section>
    <h1>Item details</h1>
    <img src={props.item.image} />
    <p>description {props.item.description}</p>
    <p>price ${props.item.price}</p>
    <button type="button" onClick={() => addItemToCart{props.item.itemId}}>
      Add to Cart
    </button>
    <p>Number of time this item is in cart: {props.numberOfTimesInCart}</p>
    <Link href="/cart">
      <a>view cart</a>
    </Link>
  </section>
);

Index.getInitialProps = async function(context) {
  const {itemId} = context.query;

  const res = await fetch('https://localhost:5555/items/${itemId}');
  const item = await res.json();

  const {cartItems} = await getCustomersCart();

  const numberOfTimesInCart = cartItems.filter((cartItem)=> cartItem.itemId === itemId).length;

  console.log(`item data fetched. Item: ${item}`);

  return {
    item,
    cartItems,
    numberOfTimesInCart
  };
};

export default Index;
