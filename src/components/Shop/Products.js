import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const DUMMY_PRODUCTS = [
    {
      id: "p1",
      price: 6,
      title: "My First Product",
      description: "my first book I wrote",
    },
    {
      id: "p2",
      price: 9,
      title: "My Second Product",
      description: "my second book I wrote",
    },
  ];

  const productList = DUMMY_PRODUCTS.map((item) => {
    return (
      <ProductItem
        key={item.id}
        title={item.title}
        price={item.price}
        description={item.description}
      />
    );
  });
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
