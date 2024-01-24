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
		if (data === null) throw Error("No Data Found");
		return Response.json(data);
	} catch (error) {
		return new Response(`Something Went Wrong ${error}`, {
			status: 400,
		});
	}
}
