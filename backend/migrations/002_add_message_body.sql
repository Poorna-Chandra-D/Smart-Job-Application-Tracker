-- Add message_body column to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS message_body TEXT;
