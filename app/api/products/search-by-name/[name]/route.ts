import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { name: string } }
) {
	try {
		const name = params.name;
		console.log(name);
		const items = await prisma.product.findMany({
			take: 5,
			where: {
				title: {
					contains: name,
					mode: "insensitive",
				},
			},
		});

		return NextResponse.json(items);
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
