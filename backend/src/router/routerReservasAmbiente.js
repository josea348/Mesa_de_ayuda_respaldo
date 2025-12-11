import { Router } from "express";
import { getReservasAmbiente, getReservasAmbienteJoin, getReservaAmbienteId, getReservaAmbienteJoinId, registrarReservaAmbiente, borrarReservaAmbiente, actualizarReservaAmbiente } from "../controllers/controllerReservasAmbiente.js";
import { validarToken } from "../controllers/autentication.js";
import { validarReservaAmbiente, validarId } from "../validate/reservasAmbiente.js";

const routerReservasAmbiente = Router();

routerReservasAmbiente.get('/reservas-ambiente', getReservasAmbiente);
routerReservasAmbiente.get('/reservas-ambienteJoin', getReservasAmbienteJoin);
routerReservasAmbiente.get('/reservas-ambiente/:id', validarId, getReservaAmbienteId);
routerReservasAmbiente.get('/reservas-ambienteJoin/:id', validarId, getReservaAmbienteJoinId);
routerReservasAmbiente.post('/reservas-ambiente', validarToken, validarReservaAmbiente, registrarReservaAmbiente);
routerReservasAmbiente.delete('/reservas-ambiente/:id', validarToken, validarId, borrarReservaAmbiente);
routerReservasAmbiente.put('/reservas-ambiente/:id', validarToken, validarReservaAmbiente, actualizarReservaAmbiente);

export default routerReservasAmbiente;
