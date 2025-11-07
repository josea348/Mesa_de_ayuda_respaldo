import { Router } from 'express';
import { check } from 'express-validator';
import { 
  getEquipos, 
  getEquipoById, 
  crearEquipo, 
  actualizarEquipo, 
  eliminarEquipo,
  getEquiposByAmbiente,
  getEquiposByTipo
} from '../controllers/controllerEquipos.js';
import { validarEquipo, validarActualizacionEquipo } from '../validate/equipos.js';

const routerEquipos = Router();

// Rutas para equipos
routerEquipos.get('/equipo', getEquipos);
routerEquipos.get('/equipo/:id', getEquipoById);
routerEquipos.post('/equipo', validarEquipo, crearEquipo);
routerEquipos.put('/equipo/:id', validarActualizacionEquipo, actualizarEquipo);
routerEquipos.delete('/equipo/:id', eliminarEquipo);

// Rutas adicionales para filtrar equipos
routerEquipos.get('/ambiente/:id_ambiente', getEquiposByAmbiente);
routerEquipos.get('/tipo/:tipo', getEquiposByTipo);

/* routerEquipos.get('/categoria/:id_categoria', getEquiposByCategoria);
routerEquipos.get('/area/:id_area', getEquiposByArea);
routerEquipos.get('/ambiente/:id_ambiente', getEquiposByAmbiente); */

export default routerEquipos;