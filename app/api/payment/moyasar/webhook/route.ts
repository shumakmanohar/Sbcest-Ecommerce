import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		console.log(req);
		console.log("WEBHOOK POST REQUEST FROM MOYASAR", data);
		return new NextResponse("WEBHOOK Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
