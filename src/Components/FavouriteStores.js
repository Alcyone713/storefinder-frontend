import React, { useEffect, useState } from 'react';
import { getFavoriteStores, removeFavoriteStore } from '../Api/userApi'; 
import { fetchStoreById } from '../Api/storeApi';

const FavoriteStores = () => {
  const [favorites, setFavorites] = useState([]);

  const username=localStorage.getItem('username');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storeIds = await getFavoriteStores(username);
        console.log('Store IDs fetched:', storeIds);

        const storesDetails = await Promise.all(
          storeIds.map(async (storeId) => {
            try {
              const storeDetails = await fetchStoreById(storeId);
              return storeDetails;
            } catch (error) {
              console.error(`Error fetching store details for ID ${storeId}:`, error);
              return null; 
            }
          })
        );

        setFavorites(storesDetails.filter(store => store !== null));
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
    flexDirection: 'row',

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
