import axiosClient from "./axios";

export const getAreas = () => axiosClient.get(`/api/area`);
export const getAreaId = (id) => axiosClient.get(`/api/area/${id}`);
export const registerArea = (data) => axiosClient.post(`/api/area`, data);
export const updateArea = (id, data) => axiosClient.put(`/api/area/${id}`, data);
export const deleteArea = (id) => axiosClient.delete(`/api/area/${id}`);
