import { pool } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
}

export const createUser = async (email: string, password: string, firstName: string, lastName: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at',
    [email, hashedPassword, firstName, lastName]
  );
  
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '24h',
  });
};
