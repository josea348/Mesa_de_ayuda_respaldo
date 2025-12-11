import { Router } from "express";
import { getNotificaReservaJoin, getNotificaReservaJoinId } from "../controllers/controllerNotificacion.js";
import { validarToken } from "../controllers/autentication.js";
import { validarId } from "../validate/notificacion.js";

const routerNotificacion = Router();

routerNotificacion.get('/notifica-reserva-ambiente-join', validarToken, validarId, getNotificaReservaJoin);
routerNotificacion.get('/notifica-reserva-ambiente-join/:id', validarToken, validarId, getNotificaReservaJoinId);

export default routerNotificacion;
