import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setError('Email ou mot de passe incorrect');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-card">
      <h2>Connexion</h2>
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <i className="fa-solid fa-envelope"></i>
      </div>
      <div className="input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="fa-solid fa-lock"></i>
        <i
          className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
          onClick={toggleShowPassword}
          style={{ cursor: "pointer", right: "2.5rem" }}
        ></i>
      </div>
      <div className="remember-me" style={{ display: "none" }}>
        <input type="checkbox" id="remember-me"/>
        <label htmlFor="remember-me">Se souvenir de moi</label>
      </div>
      {error && <p className="error">{error}</p>}
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
