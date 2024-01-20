"use server";

import { ServerResponse } from "@/util/Enums";
import { ProductType, productSchema } from "@/util/Types";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const AddProduct = async (product: ProductType) => {
	//Todo : Check if loggedIn
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
	const parseResult = productSchema.safeParse(product);
	try {
		if (!parseResult.success) throw Error("Data Parse Failed");
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
