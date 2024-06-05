import React, { useState, useEffect } from 'react';
import { fetchStores, addStore, deleteStoreById } from '../Api/storeApi'; // Adjust the import path based on your project structure
import SearchResult from './SearchResult';

const AdminPage = () => {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({
    name: '',
    contactDetails: '',
    operatingHours: '',
    description: '',
    categories: '',
    latitude: '',
    longitude: '',
    address: ''
  });

  useEffect(() => {
    const loadStores = async () => {
      try {
        const fetchedStores = await fetchStores();
        setStores(fetchedStores);
      } catch (error) {
        console.error('Error fetching stores', error);
      }
    };

    loadStores();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteStoreById(id);
      setStores(stores.filter(store => store.id !== id));
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStore(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storeToAdd = {
        ...newStore,
        categories: newStore.categories.split(',').map(category => category.trim()),
        location: {
          latitude: parseFloat(newStore.latitude),
          longitude: parseFloat(newStore.longitude),
          address: newStore.address
        }
      };
      await addStore(storeToAdd);
      setStores(prevStores => [...prevStores, storeToAdd]);
      setNewStore({
        name: '',
        contactDetails: '',
        operatingHours: '',
        description: '',
        categories: '',
        latitude: '',
        longitude: '',
        address: ''
      });
    } catch (error) {
      console.error('Error adding store', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Page</h1>
      <div style={styles.formContainer}>
        <h2>Add a New Store</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={newStore.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="contactDetails"
            placeholder="Contact Details"
            value={newStore.contactDetails}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="operatingHours"
            placeholder="Operating Hours"
            value={newStore.operatingHours}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newStore.description}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="categories"
            placeholder="Categories (comma separated)"
            value={newStore.categories}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.locationContainer}>
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={newStore.latitude}
              onChange={handleChange}
              required
              style={{ ...styles.input, ...styles.locationInput }}
            />
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={newStore.longitude}
              onChange={handleChange}
              required
              style={{ ...styles.input, ...styles.locationInput }}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newStore.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Add Store</button>
        </form>
      </div>
      <div style={styles.storesContainer}>
        <h2>All Stores</h2>
        <ul style={styles.storeList}>
          {stores.map((store, index) => (
            <SearchResult key={index} data={store} page={2} handleDelete={()=>handleDelete(store.id)}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    alignItems: 'center',
    width: '100vw'
  },
  heading: {
    marginBottom: '20px'
  },
  formContainer: {
    marginBottom: '40px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10px'
  },
  locationInput: {
    flex: 1
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: '#fff'
  },
  storesContainer: {
    marginTop: '40px',
  },
  storeList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  storeItem: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginLeft: '10px'
  }
};

export default AdminPage;
