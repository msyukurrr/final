import { prisma } from "../../../../server/db/client";

export default async function handle(req, res) {
    const { postId } = req.query;

    switch (req.method) {
        case "GET":
        
            const post = await prisma.post.findUnique({
                where: { id: Number(postId) },
            });
            if(!post) {
                res.status(404).json({ message: 'post not found'});
                break;
            }
            res.status(200).json(post);
            break;

        case "PUT":

            const { title, content } = req.body;
            if(!title){
                res.status(400).json({ message: 'title is required'});
                break;
            }
            const updatedPost = await prisma.post.update({
                where: {id: Number(postId)},
                data:{
                    title,
                    content,
                },
            });
            if(!updatedPost) {
                res.status(404).json({ message: 'post not found'});
                break;
            }
            res.status(200).json(updatedPost);
            break;

            case "DELETE":
                await prisma.post.delete({ where: {id: Number(postId) } });
                res.status(204).end();
                break;
            

        default:
            res.status(405).end();
}
}