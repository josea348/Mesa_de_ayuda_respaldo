import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import autRouter from './src/router/router.autentication.js';
import routerUsuario from './src/router/routerUsuario.js';
import routerCategoria from './src/router/routerCategorias.js';
import routerAreas from './src/router/routerAreas.js';
import routerAmbientes from './src/router/routerAmbientes.js';
import routerEquipos from './src/router/routerEquipos.js';
import routerTickets from './src/router/routerTickets.js';
import routerReservasAmbiente from './src/router/routerReservasAmbiente.js';
import routerReservasEquipo from './src/router/routerReservasEquipo.js';
import routerNotificaReservaAmbiente from './src/router/routerNotificaReservaAmbiente.js';
import routerNotificaReservaEquipo from './src/router/routerNotificaReservaEquipo.js';
import routerEncuestaSatisfaccion from './src/router/routerEncuestaSatisfaccion.js';
import routerBitacora from './src/router/routerBitacora.js';
import routerComentarios from './src/router/routerComentarios.js';
import routerArchivoAdjuntos from './src/router/routerArchivosAdjuntos.js';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({extended: false}));
servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.use(express.static('./public'));

servidor.get('/documents',(req, res)=>{
  res.render('document.ejs');
});

servidor.use(cors());

servidor.use(autRouter);
servidor.use('/api', [routerUsuario, routerCategoria, routerAreas, routerAmbientes, routerEquipos, routerTickets, routerReservasAmbiente, routerReservasEquipo, routerNotificaReservaAmbiente, routerNotificaReservaEquipo, routerEncuestaSatisfaccion, routerBitacora, routerComentarios, routerArchivoAdjuntos]);

servidor.listen(4001,()=>{
  console.log('servidor corriendo en el puerto 4001');
});