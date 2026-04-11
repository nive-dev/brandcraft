/**
 * Google Apps Script - Contact Form Handler
 * 
 * This script handles contact form submissions from the React frontend
 * and stores them in a Google Sheet.
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Update SHEET_NAME if needed
 * 5. Deploy as Web App:
 *    - Execute the app as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the Web App URL and add it to your .env file
 */

// Configuration - Update these values as needed
const SHEET_NAME = "Contact Submissions";
const TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";

/**
 * Main function to handle POST requests from the contact form
 * @param {Object} e - Event object containing request data
 * @returns {Object} JSON response with success or error status
 */
function doPost(e) {
  // Set up CORS headers for cross-origin requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    // Handle preflight OPTIONS request
    if (e.parameter && e.parameter.method === "OPTIONS") {
      return responseJSON({ status: "success", message: "CORS preflight OK" }, headers);
    }

    // Parse the incoming JSON data
    const data = parseRequestData(e);
    
    if (!data) {
      return responseJSON({
        status: "error",
        message: "Invalid or missing request data"
      }, headers, 400);
    }

    // Validate required fields
    const validationError = validateFormData(data);
    if (validationError) {
      return responseJSON({
        status: "error",
        message: validationError
      }, headers, 400);
    }

    // Store data in Google Sheet
    const result = storeInSheet(data);

    // Optional: Send email notification
    // sendEmailNotification(data);

    return responseJSON({
      status: "success",
      result: "success",
      message: "Contact form submitted successfully",
      submissionId: result.submissionId
    }, headers);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    
    return responseJSON({
      status: "error",
      result: "error",
      message: "Internal server error. Please try again later."
    }, headers, 500);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return responseJSON({
    status: "success",
    message: "Contact Form API is running",
    version: "1.0.0"
  });
}

/**
 * Parse incoming request data
 * @param {Object} e - Event object
 * @returns {Object|null} Parsed data or null if invalid
 */
function parseRequestData(e) {
  try {
    // Try to parse JSON from post data
    if (e.postData && e.postData.contents) {
      return JSON.parse(e.postData.contents);
    }
    
    // Fallback to parameter parsing
    if (e.parameter) {
      return {
        name: e.parameter.name,
        email: e.parameter.email,
        phone: e.parameter.phone,
        message: e.parameter.message,
        timestamp: e.parameter.timestamp
      };
    }
    
    return null;
  } catch (error) {
    Logger.log("Error parsing request data: " + error.toString());
    return null;
  }
}

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {string|null} Error message if validation fails, null if valid
 */
function validateFormData(data) {
  if (!data.name || data.name.trim().length === 0) {
    return "Name is required";
  }
  
  if (!data.email || data.email.trim().length === 0) {
    return "Email is required";
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Invalid email format";
  }
  
  if (!data.message || data.message.trim().length === 0) {
    return "Message is required";
  }
  
  // Phone validation (optional field, but validate if provided)
  if (data.phone && data.phone.trim().length > 0) {
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
      return "Invalid phone number format";
    }
  }
  
  return null;
}

/**
 * Store form data in Google Sheet
 * @param {Object} data - Form data object
 * @returns {Object} Result with submission ID
 */
function storeInSheet(data) {
  // Get or create the spreadsheet
  const ss = getOrCreateSpreadsheet();
  
  // Get or create the sheet
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Create headers
    sheet.appendRow([
      "Timestamp",
      "Submission ID",
      "Name",
      "Email",
      "Phone",
      "Message"
    ]);
    // Format header row
    sheet.getRange(1, 1, 1, 6).setFontWeight(true).setBackground("#f3f4f6");
  }
  
  // Generate unique submission ID
  const submissionId = generateSubmissionId();
  const timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    TIMESTAMP_FORMAT
  );
  
  // Append data to sheet
  sheet.appendRow([
    timestamp,
    submissionId,
    data.name.trim(),
    data.email.trim(),
    data.phone ? data.phone.trim() : "",
    data.message.trim()
  ]);
  
  Logger.log("Stored submission: " + submissionId);
  
  return { submissionId: submissionId };
}

/**
 * Get existing spreadsheet or create a new one
 * @returns {Spreadsheet} Google Spreadsheet object
 */
function getOrCreateSpreadsheet() {
  // Try to get spreadsheet by name from Properties Service
  const userProperties = PropertiesService.getUserProperties();
  const spreadsheetId = userProperties.getProperty("CONTACT_FORM_SPREADSHEET_ID");
  
  if (spreadsheetId) {
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      Logger.log("Spreadsheet not found, creating new one");
    }
  }
  
  // Create new spreadsheet
  const ss = SpreadsheetApp.create("Contact Form Submissions - " + new Date().getFullYear());
  
  // Store the spreadsheet ID for future use
  userProperties.setProperty("CONTACT_FORM_SPREADSHEET_ID", ss.getId());
  
  Logger.log("Created new spreadsheet: " + ss.getId());
  
  return ss;
}

/**
 * Generate a unique submission ID
 * @returns {string} Unique submission ID
 */
function generateSubmissionId() {
  const timestamp = new Date().getTime().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return "SUB-" + timestamp + "-" + random;
}

/**
 * Send email notification for new submissions (optional)
 * @param {Object} data - Form data object
 */
function sendEmailNotification(data) {
  // Configure recipient email address
  const recipientEmail = Session.getActiveUser().getEmail();
  // Or set a specific email: const recipientEmail = "your-email@example.com";
  
  const subject = "New Contact Form Submission - " + data.name;
  
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.timestamp || new Date().toISOString()}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This email was sent automatically by the Contact Form system.
        </p>
      </body>
    </html>
  `;
  
  const plainBody = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Message: ${data.message}
Timestamp: ${data.timestamp || new Date().toISOString()}
  `;
  
  try {
    GmailApp.sendEmail(recipientEmail, subject, plainBody, {
      htmlBody: htmlBody
    });
    Logger.log("Email notification sent to: " + recipientEmail);
  } catch (error) {
    Logger.log("Failed to send email notification: " + error.toString());
  }
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#039;");
}

/**
 * Helper function to create JSON response
 * @param {Object} data - Response data
 * @param {Object} headers - Optional headers
 * @param {number} statusCode - HTTP status code
 * @returns {ContentOutput} JSON response
 */
function responseJSON(data, headers, statusCode) {
  statusCode = statusCode || 200;
  
  var output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  if (headers) {
    // Note: In Google Apps Script, we can't set custom headers on all responses
    // CORS headers are handled automatically for deployed web apps
    output.setMimeType(ContentService.MimeType.JSON);
  }
  
  // For error responses, we need to throw to set status code
  if (statusCode !== 200) {
    throw {
      error: output,
      status: statusCode
    };
  }
  
  return output;
}

/**
 * Error handler for custom error responses
 * @param {Object} e - Error object
 * @returns {ContentOutput} Error response
 */
function errorResponse(e) {
  if (e.error && e.status) {
    return e.error;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "error",
      message: "Internal server error"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}