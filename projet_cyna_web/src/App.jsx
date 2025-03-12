import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './App.css';
import logo from './assets/Cyna_logo.png';
import Login from './pages/Login';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

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

  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
        </div>
        <div className="icons">
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
            </>
          } />
          <Route path="/login" element={<Login />} />
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
          <p>&copy; 2025 Cyna. Tous droits réservés.</p>
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
        </ul>
      </aside>
      <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
    </>
  );
}

export default App;
