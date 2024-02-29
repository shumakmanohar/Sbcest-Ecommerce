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
		//Todo  authorization
		const moyasarWebHook: MoyasarWebHook = await request.json();
		const order = await prisma.order.findFirst({
			where: {
				moyasarID: moyasarWebHook.data.id,
			},
		});
		if (order) {
			const { data, error } = await resend.emails.send({
				from: "no-reply@store.sbcest.com",
				to: [order.email],
				subject: `Thank you . Your order #${order.id} has been successfully placed.`,
				html: render(
					SbcestReceiptEmail({
						amount: order.amount,
						email: order.email,
						id: order.id,
						orderedProducts: order.orderedProducts,
						shippingInformation: order.shippingInformation,
					})
				),
			});
			if (error) {
				console.log(error);
				throw error;
			}
		}

		return new NextResponse("Successful in RESEND EMAIL", {
			status: 200,
		});
	} catch (error) {
		return new NextResponse("Something went wrong in RESEND EMAIL", {
			status: 500,
		});
	}
}
