import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectionToDB from '@/database/dbConnection';
import Student from '@/schema/student';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('Received student registration data:', data);

    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      school,
      grade,
      address,
      city,
      state,
      pincode,
      parentName,
      parentPhone,
      parentEmail
    } = data;

    // Validate required fields and provide specific error messages
    const missingFields = [];
    if (!fullName) missingFields.push('Full Name');
    if (!phone) missingFields.push('Phone Number');
    if (!dateOfBirth) missingFields.push('Date of Birth');
    if (!school) missingFields.push('School Name');
    if (!grade) missingFields.push('Grade');
    if (!address) missingFields.push('Address');
    if (!city) missingFields.push('City');
    if (!state) missingFields.push('State');
    if (!pincode) missingFields.push('Pincode');

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Connect to database
    await connectionToDB();

    // Create student record
    const student = await Student.create({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      school,
      grade,
      address,
      city,
      state,
      pincode,
      parentName,
      parentPhone,
      parentEmail
    });

    console.log('Student registered:', student._id);

    // Send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stackskills.in@gmail.com',
        pass: 'dytc rvzd yeoo chjo',
      },
    });

    // Student confirmation email
    const studentEmailHtml = `
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
            <h2>Hi ${fullName},</h2>
            <p>Thank you for registering with StackSkills! We're excited to have you join our learning community.</p>

            <p><strong>Your Registration Details:</strong></p>
            <ul>
              <li>Grade: ${grade}</li>
              <li>School: ${school}</li>
              <li>Phone: ${phone}</li>
            </ul>

            <p>Our team will contact you within 24 hours to complete your enrollment and discuss the next steps.</p>

            <p>In the meantime, here's what you can expect:</p>
            <ul>
              <li>📚 Access to all course materials</li>
              <li>👨‍🏫 Live interactive sessions with expert instructors</li>
              <li>💬 1-on-1 doubt support from 9 AM to 9 PM</li>
              <li>🏆 Certificate upon course completion</li>
            </ul>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackskills.in'}" class="button">Visit Our Website</a>
            </p>

            <p>If you have any questions, feel free to reach out to our support team at <strong>stackskills.in@gmail.com</strong></p>

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

    // Admin notification email
    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 10px; }
          .header { background: #1f2937; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .label { font-weight: bold; width: 180px; background: #f3f4f6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎓 New Student Registration</h2>
          </div>
          <p>A new student has registered on StackSkills!</p>
          <table>
            <tr>
              <td class="label">Full Name:</td>
              <td>${fullName}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td>${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td>${phone}</td>
            </tr>
            <tr>
              <td class="label">Date of Birth:</td>
              <td>${new Date(dateOfBirth).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td class="label">Gender:</td>
              <td>${gender || 'Not specified'}</td>
            </tr>
            <tr>
              <td class="label">School:</td>
              <td>${school}</td>
            </tr>
            <tr>
              <td class="label">Grade:</td>
              <td>${grade}</td>
            </tr>
            <tr>
              <td class="label">Address:</td>
              <td>${address}, ${city}, ${state} - ${pincode}</td>
            </tr>
            <tr>
              <td class="label">Parent Name:</td>
              <td>${parentName || 'Not provided'}</td>
            </tr>
            <tr>
              <td class="label">Parent Phone:</td>
              <td>${parentPhone || 'Not provided'}</td>
            </tr>
            <tr>
              <td class="label">Parent Email:</td>
              <td>${parentEmail || 'Not provided'}</td>
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

    // Send emails
    if (email) {
      await transporter.sendMail({
        from: 'stackskills.in@gmail.com',
        to: email,
        subject: 'Welcome to StackSkills - Registration Confirmed',
        html: studentEmailHtml,
      });
    }

    await transporter.sendMail({
      from: 'stackskills.in@gmail.com',
      to: 'stackskills.in@gmail.com',
      subject: 'New Student Registration',
      html: adminNotificationHtml,
    });

    console.log('Notification emails sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Registration successful! We will contact you soon.',
      data: {
        id: student._id,
        fullName,
        email,
        phone
      },
    });
  } catch (error: any) {
    console.error('Student registration error:', error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A student with this information already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process registration. Please try again.' },
      { status: 500 }
    );
  }
}
