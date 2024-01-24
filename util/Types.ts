import * as z from "zod";
import { ServerResponse } from "./Enums";
import type { Categories, Product } from "@prisma/client";

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
	offerPrice: z.coerce.number().optional(),
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

export type CategoryType = z.infer<typeof categorySchema>;

export type ServerGetProps = {
	status: ServerResponse;
	message: string;
	data?: Object[] | Categories[] | undefined;
};
