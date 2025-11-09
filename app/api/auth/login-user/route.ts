import { verifyPassword } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { createAccessToken } from '@/utils/token';
import { loginUserSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@/utils/token';

/**
 * Log in api endpoint
 * @param req - Takes the phone and password from the user
 * @returns - Final response that user is logged in or not
 */

export async function POST(req: NextRequest) {
  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    // validating the data using the zod
    let validateData;
    try {
      validateData = loginUserSchema.parse(requestBody);
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    const { phone, password } = validateData;

    const requiredFields = {
      phone,
      password,
    };

    // checking the missing fields
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key as keyof typeof requiredFields]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing fields required: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    /**
     * Adding the transaction features here so that all the process should be completed before logged in
     */

    const user = await prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        password: true,
        session: true,
        role: true,
        phone: true,
        schoolName: true,
        className: true,
        name: true,
        stackId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found, Please register!!!' },
        { status: 400 }
      );
    }

    // checking if the user is logged in on other device, if yes then user will logged out
    if (user.session) {
      await prisma.user.update({
        where: { id: user.id },
        data: { session: null },
      });
      const response = NextResponse.json(
        { success: false, message: 'Log out from another device, Please login again!!!' },
        { status: 400 }
      );
      response.cookies.get({
        name: 'token',
        value: '',
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return response;
    }

    // verifying the user password from the db stored password
    const comparePassword = await verifyPassword(password, user.password);

    if (!comparePassword.success) {
      console.error('Password verification failed:', comparePassword.error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed. Please try again.' },
        { status: 400 }
      );
    }

    if (!comparePassword.isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 400 }
      );
    }

    try {
      const payload = {
        id: '12345',
        phone: '1234567890',
        role: 'ADMIN' as Role,
        name: 'ayush'
      };
      createAccessToken(payload);
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    const token = createAccessToken({
      id: user.id,
      phone: user.phone,
      role: user.role,
      name: user.name
    });

    // updating the new token in the session
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { session: token },
      });
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    const response = NextResponse.json(
      { success: true, message: 'Logged in successful', data: user },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error in login user api endpoint', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
