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
import Cart from './pages/Cart';
import Products from './pages/Products';
import Reshearch from './pages/Reshearch';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
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
    // Récupérer les actualités
    axios.get('http://api.juku7704.odns.fr/api/news')
      .then(res => setNews(res.data.member || []))
      .catch(() => setNews([]));
    // Récupérer les catégories
    axios.get('http://api.juku7704.odns.fr/api/categories')
      .then(res => setCategories(res.data.member || []))
      .catch(() => setCategories([]));
    // Récupérer les produits populaires/top
    axios.get('http://api.juku7704.odns.fr/api/products?top=true')
      .then(res => setTopProducts(res.data.member || []))
      .catch(() => setTopProducts([]));
    // Récupérer les images du carousel (exemple: images des produits top)
    axios.get('http://api.juku7704.odns.fr/api/products?top=true')
      .then(res => setCarouselImages((res.data.member || []).flatMap(p => p.productImages?.map(img => img.image_link) || [])))
      .catch(() => setCarouselImages([]));
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
          <i className="fa-solid fa-cart-shopping" onClick={() => navigate('/cart')}></i>
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
              <br />
              <h2>Actualités et nouveautés</h2>
              <div className="news-card">
                {news.length === 0 ? (
                  <p>Aucune actualité pour le moment</p>
                ) : (
                  news.map((item, idx) => (
                    <p key={item.id || idx}>{item.title} - {item.content}</p>
                  ))
                )}
              </div>
              <Carousel images={carouselImages.length ? carouselImages : [
                'http://img.juku7704.odns.fr/SOC.png',
                'http://img.juku7704.odns.fr/XDR.png',
                'http://img.juku7704.odns.fr/EDR.png',
                'http://img.juku7704.odns.fr/carousel-img-1.png',
                'http://img.juku7704.odns.fr/carousel-img-2.png',
              ]} />
              <h2>Catégories</h2>
              <div className="cards-container">
                {categories.length === 0 ? (
                  <p>Aucune catégorie disponible</p>
                ) : (
                  categories.map(cat => (
                    <div className="card" key={cat.id}>
                      <h2>{cat.name}</h2>
                      {cat.imageLink && <img src={`http://${cat.imageLink}`} alt={cat.name} style={{width:'100%',maxWidth:'150px'}} />}
                    </div>
                  ))
                )}
              </div>
              <h2>Top du moment</h2>
              <div className="cards-container">
                {topProducts.length === 0 ? (
                  <p>Aucun produit populaire actuellement</p>
                ) : (
                  topProducts.map(prod => (
                    <div className="card" key={prod.id}>
                      <h2>{prod.productLangages?.[0]?.name || prod.name}</h2>
                      <p>{prod.productLangages?.[0]?.description}</p>
                      {prod.productImages?.[0]?.image_link && (
                        <img src={prod.productImages[0].image_link} alt={prod.productLangages?.[0]?.name} style={{width:'100%',maxWidth:'150px'}} />
                      )}
                      {prod.subscriptionTypes && prod.subscriptionTypes.map(sub => (
                        <p key={sub.id}>{sub.type} : {sub.price}</p>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </>
          } />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/account" /> : <Login onLogin={fetchUserData} />} />
          <Route path="/register" element={<Register onRegister={fetchUserData} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/account" element={<Account onUpdateFirstName={setFirstName} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/recherche" element={<Reshearch />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
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
            onClick={() => {
              handleMenuClick('recherche');
              navigate('/recherche');
              toggleSidebar();
            }}
            className={activeMenu === 'recherche' || selectedMenu === 'recherche' ? 'active' : ''}
          >
            Recherche
          </li>
          <li
            onMouseEnter={() => handleMouseEnter('produits')}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              handleMenuClick('produits');
              navigate('/products');
              toggleSidebar();
            }}
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
                onClick={() => {
                  handleMenuClick('mon-panier');
                  navigate('/cart');
                  toggleSidebar();
                }}
                className={activeMenu === 'mon-panier' || selectedMenu === 'mon-panier' ? 'active' : ''}
              >
                Mon panier
              </li>
              <li
                onMouseEnter={() => handleMouseEnter('checkout')}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleMenuClick('checkout');
                  navigate('/checkout');
                  toggleSidebar();
                }}
                className={activeMenu === 'checkout' || selectedMenu === 'checkout' ? 'active' : ''}
              >
                Checkout
              </li>
              <li
                onMouseEnter={() => handleMouseEnter('confirmation')}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleMenuClick('confirmation');
                  navigate('/confirmation');
                  toggleSidebar();
                }}
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
