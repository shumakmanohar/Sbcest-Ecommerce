"use server";

import { ServerResponse } from "@/util/Enums";
import { ProductType, productSchema } from "@/util/Types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/isAdmin";

export const FetchStoreProducts = async (page = 1) => {
	// For Store Only
	// LIMIT STORE SINGLE FETCH LIMIT IS 20 Products
	const SINGLE_FETCH_LIMIT = 5;
	try {
		const skip = (page - 1) * SINGLE_FETCH_LIMIT;
		const products = await prisma.product.findMany({
			take: SINGLE_FETCH_LIMIT,
			skip: skip,
			orderBy: {
				createdAt: "desc",
			},
			where: {
				isArchived: false,
			},
			include: {
				category: true,
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Store Products Fetched From DB",
			products,
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};
export const FetchFeaturedProducts = async () => {
	// For Store Only
	// LIMIT STORE SINGLE FETCH LIMIT IS 20 Products
	const SINGLE_FETCH_LIMIT = 6;
	try {
		const products = await prisma.product.findMany({
			take: SINGLE_FETCH_LIMIT,
			orderBy: {
				createdAt: "desc",
			},
			where: {
				isArchived: false,
				isFeatured: true,
			},
			include: {
				category: true,
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Store Products Fetched From DB",
			products,
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const AddProduct = async (product: ProductType) => {
	//Todo : Check if loggedIn
	if (!(await isAdmin())) {
		return {
			status: ServerResponse.Failure,
			message: `Not Authenticated `,
		};
	}

	const parseResult = productSchema.safeParse(product);
	try {
		if (!parseResult.success) throw Error("Data Parse Failed");
		await prisma.product.create({
			data: {
				title: product.title,
				description: product.description,
				ar_title: product.ar_title,
				ar_description: product.ar_description,
				price: product.price,
				isOnOffer: product.isOnOffer,
				offerPrice: product.offerPrice || 0,
				isArchived: product.isArchived,
				isFeatured: product.isFeatured,
				images: product.images,
				previewImg: product.previewImg,
				categoryId: product.category,
			},
		});
		revalidatePath("/cms/products");
		return {
			status: ServerResponse.Success,
			message: "Products Added To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const DeleteProduct = async (id: string) => {
	//Todo : Check if loggedIn
	if (!(await isAdmin())) {
		return {
			status: ServerResponse.Failure,
			message: `Not Authenticated `,
		};
	}
	try {
		await prisma.product.delete({ where: { id } });
		revalidatePath("/cms/products");
		return {
			status: ServerResponse.Success,
			message: "Product Deleted  From DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const GetAllProduct = async () => {
	try {
		const data = await prisma.product.findMany({
			include: {
				category: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return {
			status: ServerResponse.Success,
			message: "Products Added To DB",
			data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const UpdateProduct = async (id: string, product: ProductType) => {
	//Todo : Check if loggedIn
	if (!(await isAdmin())) {
		return {
			status: ServerResponse.Failure,
			message: `Not Authenticated `,
		};
	}
	const parseResult = productSchema.safeParse(product);
	try {
		if (!parseResult.success) {
			let errorMsg = "";
			parseResult.error.issues.forEach((issue) => {
				errorMsg = errorMsg + issue.path[0] + ": " + issue.message + ". ";
			});
			throw Error(errorMsg);
		}
		const data = await prisma.product.update({
			where: {
				id,
			},
			data: {
				title: product.title,
				description: product.description,
				ar_title: product.ar_title,
				ar_description: product.ar_description,
				price: product.price,
				isOnOffer: product.isOnOffer,
				offerPrice: product.offerPrice || 0,
				isArchived: product.isArchived,
				isFeatured: product.isFeatured,
				images: product.images,
				previewImg: product.previewImg,
				categoryId: product.category,
			},
		});
		revalidatePath("/cms/products");
		return {
			status: ServerResponse.Success,
			message: "Products Updated To DB",
			data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};
