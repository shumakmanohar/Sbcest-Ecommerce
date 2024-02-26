import { CreateOrder } from "@/server-actions/Order-Actions";
import { MoyasarWebHook } from "@/util/Types";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const moyasarWebHook: MoyasarWebHook = await req.json();
		if (moyasarWebHook.secret_token === process.env.MOYASAR_SECRET) {
			// check if the secrets Match
			console.log("WEBHOOK POST REQUEST FROM MOYASAR");
			let paymentStatus;
			if (moyasarWebHook.type === "payment_success") {
				paymentStatus = PaymentStatus.SUCCESS;
			} else {
				paymentStatus = PaymentStatus.FAILED;
			}

			const response = await CreateOrder(moyasarWebHook.data, paymentStatus);
		} else {
			throw Error("No Access");
		}

		return new NextResponse("WEBHOOK Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
