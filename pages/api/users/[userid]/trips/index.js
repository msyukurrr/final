import { prisma } from "../../../../../server/db/client";

export default async function handle(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const post = await prisma.post.findMany({
        where: {
          userId: Number(userid),
        },
      });
      // send the post object back to the client
      res.status(200).json(trips);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}