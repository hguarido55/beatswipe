// api/src/routes/auth.routes.ts

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Ahora TypeScript ve claramente que estos callbacks son RequestHandler
router.post('/register', register);
router.post('/login',    login);

export default router;