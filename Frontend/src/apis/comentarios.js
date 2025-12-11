import axiosClient from "./axios";

export const getComentarios = () => axiosClient.get(`/api/comentarios`);
export const getComentariosJoin = () => axiosClient.get(`/api/comentariosJoin`);
export const getComentarioId = (id) => axiosClient.get(`/api/comentarios/${id}`);
export const getComentarioIdJoin = (id) => axiosClient.get(`/api/comentariosJoin/${id}`);
export const registerComentario = (data) => axiosClient.post(`/api/comentarios`, data);
export const updateComentario = (id, data) => axiosClient.put(`/api/comentarios/${id}`, data);
export const deleteComentario = (id) => axiosClient.delete(`/api/comentarios/${id}`);

export const getComentarioIdByTickets = (id) => axiosClient.get(`/api/comentariosByTickets/${id}`);
