import axios from 'axios';

const axiosInstance = () => {

  const options = {
    baseURL: 'http://localhost:8080/api', 
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(options);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });


  return instance;
};

export default axiosInstance();