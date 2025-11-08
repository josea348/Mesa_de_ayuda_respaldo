import { check } from "express-validator";

export const validarNotificaReservaAmbiente = [
  check('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El título debe tener entre 3 y 50 caracteres'),

  check('comentario')
    .notEmpty().withMessage('El comentario es obligatorio')
    .isLength({ min: 5 }).withMessage('El comentario debe tener al menos 5 caracteres'),

  check('res_ambiente_id')
    .notEmpty().withMessage('El ID de la reserva de ambiente es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
