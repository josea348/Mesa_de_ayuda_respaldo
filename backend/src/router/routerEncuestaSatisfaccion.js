import { Router } from "express";
import { getEncuesta, getEncuestaJoin, getEncuestaId, getEncuestaIdJoin, registrarEncuesta, borrarEncuesta, actualizarEncuesta, getEncuestaByUser, getEncuestaByTicket } from "../controllers/controllerEncuestaSatisfaccion.js";
import { validarToken } from "../controllers/autentication.js";
import { validarEncuestaSatisfaccion, validarUpdateEncuestaSatisfaccion, validarId } from "../validate/encuestaSatisfaccion.js";

const routerEncuestaSatisfaccion = Router();

routerEncuestaSatisfaccion.get('/encuesta-satisfaccion', getEncuesta);
routerEncuestaSatisfaccion.get('/encuesta-satisfaccionJoin', validarToken, getEncuestaJoin);
routerEncuestaSatisfaccion.get('/encuesta-satisfaccion/:id', validarToken, validarId, getEncuestaId);
routerEncuestaSatisfaccion.get('/encuesta-satisfaccionJoin/:id', validarToken, validarId, getEncuestaIdJoin);
routerEncuestaSatisfaccion.post('/encuesta-satisfaccion', validarToken, validarEncuestaSatisfaccion, registrarEncuesta);
routerEncuestaSatisfaccion.delete('/encuesta-satisfaccion/:id', validarToken, validarId, borrarEncuesta);
routerEncuestaSatisfaccion.put('/encuesta-satisfaccion/:id', validarToken, validarUpdateEncuestaSatisfaccion, actualizarEncuesta);

// Rutas adicionales
routerEncuestaSatisfaccion.get('/encuestaSatisfaccionByUser/:id', validarId, getEncuestaByUser);
routerEncuestaSatisfaccion.get('/encuestaSatisfaccionByTicket/:id', validarId, getEncuestaByTicket);

export default routerEncuestaSatisfaccion;
