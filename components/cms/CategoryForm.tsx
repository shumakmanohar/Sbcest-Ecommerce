"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CategoryType, categorySchema } from "@/util/Types";
import {
	AddCategory,
	DeleteCategory,
	UpdateCategory,
} from "@/server-actions/Category-Action";
import { ServerResponse } from "@/util/Enums";
import toast from "react-hot-toast";
import { Categories } from "@prisma/client";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const CategoryForm = ({ categories }: { categories: Categories | null }) => {
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const router = useRouter();

	const form = useForm<CategoryType>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: categories?.name || "",
			ar_name: categories?.ar_name || "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(category: CategoryType) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setLoading(true);
		const response = await AddCategory(category.name, category.ar_name);
		response.status == ServerResponse.Success
			? (toast.success("Category Added Successfully"), form.reset())
			: toast.error("Something Went Wrong. Check Console");
		console.log(response.message);
		setLoading(false);
	}

	const updateCategry = async () => {
		setLoading(true);
		const { ar_name, name } = form.getValues();
		const response = await UpdateCategory(name, ar_name, categories?.id!);
		response.status == ServerResponse.Success
			? toast.success("Category Updated  Successfully")
			: toast.error("Something Went Wrong. Check Console");
		console.log(response.message);
		setLoading(false);
	};
	const deleteCategry = async () => {
		setDeleteLoading(true);

		const response = await DeleteCategory(categories?.id!);

		response.status == ServerResponse.Success
			? (toast.success("Category Deleted Successfully"),
			  router.push("/cms/categories/"))
			: toast.error("Something Went Wrong. Check Console");
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full max-w-4xl gap-8 mt-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Input placeholder="Category" disabled={loading} {...field} />
								</FormControl>

								<FormDescription>
									Only Unique Categories will be accepted
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Arabic Category */}
					<FormField
						control={form.control}
						name="ar_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel style={{ textAlign: "right" }} className="text-2xl">
									فئة
								</FormLabel>
								<FormControl>
									<Input
										placeholder="فئة"
										disabled={loading}
										{...field}
										className="text-xl"
										style={{ textAlign: "right" }}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					{!categories?.id && (
						<Button type="submit" aria-disabled={loading}>
							{loading ? (
								<div>
									<svg
										className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</div>
							) : (
								"Add Category"
							)}
						</Button>
					)}
				</form>
			</Form>
			{categories?.id && (
				<div className="flex max-w-4xl mt-8 gap-4">
					<Button
						aria-disabled={loading}
						className="flex-1"
						variant={"secondary"}
						onClick={updateCategry}
					>
						{loading ? <Loader /> : "Update Category"}
					</Button>
					<Button
						aria-disabled={deleteLoading}
						onClick={deleteCategry}
						variant={"destructive"}
						className="flex-1"
					>
						{deleteLoading ? <Loader /> : "Delete Category"}
					</Button>
				</div>
			)}
		</>
	);
};

export default CategoryForm;
