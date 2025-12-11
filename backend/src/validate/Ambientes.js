import { check, body } from "express-validator";

export const validarAmbiente = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),

  check('ubicacion')
    .notEmpty().withMessage('La ubicación es obligatoria')
    .isLength({ min: 10, max: 100 }).withMessage('El ubicacion debe tener entre 10 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;]+$/).withMessage('La ubicaión solo debe contener letras y espacios'),

  check('capacidad')
    .notEmpty().withMessage('La capacidad es obligatoria')
    .isNumeric().withMessage('La capacidad debe ser numérico'),

  check('estado')
    .notEmpty().withMessage('El estado es obligatoria')
    .isIn(['Disponible', 'Ocupado', 'Mantenimiento']).withMessage('Estado inválido. Debe ser: Disponible, Ocupado o Mantenimiento'),

  check('areaId')
    .notEmpty().withMessage('El Id del area es obligatoria')
    .isNumeric().withMessage('El ID debe ser numérico'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
