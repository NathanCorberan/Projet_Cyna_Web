import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Cart.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour voir vos commandes.');
      setLoading(false);
      return;
    }
    axios.get('http://api.juku7704.odns.fr/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data.member || []))
      .catch(() => setError('Erreur lors de la récupération des commandes.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="cart-container">
      <h1>Mes commandes</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>Vous n'avez pas encore passé de commande.</p>
      ) : (
        <div className="cart-products">
          {orders.map(order => (
            <div className="product" key={order.id}>
              <div className="product-details">
                <p className="product-name">Commande n°{order.id}</p>
                <p>Date : {order.creation_date || 'N/A'}</p>
                <p>Statut : {order.status || 'N/A'}</p>
                <p>Total : {order.total_price || 'N/A'} €</p>
                {/* Affichage des produits de la commande si dispo */}
                {order.products && order.products.length > 0 && (
                  <ul>
                    {order.products.map(prod => (
                      <li key={prod.id}>{prod.productLangages?.[0]?.name || prod.name} x{prod.quantity}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
