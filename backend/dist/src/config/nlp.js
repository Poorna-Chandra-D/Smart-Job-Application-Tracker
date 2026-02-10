"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NLP_CONFIG = void 0;
exports.NLP_CONFIG = {
    // Keywords for identifying job application emails
    jobKeywords: [
        'application',
        'position',
        'role',
        'opportunity',
        'job',
        'interview',
        'hiring',
        'recruiter',
        'career',
        'opening',
    ],
    // Status detection keywords
    statusKeywords: {
        Applied: ['submitted', 'application received', 'applied'],
        'Interview Scheduled': ['interview', 'meet', 'call', 'zoom'],
        Rejected: ['regret', 'unfortunately', 'not moving forward', 'not selected'],
        Offer: ['offer', 'congratulations', 'pleased to offer'],
    },
    // Email sources to monitor
    emailSources: [
        'linkedin.com',
        'indeed.com',
        'glassdoor.com',
        'greenhouse.io',
        'lever.co',
        'workday.com',
    ],
};
//# sourceMappingURL=nlp.js.map