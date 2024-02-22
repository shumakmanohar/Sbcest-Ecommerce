import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
	try {
		const data = await req.json();
		console.log("PUT REQUEST FROM MOYASAR", data);
		await prisma.order.update({
			where: { id: data.payment.description },
			data: {
				moyasarID: data.payment.id,
			},
		});
		return new NextResponse("Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
