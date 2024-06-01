import React, { useEffect, useState } from 'react';
import { getFavoriteStores, removeFavoriteStore } from '../Api/userApi'; // Adjust the path to where your API functions are defined

const FavoriteStores = () => {
  const [favorites, setFavorites] = useState([]);

  const username=localStorage.getItem('username');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteStores = await getFavoriteStores(username);
        setFavorites(favoriteStores);
      } catch (error) {
        console.error('Error fetching favorite stores:', error);
      }
    };

    fetchFavorites();
  }, [username]);

  const handleRemoveFavorite = async (storeId) => {
    try {
      await removeFavoriteStore(username, storeId);
      setFavorites(favorites.filter(store => store.id !== storeId));
    } catch (error) {
      console.error('Error removing favorite store:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Favorite Stores</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite stores.</p>
      ) : (
        <div style={styles.favoritesList}>
          {favorites.map(store => (
            <div key={store.id} style={styles.storeCard}>
              <h2>{store.name}</h2>
              <p>{store.contactDetails}</p>
              <p>{store.location.address}</p>
              <button style={styles.removeButton} onClick={() => handleRemoveFavorite(store.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  favoritesList: {
    display: 'flex',
    flexDirection: 'column',
  },
  storeCard: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  removeButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default FavoriteStores;
