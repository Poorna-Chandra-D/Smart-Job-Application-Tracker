import axios from 'axios';

export interface EmailParsingResult {
  confidence: number;
  status: string;
  company: string;
  jobTitle: string;
  emailType: string;
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
