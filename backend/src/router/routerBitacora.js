import { Router } from "express";
import { getBitacora, getBitacoraId, registrarBitacora, borrarBitacora, actualizarBitacora } from "../controllers/controllerBitacora.js";
import { validarToken } from "../controllers/autentication.js";
import { validarBitacora, validarId } from "../validate/bitacora.js";

const routerBitacora = Router();

routerBitacora.get('/bitacora', validarToken, getBitacora);
routerBitacora.get('/bitacora/:id', validarToken, validarId, getBitacoraId);
routerBitacora.post('/bitacora', validarToken, validarBitacora, registrarBitacora);
routerBitacora.delete('/bitacora/:id', validarToken, validarId, borrarBitacora);
routerBitacora.put('/bitacora/:id', validarToken, validarBitacora, actualizarBitacora);

export default routerBitacora;
