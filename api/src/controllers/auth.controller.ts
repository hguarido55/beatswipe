// api/src/controllers/auth.controller.ts

import { RequestHandler } from 'express';
import * as AuthService from '../services/auth.service';

export const register: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email y password son requeridos' });
      return;
    }

    const user = await AuthService.register(email, password);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error: any) {
    console.error('Error en register:', error);
    res.status(400).json({ error: error.message || 'Error en registro' });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email y password son requeridos' });
      return;
    }

    const { token, user } = await AuthService.login(email, password);
    res.json({ token, user });
  } catch (error: any) {
    console.error('Error en login:', error);
    res.status(400).json({ error: error.message || 'Error en login' });
  }
};