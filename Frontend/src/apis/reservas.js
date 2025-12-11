import axiosClient from "./axios";

export const getReservasAmbiente = () => axiosClient.get(`/api/reservas-ambiente`);
export const getReservasAmbienteJoin = () => axiosClient.get(`/api/reservas-ambienteJoin`);
export const getReservasAmbienteId = (id) => axiosClient.get(`/api/reservas-ambiente/${id}`);
export const getReservasAmbienteIdJoin = (id) => axiosClient.get(`/api/reservas-ambienteJoin/${id}`);
export const registerReservasAmbiente = (data) => axiosClient.post(`/api/reservas-ambiente`, data);
export const updateReservasAmbiente = (id, data) => axiosClient.put(`/api/reservas-ambiente/${id}`, data);
export const deleteReservasAmbiente = (id) => axiosClient.delete(`/api/reservas-ambiente/${id}`);

export const getReservasJoin = () => axiosClient.get(`/api/reservas`);
export const getReservasJoinId = (id) => axiosClient.get(`/api/reservas/${id}`);

export const getReservasEquipo = () => axiosClient.get(`/api/reservas-equipo`);
export const getReservasEquipoJoin = () => axiosClient.get(`/api/reservas-equipoJoin`);
export const getReservasEquipoId = (id) => axiosClient.get(`/api/reservas-equipo/${id}`);
export const getReservasEquipoIdJoin = (id) => axiosClient.get(`/api/reservas-equipoJoin/${id}`);
export const registerReservasEquipo = (data) => axiosClient.post(`/api/reservas-equipo`, data);
export const updateReservasEquipo = (id, data) => axiosClient.put(`/api/reservas-equipo/${id}`, data);
export const deleteReservasEquipo = (id) => axiosClient.delete(`/api/reservas-equipo/${id}`);
