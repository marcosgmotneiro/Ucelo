export const getCalculadora = (req, res) => {
  res.render('calculadora', { user: req.session.user });
};

export const postNPK = (req, res) => {
  const { n, p, k, area } = req.body;
  const dose = (parseFloat(n) + parseFloat(p) + parseFloat(k)) * parseFloat(area) * 0.1;
  res.json({ dose: parseFloat(dose.toFixed(3)) });
};

export const postDiluicao = (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== 'PROFISSIONAL') return res.status(403).json({ error: 'Acesso restrito a profissionais' });
  const { concAtivo, volumeL, alvo } = req.body;
  const litrosProduto = (alvo / 100) * parseFloat(volumeL) / (concAtivo / 100);
  res.json({ litrosProduto: parseFloat(litrosProduto.toFixed(3)) });
};
