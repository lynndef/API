import pacienteController from './src/controller/pacienteController.js'
import consultaController from './src/controller/consultaController.js'
import mensagemController from './src/controller/mensagemController.js'

import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(pacienteController, consultaController, mensagemController)

let port = process.env.PORT;
servidor.listen(port, () => console.log("API SUBIU!"));