import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const navigate = useNavigate();

  const handleOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour commander.');
      return;
    }
    try {
      const res = await axios.post(
        'http://api.juku7704.odns.fr/api/orders',
        {
          address,
          products: cart.map(item => ({ id: item.id, quantity: item.quantity })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('cart');
      navigate('/confirmation', { state: { order: res.data } });
    } catch (e) {
      setError('Erreur lors de la commande.');
    }
  };

  return (
    <div className="checkout-page">
      <h1>Valider ma commande</h1>
      <div className="checkout-cart">
        {cart.map(item => (
          <div key={item.id} className="checkout-product">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <span>{item.price} €</span>
          </div>
        ))}
      </div>
      <div className="checkout-form">
        <input
          type="text"
          placeholder="Adresse de livraison"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleOrder}>Commander</button>
      </div>
    </div>
  );
};

export default Checkout;
