import { check } from "express-validator";

export const validarEncuestaSatisfaccion = [
  check('ticket_id')
    .notEmpty().withMessage('El ID del ticket es obligatorio')
    .isNumeric().withMessage('El ID del ticket debe ser numérico'),

  check('usuario_id')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isNumeric().withMessage('El ID del usuario debe ser numérico'),

  check('calificacion')
    .notEmpty().withMessage('La calificación es obligatoria')
    .isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser un número entre 1 y 5'),

  check('comentarios')
    .notEmpty().withMessage('El comentario es obligatorio')
    .isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres')
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
