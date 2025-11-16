import { Router } from "express";
import { actualizarArea, borrarArea, getArea, getAreaId, registrarArea } from "../controllers/controllerAreas.js";
import { validarToken } from "../controllers/autentication.js";
import { validarArea, validarId } from "../validate/areas.js";
const routerAreas = Router();

routerAreas.get('/area', validarToken, getArea);
routerAreas.get('/area/:id', validarToken, validarId, getAreaId);
routerAreas.post('/area', validarToken, validarArea, registrarArea);
routerAreas.delete('/area/:id', validarToken, validarId, borrarArea);
routerAreas.put('/area/:id', validarToken, validarArea, actualizarArea);

export default routerAreas;
