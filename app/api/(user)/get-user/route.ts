import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';
import { getUserFromRequest, withRoleAuth } from '@/middlewares/role';
import { RoleGroups } from '@/middlewares/helper';

/**
 * Returns the details of the user (individually)
 * @param req - Taking the request, especially the user details
 * @returns - Returns the final result of the API
 */

export async function GET(req: NextRequest) {
  // Check authentication and role
  const authCheck = await withRoleAuth(RoleGroups.USER_ONLY)(req);
  if (authCheck) return authCheck;

  // getting the user details from the function
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // fetching the user profile
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        phone: true,
        schoolName: true,
        className: true,
        role: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json(
        { success: false, message: 'Failed to fetch the user profile' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Fetched user profile', data: userProfile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
