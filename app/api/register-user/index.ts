import { hashPassowrd } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { createAccessToken } from '@/utils/token';
import { registerUserSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@/utils/token';

export async function POST(req: NextRequest) {
  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Require user input correctly' },
        { status: 400 }
      );
    }

    let validateInput;
    try {
      validateInput = registerUserSchema.parse(requestBody);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Give the valid input data' },
        { status: 400 }
      );
    }

    const { name, phone, password, className, schoolName } = validateInput;

    const requiredFields = {
      name,
      phone,
      password,
      className,
      schoolName,
    };

    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key as keyof typeof requiredFields]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const checkUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (checkUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists, Please login!!!' },
        { status: 400 }
      );
    }

    const hashResult = await hashPassowrd(password);

    if (!hashResult.success || !hashResult.hash) {
      return NextResponse.json(
        { success: false, message: 'Failed to hash the password' },
        { status: 400 }
      );
    }

    const hashedPassword = hashResult.hash as string;

    const createUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        schoolName,
        className,
        phone,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        schoolName: true,
        className: true,
        phone: true,
        password: false,
        role: true,
        session: true,
      },
    });

    if (!createUser) {
      return NextResponse.json(
        { success: false, message: 'Failed to register new user' },
        { status: 400 }
      );
    }

    try {
      const payload: { id: string; phone: string; role: Role } = {
        id: '12345',
        phone: '70704726',
        role: 'ADMIN',
      };
      createAccessToken(payload);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Failed to create token' },
        { status: 400 }
      );
    }

    const token = createAccessToken({
      id: createUser.id,
      phone: createUser.phone,
      role: createUser.role as Role,
    });

    if (createUser.session) {
      await prisma.user.update({
        where: { id: createUser.id },
        data: {
          session: null,
        },
      });
      return NextResponse.json(
        { success: false, message: 'Already logged in with the given credentials, Try again!!!' },
        { status: 400 }
      );
    }

    try {
      await prisma.user.update({
        where: { id: createUser.id },
        data: {
          session: token,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Failed to update the session' },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: 'User registered successfully', data: createUser },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
      maxAge: 7000 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error at the register user api', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
