import { Phone } from 'lucide-react';
import prisma from '@/utils/prismaClient';
import { verifyToken } from '@/utils/token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Login first!!!' }, { status: 400 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Login with correct credentials' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        phone: true,
        role: true,
        session: true,
      },
    });

    if (!user || user.session !== token) {
      return NextResponse.json({ success: false, message: 'Invalid session' }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          name: user.name,
          role: user.role,
          Phone: user.phone,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
