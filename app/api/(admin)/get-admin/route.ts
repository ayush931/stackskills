import { RoleGroups } from "@/middlewares/helper";
import { getUserFromRequest, withRoleAuth } from "@/middlewares/role";
import ApiError from "@/utils/apiError";
import prisma from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * Give the individual admin details
 * @param req - Takes the request as the input from the middleware
 * @returns - Gives the admin details according to the given request
 */

export async function GET(req: NextRequest) {
  try {
    // check the authentication and role - takes the request
    const authCheck = await withRoleAuth(RoleGroups.ADMIN_ONLY)(req);
    if (authCheck) return authCheck;

    // finding the admin through the request
    const admin = getUserFromRequest(req);
    if (!admin) {
      throw new ApiError(400, 'User not found');
    }

    // finding the profile through the admin id
    const adminProfile = await prisma.user.findUnique({
      where: { id: admin.id },
      select: {
        id: true,
        name: true,
        phone: true,
        schoolName: true,
        className: true,
        role: true,
        session: true,
        password: false
      }
    })

    if (!adminProfile) {
      throw new ApiError(400, 'Unable to find the profile');
    }

    // gives the final response
    return NextResponse.json({ success: true, message: 'User details fetched', data: adminProfile }, { status: 200 });
  } catch (error) {
    throw new ApiError(500, String(error));
  }
}