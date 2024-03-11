import prisma from "@/lib/prisma";
import { StoreProduct } from "@/util/Types";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	//const { page = 1, pageSize = 20 } = request.query;
	//const skip = (parseInt(page) - 1) * parseInt(pageSize);
	try {
		const data: StoreProduct[] = await prisma.product.findMany({
			where: { isArchived: false },
			orderBy: { createdAt: "desc" },
			include: {
				category: true,
			},
		});

		return Response.json(data);
	} catch (error) {
		return new Response(`Something Went Wrong ${error}`, {
			status: 400,
		});
	}
}
