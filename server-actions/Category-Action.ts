"use server";

import { ServerResponse } from "@/util/Enums";
import { categorySchema } from "@/util/Types";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const DeleteCategory = async (id: string) => {
	//Todo : Check if loggedIn
	try {
		await prisma.categories.delete({
			where: {
				id: id,
			},
		});
		revalidatePath("/cms/category");
		return {
			status: ServerResponse.Success,
			message: "Category Added To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const GetCategories = async () => {
	try {
		const data = await prisma.categories.findMany();
		return {
			status: ServerResponse.Success,
			message: "Category Added To DB",
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

export const AddCategory = async (name: string, ar_name: string) => {
	//Todo : Check if loggedIn
	const parseResult = categorySchema.safeParse({ name, ar_name });
	try {
		if (!parseResult.success) throw Error("Data Parse Failed");
		await prisma.categories.create({
			data: { name: name, ar_name },
		});
		revalidatePath("/cms/category");
		return {
			status: ServerResponse.Success,
			message: "Category Added To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};

export const UpdateCategory = async (
	name: string,
	ar_name: string,
	id: string
) => {
	//Todo : Check if loggedIn
	const parseResult = categorySchema.safeParse({ name, ar_name });
	try {
		if (!parseResult.success) throw Error("Data Parse Failed");
		await prisma.categories.update({ where: { id }, data: { name, ar_name } });
		revalidatePath("/cms/category");
		return {
			status: ServerResponse.Success,
			message: "Category Updated To DB",
		};
	} catch (error) {
		console.log(error);
		return {
			status: ServerResponse.Failure,
			message: `Something went wrong in the server ${error}`,
		};
	}
};
