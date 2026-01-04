"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Gmail OAuth
router.get('/gmail', (req, res) => {
    res.json({ message: 'Gmail authentication endpoint' });
});
router.get('/gmail/callback', (req, res) => {
    res.json({ message: 'Gmail callback endpoint' });
});
// Outlook OAuth
router.get('/outlook', (req, res) => {
    res.json({ message: 'Outlook authentication endpoint' });
});
router.get('/outlook/callback', (req, res) => {
    res.json({ message: 'Outlook callback endpoint' });
});
// Logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map