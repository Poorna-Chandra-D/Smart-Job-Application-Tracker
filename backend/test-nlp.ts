import { parseEmail } from './src/services/emailService';

const testEmail = {
  subject: 'Your Application to Google - Software Engineer',
  body: `
    Dear Candidate,
    
    Thank you for applying to the Software Engineer position at Google.
    We have received your application and will review it shortly.
    
    You can track your application here: https://careers.google.com/jobs/123
    
    Best regards,
    Google Recruiting Team
  `,
  from: 'recruiting@google.com'
};

async function run() {
  const result = await parseEmail(testEmail);
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('NLP parse failed:', err);
  process.exit(1);
});
