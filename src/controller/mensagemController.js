import { salvarMensagem, listarMensagens, alterarMensagem, deletarMensagem } from "../repository/mensagemRepository.js";

import { Router } from "express";
let mensagemServidor = Router();

mensagemServidor.get('/mensagens', async (req, resp) => {
    let listaMensagens = await listarMensagens();
    resp.send(listaMensagens);
})

mensagemServidor.post('/mensagens', async (req, resp) => {
    let mensagem = req.body;

    let mensagemInserida = await salvarMensagem(mensagem);
    resp.send(mensagemInserida);
})

mensagemServidor.put('/mensagens/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mensagem = req.body;

        await alterarMensagem(id, mensagem);

        res.status(200).json({ message: 'Mensagem alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar mensagem', error: error.message });
    }
});

mensagemServidor.delete('/mensagens/all', async (req, res) => {
    try {
        const id = req.params.id;
        await deletarMensagem(id);
        res.status(200).json({ message: 'Mensagem excluída com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir mensagem', error: error.message });
    }
});

export default mensagemServidor;