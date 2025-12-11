import axiosClient from "./axios";

export const getFiles = () => axiosClient.get(`/api/archivos-adjuntos`);
export const getFilesJoin = () => axiosClient.get(`/api/archivos-adjuntosJoin`);
export const getFileId = (id) => axiosClient.get(`/api/archivos-adjuntos/${id}`);
export const registerFiles = (data) => axiosClient.post(`/api/archivos-adjuntos`, data);
export const updateFiles = (id, data) => axiosClient.put(`/api/archivos-adjuntos/${id}`, data);
export const deleteFile = (id) => axiosClient.delete(`/api/archivos-adjuntos/${id}`);
