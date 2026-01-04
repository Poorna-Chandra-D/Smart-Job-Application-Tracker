"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeEmailContent = exports.getGmailMessage = exports.getGmailEmails = void 0;
const axios_1 = __importDefault(require("axios"));
const getGmailEmails = async (accessToken, query = '') => {
    try {
        const response = await axios_1.default.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query || 'from:(notifications OR careers OR recruiter OR hiring)',
                maxResults: 50,
            },
        });
        return response.data.messages || [];
    }
    catch (error) {
        console.error('Error fetching Gmail messages:', error);
        return [];
    }
};
exports.getGmailEmails = getGmailEmails;
const getGmailMessage = async (accessToken, messageId) => {
    try {
        const response = await axios_1.default.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                format: 'full',
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching Gmail message:', error);
        return null;
    }
};
exports.getGmailMessage = getGmailMessage;
const decodeEmailContent = (message) => {
    // Decode email content from base64
    if (message.payload?.parts) {
        const textPart = message.payload.parts.find((part) => part.mimeType === 'text/plain');
        if (textPart?.body?.data) {
            return Buffer.from(textPart.body.data, 'base64').toString('utf-8');
        }
    }
    return message.snippet || '';
};
exports.decodeEmailContent = decodeEmailContent;
//# sourceMappingURL=gmailService.js.map