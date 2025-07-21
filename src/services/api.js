const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          this.removeToken();
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    const response = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateCurrentUser(userData) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Store endpoints
  async getStores() {
    return this.request('/stores');
  }

  async getStore(id) {
    return this.request(`/stores/${id}`);
  }

  async createStore(storeData) {
    return this.request('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  }

  async updateStore(id, storeData) {
    return this.request(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storeData),
    });
  }

  async deleteStore(id) {
    return this.request(`/stores/${id}`, {
      method: 'DELETE',
    });
  }

  async getBrands() {
    return this.request('/stores/brands');
  }

  async getRegions() {
    return this.request('/stores/regions');
  }

  async searchStores(query) {
    return this.request(`/stores/search?query=${encodeURIComponent(query)}`);
  }

  // Performance endpoints
  async getPerformances() {
    return this.request('/performances');
  }

  async getPerformancesByStore(storeId) {
    return this.request(`/performances/store/${storeId}`);
  }

  async getPerformancesByPeriod(startDate, endDate) {
    return this.request(`/performances/period?startDate=${startDate}&endDate=${endDate}`);
  }

  async getPerformancesByStoreAndPeriod(storeId, startDate, endDate) {
    return this.request(`/performances/store/${storeId}/period?startDate=${startDate}&endDate=${endDate}`);
  }

  async createPerformance(performanceData) {
    return this.request('/performances', {
      method: 'POST',
      body: JSON.stringify(performanceData),
    });
  }

  async updatePerformance(id, performanceData) {
    return this.request(`/performances/${id}`, {
      method: 'PUT',
      body: JSON.stringify(performanceData),
    });
  }

  async deletePerformance(id) {
    return this.request(`/performances/${id}`, {
      method: 'DELETE',
    });
  }

  // Stock endpoints
  async getStocks() {
    return this.request('/stocks');
  }

  async getStock(id) {
    return this.request(`/stocks/${id}`);
  }

  async getStocksByStore(storeId) {
    return this.request(`/stocks/store/${storeId}`);
  }

  async getStocksByStatus(status) {
    return this.request(`/stocks/status/${status}`);
  }

  async getLowStockItems() {
    return this.request('/stocks/low-stock');
  }

  async getOutOfStockItems() {
    return this.request('/stocks/out-of-stock');
  }

  async searchStocks(query) {
    return this.request(`/stocks/search?query=${encodeURIComponent(query)}`);
  }

  async createStock(stockData) {
    return this.request('/stocks', {
      method: 'POST',
      body: JSON.stringify(stockData),
    });
  }

  async updateStock(id, stockData) {
    return this.request(`/stocks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stockData),
    });
  }

  async deleteStock(id) {
    return this.request(`/stocks/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();