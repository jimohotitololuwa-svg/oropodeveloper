/**
 * OROPO PARTNER FORM - Google Apps Script
 * 1. Create a Google Sheet, then open Extensions > Apps Script.
 * 2. Paste this whole file, set NOTIFY_EMAIL, and save.
 * 3. Deploy > New deployment > type "Web app":
 *      Execute as: Me      Who has access: Anyone
 * 4. Authorise, copy the Web app URL (ends with /exec) and paste it into
 *    SCRIPT_URL at the top of JS-Files/partner-form.js.
 * After any edit here, use Deploy > Manage deployments > Edit > New version.
 */
var NOTIFY_EMAIL = 'info@oropovisionarycoaching.com'; // where new enquiries are emailed
var SHEET_NAME   = 'Partner Enquiries';
var SEND_AUTOREPLY = true; // thank-you email to the person who filled the form

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = (e && e.parameter) || {};
    var clean = function (v) { return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, 3000); };
    var d = {
      organisation: clean(p.organisation), name: clean(p.name), email: clean(p.email),
      phone: clean(p.phone), role: clean(p.role), orgType: clean(p.orgType),
      interest: clean(p.interest), message: clean(p.message), page: clean(p.page)
    };
    if (!d.organisation || !d.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || !d.message) {
      return out({ ok: false, error: 'Missing or invalid fields' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Timestamp', 'Organisation', 'Name', 'Email', 'Phone', 'Role', 'Organisation type', 'Interest', 'Message', 'Page']);
      sh.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#F2CC03');
      sh.setFrozenRows(1);
    }
    // Prefix with an apostrophe if a value starts with = + - @ (blocks spreadsheet formula injection)
    var safe = function (v) { return /^[=+\-@]/.test(v) ? "'" + v : v; };
    sh.appendRow([new Date(), safe(d.organisation), safe(d.name), safe(d.email), safe(d.phone), safe(d.role), safe(d.orgType), safe(d.interest), safe(d.message), safe(d.page)]);

    var body = 'New partner enquiry\n\n' +
      'Organisation: ' + d.organisation + '\nName: ' + d.name + '\nEmail: ' + d.email +
      '\nPhone: ' + d.phone + '\nRole: ' + d.role + '\nType: ' + d.orgType +
      '\nInterest: ' + d.interest + '\n\nMessage:\n' + d.message;
    MailApp.sendEmail({ to: NOTIFY_EMAIL, replyTo: d.email, subject: 'Partner enquiry: ' + d.organisation, body: body });

    if (SEND_AUTOREPLY) {
      MailApp.sendEmail({
        to: d.email,
        subject: 'Thank you for your interest in partnering with Oropo',
        body: 'Dear ' + d.name + ',\n\nThank you for reaching out to Oropo Visionary Coaching Co. We have received your enquiry and a member of our team will be in touch soon.\n\nWarm regards,\nOropo Visionary Coaching Co.\n' + NOTIFY_EMAIL,
        name: 'Oropo Visionary Coaching Co.'
      });
    }
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function doGet() { return out({ ok: true, service: 'Oropo partner form' }); }

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
