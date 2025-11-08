import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectionToDB from '@/database/dbConnection';
import Organization from '@/schema/organization';

/**
 * Takes the organization information through the form
 * @param request - Takes various input or data through the body
 * @returns - Return the response that information is submitted or not
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      organizationName,
      organizationType,
      email,
      phone,
      website,
      address,
      city,
      state,
      pincode,
      contactPersonName,
      contactPersonDesignation,
      contactPersonEmail,
      contactPersonPhone,
    } = data;

    // Validate required fields
    if (
      !organizationName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !contactPersonName ||
      !contactPersonDesignation ||
      !contactPersonEmail ||
      !contactPersonPhone
    ) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectionToDB();

    // Create organization record
    const organization = await Organization.create({
      organizationName,
      organizationType,
      email,
      phone,
      website,
      address,
      city,
      state,
      pincode,
      contactPersonName,
      contactPersonDesignation,
      contactPersonEmail,
      contactPersonPhone,
    });

    // Send email notifications
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stackskills.in@gmail.com',
        pass: 'dytc rvzd yeoo chjo',
      },
    });

    // Organization confirmation email
    const organizationEmailHtml = `
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
            <h1>🤝 Welcome to StackSkills Partnership!</h1>
          </div>
          <div class="content">
            <h2>Dear ${contactPersonName},</h2>
            <p>Thank you for registering <strong>${organizationName}</strong> with StackSkills! We're excited about the possibility of partnering with your organization.</p>

            <p><strong>Registration Details:</strong></p>
            <ul>
              <li>Organization: ${organizationName}</li>
              ${organizationType ? `<li>Type: ${organizationType}</li>` : ''}
              <li>Location: ${city}, ${state}</li>
              <li>Contact Person: ${contactPersonName} (${contactPersonDesignation})</li>
            </ul>

            <p>Our business development team will reach out to you within 24 hours to discuss:</p>
            <ul>
              <li>🎯 Corporate training programs</li>
              <li>💼 Employee upskilling opportunities</li>
              <li>🏢 Custom enterprise solutions</li>
              <li>📊 Team progress tracking and analytics</li>
              <li>🎓 Certification programs</li>
              <li>💰 Flexible pricing models</li>
            </ul>

            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackskills.in'}" class="button">Explore Our Programs</a>
            </p>

            <p>For immediate assistance, contact us at <strong>stackskills.in@gmail.com</strong> or call <strong>${phone}</strong></p>

            <p>We look forward to helping your organization achieve its learning and development goals!</p>
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
            <h2>🏢 New Organization Registration</h2>
          </div>
          <p>A new organization has registered on StackSkills!</p>
          <table>
            <tr>
              <td class="label">Organization Name:</td>
              <td>${organizationName}</td>
            </tr>
            ${
              organizationType
                ? `<tr>
              <td class="label">Organization Type:</td>
              <td>${organizationType}</td>
            </tr>`
                : ''
            }
            <tr>
              <td class="label">Email:</td>
              <td>${email}</td>
            </tr>
            <tr>
              <td class="label">Phone:</td>
              <td>${phone}</td>
            </tr>
            ${
              website
                ? `<tr>
              <td class="label">Website:</td>
              <td><a href="${website}">${website}</a></td>
            </tr>`
                : ''
            }
            <tr>
              <td class="label">Full Address:</td>
              <td>${address}, ${city}, ${state} - ${pincode}</td>
            </tr>
            <tr>
              <td class="label">Contact Person:</td>
              <td>${contactPersonName}</td>
            </tr>
            <tr>
              <td class="label">Designation:</td>
              <td>${contactPersonDesignation}</td>
            </tr>
            <tr>
              <td class="label">Contact Email:</td>
              <td>${contactPersonEmail}</td>
            </tr>
            <tr>
              <td class="label">Contact Phone:</td>
              <td>${contactPersonPhone}</td>
            </tr>
            <tr>
              <td class="label">Registration Time:</td>
              <td>${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p><strong>🚨 High Priority:</strong> Please contact the organization within 24 hours to discuss partnership opportunities.</p>
        </div>
      </body>
      </html>
    `;

    // Send emails
    await transporter.sendMail({
      from: 'stackskills.in@gmail.com',
      to: contactPersonEmail,
      subject: 'Welcome to StackSkills - Organization Registration Confirmed',
      html: organizationEmailHtml,
    });

    await transporter.sendMail({
      from: 'stackskills.in@gmail.com',
      to: 'stackskills.in@gmail.com',
      subject: `New Organization Registration - ${organizationName}`,
      html: adminNotificationHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Our team will contact you within 24 hours.',
      data: {
        id: organization._id,
        organizationName,
        email,
        contactPersonName,
      },
    });
  } catch (error) {
    console.error('Organization registration error:', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
