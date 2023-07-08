import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { soberCounterValidationSchema } from 'validationSchema/sober-counters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sober_counter
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSoberCounterById();
    case 'PUT':
      return updateSoberCounterById();
    case 'DELETE':
      return deleteSoberCounterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSoberCounterById() {
    const data = await prisma.sober_counter.findFirst(convertQueryToPrismaUtil(req.query, 'sober_counter'));
    return res.status(200).json(data);
  }

  async function updateSoberCounterById() {
    await soberCounterValidationSchema.validate(req.body);
    const data = await prisma.sober_counter.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSoberCounterById() {
    const data = await prisma.sober_counter.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
