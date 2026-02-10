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
export declare const parseEmailWithNLP: (emailContent: string) => Promise<EmailParsingResult>;
export declare const extractEmailDetails: (emailContent: string) => {
    company: string;
    jobTitle: string;
    applicationLink: null;
};
export declare const parseEmail: (email: {
    subject: string;
    body: string;
    from?: string;
}) => Promise<ParsedApplication>;
//# sourceMappingURL=emailService.d.ts.map