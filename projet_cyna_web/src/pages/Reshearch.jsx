import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Reshearch.css';

const Reshearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://api.juku7704.odns.fr/api/products`);
      const allProducts = res.data.member || [];
      // Recherche stricte sur le nom du produit (FR)
      const found = allProducts.find(prod =>
        prod.productLangages?.[0]?.name?.toLowerCase() === query.trim().toLowerCase()
      );
      if (found) {
        setResult(found);
      } else {
        setError('Aucun produit trouvé avec ce nom.');
      }
    } catch (e) {
      setError('Erreur lors de la recherche.');
    }
  };

  return (
    <div className="reshearch-page">
      <h1>Recherche de produit</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Nom exact du produit..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      <div className="results-list">
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="result-card">
            <h2>{result.productLangages?.[0]?.name || result.name}</h2>
            <p>{result.productLangages?.[0]?.description}</p>
            {result.productImages?.[0]?.image_link && (
              <img src={result.productImages[0].image_link} alt={result.productLangages?.[0]?.name} style={{width:'100%',maxWidth:'150px'}} />
            )}
            <p className="price">
              {result.subscriptionTypes && result.subscriptionTypes.map(sub => (
                <span key={sub.id}>{sub.type} : {sub.price} <br /></span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reshearch;
