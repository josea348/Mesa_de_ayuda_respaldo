import { check } from "express-validator";

export const validarEquipo = [
  check('nombre')
    .notEmpty().withMessage('El nombre del equipo es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
  
  check('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ max: 65535 }).withMessage('La descripción es demasiado larga'),
  
  check('tipo')
    .notEmpty().withMessage('El tipo es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),
  
  check('id_ambiente')
    .notEmpty().withMessage('El ambiente es obligatorio')
    .isInt({ min: 1 }).withMessage('El ambiente debe ser un número entero positivo')
];

export const validarActualizacionEquipo = [
  check('nombre')
    .optional()
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
  
  check('descripcion')
    .optional()
    .isLength({ max: 65535 }).withMessage('La descripción es demasiado larga'),
  
  check('tipo')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('El tipo debe tener entre 2 y 100 caracteres'),
  
  check('id_ambiente')
    .optional()
    .isInt({ min: 1 }).withMessage('El ambiente debe ser un número entero positivo')
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];

export const validarIdByAmbiente = [
  check('idAmbiente')
    .notEmpty().withMessage('El ID del ambiente es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];

export const validarTipo = [
  check('tipo')
    .notEmpty().withMessage('El tipo es obligatorio.')
    .isLength().withMessage('El tipo debe ser caracteres.')
];

export const validarIdByArea = [
  check('idArea')
    .notEmpty().withMessage('El ID del area es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];