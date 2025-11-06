import { validarUser } from "../controllers/autentication.js";
import { Router } from "express"; 

const autRouter = Router();

autRouter.post('/auth', validarUser); 

export default autRouter;