const Index = props => (
  <section>
    <h1>Item details</h1>
    <img src={props.item.image} />
    <p>description {props.item.description}</p>
    <p>price ${props.item.price}</p>
  </section>
);

Index.getInitialProps = async function(context) {
  const {itemId} = context.query;

  const res = await fetch('https://localhost:5555/items/${itemId}');
  const item = await res.json();

  console.log(`item data fetched. Item: ${item}`);

  return {
    item
  };
};

export default Index;
