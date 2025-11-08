import { RoleGroups } from '@/middlewares/helper';
import { getUserFromRequest, withRoleAuth } from '@/middlewares/role';
import { hashPassowrd, verifyPassword } from '@/utils/encryption';
import prisma from '@/utils/prismaClient';
import { changePasswordSchema } from '@/zodValidation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authCheck = await withRoleAuth(RoleGroups.USER_ONLY)(req);
    if (authCheck) return authCheck;

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });
    }

    const body = await req.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid user validation' },
        { status: 400 }
      );
    }

    const { password } = validation.data;
    const { newPassword, confirmPassword } = body;

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'New password and confirm password should be same' },
        { status: 400 }
      );
    }

    if (password === newPassword) {
      return NextResponse.json(
        { success: false, message: 'New password cannot be same as current password' },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const dbUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { password: true },
      });

      if (!dbUser) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });
      }

      const isCurrentPasswordValid = await verifyPassword(password, dbUser.password);

      if (!isCurrentPasswordValid.success || !isCurrentPasswordValid.isMatch) {
        return NextResponse.json(
          { success: false, message: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      const hashResult = await hashPassowrd(newPassword);

      if (!hashResult.success || !hashResult.hash) {
        return NextResponse.json({ success: false, message: hashResult.error }, { status: 400 });
      }

      await tx.user.update({
        where: { id: user.id },
        data: { password: hashResult.hash },
      });

      return { success: true };
    });

    if (result instanceof NextResponse) {
      return result;
    }

    return NextResponse.json(
      { success: true, message: 'Password changed successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
