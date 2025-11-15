import { Router } from "express";
import { borrarUsuario, registrarUsuario, actualizarUsuario, cargarImagen, getUsers, getUserId, actualizarContrasenaUsuario, actualizarDatosUsuario } from "../controllers/controllerUsuario.js";
import { validarUsuario, validarActualizacionUsuario, validarUpdatePasswordUser, validarActualizacionDatosUsuario, validarId } from "../validate/usuarios.js";
import { validarToken } from "../controllers/autentication.js";
import { validarImagen } from "../validate/imagenes.js";
const routerUsuario = Router();

routerUsuario.get('/usuario', getUsers);
routerUsuario.get('/usuario/:id', validarToken, validarId, getUserId);
routerUsuario.post('/usuario', validarToken, cargarImagen, validarUsuario, validarImagen, registrarUsuario);
routerUsuario.delete('/usuario/:id', validarToken, validarId, borrarUsuario);
routerUsuario.put('/usuario/:id', validarToken, cargarImagen, validarActualizacionUsuario, validarImagen, actualizarUsuario);
routerUsuario.put('/usuario-data/:id', validarToken, cargarImagen, validarActualizacionDatosUsuario, validarImagen, actualizarDatosUsuario);
routerUsuario.put('/usuario-password/:id', validarToken, validarUpdatePasswordUser, actualizarContrasenaUsuario);

export default routerUsuario;
