import axios from 'axios';

const API_URL = 'loaclhost:3000/api/sale-order-items';

export const getSaleOrderItems = () => axios.get(API_URL);

export const getSaleOrderItem = (id: string) => axios.get(`${API_URL}/${id}`);

export const createSaleOrderItem = (data: any) => axios.post(API_URL, data);

export const updateSaleOrderItem = (id: string, data: any) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteSaleOrderItem = (id: string) =>
  axios.delete(`${API_URL}/${id}`);
