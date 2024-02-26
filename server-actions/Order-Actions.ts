"use server";

import { ServerResponse } from "@/util/Enums";
import {
	CheckoutType,
	MoyasarData,
	OrderType,
	ProductType,
	productSchema,
} from "@/util/Types";
import prisma from "@/lib/prisma";
import {
	DeliveryStatus,
	Order,
	OrderedProducts,
	PaymentStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/isAdmin";

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

// CMS
export const UpdateOrder = async (
	orderId: string,
	deliveryStatus: DeliveryStatus
) => {
	//Todo : Check if loggedIn
	if (!(await isAdmin())) {
		return {
			status: ServerResponse.Failure,
			message: `Not Authenticated `,
		};
	}
	try {
		const data = await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				deliveryStatus,
			},
		});
		revalidatePath("/cms/orders");
		return {
			status: ServerResponse.Success,
			message: "Orders Updated To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

//CMS
export const CreateOrder = async (
	moyasaraData: MoyasarData,
	paymentStatus: PaymentStatus
) => {
	try {
		// CREATE ORDER
		const order = {
			amount: moyasaraData.amount,
			deliveryStatus: DeliveryStatus.PENDING,
			paymentStatus,
			email: moyasaraData.metadata.shippingInformation.email,
			name: moyasaraData.metadata.shippingInformation.name,
			shippingInformation: moyasaraData.metadata.shippingInformation,
			moyasarID: moyasaraData.id,
			moyasarFee: moyasaraData.fee,
			currency: moyasaraData.currency,
			orderedProducts: moyasaraData.metadata.orderedProducts,
		};
		const dbPushedOrder = await prisma.order.create({
			data: order,
		});
		revalidatePath("/cms/orders");
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
