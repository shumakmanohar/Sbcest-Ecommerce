import prisma from "@/lib/prisma";
import { StoreProduct } from "@/util/Types";

export async function GET() {
	try {
		const data: StoreProduct[] = await prisma.product.findMany({
			include: {
				category: true,
			},
		});
		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "Something went Wrong" + error });
	}
}
