import axiosClient from "./axios";

export const getCategorias = () => axiosClient.get(`/api/categoria`);
export const getCategoriaId = (id) => axiosClient.get(`/api/categoria/${id}`);
export const registerCategoria = (data) => axiosClient.post(`/api/categoria`, data);
export const updateCategoria = (id, data) => axiosClient.put(`/api/categoria/${id}`, data);
export const deleteCategoria = (id) => axiosClient.delete(`/api/categoria/${id}`);
