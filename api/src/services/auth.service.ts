// api/src/services/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  email: string;
  passwordHash: string;
}

const users: User[] = []; // almacenamiento en memoria

export async function register(email: string, password: string) {
  if (users.some(u => u.email === email)) {
    throw new Error('Email ya usado');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: User = { id: users.length + 1, email, passwordHash };
  users.push(user);
  return { id: user.id, email: user.email };
}

export async function login(email: string, password: string) {
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error('Credenciales inválidas');
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no definido');
  }
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1h' });
  return { token, user: { id: user.id, email: user.email } };
}