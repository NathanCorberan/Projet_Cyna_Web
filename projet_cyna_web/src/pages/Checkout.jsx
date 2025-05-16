import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: choix adresse, 2: paiement
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Vous devez être connecté pour valider votre commande.');
      return;
    }
    axios.get('http://api.juku7704.odns.fr/api/user_addresses', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAddresses(res.data.member || []))
      .catch(() => setAddresses([]));
  }, []);

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
  };

  const handleValidate = () => {
    if (!selectedAddress) {
      setError('Veuillez sélectionner une adresse.');
      return;
    }
    setStep(2);
    setError('');
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
      localStorage.removeItem('cart');
      setTimeout(() => navigate('/orders'), 2000);
    }, 2000);
  };

  if (error) return <div className="checkout-page"><p className="error">{error}</p></div>;
  if (success) return <div className="checkout-page"><h2>Paiement réussi !</h2><p>Redirection vers vos commandes...</p></div>;

  return (
    <div className="checkout-page">
      <h1>Valider ma commande</h1>
      {step === 1 && (
        <>
          <h2>Choisissez une adresse de livraison</h2>
          {addresses.length === 0 ? (
            <p>Aucune adresse enregistrée. Ajoutez-en une dans votre compte.</p>
          ) : (
            <div className="addresses-list">
              {addresses.map(addr => (
                <div key={addr.id} className={`address-card${selectedAddress === addr.id ? ' selected' : ''}`} onClick={() => handleAddressSelect(addr.id)}>
                  <p>{addr.line1}</p>
                  <p>{addr.line2}</p>
                  <p>{addr.city}, {addr.zip}</p>
                </div>
              ))}
            </div>
          )}
          <button className="validate-button" onClick={handleValidate} disabled={!selectedAddress}>Continuer</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Récapitulatif</h2>
          <div className="checkout-cart">
            {cart.map(item => (
              <div key={item.id} className="checkout-product">
                <span>{item.productLangages?.[0]?.name || item.name}</span>
                <span>x{item.quantity}</span>
                <span>{item.subscriptionTypes?.[0]?.price || '0,00 €'}</span>
              </div>
            ))}
          </div>
          <h3>Adresse de livraison</h3>
          {addresses.find(a => a.id === selectedAddress) && (
            <div className="address-card selected">
              <p>{addresses.find(a => a.id === selectedAddress).line1}</p>
              <p>{addresses.find(a => a.id === selectedAddress).line2}</p>
              <p>{addresses.find(a => a.id === selectedAddress).city}, {addresses.find(a => a.id === selectedAddress).zip}</p>
            </div>
          )}
          <button className="validate-button" onClick={handlePay} disabled={isPaying}>{isPaying ? 'Paiement...' : 'Payer'}</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
