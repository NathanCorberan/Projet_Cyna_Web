import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout de l'import
import '../styles/Cart.css';

const Cart = () => {
  // On stocke le panier sous forme d'objet {id: produit, ...} pour éviter les doublons
  const [cart, setCart] = React.useState(() => {
    const raw = JSON.parse(localStorage.getItem('cart')) || [];
    // Fusionne les produits identiques dès le chargement
    const merged = {};
    for (const item of raw) {
      if (merged[item.id]) {
        merged[item.id].quantity += item.quantity || 1;
      } else {
        merged[item.id] = { ...item, quantity: item.quantity || 1 };
      }
    }
    return Object.values(merged);
  });
  const navigate = useNavigate(); // Initialisation du hook

  // Corrige l'affichage des images (ajoute http:// et trim)
  const getImageUrl = (item) => {
    const link = item.productImages?.[0]?.image_link;
    if (!link) return null;
    return 'http://' + link.trim().replace(/^https?:\/\//, '');
  };

  // Met à jour la quantité d'un produit
  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Supprime un produit du panier
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Ajout d'un produit au panier (à utiliser dans Products.jsx)
  // Si le produit existe déjà, on incrémente la quantité, sinon on l'ajoute
  Cart.addProduct = (product) => {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (found) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const total = cart.reduce((sum, item) => {
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
                  {getImageUrl(item) ? (
                    <img src={getImageUrl(item)} alt={item.productLangages?.[0]?.name || item.name} style={{width:'50px',height:'50px',objectFit:'cover'}} />
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
                <button
                  className="product-remove"
                  aria-label="Supprimer le produit"
                  onClick={() => handleRemove(item.id)}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleRemove(item.id); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
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
            <button className="validate-button" onClick={() => navigate('/checkout')}>Valider ma commande</button>
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