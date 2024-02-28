import prisma from "@/lib/prisma";
import { StoreProduct } from "@/util/Types";
import { PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const moyasarID = searchParams.get("id");
	const moyasarPaymentStatus = searchParams.get("status");
	console.log("I GOT REQUEST", request);
	return new Response("Hello, Next.js!", {
		status: 200,
	});
}
// const { searchParams } = new URL(request.url);
// const moyasarID = searchParams.get("id");
// const moyasarPaymentStatus = searchParams.get("status");
// let paymentStatus;
// console.log(request);
// if (moyasarPaymentStatus === "paid") {
// 	paymentStatus = PaymentStatus.SUCCESS;
// } else {
// 	paymentStatus = PaymentStatus.FAILED;
// }
// try {
// 	// if (moyasarID && moyasarPaymentStatus) {
// 	// 	await prisma.order.updateMany({
// 	// 		where: {
// 	// 			moyasarID,
// 	// 		},
// 	// 		data: {
// 	// 			paymentStatus,
// 	// 		},
// 	// 	});
// 	// }
// 	//todo throw error
// 	return NextResponse.redirect(new URL("/order-complete", request.url));
// } catch (error) {
// 	return new Response(`Something Went Wrong ${error}`, {
// 		status: 400,
// 	});
// }
