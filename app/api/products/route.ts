import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const data = await prisma.product.findMany({
			include: {
				category: true,
			},
		});
		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "Something went Wrong" + error });
	}
}
