import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.nearbyrooms.in',
    headers: {
        'Content-Type': 'application/json'
      }
});

export const getUserData = () => {
  return apiClient.get('/user');
};

export const postUserData = (newUser) => {
  return apiClient.post('/auth/register',newUser);
};

export const loginUser = (loginCredentials) => {
    return apiClient.post('/auth/login', loginCredentials);
  };

export default {
    getUserData,
    postUserData,
    loginUser
  };
  