import axiosClient from "./axios";

export const getEncuestas = () => axiosClient.get(`/api/encuesta-satisfaccion`);
export const getEncuestasJoin = () => axiosClient.get(`/api/encuesta-satisfaccionJoin`);
export const getEncuestaId = (id) => axiosClient.get(`/api/encuesta-satisfaccion/${id}`);
export const getEncuestaIdJoin = (id) => axiosClient.get(`/api/encuesta-satisfaccionJoin/${id}`);
export const registerEncuesta = (data) => axiosClient.post(`/api/encuesta-satisfaccion`, data);
export const updateEncuesta = (id, data) => axiosClient.put(`/api/encuesta-satisfaccion/${id}`, data);
export const deleteEncuesta = (id) => axiosClient.delete(`/api/encuesta-satisfaccion/${id}`);
