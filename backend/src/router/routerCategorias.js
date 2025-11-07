import { Router } from "express";
import { actualizarCategoria, borrarCategoria, getCategorias, getCategoriaId, registrarCategoria } from "../controllers/controllerCategorias.js";
import { validarToken } from "../controllers/autentication.js";
import { validarCategoria, validarId } from "../validate/Categorias.js";
const routerCategoria = Router();

routerCategoria.get('/Categoria', validarToken, getCategorias);
routerCategoria.get('/Categoria/:id', validarToken, validarId, getCategoriaId);
routerCategoria.post('/Categoria', validarToken, validarCategoria, registrarCategoria);
routerCategoria.delete('/Categoria/:id', validarToken, validarId, borrarCategoria);
routerCategoria.put('/Categoria/:id', validarToken, validarCategoria, actualizarCategoria);

export default routerCategoria;
