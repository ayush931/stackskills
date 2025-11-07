import { hashPassowrd } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { createAccessToken } from '@/utils/token';
import { registerUserSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@/utils/token';
import ApiError from '@/utils/apiError';

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
      throw new ApiError(400, String(error));
    }

    // using the zod schema here for the input validation
    let validateInput;
    try {
      validateInput = registerUserSchema.parse(requestBody);
    } catch (error) {
      throw new ApiError(400, String(error));
    }

    const { name, phone, password, className, schoolName } = validateInput;
    const { confirmPassword } = requestBody;

    const requiredFields = {
      name,
      phone,
      password,
      className,
      schoolName,
      confirmPassword
    };

    // finding any missing fields here
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key as keyof typeof requiredFields]
    );

    if (missingFields.length > 0) {
      throw new ApiError(400, `Missing fields required: ${missingFields.join(', ')}`);
    }

    const checkUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (checkUser) {
      throw new ApiError(400, 'User already exists, Please login!!!')
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, 'Password and Confirm Password should be same');
    }

    const hashResult = await hashPassowrd(password);

    if (!hashResult.success || !hashResult.hash) {
      throw new ApiError(400, 'Failed to hash the password')
    }

    const hashedPassword = hashResult.hash as string;

    /**
     * Adding the transaction method here so that user register when all the process has been done successfully and stored in db
     */
    const newUser = await prisma.$transaction(async (tx) => {
      const createUser = await tx.user.create({
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
          phone: true,
          schoolName: true,
          className: true,
          session: true,
          role: true,
          password: false,
        },
      });

      if (!createUser) {
        throw new ApiError(400, 'Failed to create new user');
      }

      try {
        const payload = {
          id: '12345',
          phone: '7070707070',
          role: 'ADMIN' as Role,
        };
        createAccessToken(payload);
      } catch (error) {
        throw new ApiError(400, String(error));
      }

      const token = createAccessToken({
        id: createUser.id,
        phone: createUser.phone,
        role: createUser.role,
      });

      try {
        await tx.user.update({
          where: { id: createUser.id },
          data: { session: token },
        });
      } catch (error) {
        throw new ApiError(400, String(error));
      }

      return {
        id: createUser.id,
        name: createUser.name,
        phone: createUser.phone,
        className: createUser.className,
        schoolName: createUser.schoolName,
        role: createUser.role,
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
    throw new ApiError(500, String(error));
  }
}
