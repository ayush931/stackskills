import { RoleGroups } from "@/middlewares/helper";
import { withRoleAuth } from "@/middlewares/role";
import ApiError from "@/utils/apiError";
import prisma from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

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
        session: true
      }
    })

    if (!allAdmin) {
      throw new ApiError(400, 'Failed to fetch all admins');
    }

    return NextResponse.json({ success: true, message: 'All admins details fetched', data: allAdmin }, { status: 200 });
  } catch (error) {
    
  }
}