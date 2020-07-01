import { apiUrl } from './config.json';
import axios from 'axios';


export function removeCategory(id) {
    return axios.delete(`${apiUrl}/categories/${id}`);
};
export function addCategory(category) {
    return axios.post(`${apiUrl}/categories`,category);
};
export function editCategory(id,category) {
    return axios.patch(`${apiUrl}/categories/${id}`,category);
};
export function getCategoryById(id) {
    return axios.get(`${apiUrl}/categories/${id}`);
};
export function getAllCategories() {
    return axios.get(`${apiUrl}/categories`);
};