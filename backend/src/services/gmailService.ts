import axios from 'axios';

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
  payload?: {
    headers?: Array<{ name: string; value: string }>;
    parts?: Array<any>;
  };
}

export const getGmailEmails = async (accessToken: string, query: string = '') => {
  try {
    const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query || 'from:(notifications OR careers OR recruiter OR hiring)',
        maxResults: 50,
      },
    });
    return response.data.messages || [];
  } catch (error) {
    console.error('Error fetching Gmail messages:', error);
    return [];
  }
};

export const getGmailMessage = async (accessToken: string, messageId: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          format: 'full',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Gmail message:', error);
    return null;
  }
};

export const decodeEmailContent = (message: GmailMessage): string => {
  // Decode email content from base64
  if (message.payload?.parts) {
    const textPart = message.payload.parts.find((part) => part.mimeType === 'text/plain');
    if (textPart?.body?.data) {
      return Buffer.from(textPart.body.data, 'base64').toString('utf-8');
    }
  }
  return message.snippet || '';
};
