import React from 'react';
import '../styles/Categories.css';

const products = [
  { name: 'Produit 1', price: '20€', inStock: true },
  { name: 'Produit 2', price: '30€', inStock: false },
  { name: 'Produit 3', price: '25€', inStock: true },
  { name: 'Produit 4', price: '40€', inStock: false },
  { name: 'Produit 5', price: '15€', inStock: true },
];

const Categories = () => {
  return (
    <div className="categories-page">
      <div className="category-header">
        <img src="http://img.juku7704.odns.fr/SOC.png" alt="Catégorie" className="category-image" />
        <div className="category-overlay">
          <h1>Nom de la Catégorie</h1>
        </div>
      </div>
      <div className="category-description">
        <p>Description de la catégorie. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
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
