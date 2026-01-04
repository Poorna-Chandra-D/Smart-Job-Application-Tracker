export interface EmailParsingResult {
    confidence: number;
    status: string;
    company: string;
    jobTitle: string;
    emailType: string;
}
export declare const parseEmailWithNLP: (emailContent: string) => Promise<EmailParsingResult>;
export declare const extractEmailDetails: (emailContent: string) => {
    company: string;
    jobTitle: string;
    applicationLink: null;
};
//# sourceMappingURL=emailService.d.ts.map