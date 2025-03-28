import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Page principale de l'application
import './App.css';
import logo from './assets/Cyna_logo.png';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Carousel from './components/Carousel';
import Account from './pages/Account';

const images = [
  'http://img.juku7704.odns.fr/SOC.png',
  'http://img.juku7704.odns.fr/XDR.png',
  'http://img.juku7704.odns.fr/EDR.png',
  'http://img.juku7704.odns.fr/carousel-img-1.png',
  'http://img.juku7704.odns.fr/carousel-img-2.png',
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  // requete a l api
  const fetchUserData = async (token) => { 
    try {
      const response = await axios.get('http://api.juku7704.odns.fr/api/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFirstName(response.data.first_name);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="search-bar">
          <div className="input-container">
            <input type="text" placeholder="Rechercher..." />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="icons">
          {isLoggedIn && <span className="welcome-message">Bonjour, {firstName}</span>}
          <i className="fa-solid fa-language"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <i className="fa-solid fa-circle-user"></i>
          </Link>
          <i className="fa-solid fa-list-ul" onClick={toggleSidebar}></i>
        </div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Cyna protège les entreprises contre les cyberattaques</h1>
              <p><strong>Explorez nos produits et services.</strong></p>
              <br></br>
              <Carousel images={images} />
              <div className="cards-container">
                <div className="card">
                  <h2>SOC</h2>
                  <h3>SOC – Surveillez, détectez, protégez !</h3>
                  <p>Un <strong>SOC</strong> assure une surveillance 24/7 pour identifier et neutraliser les cybermenaces avant qu'elles ne vous affectent.</p>
                </div>
                <div className="card">
                  <h2>XDR</h2>
                  <h3>XDR – La défense avancée unifiée</h3>
                  <p>Avec <strong>XDR</strong>, bénéficiez d’une protection intelligente en connectant et analysant toutes vos sources de données pour une réponse plus rapide.</p>
                </div>
                <div className="card">
                  <h2>EDR</h2>
                  <h3>EDR – Sécurité maximale pour vos terminaux</h3>
                  <p>Les solutions <strong>EDR</strong> détectent, analysent et stoppent les menaces directement sur vos postes de travail et serveurs.</p>
                </div>
              </div>
            </>
          } />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/account" /> : <Login onLogin={fetchUserData} />} />
          <Route path="/register" element={<Register onRegister={fetchUserData} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/account" element={<Account onUpdateFirstName={setFirstName} />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Politique de confidentialité</a>
          <a href="#">Mentions légales</a>
          <a href="#">CGU</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/cyna-it/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-x-twitter"></i>
          </a>

        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Cyna. Tous droits réservés.</p>

        </div>
      </footer>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <i className="fa-solid fa-xmark" onClick={toggleSidebar}></i>
        </div>
        <hr />
        <ul>
          <li
            onMouseEnter={() => handleMouseEnter('categories')}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleMenuClick('categories');
              navigate('/categories'); 
              toggleSidebar();
            }}
            className={activeMenu === 'categories' || selectedMenu === 'categories' ? 'active' : ''}
          >
            Catégories
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('recherche')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuClick('recherche')}
            className={activeMenu === 'recherche' || selectedMenu === 'recherche' ? 'active' : ''}
          >
            Recherche
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('produits')}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMenuClick('produits')}
            className={activeMenu === 'produits' || selectedMenu === 'produits' ? 'active' : ''}
          >
            Produits
          </li>
          <li>
            <span
              onClick={toggleSubMenu}
              onMouseEnter={() => handleMouseEnter('commandes')}
              onMouseLeave={handleMouseLeave}
              className={activeMenu === 'commandes' || selectedMenu === 'commandes' ? 'active' : ''}
            >
              Commandes
              <i className={`fa-solid ${isSubMenuOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ float: 'right' }}></i>
            </span>
            <ul className={`submenu ${isSubMenuOpen ? 'open' : ''}`}>
              <li
                onMouseEnter={() => handleMouseEnter('mon-panier')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMenuClick('mon-panier')}
                className={activeMenu === 'mon-panier' || selectedMenu === 'mon-panier' ? 'active' : ''}
              >
                Mon panier
              </li>
              <li
                onMouseEnter={() => handleMouseEnter('checkout')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMenuClick('checkout')}
                className={activeMenu === 'checkout' || selectedMenu === 'checkout' ? 'active' : ''}
              >
                Checkout
              </li>
              <li
                onMouseEnter={() => handleMouseEnter('confirmation')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleMenuClick('confirmation')}
                className={activeMenu === 'confirmation' || selectedMenu === 'confirmation' ? 'active' : ''}
              >
                Confirmation
              </li>
            </ul>
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('mon-compte')}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleMenuClick('mon-compte');
              navigate(isLoggedIn ? '/account' : '/login'); // Redirection conditionnelle
              toggleSidebar();
            }}
            className={activeMenu === 'mon-compte' || selectedMenu === 'mon-compte' ? 'active' : ''}
          >
            Mon compte
          </li>
          {isLoggedIn && (
            <li onClick={handleLogout}>
              Se déconnecter
            </li>
          )}
        </ul>
      </aside>
      <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
    </div>
  );
}

export default App;
