import axiosClient from "./axios";

export const getNotificaReservasAmbiente = () => axiosClient.get(`/api/notifica-reserva-ambiente`);
export const getNotificaReservasAmbienteJoin = () => axiosClient.get(`/api/notifica-reserva-ambienteJoin`);
export const getNotificaReservasAmbienteId = (id) => axiosClient.get(`/api/notifica-reserva-ambiente/${id}`);
export const getNotificaReservasAmbienteIdJoin = (id) => axiosClient.get(`/api/notifica-reserva-ambienteJoin/${id}`);
export const registerNotificaReservasAmbiente = (data) => axiosClient.post(`/api/notifica-reserva-ambiente`, data);
export const updateNotificaReservasAmbiente = (id, data) => axiosClient.put(`/api/notifica-reserva-ambiente/${id}`, data);
export const deleteNotificaReservasAmbiente = (id) => axiosClient.delete(`/api/notifica-reserva-ambiente/${id}`);

export const getNotificaReservasJoin = () => axiosClient.get(`/api/notifica-reserva-ambiente-join`);
export const getNotificaReservasJoinId = (id) => axiosClient.get(`/api/notifica-reserva-ambiente-join/${id}`);

export const getNotificaReservasEquipo = () => axiosClient.get(`/api/notifica-reserva-equipo`);
export const getNotificaReservasEquipoJoin = () => axiosClient.get(`/api/notifica-reserva-equipoJoin`);
export const getNotificaReservasEquipoId = (id) => axiosClient.get(`/api/notifica-reserva-equipo/${id}`);
export const getNotificaReservasEquipoIdJoin = (id) => axiosClient.get(`/api/notifica-reserva-equipoJoin/${id}`);
export const registerNotificaReservasEquipo = (data) => axiosClient.post(`/api/notifica-reserva-equipo`, data);
export const updateNotificaReservasEquipo = (id, data) => axiosClient.put(`/api/notifica-reserva-equipo/${id}`, data);
export const deleteNotificaReservasEquipo = (id) => axiosClient.delete(`/api/notifica-reserva-equipo/${id}`);
