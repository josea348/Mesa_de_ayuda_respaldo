import { Router } from "express";
import { getArchivos, getArchivosJoin, getArchivoId, getArchivoIdJoin, registrarArchivo, cargarArchivo, borrarArchivo, actualizarArchivo } from "../controllers/controllerArchivosAdjuntos.js";
import { validarToken } from "../controllers/autentication.js";
import { validarDataArchivos, validarUpdateDataArchivos, validarId } from "../validate/archivosAdjuntos.js";
import { validarArchivo } from "../validate/archivos.js";
const routerArchivoAdjuntos = Router();

routerArchivoAdjuntos.get('/archivos-adjuntos', validarToken, getArchivos);
routerArchivoAdjuntos.get('/archivos-adjuntosJoin', validarToken, getArchivosJoin);
routerArchivoAdjuntos.get('/archivos-adjuntos/:id', validarToken, validarId, getArchivoId);
routerArchivoAdjuntos.get('/archivos-adjuntosJoin/:id', validarToken, validarId, getArchivoIdJoin);
routerArchivoAdjuntos.post('/archivos-adjuntos', validarToken, cargarArchivo, validarDataArchivos, validarArchivo, registrarArchivo);
routerArchivoAdjuntos.delete('/archivos-adjuntos/:id', validarToken, validarId, borrarArchivo);
routerArchivoAdjuntos.put('/archivos-adjuntos/:id', validarToken, validarUpdateDataArchivos, actualizarArchivo);

// routerArchivoAdjuntos.get('/ambienteByArea/:id', validarToken, validarId, getAmbienteByArea);

export default routerArchivoAdjuntos;
