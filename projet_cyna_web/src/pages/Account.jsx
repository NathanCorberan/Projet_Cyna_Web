import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Account.css';

const Account = () => {
  const [userData, setUserData] = useState({
    id: '',
    lastName: '',
    firstName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('http://api.juku7704.odns.fr/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/ld+json',
        },
      });
      setUserData({
        id: response.data.id,
        lastName: response.data.last_name || '',
        firstName: response.data.first_name || '',
        email: response.data.email || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur', error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Token non disponible. Veuillez vous reconnecter.');
      return;
    }

    try {
      const response = await axios.patch(
        `http://api.juku7704.odns.fr/api/users/${userData.id}`,
        {
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Informations mises à jour avec succès.');
      } else {
        setMessage('Erreur inattendue lors de la mise à jour des informations.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur:', error);

      if (error.response) {
        if (error.response.status === 403) {
          setMessage('Accès refusé. Vous n’avez pas les permissions nécessaires pour effectuer cette action.');
        } else if (error.response.status === 401) {
          setMessage('Session expirée. Veuillez vous reconnecter.');
        } else {
          setMessage(`Erreur: ${error.response.data.message || 'Une erreur est survenue.'}`);
        }
      } else {
        setMessage('Erreur lors de la mise à jour des informations.');
      }
    }
  };

  const handlePasswordChange = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await axios.patch(
        'http://api.juku7704.odns.fr/api/user/passchange',
        {
          last_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
          confirmation_password: passwordData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json',
          },
        }
      );
      setMessage('Mot de passe mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe', error);
      setMessage('Erreur lors de la mise à jour du mot de passe.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="account-card">
      <h2>Paramètres du compte</h2>
      <div className="section-card">
        <h3>Informations générales</h3>
        <div className="profile-section">
          <div className="profile-picture"></div>
          <div className="name-fields">
            <input
              type="text"
              placeholder="Nom"
              className="input-field"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="input-field"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
          </div>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <button className="save-button" onClick={handleSave}>
          Sauvegarder
        </button>
      </div>
      <div className="section-card">
        <h3>Modifier le mot de passe</h3>
        <p className="change-password-text">Changer son mot de passe</p>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          className="input-field"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="input-field"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          className="input-field"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        />
        <button className="save-button" onClick={handlePasswordChange}>
          Mettre à jour le mot de passe
        </button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Account;
