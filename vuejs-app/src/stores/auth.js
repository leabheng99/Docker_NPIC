import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

const API_URL = 'http://localhost:8000/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async signin(email, password) {
      try {
        const response = await axios.post(`${API_URL}/signin`, { email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        
        router.push('/dashboard');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async signup(name, email, password, password_confirmation) {
      try {
        const response = await axios.post(`${API_URL}/signup`, { 
          name, 
          email, 
          password, 
          password_confirmation 
        });
        
        router.push('/');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async signout() {
      try {
        await axios.post(`${API_URL}/signout`, {}, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
      } catch (error) {
        console.error('Signout failed on server side:', error);
      } finally {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/');
      }
    }
  }
});
