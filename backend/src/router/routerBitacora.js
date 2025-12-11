import { Router } from "express";
import { getBitacora, getBitacoraJoin, getBitacoraId, getBitacoraIdJoin, registrarBitacora, borrarBitacora, actualizarBitacora } from "../controllers/controllerBitacora.js";
import { validarToken } from "../controllers/autentication.js";
import { validarBitacora, validarActualizacionBitacora, validarId } from "../validate/bitacora.js";

const routerBitacora = Router();

routerBitacora.get('/bitacora', validarToken, getBitacora);
routerBitacora.get('/bitacoraJoin', validarToken, getBitacoraJoin);
routerBitacora.get('/bitacora/:id', validarToken, validarId, getBitacoraId);
routerBitacora.get('/bitacoraJoin/:id', validarToken, validarId, getBitacoraIdJoin);
routerBitacora.post('/bitacora', validarToken, validarBitacora, registrarBitacora);
routerBitacora.delete('/bitacora/:id', validarToken, validarId, borrarBitacora);
routerBitacora.put('/bitacora/:id', validarToken, validarActualizacionBitacora, actualizarBitacora);

export default routerBitacora;
