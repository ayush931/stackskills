import { verifyPassword } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { createAccessToken } from '@/utils/token';
import { loginUserSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@/utils/token';
import ApiError from '@/utils/apiError';

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
      throw new ApiError(400, String(error));
    }

    // validating the data using the zod
    let validateData;
    try {
      validateData = loginUserSchema.parse(requestBody);
    } catch (error) {
      throw new ApiError(400, String(error));
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
      throw new ApiError(400, `Missing field required: ${missingFields.join(', ')}`);
    }

    /**
     * Adding the transaction features here so that all the process should be completed before logged in
     */

    const user = await prisma.$transaction(async (tx) => {
      const findUser = await tx.user.findUnique({
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
        },
      });

      if (!findUser) {
        throw new ApiError(400, 'User does not exists, Please register!!!');
      }

      // checking if the user is logged in on other device, if yes then user will logged out
      if (findUser.session) {
        await tx.user.update({
          where: { id: findUser.id },
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
      const comparePassword = await verifyPassword(password, findUser.password);

      if (!comparePassword.success || !comparePassword.isMatch) {
        throw new ApiError(400, 'Unable to compare the password');
      }

      const isPasswordMatched = comparePassword.isMatch;

      if (!isPasswordMatched) {
        throw new ApiError(400, 'Invalid credentials');
      }

      try {
        const payload = {
          id: '12345',
          phone: '1234567890',
          role: 'ADMIN' as Role,
        };
        createAccessToken(payload);
      } catch (error) {
        throw new ApiError(400, String(error));
      }

      const token = createAccessToken({
        id: findUser.id,
        phone: findUser.phone,
        role: findUser.role,
      });

      // updating the new token in the session
      try {
        await tx.user.update({
          where: { id: findUser.id },
          data: { session: token },
        });
      } catch (error) {
        throw new ApiError(400, String(error));
      }

      return {
        id: findUser.id,
        name: findUser.name,
        className: findUser.className,
        schoolName: findUser.schoolName,
        role: findUser.role,
        phone: findUser.phone,
        token,
      };
    });

    if (user instanceof NextResponse) {
      return user;
    }

    const response = NextResponse.json(
      { success: true, message: 'Logged in successful', data: user },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: user.token,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error in login user api endpoint', error);
    throw new ApiError(500, String(error));
  }
}
