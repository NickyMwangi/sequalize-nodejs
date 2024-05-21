import express from 'express'
import { Login } from '../controllers/index.js';
export const AuthRoutes = express.Router();

AuthRoutes.route('/login').post(Login)