const createTransporter = require('../config/email');
const logger = require('../utils/logger');

const CLINIC_NAME    = 'Unique Dental & Implant Centre';
const CLINIC_ADDRESS = 'Butwal-6, Pushpalalpark, Rupandehi, Nepal';
const CLINIC_PHONE   = '071-537300 / 985-404-0984';
const CLINIC_WEB     = process.env.CLIENT_URL || 'http://localhost:5173';
const PRIMARY        = '#059669'; // matches Tailwind primary-600
const ACCENT         = '#f59e0b'; // matches Tailwind accent-500

// ─── Core send helper ────────────────────────────────────────────────────────
const send = async (options) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to:   options.to,
      subject: options.subject,
      html: options.html,
    });
    logger.info(`Email sent to ${options.to}: ${info.messageId}`);
  } catch (error) {
    logger.error(`Email send failed to ${options.to}: ${error.message}`);
    // Non-blocking — email failure must never crash the request
  }
};

// ─── Shared layout ───────────────────────────────────────────────────────────
const layout = (bodyHtml) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${CLINIC_NAME}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#064e3b 0%,#059669 100%);padding:32px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 20px;margin-bottom:12px;">
              <span style="color:#6ee7b7;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">🦷 Dental Care</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">${CLINIC_NAME}</h1>
            <p style="margin:6px 0 0;color:#a7f3d0;font-size:13px;">${CLINIC_ADDRESS}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 32px;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#6b7280;font-size:12px;">📞 ${CLINIC_PHONE}</p>
            <p style="margin:0 0 12px;color:#6b7280;font-size:12px;">📍 ${CLINIC_ADDRESS}</p>
            <a href="${CLINIC_WEB}" style="color:${PRIMARY};font-size:12px;text-decoration:none;font-weight:600;">${CLINIC_WEB}</a>
            <p style="margin:16px 0 0;color:#9ca3af;font-size:11px;">© ${new Date().getFullYear()} ${CLINIC_NAME}. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ─── Appointment detail table ─────────────────────────────────────────────────
const apptTable = (appointment) => `
<table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;margin:24px 0;">
  <tr style="background:#f0fdf4;">
    <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;width:38%;border-bottom:1px solid #e5e7eb;">Date</td>
    <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</td>
  </tr>
  <tr>
    <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">Time</td>
    <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${appointment.appointmentTime}</td>
  </tr>
  <tr style="background:#f0fdf4;">
    <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Treatment</td>
    <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;">${appointment.treatmentType}</td>
  </tr>
</table>`;

// ─── Button ──────────────────────────────────────────────────────────────────
const btn = (text, url, color = PRIMARY) =>
  `<a href="${url}" style="display:inline-block;background:${color};color:#ffffff;padding:14px 32px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">${text}</a>`;

