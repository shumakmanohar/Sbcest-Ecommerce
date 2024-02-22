import { NextResponse } from "next/server";

export async function PUT(
	req: Request,
	{ params }: { params: { name: string } }
) {
	try {
		const data = await req.json();
		console.log("PUT REQUEST FROM MOYASAR", data);
		// Update
		//#de6e674e-447a-4941-ad83-f1d193b88741
		// Moyasara ID -> #de6e674e-447a-4941-ad83-f1d193b88741
		// Update DB , Order
		return new NextResponse("Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
