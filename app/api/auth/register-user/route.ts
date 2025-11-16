import { hashPassowrd } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { createAccessToken } from '@/utils/token';
import { registerUserSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';
import { generateUniqueStackId } from '@/utils/generateStackId';

/**
 * Registration of new user
 * @param req - Taking the various request or data from the user through registration form
 * @returns - Final response that user is registered or not
 */

export async function POST(req: NextRequest) {
  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    // using the zod schema here for the input validation
    let validateInput;
    try {
      validateInput = registerUserSchema.parse(requestBody);
    } catch (error) {
      return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
    }

    const { name, phone, password, className, schoolName } = validateInput;
    const { confirmPassword } = requestBody;

    const requiredFields = {
      name,
      phone,
      password,
      className,
      schoolName,
      confirmPassword,
    };

    // finding any missing fields here
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key as keyof typeof requiredFields]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing fields required: ${missingFields.join(', ')}` },
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

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Password and Confirm Password should be same' },
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

    /**
     * Adding the transaction method here so that user register when all the process has been done successfully and stored in db
     */
    const newUser = await prisma.$transaction(async (tx) => {
      // creating the 7 digit unique id
      const stackId = await generateUniqueStackId();

      const createUser = await tx.user.create({
        data: {
          name,
          password: hashedPassword,
          schoolName,
          className,
          phone,
          role: 'USER',
          stackId,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          schoolName: true,
          className: true,
          session: true,
          role: true,
          password: false,
          stackId: true,
        },
      });

      if (!createUser) {
        return NextResponse.json(
          { success: false, message: 'Failed to create new user' },
          { status: 400 }
        );
      }

      const token = createAccessToken({
        id: createUser.id,
        phone: createUser.phone,
        role: createUser.role,
        name: createUser.name,
      });

      try {
        await tx.user.update({
          where: { id: createUser.id },
          data: { session: token },
        });
      } catch (error) {
        return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
      }

      return {
        id: createUser.id,
        name: createUser.name,
        phone: createUser.phone,
        className: createUser.className,
        schoolName: createUser.schoolName,
        role: createUser.role,
        stackId: createUser.stackId,
        token,
      };
    });

    const response = NextResponse.json(
      { success: true, message: 'Registration successfull', data: newUser },
      { status: 200 }
    );

    if (newUser instanceof NextResponse) {
      return newUser;
    }

    response.cookies.set({
      name: 'token',
      value: newUser.token,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error('Error at the register user api', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
  }
}
