import { Router } from "express";
import { getTicket, getTicketId, registrarTicket, borrarTicket, actualizarTicket } from "../controllers/controllerTickets.js";
import { validarToken } from "../controllers/autentication.js";
import { validarTicket, validarId } from "../validate/tickets.js";

const routerTickets = Router();

routerTickets.get('/tickets', validarToken, getTicket);
routerTickets.get('/tickets/:id', validarToken, validarId, getTicketId);
routerTickets.post('/tickets', validarToken, validarTicket, registrarTicket);
routerTickets.delete('/tickets/:id', validarToken, validarId, borrarTicket);
routerTickets.put('/tickets/:id', validarToken, validarTicket, actualizarTicket);

export default routerTickets;
