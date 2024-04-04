import con from "./connection.js";

export async function salvarConsulta(consulta) {
    let comando = `
      INSERT INTO Consultas (paciente_id, data_consulta, hora_consulta, pagamento_status)
      VALUES (?, ?, ?, ?)
    `;
  
    try {
      let resp = await con.query(comando, [consulta.paciente_id, consulta.data_consulta, consulta.hora_consulta, consulta.pagamento_status]);
      let info = resp[0];
  
      consulta.consulta_id = info.insertId;
      return consulta;
    } catch (error) {
      throw new Error(`Erro ao salvar consulta: ${error.message}`);
    }
  }
  
  export async function listarConsultas() {
    let comando = `
      SELECT * FROM Consultas
    `;
  
    try {
      let resp = await con.query(comando, []);
      let linhas = resp[0];
  
      return linhas;
    } catch (error) {
      throw new Error(`Erro ao listar consultas: ${error.message}`);
    }
  }
  
  export async function alterarConsulta(id, consulta) {
    let comando = `
      UPDATE Consultas
      SET paciente_id=?, data_consulta=?, hora_consulta=?, pagamento_status=?
      WHERE consulta_id=?
    `;
  
    try {
      await con.query(comando, [consulta.paciente_id, consulta.data_consulta, consulta.hora_consulta, consulta.pagamento_status, id]);
      return true;
    } catch (error) {
      throw new Error(`Erro ao alterar consulta: ${error.message}`);
    }
  }
  
  export async function deletarConsulta(id) {
    let comando = `
      DELETE FROM Consultas
      WHERE consulta_id=?
    `;
  
    try {
      await con.query(comando, [id]);
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar consulta: ${error.message}`);
    }
  }
  