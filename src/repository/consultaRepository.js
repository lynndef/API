import con from "./connection.js";
  
  export async function listarConsultas() {
    let comando = `
      SELECT consulta_id, nome, data_consulta, hora_consulta, pagamento_status FROM Consultas
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

  export async function salvarConsulta(consulta) {
    let comando = `
      INSERT INTO Consultas (paciente_id, nome, data_consulta, hora_consulta, pagamento_status)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    try {
      await con.query(comando, [consulta.paciente_id, consulta.nome, consulta.data_consulta, consulta.hora_consulta, consulta.pagamento_status]);
      return true;
    } catch (error) {
      throw new Error(`Erro ao salvar consulta: ${error.message}`);
    }
  }

  export async function consultarConsultaPorId(consultaId) {
    let comando = `
      SELECT paciente_id, nome, data_consulta, hora_consulta, pagamento_status 
      FROM Consultas
      WHERE consulta_id = ?
    `;
  
    try {
      let resp = await con.query(comando, [consultaId]);
      let consulta = resp[0][0];
  
      if (!consulta) {
        throw new Error("Consulta não encontrada");
      }
  
      return consulta;
    } catch (error) {
      throw new Error(`Erro ao consultar consulta: ${error.message}`);
    }
  }
  