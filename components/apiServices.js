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
    return apiClient.post('/auth/login', loginCredentials );
  };

export const getUserDataById = (id) => {
  
    return apiClient.get(`/user/${id}`);
  };

export const updateUserData = (id , updatedData , config) => {
    return apiClient.put(`/user/${id}` , updatedData ,  config);
}

export default {
    getUserData,
    postUserData,
    loginUser,
    getUserDataById,
    updateUserData
  };
  