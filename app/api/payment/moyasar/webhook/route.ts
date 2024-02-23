import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		console.log(req);
		//const data = await req.json();
		console.log("WEBHOOK POST REQUEST FROM MOYASAR");
		return new NextResponse("WEBHOOK Payment ID  Added", { status: 200 });
	} catch (error) {
		console.log(error);
		return new NextResponse("Something went wrong", { status: 400 });
	}
}
