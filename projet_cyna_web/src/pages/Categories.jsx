import React from 'react';
import '../styles/Categories.css';

const products = [
  { name: 'Produit 1', price: '20€', inStock: true },
  { name: 'Produit 2', price: '30€', inStock: false },
  { name: 'Produit 3', price: '25€', inStock: true },
  { name: 'Produit 4', price: '40€', inStock: false },
  { name: 'Produit 5', price: '15€', inStock: true },
  { name: 'Produit 6', price: '50€', inStock: true },
];

const Categories = () => {
  return (
    <div className="categories-page">
      <div className="category-header">
        <img src="http://img.juku7704.odns.fr/SOC.png" alt="Catégorie" className="category-image" />
        <div className="category-overlay">
          <h1>Security Operations center</h1>
        </div>
      </div>
      <div className="category-description">
        <h2>Protéger votre entreprise avec un SOC</h2>
        <p className="descriptionCategories">Un <strong>SOC (Security Operations Center)</strong> est une solution essentielle pour surveiller, analyser et répondre aux cybermenaces en temps réel. Grâce à une équipe d'experts et à des outils avancés, il assure une protection continue des infrastructures informatiques, détecte les anomalies et prévient les attaques avant qu'elles ne causent des dommages. Opter pour un SOC, c'est garantir une <strong>cybersécurité renforcée et une tranquillité d'esprit</strong> face aux menaces numériques.</p>
      </div>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            {!product.inStock && <p className="stock-status">Stock épuisé</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
