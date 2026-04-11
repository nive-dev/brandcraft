# Contact Form Setup Guide

This guide explains how to set up the contact form with Google Apps Script backend for storing submissions in Google Sheets.

## Overview

The contact form consists of two parts:
1. **Frontend (React TypeScript)** - Located in `src/pages/Contact.tsx`
2. **Backend (Google Apps Script)** - Located in `google-apps-script/ContactFormHandler.gs`

## Features

- ✅ Form fields: Name, Email, Phone (optional), Message
- ✅ Client-side validation
- ✅ Loading state with "Sending..." button text
- ✅ Success/Error toast notifications using Sonner
- ✅ Form reset after successful submission
- ✅ Framer Motion animations
- ✅ Tailwind CSS styling with glass effect
- ✅ Data stored in Google Sheets
- ✅ Unique submission ID for tracking
- ✅ Optional email notifications
- ✅ Error handling and validation

## Setup Instructions

### Step 1: Configure Environment Variable

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. After deploying the Google Apps Script (see below), add your Web App URL:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec
   ```

### Step 2: Set Up Google Apps Script

1. **Create a Google Sheet** (optional - the script will create one automatically)
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "+ Blank" to create a new spreadsheet
   - Name it something like "Contact Form Submissions"

2. **Open Apps Script Editor**
   - In your Google Sheet, go to **Extensions** > **Apps Script**
   - Or go directly to [script.google.com](https://script.google.com) and create a new project

3. **Copy the Script Code**
   - Open `google-apps-script/ContactFormHandler.gs`
   - Copy all the code
   - Paste it into the Apps Script editor, replacing any existing code

4. **Configure the Script** (optional)
   - Update `SHEET_NAME` if you want a different sheet name
   - To enable email notifications, uncomment the line in `doPost()`:
     ```javascript
     // sendEmailNotification(data);
     ```

5. **Save the Project**
   - Click the save icon (💾) or press `Ctrl+S`
   - Give your project a name like "Contact Form Handler"

### Step 3: Deploy as Web App

1. **Click Deploy** > **New deployment**

2. **Configure Deployment Settings**
   - Click the gear icon next to "Select type"
   - Choose **Web app**
   - Description: "Contact Form API v1"
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (important for CORS)

3. **Click Deploy**

4. **Authorize the Script**
   - Google will ask for permissions
   - Click "Review permissions"
   - Select your account
   - Click "Advanced" > "Go to [Project Name] (unsafe)" (it's safe, it's your code)
   - Click "Allow"

5. **Copy the Web App URL**
   - You'll see a URL like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
   - Copy this URL

### Step 4: Update Environment Variable

1. Open your `.env` file
2. Replace the placeholder URL with your deployed Web App URL:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```

### Step 5: Test the Form

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to the Contact page**
   - Go to `/contact` or wherever your contact page is routed

3. **Fill out and submit the form**
   - Enter valid data in all required fields
   - Click "Send Message"
   - You should see a success toast notification

4. **Verify in Google Sheets**
   - Open your Google Sheet
   - You should see a new sheet called "Contact Submissions"
   - The submission data should appear in a new row

## Troubleshooting

### Form submission fails with "endpoint not configured"
- Make sure you've created the `.env` file
- Verify the `VITE_GOOGLE_APPS_SCRIPT_URL` is set correctly
- Restart your development server after changing `.env`

### CORS errors in browser console
- Ensure "Who has access" is set to "Anyone" in the deployment settings
- Wait a few minutes after deployment for changes to propagate

### "HTTP error! status: 401" or permission errors
- Re-deploy the script and ensure you authorized it correctly
- Make sure "Execute as" is set to "Me"

### Data not appearing in Google Sheets
- Check the Apps Script execution logs (View > Executions)
- Verify the sheet name matches `SHEET_NAME` constant
- Check if the script has permission to access Drive/Sheets

### Email notifications not working
- Uncomment the `sendEmailNotification(data);` line in the script
- The script will send emails to the account that owns the script
- Check your spam folder

## Production Deployment

When deploying your React app to production:

1. **Set environment variables** in your hosting platform:
   - Vercel: Add in Project Settings > Environment Variables
   - Netlify: Add in Site Settings > Build & Deploy > Environment
   - AWS/other: Follow platform-specific instructions

2. **Build the app** with the production URL:
   ```bash
   npm run build
   ```

## Google Apps Script Features

### Automatic Spreadsheet Creation
The script automatically creates a new Google Sheet called "Contact Form Submissions - [Year]" if one doesn't exist.

### Submission Tracking
Each submission gets a unique ID (e.g., `SUB-LXKJH2-AB3C`) for tracking purposes.

### Data Validation
The script validates:
- Name is required
- Email is required and must be valid format
- Message is required
- Phone is optional but validated if provided

### Email Notifications (Optional)
Enable by uncommenting `sendEmailNotification(data);` in the `doPost()` function. Emails are sent to the script owner's Gmail account.

## API Response Format

The frontend uses `mode: "no-cors"` for the fetch request, which means:
- The browser sends the request successfully to Google Apps Script
- The response is "opaque" (we can't read the response body due to CORS restrictions)
- Success is determined by the absence of network errors
- The Google Apps Script still processes the data and stores it in the sheet

This approach avoids CORS issues entirely while still reliably submitting form data.

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting in Google Apps Script if you expect high traffic
2. **Spam Protection**: Consider adding a CAPTCHA or honeypot field
3. **Data Sanitization**: The script escapes HTML in email notifications
4. **Access Control**: The Web App is publicly accessible - anyone with the URL can submit data

## Maintenance

### Viewing Submissions
- Open the Google Sheet created by the script
- All submissions are stored in the "Contact Submissions" tab

### Clearing Old Data
- Manually delete rows from the Google Sheet
- Or create a time-based trigger to archive old data

### Updating the Script
1. Make changes in the Apps Script editor
2. Click "Deploy" > "Manage deployments"
3. Click the edit icon (pencil) on your deployment
4. Update the version and click "Deploy"

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Apps Script logs (View > Executions)
3. Verify your environment variable is set correctly
4. Test the Google Apps Script URL directly in a browser (should return API info)