import axiosClient from "./axios";

export const getTickets = () => axiosClient.get(`/api/tickets`);
export const getTicketsJoin = () => axiosClient.get(`/api/ticketsJoin`);
export const getTicketId = (id) => axiosClient.get(`/api/tickets/${id}`);
export const getTicketIdJoin = (id) => axiosClient.get(`/api/ticketsJoin/${id}`);
export const registerTicket = (data) => axiosClient.post(`/api/tickets`, data);
export const updateTicket = (id, data) => axiosClient.put(`/api/tickets/${id}`, data);
export const deleteTicket = (id) => axiosClient.delete(`/api/tickets/${id}`);
