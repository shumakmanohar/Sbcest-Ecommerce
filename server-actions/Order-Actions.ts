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

export const GetSingleOrder = async (orderId = "") => {
	// Check LoggedIn
	try {
		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
				paymentStatus: "PENDING",
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Order Fetched From DB",
			orderId: order,
		};
	} catch (error) {
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

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
		const dbPushedOrder = await prisma.order.create({
			data: order,
		});

		return {
			status: ServerResponse.Success,
			message: "Order Added To DB",
			orderId: dbPushedOrder.id,
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

// CMS
export const GetAllOrders = async () => {
	//todo check loggedIn
	try {
		const order = await prisma.order.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Order Fetched From DB",
			orders: order,
		};
	} catch (error) {
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};
