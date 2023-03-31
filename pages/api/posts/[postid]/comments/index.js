import { prisma } from "../../../../../server/db/client";

export default async function handle(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            const comments = await prisma.comment.findMany({
                where: {
                    postId: parseInt(req.query.postid)
                }
            });   
            res.status(200).json(comments);
            break;

        case "POST":
            const comment = await prisma.comment.create({
                data: {
                    content: req.body.content,
                    post: {
                        connect: {
                            id: parseInt(req.query.postid)
                    }
                }
            }
        });
        res.status(201).jsdon(post);
        break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}