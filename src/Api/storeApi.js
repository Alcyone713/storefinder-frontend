import axios from 'axios';

const API_URL = "http://localhost:5454/stores";

export const fetchStores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the stores!", error);
    throw error;
  }
};

// Function to fetch a store by name
export const fetchStoreByName = async (name) => {
    try {
      const response = await axios.get(`${API_URL}/name/${name}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching the store with name ${name}!`, error);
      throw error;
    }
  };
  
  export const fetchStoreById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching the store with id ${id}!`, error);
      throw error;
    }
  };

  // Function to fetch stores by product name
  export const fetchStoresByProductName = async (productName) => {
    try {
      const response = await axios.get(`${API_URL}/product/${productName}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching stores with product name ${productName}!`, error);
      throw error;
    }
  };
  
  // Function to add a new store
  export const addStore = async (store) => {
    try {
      const response = await axios.post(`${API_URL}/add`, store);
      return response.data;
    } catch (error) {
      console.error("There was an error adding the store!", error);
      throw error;
    }
  };
  
  // Function to add a product to a store
  export const addProductToStore = async (storeId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/${storeId}/add-product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error adding product ${productId} to store ${storeId}!`, error);
      throw error;
    }
  };
  
  // Function to fetch the nearest store
  export const fetchNearestStore = async (userLat, userLng) => {
    try {
      const response = await axios.get(`${API_URL}/nearest`, {
        params: { userLat, userLng },
      });
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the nearest store!", error);
      throw error;
    }
  };