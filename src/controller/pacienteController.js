import { salvarPaciente, listarPacientes, alterarPaciente, deletarPaciente } from "../repository/pacienteRepository.js";

import { Router } from "express";
let pacienteServidor = Router();

pacienteServidor.get('/pacientes', async (req, resp) => {
    let listaPacientes = await listarPacientes();
    resp.send(listaPacientes);
})

pacienteServidor.post('/pacientes', async (req, resp) => {
    let paciente = req.body;

    let pacienteInserido = await salvarPaciente(paciente);
    resp.send(pacienteInserido);
})

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