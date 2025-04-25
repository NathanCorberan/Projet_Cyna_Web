import React from 'react';
import '../styles/Cart.css';

const Cart = () => {
  return (
    <div className="cart-container">
      <h1>Mon panier</h1>
      <br></br>
      <div className="cart-content">
        <div className="cart-products">
          <div className="product">
            <div className="product-image">Image</div>
            <div className="product-details">
              <p className="product-name">Produit 1</p>
              <p className="product-price">10,00 €</p>
            </div>
            <div className="product-quantity">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="product-total">10,00 €</div>
            <i className="fa-solid fa-trash product-remove"></i>
          </div>
          <div className="product">
            <div className="product-image">Image</div>
            <div className="product-details">
              <p className="product-name">Produit 2</p>
              <p className="product-price">20,00 €</p>
            </div>
            <div className="product-quantity">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="product-total">20,00 €</div>
            <i className="fa-solid fa-trash product-remove"></i>
          </div>
          <div className="product">
            <div className="product-image">Image</div>
            <div className="product-details">
              <p className="product-name">Produit 3</p>
              <p className="product-price">30,00 €</p>
            </div>
            <div className="product-quantity">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="product-total">30,00 €</div>
            <i className="fa-solid fa-trash product-remove"></i>
          </div>
        </div>
        <div className="cart-side">
          <div className="cart-summary">
            <div className="summary-item">
              <span>Produits</span>
              <span>60,00 €</span>
            </div>
            <div className="summary-item">
              <span>Livraison</span>
              <span>5,00 €</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>TOTAL</span>
              <span>65,00 €</span>
            </div>
            <br></br>
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