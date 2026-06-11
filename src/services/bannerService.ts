import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface Banner {
  _id?: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const bannerService = {
  // Get all banners
  async getBanners() {
    const response = await axios.get(`${API_URL}/banners`);
    return response.data;
  },

  // Create new banner
  async createBanner(data: FormData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.post(`${API_URL}/banners`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Update banner
  async updateBanner(id: string, data: FormData) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.put(`${API_URL}/banners/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Delete banner
  async deleteBanner(id: string) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.delete(`${API_URL}/banners/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
