// Función personalizada para validar la imagen
export const validarImagen = (req, res, next) => {
  // Si no hay archivo, permitir continuar (imagen opcional)
  if (!req.file) {
    return next();
  }
  
  // Validar tipo de archivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      status: 400,
      msg: 'Formato de imagen no válido',
      errors: [{ msg: 'Solo se permiten archivos JPG, PNG, JPEG o GIF', param: 'image' }]
    });
  }
  
  // Validar tamaño (máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (req.file.size > maxSize) {
    return res.status(400).json({
      status: 400,
      msg: 'La imagen es demasiado grande',
      errors: [{ msg: 'La imagen no debe superar los 5MB', param: 'image' }]
    });
  }
  
  next();
};