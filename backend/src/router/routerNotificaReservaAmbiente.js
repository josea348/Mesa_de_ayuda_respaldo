import { Router } from "express";
import { getNotificaReservaAmbiente, getNotificaReservaAmbienteJoin, getNotificaReservaAmbienteId, getNotificaReservaAmbienteJoinId, registrarNotificaReservaAmbiente, borrarNotificaReservaAmbiente, actualizarNotificaReservaAmbiente } from "../controllers/controllerNotificaReservaAmbiente.js";
import { validarToken } from "../controllers/autentication.js";
import { validarNotificaReservaAmbiente, validarId } from "../validate/notificaReservaAmbiente.js";

const routerNotificaReservaAmbiente = Router();

routerNotificaReservaAmbiente.get('/notifica-reserva-ambiente', validarToken, getNotificaReservaAmbiente);
routerNotificaReservaAmbiente.get('/notifica-reserva-ambienteJoin', validarToken, getNotificaReservaAmbienteJoin);
routerNotificaReservaAmbiente.get('/notifica-reserva-ambiente/:id', validarToken, validarId, getNotificaReservaAmbienteId);
routerNotificaReservaAmbiente.get('/notifica-reserva-ambienteJoin/:id', validarToken, validarId, getNotificaReservaAmbienteJoinId);
routerNotificaReservaAmbiente.post('/notifica-reserva-ambiente', validarToken, validarNotificaReservaAmbiente, registrarNotificaReservaAmbiente);
routerNotificaReservaAmbiente.delete('/notifica-reserva-ambiente/:id', validarToken, validarId, borrarNotificaReservaAmbiente);
routerNotificaReservaAmbiente.put('/notifica-reserva-ambiente/:id', validarToken, validarNotificaReservaAmbiente, actualizarNotificaReservaAmbiente);

export default routerNotificaReservaAmbiente;
