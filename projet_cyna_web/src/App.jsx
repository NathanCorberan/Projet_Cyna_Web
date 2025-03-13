import { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import logo from './assets/Cyna_logo.png';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Carousel from './components/Carousel';

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
    navigate('/'); // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <>
      <header className="header">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
        </div>
        <div className="icons">
          {isLoggedIn && <span className="welcome-message">Bonjour, {firstName}</span>}
          <i className="fa-solid fa-language"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          <Link to="/login"><i className="fa-solid fa-user"></i></Link>
          <i className="fa-solid fa-list-ul" onClick={toggleSidebar}></i>
        </div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <h1>Bienvenue sur notre site</h1>
              <p>Explorez nos produits et services.</p>
              <Carousel images={images} />
            </>
          } />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={fetchUserData} />} />
          <Route path="/register" element={<Register onRegister={fetchUserData} />} />
          <Route path="/categories" element={<Categories />} />
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
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
          <i className="fa-brands fa-x-twitter"></i>
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
            onClick={() => handleMenuClick('categories')}
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
            onClick={() => handleMenuClick('mon-compte')}
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
    </>
  );
}

export default App;
