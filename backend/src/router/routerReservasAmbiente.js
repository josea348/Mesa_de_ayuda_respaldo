import { Router } from "express";
import { getReservasAmbiente, getReservaAmbienteId, registrarReservaAmbiente, borrarReservaAmbiente, actualizarReservaAmbiente } from "../controllers/controllerReservasAmbiente.js";
import { validarToken } from "../controllers/autentication.js";
import { validarReservaAmbiente, validarId } from "../validate/reservasAmbiente.js";

const routerReservasAmbiente = Router();

routerReservasAmbiente.get('/reservas-ambiente', validarToken, getReservasAmbiente);
routerReservasAmbiente.get('/reservas-ambiente/:id', validarToken, validarId, getReservaAmbienteId);
routerReservasAmbiente.post('/reservas-ambiente', validarToken, validarReservaAmbiente, registrarReservaAmbiente);
routerReservasAmbiente.delete('/reservas-ambiente/:id', validarToken, validarId, borrarReservaAmbiente);
routerReservasAmbiente.put('/reservas-ambiente/:id', validarToken, validarReservaAmbiente, actualizarReservaAmbiente);

export default routerReservasAmbiente;
