import { Router } from "express";
import { getComentarios, getComentariosJoin, getComentarioId, getComentarioIdJoin, registrarComentario, borrarComentario, actualizarComentario, getComentarioIdByTikets } from "../controllers/controllerComentarios.js";
import { validarToken } from "../controllers/autentication.js";
import { validarComentario, validarUpdateComentario, validarId } from "../validate/comentarios.js";

const routerComentarios = Router();

routerComentarios.get('/comentarios', validarToken, getComentarios);
routerComentarios.get('/comentariosJoin', validarToken, getComentariosJoin);
routerComentarios.get('/comentarios/:id', validarToken, validarId, getComentarioId);
routerComentarios.get('/comentariosJoin/:id', validarToken, validarId, getComentarioIdJoin);
routerComentarios.post('/comentarios', validarToken, validarComentario, registrarComentario);
routerComentarios.delete('/comentarios/:id', validarToken, validarId, borrarComentario);
routerComentarios.put('/comentarios/:id', validarToken, validarUpdateComentario, actualizarComentario);

// Rutas adicionales
routerComentarios.get('/comentariosByTickets/:id', validarToken, validarId, getComentarioIdByTikets);

export default routerComentarios;
