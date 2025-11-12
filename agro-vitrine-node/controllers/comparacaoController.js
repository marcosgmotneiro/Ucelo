import { db } from "../config/db.js";

export const getComparador = async (req, res) => {
  // Buscar todas as canecas para o select
  const [canecas] = await db.query("SELECT Modelo FROM Canecas");
  res.render("comparador", { user: req.session.user, canecas, resultado: null });
};

export const postComparar = async (req, res) => {
  const { caneca1, caneca2 } = req.body;

  // Buscar dados das duas canecas
  const [dados1] = await db.query("SELECT * FROM Canecas WHERE Modelo = ?", [caneca1]);
  const [dados2] = await db.query("SELECT * FROM Canecas WHERE Modelo = ?", [caneca2]);

  if (!dados1.length || !dados2.length) {
    return res.render("comparador", { user: req.session.user, canecas: [], resultado: { erro: "Caneca não encontrada!" } });
  }

  const c1 = dados1[0];
  const c2 = dados2[0];

  // Calcular diferenças simples
  const resultado = {
    modelo1: c1.Modelo,
    modelo2: c2.Modelo,
    volumeDiff: (c1.Volume - c2.Volume).toFixed(2),
    resistenciaDiff: (c1.Resistencia_Tracao - c2.Resistencia_Tracao).toFixed(2),
    deslocamentoDiff: (c1.Deslocamento - c2.Deslocamento).toFixed(2),
    material1: c1.Material,
    material2: c2.Material,
    furacao1: c1.Furacao ? "Sim" : "Não",
    furacao2: c2.Furacao ? "Sim" : "Não",
  };

  // Se o usuário for profissional, salvar no banco
  if (req.session.user && req.session.user.Tipo === "Funcionario") {
    await db.query(
      `INSERT INTO Comparacoes 
      (ID_Usuario, Modelo_Caneca_Selecionada, Modelo_Caneca_para_Comparacao, 
       Volume_CS, Volume_CC, Resistencia_Tracao_CS, Resistencia_Tracao_CC, Deslocamento_CS, Deslocamento_CC)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.session.user.ID_usuario,
        c1.Modelo, c2.Modelo,
        c1.Volume, c2.Volume,
        c1.Resistencia_Tracao, c2.Resistencia_Tracao,
        c1.Deslocamento, c2.Deslocamento
      ]
    );
  }

  // Buscar novamente todas as canecas pro form
  const [canecas] = await db.query("SELECT Modelo FROM Canecas");
  res.render("comparador", { user: req.session.user, canecas, resultado });
};
