import { Router } from "express"; 
import { validarUser } from "../controllers/autentication.js";
import { validarAutenticacion } from "../validate/validaAutenticacion.js";

const autRouter = Router();

autRouter.post('/auth', validarAutenticacion, validarUser); 

export default autRouter;