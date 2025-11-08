import { Router } from "express";
import { getNotificaReservaEquipo, getNotificaReservaEquipoId, registrarNotificaReservaEquipo, borrarNotificaReservaEquipo, actualizarNotificaReservaEquipo } from "../controllers/controllerNotificaReservaEquipo.js";
import { validarToken } from "../controllers/autentication.js";
import { validarNotificaReservaEquipo, validarId } from "../validate/notificaReservaEquipo.js";

const routerNotificaReservaEquipo = Router();

routerNotificaReservaEquipo.get('/notifica-reserva-equipo', validarToken, getNotificaReservaEquipo);
routerNotificaReservaEquipo.get('/notifica-reserva-equipo/:id', validarToken, validarId, getNotificaReservaEquipoId);
routerNotificaReservaEquipo.post('/notifica-reserva-equipo', validarToken, validarNotificaReservaEquipo, registrarNotificaReservaEquipo);
routerNotificaReservaEquipo.delete('/notifica-reserva-equipo/:id', validarToken, validarId, borrarNotificaReservaEquipo);
routerNotificaReservaEquipo.put('/notifica-reserva-equipo/:id', validarToken, validarNotificaReservaEquipo, actualizarNotificaReservaEquipo);

export default routerNotificaReservaEquipo;
