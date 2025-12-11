import { check, body } from "express-validator";

export const validarDataArchivos = [
  check('ticketId')
    .notEmpty().withMessage('El Id del ticket es obligatoria')
    .isNumeric().withMessage('El Id debe ser numérico'),

  check('nombreArchivo')
    .notEmpty().withMessage('El nombre del archivo es obligatoria')
    .isLength({ min: 10, max: 100 }).withMessage('El nombre del archivo debe tener entre 10 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre del archivo solo debe contener letras y espacios'),
];

export const validarUpdateDataArchivos = [
  check('nombreArchivo')
    .notEmpty().withMessage('El nombre del archivo es obligatoria')
    .isLength({ min: 10, max: 100 }).withMessage('El nombre del archivo debe tener entre 10 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('El nombre del archivo solo debe contener letras y espacios'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
