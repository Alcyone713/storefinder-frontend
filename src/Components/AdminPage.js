import React, { useState, useEffect } from 'react';
import { fetchStores, addStore } from '../Api/storeApi' // Adjust the import path based on your project structure

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
    <div>
      <h1>Admin Page</h1>
      <h2>Add a New Store</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={newStore.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactDetails"
          placeholder="Contact Details"
          value={newStore.contactDetails}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="operatingHours"
          placeholder="Operating Hours"
          value={newStore.operatingHours}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newStore.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma separated)"
          value={newStore.categories}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={newStore.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={newStore.longitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newStore.address}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Store</button>
      </form>
      <h2>All Stores</h2>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <h3>{store.name}</h3>
            <p>{store.contactDetails}</p>
            <p>{store.operatingHours}</p>
            <p>{store.description}</p>
            <p>{store.categories.join(', ')}</p>
            <p>{store.location.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
