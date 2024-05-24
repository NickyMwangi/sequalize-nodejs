import express from 'express'
import { Login, register } from '../controllers/index.js';
export const AuthRoutes = express.Router();

AuthRoutes.route('/login').post(Login)
AuthRoutes.route('/register').post(register)