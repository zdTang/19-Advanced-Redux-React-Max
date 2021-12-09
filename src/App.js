import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  // PUT will override the old data instead appending new data
  /* ==================
   * We can monitor the update of state at any component by using useSelector
   * Here we monitor the state. Once the state changes which means user has new
   * option, then we can fire Http Request
   */
  useEffect(() => {
    fetch("https://react-http-69ae2-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    });
  }, [cart]);
  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
