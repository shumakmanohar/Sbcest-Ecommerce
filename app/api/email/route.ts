import { Resend } from "resend";
import { render } from "@react-email/render";
import SbcestReceiptEmail from "@/emails";
import { NextResponse } from "next/server";
import { MoyasarWebHook } from "@/util/Types";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
	// Todo Add owner mail
	try {
		const origin = request.headers.get("origin");
		const moyasarWebHook: MoyasarWebHook = await request.json();
		if (
			moyasarWebHook.secret_token === process.env.MOYASAR_SECRET &&
			moyasarWebHook.type === "payment_paid"
		) {
			//Find Order
			const order = await prisma.order.findFirst({
				where: {
					moyasarID: moyasarWebHook.data.id,
				},
			});
			//Send Email Only When Order is Found
			if (order) {
				const { data, error } = await resend.emails.send({
					from: "no-reply@store.sbcest.com",
					to: [order.email, "Sbcest@hotmail.com"],
					subject: `Thank you . Your order #${order.id} has been successfully placed. Sbcest`,
					html: render(
						SbcestReceiptEmail({
							amount: order.amount,
							email: order.email,
							id: order.id,
							orderedProducts: order.orderedProducts,
							shippingInformation: order.shippingInformation,
							ApplicableVat: order.ApplicableVat,
							BeforeTaxPrice: order.BeforeTaxPrice,
							shippingCost: order.shippingCost,
						})
					),
				});
				console.log(error);
			}
			// Return 200 status code
			return new NextResponse("Triggered For  Email", {
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": origin || "*",
					"Content-Type": "application/json",
				},
			});
		} else {
			throw Error("Not Authentication");
		}
	} catch (error) {
		return new NextResponse("Something went wrong in RESEND EMAIL", {
			status: 500,
		});
	}
}