// ─── Templates ───────────────────────────────────────────────────────────────
const templates = {

  appointmentBooked: (name, appointment) => ({
    subject: `✅ Appointment Booked – ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month:'short', day:'numeric' })} at ${appointment.appointmentTime}`,
    html: layout(`
      <div style="display:inline-block;background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;">Booking Confirmed</div>
      <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:800;">Hi ${name}, you're booked! 🎉</h2>
      <p style="margin:0 0 4px;color:#4b5563;font-size:15px;">Your appointment at <strong>${CLINIC_NAME}</strong> has been received.</p>
      <p style="margin:0;color:#6b7280;font-size:14px;">We'll send a confirmation once the clinic approves your slot.</p>
      ${apptTable(appointment)}
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:28px;">
        <p style="margin:0;color:#92400e;font-size:13px;">⏰ <strong>Reminder:</strong> If you need to cancel, please do so at least 24 hours in advance.</p>
      </div>
      <div style="text-align:center;">
        ${btn('View My Appointments', CLINIC_WEB + '/appointments')}
      </div>
    `),
  }),

  appointmentConfirmed: (name, appointment) => ({
    subject: `🗓️ Appointment Confirmed – ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month:'short', day:'numeric' })} at ${appointment.appointmentTime}`,
    html: layout(`
      <div style="display:inline-block;background:#dbeafe;color:#1e40af;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;">Confirmed</div>
      <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:800;">Your appointment is confirmed, ${name}!</h2>
      <p style="margin:0 0 4px;color:#4b5563;font-size:15px;">We're looking forward to seeing you at <strong>${CLINIC_NAME}</strong>.</p>
      ${apptTable(appointment)}
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin-bottom:28px;">
        <p style="margin:0 0 6px;color:#166534;font-size:13px;font-weight:700;">📋 Before you arrive:</p>
        <ul style="margin:0;padding-left:18px;color:#166534;font-size:13px;line-height:1.9;">
          <li>Please arrive <strong>10 minutes early</strong> to complete any paperwork.</li>
          <li>Bring any previous dental X-rays or records if available.</li>
          <li>Inform us of any medications you are currently taking.</li>
        </ul>
      </div>
      <div style="text-align:center;margin-bottom:16px;">
        ${btn('View Appointment', CLINIC_WEB + '/appointments')}
      </div>
      <p style="text-align:center;margin:0;color:#9ca3af;font-size:12px;">Need to reschedule? Call us on <strong>${CLINIC_PHONE}</strong></p>
    `),
  }),

  appointmentCancelled: (name, appointment, reason) => ({
    subject: `❌ Appointment Cancelled – ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month:'short', day:'numeric' })}`,
    html: layout(`
      <div style="display:inline-block;background:#fee2e2;color:#991b1b;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;">Cancelled</div>
      <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:800;">Appointment Cancelled</h2>
      <p style="margin:0 0 4px;color:#4b5563;font-size:15px;">Hi ${name}, your appointment has been cancelled.</p>
      ${apptTable(appointment)}
      ${reason ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:14px 18px;margin-bottom:28px;"><p style="margin:0;color:#7f1d1d;font-size:13px;"><strong>Reason:</strong> ${reason}</p></div>` : ''}
      <p style="color:#4b5563;font-size:14px;">You can book a new appointment anytime through our portal.</p>
      <div style="text-align:center;margin-top:24px;">
        ${btn('Book a New Appointment', CLINIC_WEB + '/appointments/book', ACCENT)}
      </div>
    `),
  }),

  welcome: (name) => ({
    subject: `Welcome to ${CLINIC_NAME} 🦷`,
    html: layout(`
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:48px;margin-bottom:8px;">🦷</div>
        <h2 style="margin:0 0 8px;color:#111827;font-size:24px;font-weight:800;">Welcome, ${name}!</h2>
        <p style="margin:0;color:#6b7280;font-size:15px;">You're now part of the <strong>${CLINIC_NAME}</strong> family.</p>
      </div>
      <div style="background:#f0fdf4;border-radius:12px;padding:24px;margin-bottom:28px;">
        <p style="margin:0 0 14px;color:#166534;font-size:14px;font-weight:700;">What you can do now:</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ['📅', 'Book Appointments', 'Schedule any treatment online in minutes'],
            ['📋', 'View Medical Records', 'Access your full dental history anytime'],
            ['👤', 'Manage Your Profile', 'Keep your contact details up to date'],
          ].map(([icon, title, desc]) => `
          <tr>
            <td style="padding:6px 0;vertical-align:top;width:32px;font-size:18px;">${icon}</td>
            <td style="padding:6px 0 6px 8px;"><strong style="color:#111827;font-size:13px;">${title}</strong><br><span style="color:#6b7280;font-size:12px;">${desc}</span></td>
          </tr>`).join('')}
        </table>
      </div>
      <div style="text-align:center;">
        ${btn('Book Your First Appointment', CLINIC_WEB + '/appointments/book')}
      </div>
    `),
  }),

  // Admin notification when a new booking is made
  adminNewBooking: (patient, appointment) => ({
    subject: `🔔 New Booking: ${patient.name} — ${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month:'short', day:'numeric' })} at ${appointment.appointmentTime}`,
    html: layout(`
      <div style="display:inline-block;background:#fef3c7;color:#92400e;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;">New Booking</div>
      <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:800;">New appointment request</h2>
      <p style="margin:0 0 4px;color:#4b5563;font-size:15px;">A patient has submitted a new booking that needs your review.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;margin:24px 0;">
        <tr style="background:#f0fdf4;">
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;width:38%;border-bottom:1px solid #e5e7eb;">Patient</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${patient.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${patient.email}</td>
        </tr>
        <tr style="background:#f0fdf4;">
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;">Phone</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${patient.phone || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">Date</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</td>
        </tr>
        <tr style="background:#f0fdf4;">
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e5e7eb;">Time</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${appointment.appointmentTime}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;background:#f9fafb;">Treatment</td>
          <td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;">${appointment.treatmentType}</td>
        </tr>
      </table>
      ${appointment.notes ? `<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:24px;"><p style="margin:0;color:#92400e;font-size:13px;"><strong>Patient note:</strong> ${appointment.notes}</p></div>` : ''}
      <div style="text-align:center;">
        ${btn('Review in Admin Panel', CLINIC_WEB + '/admin/appointments', ACCENT)}
      </div>
    `),
  }),
};

// ─── Public API ───────────────────────────────────────────────────────────────
const sendAppointmentBooked = (patient, appointment) =>
  send({ to: patient.email, ...templates.appointmentBooked(patient.name, appointment) });

const sendAppointmentConfirmed = (patient, appointment) =>
  send({ to: patient.email, ...templates.appointmentConfirmed(patient.name, appointment) });

const sendAppointmentCancelled = (patient, appointment, reason) =>
  send({ to: patient.email, ...templates.appointmentCancelled(patient.name, appointment, reason) });

const sendWelcome = (patient) =>
  send({ to: patient.email, ...templates.welcome(patient.name) });

const sendAdminNewBooking = (patient, appointment) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;
  send({ to: adminEmail, ...templates.adminNewBooking(patient, appointment) });
};

module.exports = {
  sendAppointmentBooked,
  sendAppointmentConfirmed,
  sendAppointmentCancelled,
  sendWelcome,
  sendAdminNewBooking,
};
