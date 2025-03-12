import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://api.juku7704.odns.fr/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Stocker le token dans le localStorage ou un autre endroit sécurisé
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div className="login-card">
      <h2>Connexion</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <i className="fa-solid fa-envelope"></i>
      </div>
      <div className="input-container">
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <i className="fa-solid fa-lock"></i>
      </div>
      <div className="remember-me">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Se souvenir de moi</label>
      </div>
      <button onClick={handleLogin}>Se connecter</button>
      <a className='form-link' href="#">Mot de passe oublié ?</a>
      <Link to="/register" className='form-link'>Nouveau ? Créer un compte</Link>
      <hr />
      <p className='or-connection-with'>Ou connectez-vous avec</p>
      <div className="social-icons">
        <i className="fa-brands fa-google"></i>
        <i className="fa-brands fa-facebook"></i>
      </div>
    </div>
  );
};

export default Login;
