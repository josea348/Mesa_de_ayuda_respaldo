import axiosClient from "./axios";

export const getEquipos = () => axiosClient.get(`/api/equipo`);
export const getEquiposJoin = () => axiosClient.get(`/api/equipoJoin`);
export const getEquipoId = (id) => axiosClient.get(`/api/equipo/${id}`);
export const getEquipoIdJoin = (id) => axiosClient.get(`/api/equipoJoin/${id}`);
export const registerEquipo = (data) => axiosClient.post(`/api/equipo`, data);
export const updateEquipo = (id, data) => axiosClient.put(`/api/equipo/${id}`, data);
export const deleteEquipo = (id) => axiosClient.delete(`/api/equipo/${id}`);

export const getEquipoByAmbiente = (idAmbiente) => axiosClient.get(`/api/ambiente/${idAmbiente}`);
export const getEquipoByTipo = (tipo) => axiosClient.get(`/api/tipo/${tipo}`);
export const getEquipoByArea = (idArea) => axiosClient.delete(`/api/area/${idArea}`);
