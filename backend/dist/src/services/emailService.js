"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEmail = exports.extractEmailDetails = exports.parseEmailWithNLP = void 0;
const nlp_1 = require("../config/nlp");
const parseEmailWithNLP = async (emailContent) => {
    // Placeholder for NLP email parsing
    // In production, integrate with OpenAI or spaCy
    const keywords = {
        applicationReceived: ['thank you for applying', 'application received', 'application submitted'],
        interviewScheduled: ['interview scheduled', 'interview invitation', 'let\'s schedule'],
        rejection: ['unfortunately', 'we regret', 'not moving forward', 'position filled'],
        offer: ['offer', 'we\'re pleased', 'congratulations'],
    };
    let detectedType = 'Unknown';
    let confidence = 0;
    for (const [type, keywords_list] of Object.entries(keywords)) {
        const matches = keywords_list.filter((kw) => emailContent.toLowerCase().includes(kw));
        if (matches.length > 0) {
            detectedType = type;
            confidence = Math.min(matches.length * 0.3, 0.95);
            break;
        }
    }
    return {
        confidence,
        status: detectedType,
        company: 'Extracted Company',
        jobTitle: 'Extracted Job Title',
        emailType: detectedType,
    };
};
exports.parseEmailWithNLP = parseEmailWithNLP;
const extractEmailDetails = (emailContent) => {
    // Extract company name, job title, and links from email
    return {
        company: 'Company Name',
        jobTitle: 'Job Title',
        applicationLink: null,
    };
};
exports.extractEmailDetails = extractEmailDetails;
// Basic heuristic parser for test and fallback flows (no external API calls)
const parseEmail = async (email) => {
    const text = `${email.subject}\n${email.body}`.toLowerCase();
    const status = detectStatus(text);
    const application_link = extractFirstLink(email.body);
    const company_name = deriveCompanyName(email.from) ||
        guessCompanyFromSubject(email.subject) ||
        guessCompanyFromBody(email.body);
    const job_title = guessJobTitle(email.subject) ||
        guessJobTitleFromBody(email.body) ||
        fallbackRoleFromSubject(email.subject);
    return {
        company_name,
        job_title,
        status,
        application_link,
        source: 'Email',
    };
};
exports.parseEmail = parseEmail;
const detectStatus = (text) => {
    for (const [status, keywords] of Object.entries(nlp_1.NLP_CONFIG.statusKeywords)) {
        if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
            return status;
        }
    }
    return 'Applied';
};
const extractFirstLink = (body) => {
    const match = body.match(/https?:\/\/\S+/i);
    return match ? match[0] : null;
};
const deriveCompanyName = (from) => {
    if (!from)
        return null;
    const emailMatch = from.match(/@([a-zA-Z0-9.-]+)\./);
    if (!emailMatch || !emailMatch[1])
        return null;
    const domainPart = emailMatch[1].split('.').shift();
    if (!domainPart)
        return null;
    return capitalize(domainPart);
};
const guessCompanyFromSubject = (subject) => {
    // Patterns: "Application to Google - SWE" | "Offer from Acme" | "Interview with Stripe"
    const atMatch = subject.match(/at\s+([A-Za-z0-9.&\-\s]+)/i);
    if (atMatch && atMatch[1])
        return cleanCompany(atMatch[1]);
    const fromMatch = subject.match(/from\s+([A-Za-z0-9.&\-\s]+)/i);
    if (fromMatch && fromMatch[1])
        return cleanCompany(fromMatch[1]);
    const withMatch = subject.match(/with\s+([A-Za-z0-9.&\-\s]+)/i);
    if (withMatch && withMatch[1])
        return cleanCompany(withMatch[1]);
    const dashPart = subject.split('-')[0].trim();
    const tokens = dashPart.split(' ').filter(Boolean);
    if (tokens.length >= 1)
        return cleanCompany(tokens[tokens.length - 1]);
    return null;
};
const guessJobTitle = (subject) => {
    const match = subject.match(/-\s*(.+)$/);
    return match ? match[1].trim() : null;
};
const guessJobTitleFromBody = (body) => {
    const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
        if (/position|role|opening/i.test(line)) {
            const cleaned = line.replace(/^(for|position|role|opening)[:\s-]*/i, '').trim();
            if (cleaned)
                return cleaned;
        }
    }
    return null;
};
const fallbackRoleFromSubject = (subject) => {
    const tokens = subject.split('-');
    if (tokens.length >= 2)
        return tokens.slice(1).join('-').trim();
    return subject.trim() || null;
};
const guessCompanyFromBody = (body) => {
    const match = body.match(/\b(?:at|with)\s+([A-Za-z0-9.&\-\s]{2,})/i);
    if (match && match[1])
        return cleanCompany(match[1]);
    return null;
};
const cleanCompany = (raw) => {
    const trimmed = raw.replace(/[,.;:].*$/, '').trim();
    return capitalize(trimmed);
};
const capitalize = (word) => {
    if (!word)
        return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
};
//# sourceMappingURL=emailService.js.map