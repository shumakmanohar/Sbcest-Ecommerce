import prisma from "@/lib/prisma";
import { StoreProduct } from "@/util/Types";
import { PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	console.log(request);
	const { searchParams } = new URL(request.url);
	const moyasarID = searchParams.get("id");
	const moyasarPaymentStatus = searchParams.get("status");
	let paymentStatus;
	if (moyasarPaymentStatus === "paid") {
		paymentStatus = PaymentStatus.SUCCESS;
	} else {
		paymentStatus = PaymentStatus.FAILED;
	}
	try {
		if (moyasarID && moyasarPaymentStatus) {
			const order = await prisma.order.findFirst({
				where: {
					moyasarID,
				},
			});
			if (order) {
				order.paymentStatus = paymentStatus;
				await prisma.order.update({
					where: {
						id: order.id,
					},
					data: {
						paymentStatus,
					},
				});
			}
		}
		//todo throw error

		return NextResponse.redirect(new URL("/order-complete", request.url));
	} catch (error) {
		return new Response(`Something Went Wrong ${error}`, {
			status: 400,
		});
	}
}
