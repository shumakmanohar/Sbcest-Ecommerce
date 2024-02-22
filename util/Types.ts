import * as z from "zod";
import { EnumPriceFilter, ServerResponse } from "./Enums";
import {
	DeliveryStatus,
	type Categories,
	type Product,
	PaymentStatus,
} from "@prisma/client";

// ZOD -> PRODUCT SCHEMA
export const productSchema = z.object({
	title: z.string().min(2, {
		message: "Product Title must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Product Description must be at least 2 characters.",
	}),
	ar_title: z.string().min(2, {
		message: "Product Title must be at least 2 characters.",
	}),
	ar_description: z.string().min(2, {
		message: "Product Description must be at least 2 characters.",
	}),
	price: z.coerce.number().min(1, {
		message: "Product Price  must be at least 1.",
	}),
	isOnOffer: z.boolean(),
	offerPrice: z.coerce.number(),
	isArchived: z.boolean(),
	images: z.array(z.string()),
	previewImg: z.string(),
	category: z.string({
		required_error: "Please select an category.",
	}),
	isFeatured: z.boolean(),
});

export type ProductType = z.infer<typeof productSchema>;

export type StoreProduct = Omit<Product, "createdAt" | "updatedAt"> | null;

// ZOD -> Categories SCHEMA
export const categorySchema = z.object({
	name: z.string().min(2, {
		message: "Category  must be at least 2 characters.",
	}),
	ar_name: z.string().min(1, {
		message: "Category  must be at least 1 characters.",
	}),
});
// ZOD -> Checkout SCHEMA
export const CheckoutSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	addl1: z.string(),
	addl2: z.string(),
	city: z.string(),
	state: z.string(),
	postalCode: z.string(),
	phone: z.string(),
});

export type CheckoutType = z.infer<typeof CheckoutSchema>;
export type CategoryType = z.infer<typeof categorySchema>;

export type ServerGetProps = {
	status: ServerResponse;
	message: string;
	data?: Object[] | Categories[] | undefined;
};

export type FilterType = { name: string; arName: string; id: EnumPriceFilter };

export const orderSchema = z.object({
	amount: z.number(),
	deliveryStatus: z.nativeEnum(DeliveryStatus).default(DeliveryStatus.PENDING),
	paymentStatus: z.nativeEnum(PaymentStatus).default(PaymentStatus.PENDING),
	email: z.string().email(),
	shippingInformation: z.object({
		email: z.string().email(),
		name: z.string(),
		addl1: z.string(),
		addl2: z.string(),
		city: z.string(),
		state: z.string(),
		postalCode: z.string(),
		phone: z.string(),
	}),
	moyasarID: z.string(),
	orderedProducts: z.array(
		z.object({
			quantity: z.number(),
			productId: z.string(),
			title: z.string(),
			description: z.string(),
			previewImg: z.string(),
			price: z.number(),
			ar_title: z.string(),
			ar_description: z.string(),
		})
	),
});
export type OrderType = z.infer<typeof orderSchema>;
