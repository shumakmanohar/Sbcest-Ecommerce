"use server";

import { ServerResponse } from "@/util/Enums";
import {
	CheckoutType,
	OrderType,
	ProductType,
	productSchema,
} from "@/util/Types";
import prisma from "@/lib/prisma";
import { DeliveryStatus, Order, OrderedProducts } from "@prisma/client";

export const CreateOrder = async (checkout: {
	amount: number;
	orderedProducts: OrderedProducts[];
	email: string;
	name: string;
	shippingInformation: CheckoutType;
}) => {
	// Check if the User is SignedIn or Not
	const order = {
		amount: checkout.amount,
		email: checkout.email, //Get Email From Clerk
		moyasarID: "",
		shippingInformation: checkout.shippingInformation,
		orderedProducts: checkout.orderedProducts,
	};
	try {
		await prisma.order.create({
			data: {
				amount: 263.85,
				email: "hashteam00@gmail.com",
				moyasarID: "",
				shippingInformation: {
					email: "hashteam00@gmail.com",
					name: "test",
					addl1: "wrwwe",
					addl2: "dffd",
					city: "fsf",
					state: "dfsfsd",
					postalCode: "sdf",
					phone: "",
				},
				orderedProducts: [
					{
						productId: "65ce3db47d1d436a1c4c5bae",
						quantity: 1,
						title: "TEST PRODUCT FROM #1",
						description: "fsdfsjdhfiusdhsud\nSDfsdfsdfsd",
						ar_description: "sdfsdfsdfsd",
						ar_title: "sdfsdfsdfsd",
						previewImg: "ad0a74f0-c9c7-45dc-a2bc-4b42bb116b63-logo.png",
						price: 199,
					},
				],
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Order Added To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};
