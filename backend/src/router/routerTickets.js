import { Router } from "express";
import { getTicket, getTicketJoin, getTicketId, getTicketIdJoin, registrarTicket, borrarTicket, actualizarTicket } from "../controllers/controllerTickets.js";
import { validarToken } from "../controllers/autentication.js";
import { validarTicket, validarId } from "../validate/tickets.js";

const routerTickets = Router();

routerTickets.get('/tickets', validarToken, getTicket);
routerTickets.get('/ticketsJoin', validarToken, getTicketJoin);
routerTickets.get('/tickets/:id', validarToken, validarId, getTicketId);
routerTickets.get('/ticketsJoin/:id', validarToken, validarId, getTicketIdJoin);
routerTickets.post('/tickets', validarToken, validarTicket, registrarTicket);
routerTickets.delete('/tickets/:id', validarToken, validarId, borrarTicket);
routerTickets.put('/tickets/:id', validarToken, validarTicket, actualizarTicket);

export default routerTickets;
