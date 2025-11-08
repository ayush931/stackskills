import { RoleGroups } from '@/middlewares/helper';
import { withRoleAuth } from '@/middlewares/role';
import prisma from '@/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // check the authentication and role - taking request from user
    const authCheck = await withRoleAuth(RoleGroups.ADMIN_ONLY)(req);
    if (authCheck) return authCheck;

    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        password: false,
        schoolName: true,
        className: true,
        role: true,
        phone: true,
        stackId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not user and admin found' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'All user details fetched', data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
