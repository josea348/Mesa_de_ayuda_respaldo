import axiosClient from "./axios";

export const getAmbientes = () => axiosClient.get(`/api/ambiente`);
export const getAmbientesJoin = () => axiosClient.get(`/api/ambienteJoin`);
export const getAmbienteId = (id) => axiosClient.get(`/api/ambiente/${id}`);
export const getAmbienteIdJoin = (id) => axiosClient.get(`/api/ambienteJoin/${id}`);
export const registerAmbiente = (data) => axiosClient.post(`/api/ambiente`, data);
export const updateAmbiente = (id, data) => axiosClient.put(`/api/ambiente/${id}`, data);
export const deleteAmbiente = (id) => axiosClient.delete(`/api/ambiente/${id}`);
