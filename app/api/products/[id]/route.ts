import prisma from "@/lib/prisma";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const data = await prisma.product.findMany({
			where: { id: params.id },
		});

		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "Something went Wrong" + error });
	}
}
