import { db } from '../config/db.js';

export const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM usuario WHERE Email = ?', [email]);
    return rows[0];
  },
  async create({ name, email, password_hash, role }) {
   await db.query(
  'INSERT INTO usuario (Nome, Email, Senha, Tipo) VALUES (?, ?, ?, ?)',
  [name, email, password_hash, role]
);


  }
};
