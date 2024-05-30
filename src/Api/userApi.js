import axios from 'axios';

const API_URL = "http://localhost:5454/user";

// Function to update user details
export const updateUser = async (id, userDetails) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userDetails);
      return response.data;
    } catch (error) {
      console.error(`There was an error updating the user with ID ${id}!`, error);
      throw error;
    }
  };
  
  // Function to delete a user
  export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.status;
    } catch (error) {
      console.error(`There was an error deleting the user with ID ${id}!`, error);
      throw error;
    }
  };
  
  // Function to fetch favorite stores for a user
  export const getFavoriteStores = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}/fav_stores`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching favorite stores for user with ID ${id}!`, error);
      throw error;
    }
  };
  
  // Function to add a favorite store for a user
  export const addFavoriteStore = async (id, storeId) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/fav_stores`, { storeId });
      return response.data;
    } catch (error) {
      console.error(`There was an error adding favorite store with ID ${storeId} for user with ID ${id}!`, error);
      throw error;
    }
  };
  
  // Function to remove a favorite store for a user
  export const removeFavoriteStore = async (id, storeId) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/fav_stores/${storeId}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error removing favorite store with ID ${storeId} for user with ID ${id}!`, error);
      throw error;
    }
  };
  