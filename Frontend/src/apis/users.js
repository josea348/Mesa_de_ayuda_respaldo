import axios from "axios";
import axiosClient from "./axios";

export const authUsers = (data) => axios.post(`http://localhost:4001/auth`, data);
export const getUsers = () => axiosClient.get(`/api/usuario`);
export const getUserId = (id) => axiosClient.get(`/api/usuario/${id}`);
export const registerUser = (data) => axiosClient.post(`/api/usuario`,data);
export const updateUser = (id, data) => axiosClient.put(`/api/usuario/${id}`,data);
export const updateDataUser = (id, data) => axiosClient.put(`/api/usuario-data/${id}`,data);
export const updatePasswordUser = (id, data) => axiosClient.put(`/api/usuario-password/${id}`,data);
export const deleteUser = (id) => axiosClient.delete(`/api/usuario/${id}`);
