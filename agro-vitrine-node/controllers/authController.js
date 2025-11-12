import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';

export const getLogin = (req, res) => {
  res.render('login', { error: null });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.render('login', { error: 'Credenciais inválidas' });
  }
  req.session.user = user;
  res.redirect('/calculadora');
};

export const getRegister = (req, res) => {
  res.render('register', { error: null });
};

export const postRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findByEmail(email);
  if (existing) return res.render('register', { error: 'Email já cadastrado' });
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password_hash: hash, role });
  res.redirect('/login');
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
