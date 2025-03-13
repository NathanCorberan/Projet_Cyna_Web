import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await axios.post('http://api.juku7704.odns.fr/api/users', {
        email,
        roles: ['ROLE_USER'],
        password,
        first_name: firstName,
        last_name: lastName,
        isActivate: true
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-card">
      <h2>Créer un compte</h2>
      {error && <p className="error">{error}</p>}
      <div className="input-container">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <i className="fa-solid fa-envelope"></i>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <i className="fa-solid fa-user"></i>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <i className="fa-solid fa-user"></i>
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
      <div className="input-container">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <i className="fa-solid fa-lock"></i>
        <i
          className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
          onClick={toggleShowConfirmPassword}
          style={{ cursor: "pointer", right: "2.5rem" }}
        ></i>
      </div>
      <button onClick={handleRegister}>Créer mon compte</button>
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
