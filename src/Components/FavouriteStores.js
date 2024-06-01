import React, { useEffect, useState } from "react";
import { getFavoriteStores, removeFavoriteStore } from "../Api/userApi";
import { fetchStoreById } from "../Api/storeApi";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

const FavoriteStores = () => {
  const [favorites, setFavorites] = useState([]);

  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storeIds = await getFavoriteStores(username);
        console.log("Store IDs fetched:", storeIds);

        const storesDetails = await Promise.all(
          storeIds.map(async (storeId) => {
            try {
              const storeDetails = await fetchStoreById(storeId);
              return storeDetails;
            } catch (error) {
              console.error(
                `Error fetching store details for ID ${storeId}:`,
                error
              );
              return null;
            }
          })
        );

        setFavorites(storesDetails.filter((store) => store !== null));
      } catch (error) {
        console.error("Error fetching favorite stores:", error);
      }
    };

    fetchFavorites();
  }, [username]);

  const handleRemoveFavorite = async (storeId) => {
    try {
      await removeFavoriteStore(username, storeId);
      setFavorites(favorites.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Error removing favorite store:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Favorite Stores</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite stores.</p>
      ) : (
        <div style={styles.favoritesList}>
          {favorites.map((store) => (
            <div key={store.id} style={styles.storeCard}>
              <h2>{store.name}</h2>
              <p>{store.contactDetails}</p>
              <button style={styles.button} onClick={onOpenModal}>
                See Details
              </button>
              <Modal open={open} onClose={onCloseModal} center>
                <div style={styles.modalContent}>
                  <h2 style={styles.modalTitle}>{store.name}</h2>
                  <h3 style={styles.modalContact}>{store.contactDetails}</h3>
                  <h3 style={styles.modalHours}>{store.operatingHours}</h3>
                  <p>
                    <strong>Description:</strong> {store.description}
                  </p>
                  <p>
                    <strong>Categories:</strong> {store.categories.join(", ")}
                  </p>
                  <p>
                    <strong>Address:</strong> {store.location.address}
                  </p>
                </div>
              </Modal>
              <button
                style={styles.button}
                onClick={() => handleRemoveFavorite(store.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  favoritesList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  storeCard: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  modalContent: {
    padding: '20px',
  },
  modalTitle: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  modalContact: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  modalHours: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
};

export default FavoriteStores;
