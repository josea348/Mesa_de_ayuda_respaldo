import { Router } from "express";
import { getReservasJoin, getReservasJoinId } from "../controllers/controllerReservas.js";
import { validarToken } from "../controllers/autentication.js";
import { validarId } from "../validate/reservas.js";

const routerReservas = Router();

routerReservas.get('/reservas', validarToken, getReservasJoin);
routerReservas.get('/reservas/:id', validarToken, validarId, getReservasJoinId);

export default routerReservas;
