import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, phone, subject, inquiryType, message } = data;

    if (!name || !email || !subject || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const contactData = {
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      inquiry_type: inquiryType,
      message,
      created_at: new Date().toISOString(),
    };

    console.log('Contact form received:', contactData);

    const thankYouEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-box { background: white; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Thank You for Contacting Us!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We've received your message and appreciate you taking the time to reach out to us.</p>

            <div class="message-box">
              <p><strong>Your Message:</strong></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
              <p><strong>Message:</strong><br>${message}</p>
            </div>

            <p>Our support team will review your inquiry and get back to you within <strong>24 hours</strong>.</p>

            <p><strong>Need immediate assistance?</strong></p>
            <ul>
              <li>📞 Call us: +91 9876543210 (9 AM - 9 PM)</li>
              <li>💬 Live Chat: Available on our website</li>
              <li>📧 Email: support@stackskills.in</li>
            </ul>

            <p>Thank you for choosing StackSkills!</p>
            <p><strong>The StackSkills Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2024 StackSkills.in - Powered by Codementum</p>
            <p>Bangalore, Karnataka, India</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 10px; }
          .header { background: #dc2626; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .label { font-weight: bold; width: 150px; }
          .message { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .urgent { background: #fee2e2; padding: 10px; border-left: 4px solid #dc2626; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📨 New Contact Form Submission</h2>
          </div>

          ${inquiryType === 'technical-support' ? '<div class="urgent"><strong>⚠️ URGENT:</strong> Technical Support Request</div>' : ''}

          <table>
            <tr>
              <td class="label">Name:</td>
              <td>${name}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td>${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td class="label">Inquiry Type:</td>
              <td><strong>${inquiryType}</strong></td>
            </tr>
            <tr>
              <td class="label">Subject:</td>
              <td>${subject}</td>
            </tr>
            <tr>
              <td class="label">Submitted:</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>

          <div class="message">
            <strong>Message:</strong><br><br>
            ${message}
          </div>

          <p><strong>Action Required:</strong> Please respond within 24 hours.</p>
        </div>
      </body>
      </html>
    `;

    console.log('Contact emails prepared for:', email);
    console.log('Admin notification prepared');

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      data: {
        ...contactData,
        emailPreview: {
          thankYou: thankYouEmailHtml,
          adminNotification: adminNotificationHtml
        }
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
