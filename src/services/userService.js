import { apiUrl } from './config.json';
import axios from 'axios';

// Get All Users (admin only)
export function getAllUsers() {
    return axios.get(`${apiUrl}/users`);
};

// Get current user with his own data
export function getProfile() {
    return axios.get(`${apiUrl}/users/profile`);
}

// Get another user
export function getUserById(id) {
    return axios.get(`${apiUrl}/users/profile/${id}`);
}

// Edit User
export function updateUser(id, user) {
    return axios.patch(`${apiUrl}/users/${id}`, user);
}

// Disable account
export function disableUser(id) {
    return axios.post(`${apiUrl}/users/${id}/disable`);
}
