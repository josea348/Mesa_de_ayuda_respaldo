import { check } from "express-validator";

export const validarReservaAmbiente = [
  check('usuarioId')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isNumeric().withMessage('El ID del usuario debe ser numérico'),

  check('ambienteId')
    .notEmpty().withMessage('El ID del ambiente es obligatorio')
    .isNumeric().withMessage('El ID del ambiente debe ser numérico'),

  check('fechaInicio')
    .notEmpty().withMessage('La fecha de inicio es obligatoria')
    .isISO8601().withMessage('La fecha de inicio debe tener formato válido (YYYY-MM-DD)'),

  check('fechaFin')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isISO8601().withMessage('La fecha de fin debe tener formato válido (YYYY-MM-DD)')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.fecha_inicio)) {
        throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
      }
      return true;
    }),

  check('estado')
    .notEmpty().withMessage('El estado es obligatorio')
    .isIn(['Pendiente','Confirmado','Cancelada','Completada'])
    .withMessage('El estado debe ser pendiente, confirmado, cancelada o completada'),
];

export const validarId = [
  check('id')
    .notEmpty().withMessage('El ID es obligatorio')
    .isNumeric().withMessage('El ID debe ser numérico')
];
