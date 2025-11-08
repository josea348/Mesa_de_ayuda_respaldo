import { Router } from "express";
import { getComentarios, getComentarioId, registrarComentario, borrarComentario, actualizarComentario } from "../controllers/controllerComentarios.js";
import { validarToken } from "../controllers/autentication.js";
import { validarComentario, validarId } from "../validate/comentarios.js";

const routerComentarios = Router();

routerComentarios.get('/comentarios', validarToken, getComentarios);
routerComentarios.get('/comentarios/:id', validarToken, validarId, getComentarioId);
routerComentarios.post('/comentarios', validarToken, validarComentario, registrarComentario);
routerComentarios.delete('/comentarios/:id', validarToken, validarId, borrarComentario);
routerComentarios.put('/comentarios/:id', validarToken, validarComentario, actualizarComentario);

export default routerComentarios;
