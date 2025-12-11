import { check } from "express-validator";

export const validarComentario = [
  check('ticketId')
    .notEmpty().withMessage('El ID del ticket es obligatorio')
    .isNumeric().withMessage('El ID del ticket debe ser numérico'),

  check('usuarioId')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isNumeric().withMessage('El ID del usuario debe ser numérico'),

  check('comentario')
    .notEmpty().withMessage('El comentario es obligatorio')
    .isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres')
];

export const validarUpdateComentario = [
  check('comentario')
    .notEmpty().withMessage('El comentario es obligatorio')
    .isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres')
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
