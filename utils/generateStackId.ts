import { nanoid } from 'nanoid';
import prisma from './prismaClient';

export async function generateUniqueStackId(length: number = 7): Promise<string> {
  while (true) {
    const id = nanoid(length);

    const existingStackId = await prisma.user.findUnique({
      where: { stackId: id },
    });

    if (!existingStackId) {
      return id;
    }
  }
}
