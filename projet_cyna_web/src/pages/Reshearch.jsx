import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Reshearch.css';

const Reshearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://api.juku7704.odns.fr/api/products?search=${encodeURIComponent(query)}`);
    setResults(res.data['hydra:member'] || []);
  };

  return (
    <div className="reshearch-page">
      <h1>Recherche de produits</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      <div className="results-list">
        {results.map(prod => (
          <div className="result-card" key={prod.id}>
            <h2>{prod.name}</h2>
            <p>{prod.description}</p>
            <p className="price">{prod.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reshearch;
