import con from "./connection.js";

export async function salvarMensagem(mensagem) {
    let comando = `
      INSERT INTO Mensagens (nome_rem, email_rem, mensagem)
      VALUES (?, ?, ?)
    `;
  
    try {
      let resp = await con.query(comando, [mensagem.nome_rem, mensagem.email_rem, mensagem.mensagem]);
      let info = resp[0];
  
      mensagem.mensagem_id = info.insertId;
      return mensagem;
    } catch (error) {
      throw new Error(`Erro ao salvar mensagem: ${error.message}`);
    }
  }
  
  export async function listarMensagens() {
    let comando = `
      SELECT * FROM Mensagens
    `;
  
    try {
      let resp = await con.query(comando, []);
      let linhas = resp[0];
  
      return linhas;
    } catch (error) {
      throw new Error(`Erro ao listar mensagens: ${error.message}`);
    }
  }
  
  export async function alterarMensagem(id, mensagem) {
    let comando = `
      UPDATE Mensagens
      SET nome_rem=?, email_rem=?, mensagem=?
      WHERE mensagem_id=?
    `;
  
    try {
      await con.query(comando, [mensagem.nome_rem, mensagem.email_rem, mensagem.mensagem, id]);
      return true;
    } catch (error) {
      throw new Error(`Erro ao alterar mensagem: ${error.message}`);
    }
  }
  
  export async function deletarMensagem(id) {
    let comando = `
      DELETE FROM Mensagens
    `;
  
    try {
      await con.query(comando, [id]);
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar mensagem: ${error.message}`);
    }
  }