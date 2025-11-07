import ApiError from '@/utils/apiError';
import prisma from '@/utils/prismaClient';
import { verifyToken } from '@/utils/token';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Logout functionality of the user
 * @param req - Taking the token value in the request
 * @returns - Final response about the logout event
 */

export async function GET(req: NextRequest) {
  try {
    // taking token from the cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      throw new ApiError(400, 'Unauthorized - token is not available')
    }

    const verify = verifyToken(token);

    if (!verify) {
      throw new ApiError(400, 'Unauthorized - Login with correct credentials');
    }

    // deleting the session id from the user
    await prisma.user.update({
      where: { id: verify.id },
      data: { session: null },
    });

    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: '',
      maxAge: 0,
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Error in logout api endpoint', error);
    throw new ApiError(500, String(error));
  }
}
