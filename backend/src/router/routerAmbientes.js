import { Router } from "express";
import { actualizarAmbiente, borrarAmbiente, getAmbiente, getAmbienteId, registrarAmbiente } from "../controllers/controllerAmbientes.js";
import { validarToken } from "../controllers/autentication.js";
import { validarAmbiente, validarId } from "../validate/Ambientes.js";
const routerAmbientes = Router();

routerAmbientes.get('/ambiente', validarToken, getAmbiente);
routerAmbientes.get('/ambiente/:id', validarToken, validarId, getAmbienteId);
routerAmbientes.post('/ambiente', validarToken, validarAmbiente, registrarAmbiente);
routerAmbientes.delete('/ambiente/:id', validarToken, validarId, borrarAmbiente);
routerAmbientes.put('/ambiente/:id', validarToken, validarAmbiente, actualizarAmbiente);

export default routerAmbientes;
