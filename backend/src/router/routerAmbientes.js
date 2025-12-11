import { Router } from "express";
import { actualizarAmbiente, borrarAmbiente, getAmbiente, getAmbienteJoin, getAmbienteId, getAmbienteIdJoin, registrarAmbiente, getAmbienteByArea } from "../controllers/controllerAmbientes.js";
import { validarToken } from "../controllers/autentication.js";
import { validarAmbiente, validarId } from "../validate/ambientes.js";
const routerAmbientes = Router();

routerAmbientes.get('/ambiente', validarToken, getAmbiente);
routerAmbientes.get('/ambienteJoin', validarToken, getAmbienteJoin);
routerAmbientes.get('/ambiente/:id', validarToken, validarId, getAmbienteId);
routerAmbientes.get('/ambienteJoin/:id', validarToken, validarId, getAmbienteIdJoin);
routerAmbientes.post('/ambiente', validarToken, validarAmbiente, registrarAmbiente);
routerAmbientes.delete('/ambiente/:id', validarToken, validarId, borrarAmbiente);
routerAmbientes.put('/ambiente/:id', validarToken, validarAmbiente, actualizarAmbiente);

routerAmbientes.get('/ambienteByArea/:id', validarToken, validarId, getAmbienteByArea);

export default routerAmbientes;
