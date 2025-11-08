import { Router } from "express";
import { getReservasEquipo, getReservaEquipoId, registrarReservaEquipo, borrarReservaEquipo, actualizarReservaEquipo } from "../controllers/controllerReservasEquipo.js";
import { validarToken } from "../controllers/autentication.js";
import { validarReservaEquipo, validarId } from "../validate/reservasEquipo.js";

const routerReservasEquipo = Router();

routerReservasEquipo.get('/reservas-equipo', validarToken, getReservasEquipo);
routerReservasEquipo.get('/reservas-equipo/:id', validarToken, validarId, getReservaEquipoId);
routerReservasEquipo.post('/reservas-equipo', validarToken, validarReservaEquipo, registrarReservaEquipo);
routerReservasEquipo.delete('/reservas-equipo/:id', validarToken, validarId, borrarReservaEquipo);
routerReservasEquipo.put('/reservas-equipo/:id', validarToken, validarReservaEquipo, actualizarReservaEquipo);

export default routerReservasEquipo;
