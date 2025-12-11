import { Router } from 'express';
import { 
  getEquipos,
  getEquiposJoin,
  getEquipoById,
  getEquipoByIdJoin,
  crearEquipo,
  actualizarEquipo,
  eliminarEquipo,
  getEquiposByAmbiente,
  getEquiposByTipo,
  getEquiposByArea
} from '../controllers/controllerEquipos.js';
import { validarToken } from "../controllers/autentication.js";
import { validarEquipo, validarActualizacionEquipo, validarId, validarIdByAmbiente, validarTipo, validarIdByArea } from '../validate/equipos.js';

const routerEquipos = Router();

// Rutas para equipos
routerEquipos.get('/equipo', validarToken, getEquipos);
routerEquipos.get('/equipoJoin', validarToken, getEquiposJoin);
routerEquipos.get('/equipo/:id', validarToken, validarId, getEquipoById);
routerEquipos.get('/equipoJoin/:id', validarToken, validarId, getEquipoByIdJoin);
routerEquipos.post('/equipo', validarToken, validarEquipo, crearEquipo);
routerEquipos.put('/equipo/:id', validarToken, validarActualizacionEquipo, actualizarEquipo);
routerEquipos.delete('/equipo/:id', validarToken, validarId, eliminarEquipo);

// Rutas adicionales para filtrar equipos
routerEquipos.get('/equipoByAmbiente/:idAmbiente', validarToken, validarIdByAmbiente, getEquiposByAmbiente);
routerEquipos.get('/equipoByTipo/:tipo', validarToken, validarTipo, getEquiposByTipo);
routerEquipos.get('/equipoByArea/:idArea', validarToken, validarIdByArea, getEquiposByArea);

export default routerEquipos;