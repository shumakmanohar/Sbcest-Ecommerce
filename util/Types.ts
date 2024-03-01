import * as z from "zod";
import { EnumPriceFilter, ServerResponse } from "./Enums";
import {
	DeliveryStatus,
	type Categories,
	type Product,
	PaymentStatus,
	OrderedProducts,
	Address,
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
	name: z.string().max(15, { message: "Invalid " }),
	addl1: z.string().max(20),
	addl2: z.string().max(20),
	city: z.string().max(10),
	state: z.string(),
	postalCode: z
		.string()
		.min(6, { message: "Invalid Postal Code" })
		.max(10, { message: "Invalid Postal Code" }),
	phone: z
		.string()
		.min(10, { message: "Invalid Phone" })
		.max(11, { message: "Invalid Phone" }),
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

export interface MoyasarWebHook {
	id: string;
	type: string;
	created_at: string;
	secret_token: string;
	account_name: any;
	live: boolean;
	data: MoyasarData;
}
export interface MoyasarData {
	id: string;
	status: string;
	amount: number;
	fee: number;
	currency: string;
	refunded: number;
	refunded_at: any;
	captured: number;
	captured_at: any;
	voided_at: any;
	description: string;
	amount_format: string;
	fee_format: string;
	refunded_format: string;
	captured_format: string;
	invoice_id: any;
	ip: string;
	callback_url: string;
	created_at: string;
	updated_at: string;
	metadata: MoyasarMetadata;
	source: MoyasarSource;
}

export interface MoyasarMetadata {
	userID: string;
	orderedProducts: OrderedProducts;
	shippingInformation: Address;
}
export interface MoyasarSource {
	type: string;
	company: string;
	name: string;
	number: string;
	gateway_id: string;
	reference_number: any;
	token: any;
	message: string;
	transaction_url: string;
	response_code: any;
	authorization_code: any;
	issuer_name: string;
	issuer_country: string;
	issuer_card_type: string;
	issuer_card_category: string;
}
