import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import autRouter from './src/router/router.autentication.js';
import routerUsuario from './src/router/routerUsuario.js';
import routerCategoria from './src/router/routerCategorias.js';
import routerAreas from './src/router/routerAreas.js';
import routerAmbientes from './src/router/routerAmbientes.js';
import routerEquipos from './src/router/routerEquipos.js';

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

servidor.use('/api', routerUsuario);
servidor.use('/api', routerCategoria);
servidor.use('/api', routerAreas);
servidor.use('/api', routerAmbientes);
servidor.use('/api', routerEquipos);
servidor.use(autRouter);

servidor.listen(4001,()=>{
  console.log('servidor corriendo en el puerto 4001');
});