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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProductType, ServerGetProps, productSchema } from "@/util/Types";
import {
	AddProduct,
	DeleteProduct,
	UpdateProduct,
} from "@/server-actions/Product-Actions";
import { MouseEvent, useState } from "react";
import { ServerResponse } from "@/util/Enums";
import toast from "react-hot-toast";
import Loader from "./Loader";
import UploadedImage from "./UploadedImage";
import ImageUploader from "./ImageUploader";
import type { Categories, Product } from "@prisma/client";
import { useRouter } from "next/navigation";

// Refactor this
export default function ProductForm({
	categories,
	product,
}: {
	categories: Categories[];
	product?: Product | null;
}) {
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const router = useRouter();

	// 1. Define your form.
	const form = useForm<ProductType>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: product?.title || "",
			description: product?.description || "",
			ar_description: product?.ar_description || "",
			ar_title: product?.ar_title || "",
			isArchived: product?.isArchived || false,
			isOnOffer: product?.isOnOffer || false,
			offerPrice: product?.offerPrice || 0,
			price: product?.price || 0,
			images: product?.images || [],
			previewImg: product?.previewImg || "",
			category: product?.categoryId || undefined,
			isFeatured: product?.isFeatured || false,
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(product: ProductType) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setLoading(true);
		const response = await AddProduct(product);
		response.status == ServerResponse.Success
			? (toast.success("Product Added Successfully"), form.reset())
			: toast.error("Something Went Wrong. Check Console");
		console.log(response.message);
		setLoading(false);
	}

	const deleteProduct = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setDeleteLoading(true);
		// delete the Images related as Well
		const response = await DeleteProduct(product?.id!);
		response.status == ServerResponse.Success
			? (toast.success("Product Deleted  Successfully"),
			  router.push("/cms/products/"))
			: toast.error("Something Went Wrong. Check Console");
	};

	const updateProduct = async (e?: React.MouseEvent<HTMLElement>) => {
		e?.preventDefault();
		setLoading(true);
		const updatedProduct = form.getValues();
		// console.log("newProduct", zodResolver(updatedProduct));
		const response = await UpdateProduct(
			product?.id!,
			// zodResolver(updatedProduct)
		updatedProduct
		);
		response.status == ServerResponse.Success
			? toast.success("Product Updated Successfully")
			: (toast.error("Something Went Wrong. Check Console"),
			  console.log(response.message));

		setLoading(false);
	};

	return (
		<Form {...form}>
			{/* Watch if the images or not , if changed opt out the ImageUploader */}
			{form.watch("images").length === 0 && (
				<ImageUploader
					onChange={(images) => {
						form.setValue("images", images);
						form.setValue("previewImg", images[0] || "");
					}}
				/>
			)}
			{/* Display Uploaded Images */}
			<div className="grid md:grid-cols-3 lg:grid-cols-6 grid-cols-1 gap-4 mt-10 ">
				{/* Watch if the previewImages or not , if changed opt out the ImageUploader ,
				 form.watch("") is required because it is outside the form element */}
				{form.watch("previewImg") &&
					form.getValues("images").map((img, indx) => (
						<UploadedImage
							img={img}
							key={indx}
							images={form.getValues("images")}
							previewImg={form.getValues("previewImg")}
							onChangePreviewImg={(img) => {
								form.setValue("previewImg", img);
							}}
							onUploadedImageChange={(images) => {
								form.setValue("images", images);
								form.setValue("previewImg", images[0] || "");
								// Then Update the product
								if (product?.id) {
									// update only when product id is available
									// if no product id , then it means. Form is in the  Adding section
									updateProduct();
								}
							}}
						/>
					))}
			</div>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col w-full max-w-4xl gap-8 mt-8"
			>
				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Product Title"
									{...field}
									disabled={loading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Description</FormLabel>
							<FormControl>
								<Textarea
									disabled={loading}
									placeholder="Product Description"
									rows={15}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Arabic Title */}
				<FormField
					control={form.control}
					name="ar_title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ARABIC product Title</FormLabel>
							<FormControl>
								<Input
									placeholder="عنوان المنتج العربي"
									{...field}
									disabled={loading}
									style={{ textAlign: "right" }}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Arabic Description */}
				<FormField
					control={form.control}
					name="ar_description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ARABIC Product Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="وصف المنتج باللغة العربية"
									{...field}
									disabled={loading}
									rows={10}
									style={{ textAlign: "right" }}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Category Select */}
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Product Category</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Product Category | فئة المنتج " />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.map(({ name, id }) => (
										<SelectItem value={id} key={id}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Price */}
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Product Price</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Product Price"
									disabled={loading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* isArchived Toggle Btn */}
				<FormField
					control={form.control}
					name="isArchived"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Archive The Products</FormLabel>
								<FormDescription>
									Archived Products Won't be shown in the store
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									disabled={loading}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* isArchived Toggle Btn */}
				<FormField
					control={form.control}
					name="isFeatured"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Feature The Product</FormLabel>
								<FormDescription>List the product as Featured</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									disabled={loading}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* isOnOffer Toggle Btn */}
				<FormField
					control={form.control}
					name="isOnOffer"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Add Offer </FormLabel>
								<FormDescription>
									Mark this product as under Offer
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									disabled={loading}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{/* Offer Price */}
				{form.getValues("isOnOffer") && (
					<FormField
						control={form.control}
						name="offerPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Product Offer Price
									<span className="ml-4 p-2 border text-xs mb-1 border-green-500 text-green-500 rounded-md animate-pulse">
										Active
									</span>
								</FormLabel>
								<FormControl>
									<Input
										className="transition duration-200"
										type="number"
										min={1}
										disabled={loading}
										placeholder="Product Price"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{product?.id ? (
					<div className="flex gap-6 mb-8">
						<Button
							className="flex-1"
							aria-disabled={loading}
							onClick={updateProduct}
						>
							{loading ? <Loader /> : "Update  Product"}
						</Button>
						<Button
							className="flex-1"
							variant={"destructive"}
							aria-disabled={deleteLoading}
							onClick={deleteProduct}
						>
							{deleteLoading ? <Loader /> : "Delete  Product"}
						</Button>
					</div>
				) : (
					<Button type="submit" aria-disabled={loading}>
						{loading ? <Loader /> : "Add Product"}
					</Button>
				)}
			</form>
		</Form>
	);
}
