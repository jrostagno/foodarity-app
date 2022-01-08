import axios from 'axios';

const token = localStorage.getItem('token') || '';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});

const apiWithToken = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: { Authorization: `Bearer ${token}` },
});

export { api, apiWithToken };
