import prisma from "@/lib/prisma";
import { StoreProduct } from "@/util/Types";
import type { Categories, Product } from "@prisma/client";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const data: StoreProduct = await prisma.product.findFirst({
			where: { id: params.id },
		});

		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "Something went Wrong" + error });
	}
}
