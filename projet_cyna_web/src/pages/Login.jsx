import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-card">
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />
      <div className="remember-me">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Se souvenir de moi</label>
      </div>
      <button>Se connecter</button>
      <a href="#">Mot de passe oublié ?</a>
      <Link to="/register">Nouveau ? Créer un compte</Link>
      <hr />
      <p>Ou connectez-vous avec</p>
      <div className="social-icons">
        <i className="fa-brands fa-google"></i>
        <i className="fa-brands fa-facebook"></i>
      </div>
    </div>
  );
};

export default Login;
