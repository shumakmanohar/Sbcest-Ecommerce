import { CreateOrder } from "@/server-actions/Order-Actions";
import { ServerResponse } from "@/util/Enums";
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

			if (response.status === ServerResponse.Failure) {
				throw Error("Something went Wrong in Server");
			}
			return new NextResponse("WEBHOOK Payment ID  Added", { status: 200 });
		} else {
			throw Error("No Access");
		}
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
