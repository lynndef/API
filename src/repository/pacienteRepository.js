import con from "./connection.js";

export async function salvarPaciente(paciente) {
  let comando = `
    INSERT INTO Pacientes (nome, objetivo, email, plano_nutricional)
    VALUES (?, ?, ?, ?)
  `;

  try {
    let resp = await con.query(comando, [paciente.nome, paciente.objetivo, paciente.email, paciente.plano_nutricional]);
    let info = resp[0];

    paciente.paciente_id = info.insertId;
    return paciente;
  } catch (error) {
    throw new Error(`Erro ao salvar paciente: ${error.message}`);
  }
}

export async function listarPlanos() {
  let comando = `
    SELECT plano_nutricional FROM Pacientes
  `;

  try {
    let resp = await con.query(comando, []);
    let linhas = resp[0];

    return linhas;
  } catch (error) {
    throw new Error(`Erro ao listar planos: ${error.message}`);
  }
}

export async function listarPlanosID(id) {
  let comando = `
    SELECT plano_nutricional FROM Pacientes
    WHERE paciente_id = ?
  `;

  try {
    let resp = await con.query(comando, [id]);
    let linhas = resp[0];

    return linhas;
  } catch (error) {
    throw new Error(`Erro ao listar planos: ${error.message}`);
  }
}

export async function listarPacientes() {
  let comando = `
    SELECT paciente_id, nome, objetivo, email FROM Pacientes
  `;

  try {
    let resp = await con.query(comando, []);
    let linhas = resp[0];

    return linhas;
  } catch (error) {
    throw new Error(`Erro ao listar pacientes: ${error.message}`);
  }
}

export async function obterPacientePorId(id) {
  let comando = `
    SELECT * FROM Pacientes
    WHERE paciente_id = ?
  `;

  try {
    let resp = await con.query(comando, [id]);
    let paciente = resp[0][0];

    return paciente;
  } catch (error) {
    throw new Error(`Erro ao obter paciente por ID: ${error.message}`);
  }
}

export async function alterarPaciente(id, paciente) {
  let comando = `
    UPDATE Pacientes
    SET nome=?, objetivo=?, email=?, plano_nutricional=?
    WHERE paciente_id=?
  `;

  try {
    await con.query(comando, [paciente.nome, paciente.objetivo, paciente.email, paciente.plano_nutricional, id]);
    return true;
  } catch (error) {
    throw new Error(`Erro ao alterar paciente: ${error.message}`);
  }
}

export async function deletarPaciente(id) {
  let comando = `
    DELETE FROM Pacientes
    WHERE paciente_id=?
  `;

  try {
    await con.query(comando, [id]);
    return true;
  } catch (error) {
    throw new Error(`Erro ao deletar paciente: ${error.message}`);
  }
}


