import { prisma } from "../../../server/db/client";

export default async function handle(req, res) {
    const { method } = req;
    const { userid } = req.query;

    switch (method) {
        case "GET":
            const user = await prisma.user.findUnique({
                where: { id: Number(userid) },
            });
            if(!user) {
                res.status(404).json({ message: 'user not found'});
                break;
            }
            res.status(200).json(user);
            break;

        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}