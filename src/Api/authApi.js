import axios from 'axios';

const API_URL = "http://localhost:5454/auth";

// Function to handle user signup
export const signupUser = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userDetails);
    return response.data;
  } catch (error) {
    console.error("There was an error signing up the user!", error);
    throw error;
  }
};

// Function to handle user login
export const loginUser = async (loginRequest) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, loginRequest);
    return response.data;
  } catch (error) {
    console.error("There was an error logging in the user!", error);
    throw error;
  }
};