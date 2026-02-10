"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const auth_1 = __importDefault(require("./routes/auth"));
const applications_1 = __importDefault(require("./routes/applications"));
const email_1 = __importDefault(require("./routes/email"));
const analytics_1 = __importDefault(require("./routes/analytics"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database Pool
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/applications', applications_1.default);
app.use('/api/email', email_1.default);
app.use('/api/analytics', analytics_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map