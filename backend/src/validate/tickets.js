import { check } from "express-validator";

export const validarTicket = [
  check('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El título debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El titulo solo debe contener letras y espacios'),

  check('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El titulo solo debe contener letras y espacios'),

  check('categoria')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isNumeric().withMessage('El ID de la categoría debe ser numérico'),

  check('prioridad')
    .notEmpty().withMessage('La prioridad es obligatoria')
    .isIn(['Alta', 'Media', 'Baja']).withMessage('La prioridad debe ser Alta, Media o Baja'),

  check('solicitante')
    .notEmpty().withMessage('El solicitante es obligatorio')
    .isNumeric().withMessage('El solicitante debe ser numérico'),

  check('asignado')
    .notEmpty().withMessage('El asignado es obligatorio')
    .isNumeric().withMessage('El asignado debe ser numérico'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
