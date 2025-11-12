export const getProdutos = (req, res) => {
  res.render('produtos', { user: req.session.user });
};
