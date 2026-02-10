export interface GmailMessage {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    internalDate: string;
    payload?: {
        headers?: Array<{
            name: string;
            value: string;
        }>;
        parts?: Array<any>;
    };
}
export declare const getGmailEmails: (accessToken: string, query?: string) => Promise<any>;
export declare const getGmailMessage: (accessToken: string, messageId: string) => Promise<any>;
export declare const decodeEmailContent: (message: GmailMessage) => string;
//# sourceMappingURL=gmailService.d.ts.map