export const validarArchivo = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      status: 400,
      msg: 'Formato de archivo no válido',
      errors: [{ msg: 'Solo se permiten archivos PDF, DOCX o PPTX', param: 'application' }]
    });
  }

  const maxSize = 20 * 1024 * 1024;
  if (req.file.size > maxSize) {
    return res.status(400).json({
      status: 400,
      msg: 'El archivo es demasiado grande',
      errors: [{ msg: 'El archivo no debe superar los 20MB', param: 'application' }]
    });
  }

  next();
};