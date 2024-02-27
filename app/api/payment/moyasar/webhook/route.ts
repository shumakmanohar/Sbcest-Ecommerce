import { ServerResponse } from "@/util/Enums";
import { MoyasarWebHook } from "@/util/Types";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

			//Update the order
			await prisma.order.update({
				where: {
					moyasarID: moyasarWebHook.data.id,
				},
				data: {
					paymentStatus,
				},
			});

			return new NextResponse("WEBHOOK Updated Payment Status", {
				status: 200,
			});
		} else {
			throw Error("No Access");
		}
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
