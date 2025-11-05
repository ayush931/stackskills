import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, phone, grade, experience, learningPathId } = data;

    if (!name || !email || !phone || !grade || !experience || !learningPathId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const registrationData = {
      name,
      email,
      phone,
      grade,
      experience,
      learning_path_id: learningPathId,
      created_at: new Date().toISOString(),
    };

    console.log('Registration received:', registrationData);

    const thankYouEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to StackSkills!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for registering with StackSkills! We're excited to have you join our learning community.</p>

            <p><strong>Your Registration Details:</strong></p>
            <ul>
              <li>Grade: ${grade}</li>
              <li>Experience Level: ${experience}</li>
              <li>Email: ${email}</li>
            </ul>

            <p>Your 7-day free trial has been activated! You'll receive another email shortly with your login credentials and next steps.</p>

            <p>In the meantime, here's what you can expect:</p>
            <ul>
              <li>📚 Access to all course materials</li>
              <li>👨‍🏫 Live interactive sessions with expert instructors</li>
              <li>💬 1-on-1 doubt support from 9 AM to 9 PM</li>
              <li>🏆 Certificate upon course completion</li>
            </ul>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackskills.in'}" class="button">Get Started</a>
            </p>

            <p>If you have any questions, feel free to reach out to our support team at <strong>support@stackskills.in</strong> or call us at <strong>+91 9876543210</strong>.</p>

            <p>Happy Learning! 🚀</p>
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
          .header { background: #1f2937; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .label { font-weight: bold; width: 150px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎓 New Student Registration</h2>
          </div>
          <p>A new student has registered for StackSkills!</p>
          <table>
            <tr>
              <td class="label">Name:</td>
              <td>${name}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td>${phone}</td>
            </tr>
            <tr>
              <td class="label">Grade:</td>
              <td>${grade}</td>
            </tr>
            <tr>
              <td class="label">Experience:</td>
              <td>${experience}</td>
            </tr>
            <tr>
              <td class="label">Learning Path:</td>
              <td>Path ${learningPathId}</td>
            </tr>
            <tr>
              <td class="label">Registration Time:</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p><strong>Action Required:</strong> Please follow up with this student within 24 hours.</p>
        </div>
      </body>
      </html>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stackskills.in@gmail.com',
        pass: 'dytc rvzd yeoo chjo',
      },
    });

    const adminNotificationOptions = {
      from: 'stackskills.in@gmail.com',
      to: 'stackskills.in@gmail.com',
      subject: 'New Student Registration',
      html: adminNotificationHtml,
    };

    await transporter.sendMail(adminNotificationOptions);

    console.log('Admin notification email sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Check your email for confirmation.',
      data: {
        ...registrationData,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 });
  }
}
