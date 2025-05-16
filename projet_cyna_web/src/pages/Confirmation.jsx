import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/Confirmation.css';

const Confirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="confirmation-page">
        <h1>Commande non trouvée</h1>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <h1>Merci pour votre commande !</h1>
      <p>Votre commande n°{order.id} a bien été enregistrée.</p>
      <p>Adresse de livraison : {order.address}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default Confirmation;
