import { Router } from "express";
import { getReservasAmbiente, getReservasAmbienteJoin, getReservaAmbienteId, getReservaAmbienteJoinId, registrarReservaAmbiente, borrarReservaAmbiente, actualizarReservaAmbiente } from "../controllers/controllerReservasAmbiente.js";
import { validarToken } from "../controllers/autentication.js";
import { validarReservaAmbiente, validarId } from "../validate/reservasAmbiente.js";

const routerReservasAmbiente = Router();

routerReservasAmbiente.get('/reservas-ambiente', validarToken, getReservasAmbiente);
routerReservasAmbiente.get('/reservas-ambienteJoin', validarToken, getReservasAmbienteJoin);
routerReservasAmbiente.get('/reservas-ambiente/:id', validarToken, validarId, getReservaAmbienteId);
routerReservasAmbiente.get('/reservas-ambienteJoin/:id', validarToken, validarId, getReservaAmbienteJoinId);
routerReservasAmbiente.post('/reservas-ambiente', validarToken, validarReservaAmbiente, registrarReservaAmbiente);
routerReservasAmbiente.delete('/reservas-ambiente/:id', validarToken, validarId, borrarReservaAmbiente);
routerReservasAmbiente.put('/reservas-ambiente/:id', validarToken, validarReservaAmbiente, actualizarReservaAmbiente);

export default routerReservasAmbiente;
