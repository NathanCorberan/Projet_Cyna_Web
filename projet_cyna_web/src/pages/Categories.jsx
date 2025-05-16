import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('http://api.juku7704.odns.fr/api/categories')
      .then(res => setCategories(res.data.member || []));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get('http://api.juku7704.odns.fr/api/products')
        .then(res => {
          const allProducts = res.data.member || [];
          const filtered = allProducts.filter(p => p.category_name === selectedCategory.name);
          setProducts(filtered);
        });
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  return (
    <div className="categories-page">
      <h1>Catégories</h1>
      <div className="cards-container">
        {categories.map(cat => (
          <div
            className={`card${selectedCategory && selectedCategory.id === cat.id ? ' active' : ''}`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            style={{ cursor: 'pointer' }}
          >
            <h2>{cat.name}</h2>
            {/* Affichage image si dispo */}
            {cat.imageLink && <img src={`http://${cat.imageLink}`} alt={cat.name} style={{width:'100%',maxWidth:'150px'}} />}
          </div>
        ))}
      </div>
      {selectedCategory && (
        <>
          <h2>Produits de la catégorie {selectedCategory.name}</h2>
          <div className="products-grid">
            {products.length === 0 ? (
              <p>Aucun produit dans cette catégorie</p>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card">
                  <h2>{product.productLangages?.[0]?.name || product.name}</h2>
                  <p>{product.productLangages?.[0]?.description}</p>
                  {product.productImages?.[0]?.image_link && (
                    <img src={product.productImages[0].image_link} alt={product.productLangages?.[0]?.name} style={{width:'100%',maxWidth:'150px'}} />
                  )}
                  <p>Stock : {product.available_stock}</p>
                  {product.subscriptionTypes && product.subscriptionTypes.map((sub, idx) => (
                    <p key={idx}>{sub.type} : {sub.price}</p>
                  ))}
                  {product.available_stock === 0 && <p className="stock-status">Stock épuisé</p>}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
