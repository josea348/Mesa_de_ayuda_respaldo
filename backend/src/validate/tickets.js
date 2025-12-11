import { check } from "express-validator";

export const validarTicket = [
  check('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El título debe tener entre 3 y 50 caracteres'),

  check('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),

  check('categoria')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isNumeric().withMessage('El ID de la categoría debe ser numérico'),

  check('prioridad')
    .notEmpty().withMessage('La prioridad es obligatoria')
    .isIn(['Alta', 'Media', 'Baja']).withMessage('La prioridad debe ser Alta, Media o Baja'),

  check('estado')
    .notEmpty().withMessage('La estado es obligatoria')
    .isIn(['Abierto','En progreso','Cerrado']).withMessage('La estado debe ser Abierto, En progreso o Cerrado'),

  check('solicitante')
    .notEmpty().withMessage('El solicitante es obligatorio')
    .isNumeric().withMessage('El solicitante debe ser numérico'),

  check('asignado')
    .notEmpty().withMessage('El asignado es obligatorio')
    .isNumeric().withMessage('El asignado debe ser numérico'),
];
// 3175195818
export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
