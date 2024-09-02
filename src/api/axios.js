import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL base da sua API
  timeout: 10000, // Tempo limite de requisição em milissegundos
});

export default api;
