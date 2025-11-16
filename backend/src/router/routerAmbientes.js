import { Router } from "express";
import { actualizarAmbiente, borrarAmbiente, getAmbiente, getAmbienteJoin, getAmbienteId, getAmbienteIdJoin, registrarAmbiente } from "../controllers/controllerAmbientes.js";
import { validarToken } from "../controllers/autentication.js";
import { validarAmbiente, validarId } from "../validate/ambientes.js";
const routerAmbientes = Router();

routerAmbientes.get('/ambiente', validarToken, getAmbiente);
routerAmbientes.get('/ambienteJoin', validarToken, getAmbienteJoin);
routerAmbientes.get('/ambiente/:id', validarId, getAmbienteId);
routerAmbientes.get('/ambienteJoin/:id', validarId, getAmbienteIdJoin);
routerAmbientes.post('/ambiente', validarToken, validarAmbiente, registrarAmbiente);
routerAmbientes.delete('/ambiente/:id', validarToken, validarId, borrarAmbiente);
routerAmbientes.put('/ambiente/:id', validarToken, validarAmbiente, actualizarAmbiente);

export default routerAmbientes;
