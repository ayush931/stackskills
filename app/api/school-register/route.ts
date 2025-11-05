import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectionToDB from '@/database/dbConnection';
import School from '@/schema/school';

/**
 * Give the searched result
 * @param request - Takes the data/input through params via search bar
 * @returns - Final response that is being given through params
 */

export async function GET(request: Request) {
  try {
    // Connect to database
    await connectionToDB();

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Fetch organizations in descending order (newest first)
    const organizations = await School.find()
      .sort({ createdAt: -1 }) // -1 for descending order
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    // Get total count for pagination
    const totalCount = await School.countDocuments();

    return NextResponse.json({
      success: true,
      data: organizations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalRecords: totalCount,
        recordsPerPage: limit,
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization registrations.' },
      { status: 500 }
    );
  }
}

/**
 * School registration process
 * @param request - Takes various input through form
 * @returns - School registration form is submitted or not
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log('Received school registration data:', data);

    const {
      schoolName,
      schoolEmail,
      district,
      street,
      city,
      state,
      pincode,
      board,
      authorizedPersonName,
      authorizedPersonEmail,
      designation,
      phoneNo,
    } = data;

    // Validate required fields and provide specific error messages
    const missingFields = [];
    if (!schoolName) missingFields.push('School Name');
    if (!schoolEmail) missingFields.push('School Email');
    if (!district) missingFields.push('District');
    if (!street) missingFields.push('Street Address');
    if (!city) missingFields.push('City');
    if (!state) missingFields.push('State');
    if (!pincode) missingFields.push('Pincode');
    if (!board) missingFields.push('Board');
    if (!authorizedPersonName) missingFields.push('Authorized Person Name');
    if (!authorizedPersonEmail) missingFields.push('Authorized Person Email');
    if (!designation) missingFields.push('Designation');
    if (!phoneNo) missingFields.push('Phone Number');

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Connect to database
    await connectionToDB();

    // Create school record
    const school = await School.create({
      schoolName,
      schoolEmail,
      district,
      street,
      city,
      state,
      pincode,
      board,
      authorizedPersonName,
      authorizedPersonEmail,
      designation,
      phoneNo,
    });

    console.log('School registered:', school._id);

    // Send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stackskills.in@gmail.com',
        pass: 'dytc rvzd yeoo chjo',
      },
    });

    // School confirmation email
    const schoolEmailHtml = `
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
            <h1>🏫 Welcome to StackSkills Partnership!</h1>
          </div>
          <div class="content">
            <h2>Dear ${authorizedPersonName},</h2>
            <p>Thank you for registering <strong>${schoolName}</strong> with StackSkills! We're excited to partner with your institution.</p>

            <p><strong>Registration Details:</strong></p>
            <ul>
              <li>School: ${schoolName}</li>
              <li>Board: ${board}</li>
              <li>Location: ${district}, ${state}</li>
              <li>Contact Person: ${authorizedPersonName} (${designation})</li>
            </ul>

            <p>Our partnership team will reach out to you within 24 hours to discuss:</p>
            <ul>
              <li>📋 Custom curriculum options for your students</li>
              <li>👥 Bulk enrollment process</li>
              <li>💰 Institutional pricing and packages</li>
              <li>📊 Progress tracking and reporting tools</li>
              <li>🎓 Teacher training and support</li>
            </ul>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackskills.in'}" class="button">Learn More</a>
            </p>

            <p>For immediate assistance, contact us at <strong>stackskills.in@gmail.com</strong> or call <strong>${phoneNo}</strong></p>

            <p>We look forward to empowering your students with cutting-edge STEM education!</p>
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
            <h2>🏫 New School Registration</h2>
          </div>
          <p>A new school has registered on StackSkills!</p>
          <table>
            <tr>
              <td class="label">School Name:</td>
              <td>${schoolName}</td>
            </tr>
            <tr>
              <td class="label">School Email:</td>
              <td>${schoolEmail}</td>
            </tr>
            <tr>
              <td class="label">Board:</td>
              <td>${board}</td>
            </tr>
            <tr>
              <td class="label">District:</td>
              <td>${district}</td>
            </tr>
            <tr>
              <td class="label">Full Address:</td>
              <td>${street}, ${city}, ${state} - ${pincode}</td>
            </tr>
            <tr>
              <td class="label">Authorized Person:</td>
              <td>${authorizedPersonName}</td>
            </tr>
            <tr>
              <td class="label">Designation:</td>
              <td>${designation}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td>${authorizedPersonEmail}</td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td>${phoneNo}</td>
            </tr>
            <tr>
              <td class="label">Registration Time:</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p><strong>🚨 High Priority:</strong> Please contact the school within 24 hours to discuss partnership opportunities.</p>
        </div>
      </body>
      </html>
    `;

    // Send emails
    await transporter.sendMail({
      from: 'stackskills.in@gmail.com',
      to: authorizedPersonEmail,
      subject: 'Welcome to StackSkills - School Registration Confirmed',
      html: schoolEmailHtml,
    });

    await transporter.sendMail({
      from: 'stackskills.in@gmail.com',
      to: 'stackskills.in@gmail.com',
      subject: `New School Registration - ${schoolName}`,
      html: adminNotificationHtml,
    });

    console.log('Notification emails sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Registration successful! We will contact you within 24 hours.',
      data: {
        id: school._id,
        schoolName,
        schoolEmail,
        authorizedPersonName,
      },
    });
  } catch (error: any) {
    console.error('School registration error:', error);

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
        { error: 'A school with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to process registration. Please try again.' },
      { status: 500 }
    );
  }
}
