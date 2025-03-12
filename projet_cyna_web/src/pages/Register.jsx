import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="login-card">
      <h2>Créer un compte</h2>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Nom" />
      <input type="text" placeholder="Prénom" />
      <input type="password" placeholder="Mot de passe" />
      <input type="password" placeholder="Confirmer le mot de passe" />
      <button>Créer mon compte</button>
      <Link to="/login">Déja client ? Connectez-vous</Link>
      <hr />
      <p className='or-connection-with'>Ou connectez-vous avec</p>
      <div className="social-icons">
        <i className="fa-brands fa-google"></i>
        <i className="fa-brands fa-facebook"></i>
      </div>
    </div>
  );
};

export default Register;
