import { Router } from "express";
import { 
  salvarPaciente, 
  listarPacientes, 
  alterarPaciente, 
  deletarPaciente, 
  obterPacientePorId, 
  listarPlanos, 
  listarPlanosID, 
  atualizarPlanoPaciente 
} from "../repository/pacienteRepository.js";

let pacienteServidor = Router();

pacienteServidor.get('/pacientesplanos', async (req, resp) => {
    try {
        let listaPlanos = await listarPlanos();
        resp.json(listaPlanos);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao listar planos', error: error.message });
    }
});

pacienteServidor.get('/pacientesplanos/:id', async (req, resp) => {
    const id = req.params.id;
    try {
        let listaPlanosID = await listarPlanosID(id);
        resp.json(listaPlanosID);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao listar planos', error: error.message });
    }
});

pacienteServidor.put('/pacientesplanos/:id', async (req, resp) => {
    const id = req.params.id;
    const { plano_nutricional } = req.body;

    console.log(`Atualizando plano nutricional para o paciente ID ${id} com plano: ${plano_nutricional}`);

    try {
        const result = await atualizarPlanoPaciente(id, plano_nutricional);
        console.log(`Resultado da atualização: ${result}`);
        resp.status(200).json({ message: 'Plano nutricional atualizado com sucesso!' });
    } catch (error) {
        console.error(`Erro ao atualizar o plano nutricional: ${error.message}`);
        resp.status(500).json({ message: 'Erro ao atualizar o plano nutricional', error: error.message });
    }
});

pacienteServidor.get('/pacientes', async (req, resp) => {
    try {
        let listaPacientes = await listarPacientes();
        resp.json(listaPacientes);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao listar pacientes', error: error.message });
    }
});

pacienteServidor.get('/pacientes/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const paciente = await obterPacientePorId(id);
        resp.json(paciente);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao obter paciente', error: error.message });
    }
});

pacienteServidor.post('/pacientes', async (req, resp) => {
    let paciente = req.body;

    try {
        let pacienteInserido = await salvarPaciente(paciente);
        resp.json(pacienteInserido);
    } catch (error) {
        resp.status(500).json({ message: 'Erro ao salvar paciente', error: error.message });
    }
});

pacienteServidor.put('/pacientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const paciente = req.body;

        await alterarPaciente(id, paciente);

        res.status(200).json({ message: 'Paciente alterado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar paciente', error: error.message });
    }
});

pacienteServidor.delete('/pacientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deletarPaciente(id);
        res.status(200).json({ message: 'Paciente excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir paciente', error: error.message });
    }
});

export default pacienteServidor;
