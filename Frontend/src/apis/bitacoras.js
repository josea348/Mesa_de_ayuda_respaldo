import axiosClient from "./axios";

export const getBitacoras = () => axiosClient.get(`/api/bitacora`);
export const getBitacorasJoin = () => axiosClient.get(`/api/bitacoraJoin`);
export const getBitacoraId = (id) => axiosClient.get(`/api/bitacora/${id}`);
export const getBitacoraIdJoin = (id) => axiosClient.get(`/api/bitacoraJoin/${id}`);
export const registerBitacora = (data) => axiosClient.post(`/api/bitacora`, data);
export const updateBitacora = (id, data) => axiosClient.put(`/api/bitacora/${id}`, data);
export const deleteBitacora = (id) => axiosClient.delete(`/api/bitacora/${id}`);
