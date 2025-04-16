import React, { useState, useEffect } from 'react';
import Product from './components/Product';
import Cart from './components/Cart';
import productsData from './data/products.json';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app-container">
      <h1>Amazon Copy</h1>
      <div className="content">
        <div className="product-list">
          {products.map((product) => (
            <Product key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <br></br>
        <Cart cart={cart} total={calculateTotal()} />
      </div>
    </div>
  );
};

export default App;
