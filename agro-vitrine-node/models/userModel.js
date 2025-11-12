import { db } from '../config/db.js';

export const User = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async create({ name, email, password_hash, role }) {
    await db.query('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [name, email, password_hash, role]);
  }
};
