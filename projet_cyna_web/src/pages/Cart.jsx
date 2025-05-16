import React from 'react';
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = React.useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => {
    // On prend le premier prix dispo (si plusieurs subscriptions)
    let price = 0;
    if (item.subscriptionTypes && item.subscriptionTypes[0]) {
      price = parseFloat((item.subscriptionTypes[0].price || '0').replace(/[^\d.,]/g, '').replace(',', '.'));
    }
    return sum + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-container">
      <h1>Mon panier</h1>
      <br />
      <div className="cart-content">
        <div className="cart-products">
          {cart.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            cart.map(item => (
              <div className="product" key={item.id}>
                <div className="product-image">
                  {item.productImages?.[0]?.image_link ? (
                    <img src={item.productImages[0].image_link} alt={item.productLangages?.[0]?.name || item.name} style={{width:'50px',height:'50px',objectFit:'cover'}} />
                  ) : 'Image'}
                </div>
                <div className="product-details">
                  <p className="product-name">{item.productLangages?.[0]?.name || item.name}</p>
                  <p className="product-price">{item.subscriptionTypes?.[0]?.price || '0,00 €'}</p>
                </div>
                <div className="product-quantity">
                  <select value={item.quantity} onChange={e => handleQuantityChange(item.id, e.target.value)}>
                    {[1,2,3,4,5,6].map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
                <div className="product-total">
                  {item.subscriptionTypes?.[0]?.price ? `${(parseFloat((item.subscriptionTypes[0].price || '0').replace(/[^\d.,]/g, '').replace(',', '.')) * (item.quantity || 1)).toFixed(2)} €` : '0,00 €'}
                </div>
                <i className="fa-solid fa-trash product-remove" onClick={() => handleRemove(item.id)}></i>
              </div>
            ))
          )}
        </div>
        <div className="cart-side">
          <div className="cart-summary">
            <div className="summary-item">
              <span>Produits</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
              <span>Livraison</span>
              <span>{total > 70 ? '0,00 €' : '5,00 €'}</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>TOTAL</span>
              <span>{(total + (total > 70 ? 0 : 5)).toFixed(2)} €</span>
            </div>
            <br />
            <button className="validate-button">Valider ma commande</button>
          </div>
          <div className="promo-card">
            <input type="text" placeholder="Code promo" className="promo-input" />
            <button className="promo-button">Ajouter</button>
          </div>
          <div className="info-card">
            <div className="info-item">
              <i className="fa-solid fa-calendar"></i>
              <span>Expédié en 48h</span>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-truck"></i>
              <span>Livraison gratuite à partir de 70€ d'achat</span>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-credit-card"></i>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;