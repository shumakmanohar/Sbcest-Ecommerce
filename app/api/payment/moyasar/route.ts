import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Address, OrderedProducts } from "@prisma/client";

export async function PUT(req: Request) {
	try {
		//Get User ID
		const { userId } = auth();
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}
		const moyasarData = await req.json();
		// moysasar id ->  moyasarData.payment.id
		// amount ->  moyasarData.payment.amount
		// OrderedPRoducts ->  moyasarData.metadata.OrderedProducts

		const order = await prisma.order.create({
			data: {
				amount: (moyasarData.payment.amount as number) / 100,
				email: moyasarData.metadata.shippingInformation.email as string,
				userID: userId as string,
				name: moyasarData.metadata.shippingInformation.name as string,
				shippingInformation: moyasarData.metadata
					.shippingInformation as Address,
				moyasarID: moyasarData.payment.id as string,
				moyasarFee: moyasarData.payment.fee as number,
				currency: moyasarData.payment.currency as string,
				orderedProducts: moyasarData.metadata
					.orderedProducts as OrderedProducts[],
			},
		});

		return new NextResponse("Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
