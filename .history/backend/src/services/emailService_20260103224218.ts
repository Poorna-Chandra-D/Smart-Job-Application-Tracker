import axios from 'axios';
import { NLP_CONFIG } from '../config/nlp';

export interface EmailParsingResult {
  confidence: number;
  status: string;
  company: string;
  jobTitle: string;
  emailType: string;
}

export interface ParsedApplication {
  company_name: string | null;
  job_title: string | null;
  status: string;
  application_link: string | null;
  source: string;
}

export const parseEmailWithNLP = async (emailContent: string): Promise<EmailParsingResult> => {
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
    const matches = keywords_list.filter((kw) =>
      emailContent.toLowerCase().includes(kw)
    );
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

export const extractEmailDetails = (emailContent: string) => {
  // Extract company name, job title, and links from email
  return {
    company: 'Company Name',
    jobTitle: 'Job Title',
    applicationLink: null,
  };
};

// Basic heuristic parser for test and fallback flows (no external API calls)
export const parseEmail = async (email: { subject: string; body: string; from?: string }): Promise<ParsedApplication> => {
  const text = `${email.subject}\n${email.body}`.toLowerCase();

  const status = detectStatus(text);
  const application_link = extractFirstLink(email.body);
  const company_name = deriveCompanyName(email.from) || guessCompanyFromSubject(email.subject);
  const job_title = guessJobTitle(email.subject);

  return {
    company_name,
    job_title,
    status,
    application_link,
    source: 'Email',
  };
};

const detectStatus = (text: string): string => {
  for (const [status, keywords] of Object.entries(NLP_CONFIG.statusKeywords)) {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return status;
    }
  }
  return 'Applied';
};

const extractFirstLink = (body: string): string | null => {
  const match = body.match(/https?:\/\/\S+/i);
  return match ? match[0] : null;
};

const deriveCompanyName = (from?: string): string | null => {
  if (!from) return null;
  const emailMatch = from.match(/@([a-zA-Z0-9.-]+)\./);
  if (!emailMatch || !emailMatch[1]) return null;
  const domainPart = emailMatch[1].split('.').shift();
  if (!domainPart) return null;
  return capitalize(domainPart);
};

const guessCompanyFromSubject = (subject: string): string | null => {
  const parts = subject.split('-')[0].trim();
  const tokens = parts.split(' ');
  if (tokens.length >= 1) {
    return capitalize(tokens[tokens.length - 1]);
  }
  return null;
};

const guessJobTitle = (subject: string): string | null => {
  const match = subject.match(/-\s*(.+)$/);
  return match ? match[1].trim() : null;
};

const capitalize = (word: string): string => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};
