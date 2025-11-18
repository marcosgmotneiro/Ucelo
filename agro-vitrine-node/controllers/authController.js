import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

export const getLogin = (req, res) => {
  res.render("login", { error: null, user: null });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);

  if (!user) {
    return res.render("login", { error: "Usuário não encontrado", user: null });
  }

  const match = await bcrypt.compare(password, user.Senha);
  if (!match) {
    return res.render("login", { error: "Senha incorreta", user: null });
  }

  req.session.user = {
    id: user.ID_usuario,
    name: user.Nome,
    email: user.Email,
    role: user.Tipo
  };

  res.redirect("/calculadora");
};

export const getRegister = (req, res) => {
  res.render("register", { error: null, user: null });
};

export const postRegister = async (req, res) => {
  const { name, email, password, role, telefone, cpf, cnpj, razao } = req.body;

  const existing = await User.findByEmail(email);
  if (existing) {
    return res.render("register", { error: "Email já cadastrado", user: null });
  }

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password_hash: hash,
    role,
    telefone,
    cpf,
    cnpj,
    razao
  });

  res.redirect("/login");
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
