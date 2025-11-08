import { RoleGroups } from '@/middlewares/helper';
import { withRoleAuth } from '@/middlewares/role';
import prisma from '@/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const authCheck = await withRoleAuth(RoleGroups.ADMIN_ONLY)(req);
    if (authCheck) return authCheck;

    const allAdmin = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        password: false,
        phone: true,
        className: true,
        schoolName: true,
        role: true,
        session: true,
        stackId: true,
      },
    });

    if (!allAdmin) {
      return NextResponse.json({ success: false, message: 'Admins not found' }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, message: 'All admins details fetched', data: allAdmin },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
