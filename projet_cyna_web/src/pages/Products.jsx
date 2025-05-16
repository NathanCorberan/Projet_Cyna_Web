import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    axios.get('http://api.juku7704.odns.fr/api/products')
      .then(res => setProducts(res.data['hydra:member'] || []));
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="products-page">
      <h1>Nos produits</h1>
      <div className="products-list">
        {products.map(prod => (
          <div className="product-card" key={prod.id}>
            <h2>{prod.name}</h2>
            <p>{prod.description}</p>
            <p className="price">{prod.price} €</p>
            <button onClick={() => addToCart(prod)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
