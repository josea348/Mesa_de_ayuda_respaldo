import { Router } from "express";
import { getEncuesta, getEncuestaId, registrarEncuesta, borrarEncuesta, actualizarEncuesta } from "../controllers/controllerEncuestaSatisfaccion.js";
import { validarToken } from "../controllers/autentication.js";
import { validarEncuestaSatisfaccion, validarId } from "../validate/encuestaSatisfaccion.js";

const routerEncuestaSatisfaccion = Router();

routerEncuestaSatisfaccion.get('/encuesta-satisfaccion', validarToken, getEncuesta);
routerEncuestaSatisfaccion.get('/encuesta-satisfaccion/:id', validarToken, validarId, getEncuestaId);
routerEncuestaSatisfaccion.post('/encuesta-satisfaccion', validarToken, validarEncuestaSatisfaccion, registrarEncuesta);
routerEncuestaSatisfaccion.delete('/encuesta-satisfaccion/:id', validarToken, validarId, borrarEncuesta);
routerEncuestaSatisfaccion.put('/encuesta-satisfaccion/:id', validarToken, validarEncuestaSatisfaccion, actualizarEncuesta);

export default routerEncuestaSatisfaccion;
