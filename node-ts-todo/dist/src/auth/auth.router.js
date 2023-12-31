"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validator_1 = require("./auth.validator");
const authenticatedUserMiddleware_1 = require("./authenticatedUserMiddleware");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/register', auth_validator_1.authCreateValidator, auth_controller_1.authController.register);
exports.authRouter.post('/login', auth_validator_1.loginValidator, auth_controller_1.authController.login);
exports.authRouter.get('/profile', authenticatedUserMiddleware_1.authenticatedUserMiddleware, auth_controller_1.authController.profile);
exports.authRouter.get('/logout', auth_controller_1.authController.logout);
