"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyPassword = exports.getUserByEmail = exports.createUser = void 0;
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (email, password, firstName, lastName) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const result = await database_1.pool.query('INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at', [email, hashedPassword, firstName, lastName]);
    return result.rows[0];
};
exports.createUser = createUser;
const getUserByEmail = async (email) => {
    const result = await database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};
exports.getUserByEmail = getUserByEmail;
const verifyPassword = async (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
const generateToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '24h',
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=User.js.map