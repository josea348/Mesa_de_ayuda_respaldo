DROP DATABASE help_desk;
CREATE DATABASE help_desk;
USE help_desk;

CREATE TABLE usuarios (
  identificacion int(11) NOT NULL PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  image varchar(50) DEFAULT NULL,
  telefono varchar(20) NOT NULL,
  email varchar(60) NOT NULL,
  password varchar(60) NOT NULL,
  rol enum('Administrador','Operario','Instructor','Aprendiz') NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  descripcion text DEFAULT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE areas (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  descripcion text DEFAULT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE ambiente (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  ubicacion varchar(100) NOT NULL,
  capacidad int(11) NOT NULL,
  estado enum('Disponible','Ocupado','Mantenimiento') DEFAULT 'disponible',
  area_id int(11) DEFAULT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE equipos (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50) NOT NULL,
  descripcion text NOT NULL,
  tipo varchar(100) NOT NULL,
  id_ambiente int(11) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE tickets (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  descripcion text NOT NULL,
  categoria int(11) NOT NULL,
  prioridad enum('Baja','Media','Alta') NOT NULL DEFAULT 'Media',
  estado enum('Abierto','En progreso','Cerrado') NOT NULL DEFAULT 'Abierto',
  solicitante int(11) NOT NULL,
  asignado int(11) DEFAULT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservas_ambiente (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  usuario_id int(11) NOT NULL,
  ambiente_id int(11) NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  estado enum('Pendiente','Confirmado','Cancelada','Completada') NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservas_equipo (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  usuario_id int(11) NOT NULL,
  equipo_id int(11) NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  estado enum('Pendiente','Confirmado','Cancelada','completada') NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifica_reserva_ambiente (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  comentario text NOT NULL,
  res_ambiente_id int(11) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE notifica_reserva_equipo (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  comentario text NOT NULL,
  res_equipo_id int(11) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE encuesta_satisfaccion (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ticket_id int(11) NOT NULL,
  usuario_id int(11) NOT NULL,
  calificacion int(11) NOT NULL,
  comentarios text NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bitacora (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  accion varchar(100) NOT NULL,
  detalles text DEFAULT NULL,
  usuario_id int(11) NOT NULL,
  ticket_id int(11) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE archivos_adjuntos (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ticket_id int(11) NOT NULL,
  nombre_archivo varchar(100) NOT NULL,
  ruta_archivo varchar(255) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp()
);

CREATE TABLE comentarios (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ticket_id int(11) NOT NULL,
  usuario_id int(11) NOT NULL,
  comentario text NOT NULL,
  fecha_registro timestamp NOT NULL DEFAULT current_timestamp(),
  fecha_actualizacion timestamp on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE ambiente
  ADD CONSTRAINT ambiente_1 FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL;

ALTER TABLE equipos
  ADD CONSTRAINT equipos_1 FOREIGN KEY (id_ambiente) REFERENCES ambiente(id) ON DELETE CASCADE;

ALTER TABLE tickets
  ADD CONSTRAINT tickets_1 FOREIGN KEY (solicitante) REFERENCES usuarios(identificacion) ON DELETE CASCADE,
  ADD CONSTRAINT tickets_2 FOREIGN KEY (asignado) REFERENCES usuarios(identificacion) ON DELETE CASCADE,
  ADD CONSTRAINT tickets_3 FOREIGN KEY (categoria) REFERENCES categorias(id) ON DELETE CASCADE;

  -- ADD CONSTRAINT tickets_4 FOREIGN KEY (id_objetivo) REFERENCES ambiente(id) ON DELETE CASCADE,
  -- ADD CONSTRAINT tickets_5 FOREIGN KEY (id_objetivo) REFERENCES equipos(id) ON DELETE CASCADE;

ALTER TABLE reservas_ambiente
  ADD CONSTRAINT reservas_ambiente_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion) ON DELETE CASCADE,
  ADD CONSTRAINT reservas_ambiente_2 FOREIGN KEY (ambiente_id) REFERENCES ambiente(id) ON DELETE CASCADE;

ALTER TABLE reservas_equipo
  ADD CONSTRAINT reservas_equipo_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion) ON DELETE CASCADE,
  ADD CONSTRAINT reservas_equipo_2 FOREIGN KEY (equipo_id) REFERENCES equipos(id) ON DELETE CASCADE;

ALTER TABLE notifica_reserva_ambiente
  ADD CONSTRAINT notifica_reservas_ambiente_1 FOREIGN KEY (res_ambiente_id) REFERENCES reservas_ambiente(id) ON DELETE CASCADE;

ALTER TABLE notifica_reserva_equipo
  ADD CONSTRAINT notifica_reservas_equipo_1 FOREIGN KEY (res_equipo_id) REFERENCES reservas_equipo(id) ON DELETE CASCADE;

ALTER TABLE bitacora
  ADD CONSTRAINT bitácora_1 FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion) ON DELETE CASCADE,
  ADD CONSTRAINT bitácora_2 FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE;

ALTER TABLE encuesta_satisfaccion
  ADD CONSTRAINT encuestas_satisfaccion_1 FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
  ADD CONSTRAINT encuestas_satisfaccion_2 FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion) ON DELETE CASCADE;

ALTER TABLE archivos_adjuntos
  ADD CONSTRAINT archivos_adjuntos_1 FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE;

ALTER TABLE comentarios
  ADD CONSTRAINT comentarios_1 FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
  ADD CONSTRAINT comentarios_2 FOREIGN KEY (usuario_id) REFERENCES usuarios(identificacion) ON DELETE CASCADE;
