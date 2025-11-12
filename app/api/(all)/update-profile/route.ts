import { RoleGroups } from "@/middlewares/helper";
import { getUserFromRequest, withRoleAuth } from "@/middlewares/role";
import prisma from "@/utils/prismaClient";
import { updateProfileSchema } from "@/zodValidation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const authCheck = await withRoleAuth(RoleGroups.ALL_AUTHENTICATED)(req);
    if (authCheck) return authCheck;

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ success: false, message: '' }, { status: 401 })
    }

    const body = await req.json();
    const validate = updateProfileSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({ success: false, message: 'Invalid input data', error: validate.error }, { status: 400 })
    }

    const { name, schoolName, className, phone } = validate.data;

    if (!name && !schoolName && !className && !phone) {
      return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 });
    }

    if (phone && phone !== user.phone) {
      const existingUser = await prisma.user.findUnique({
        where: { phone },
        select: { id: true }
      });

      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json({ success: false, message: 'Phone number is already registered' }, { status: 400 });
      };
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (schoolName !== undefined) updateData.schoolName = schoolName;
    if (className !== undefined) updateData.className = className;
    if (phone !== undefined) updateData.phone = phone;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        phone: true,
        schoolName: true,
        className: true,
        role: true,
        stackId: true,
        createdAt: true
      }
    })

    return NextResponse.json({ success: true, message: 'Profile updated successfully', data: updateData }, { status: 200 });
  } catch (error) {
    console.error('Error in edit profile', 500);
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}