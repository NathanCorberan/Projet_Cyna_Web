import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <header className="header">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher..." />
        </div>
        <div className="icons">
          <i className="fa-solid fa-cart-shopping"></i>
          <i className="fa-solid fa-user"></i>
          <i className="fa-solid fa-list-ul"></i>
        </div>
      </header>
      <main className="main-content">
        {/* mettre contenu */}
        <h1>Bienvenue sur notre site</h1>
        <p>Explorez nos produits et services.</p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Cyna. Tous droits réservés.</p>
      </footer>
    </>
  )
}

export default App
