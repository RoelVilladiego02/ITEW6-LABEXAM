import axios from 'axios';
import { filipinoStudents } from './mockData';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  try {
    // Using Filipino student data instead of API
    return filipinoStudents;
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};

export const fetchPosts = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};
