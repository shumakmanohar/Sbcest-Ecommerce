"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { OrderedProducts, Product } from "@prisma/client";
import { CheckoutSchema, CheckoutType } from "@/util/Types";
import Loader from "../cms/Loader";

import { ServerResponse } from "@/util/Enums";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Moyasar from "./Moyasar";

const CheckoutForm = ({
	email,
	fullname,
	phone,
	orderAmount,
	orderedProducts,
}: {
	email: string;
	fullname: string;
	phone: string;
	orderAmount: number;
	orderedProducts: OrderedProducts[];
}) => {
	const [loading, setLoading] = useState(false);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const [tempOrder, setTempOrder] = useState<{
		userID: string;
		orderAmount: number;
		shippingInformation: CheckoutType;
		orderedProducts: OrderedProducts[];
	} | null>(null);
	const router = useRouter();
	const form = useForm<CheckoutType>({
		resolver: zodResolver(CheckoutSchema),
		defaultValues: {},
	});
	const validate = (value: string) => {
		const matches = value.match(
			/^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
		);
		return matches ? matches?.length > 0 || "Not a Number" : "Not a Number";
	};
	async function onSubmit(data: CheckoutType) {
		setLoading(true);
		setPaymentLoading(true);
		//  Create a Order

		setTempOrder({
			userID: "user_2bE8PaDOnG8hWh9ah9v32ciFJuK",
			orderAmount,
			orderedProducts,
			shippingInformation: data,
		});
		console.log("Waiting For Payment");
	}

	useEffect(() => {
		let defaults = {
			name: fullname,
			email,
			phone,
		};
		form.reset(defaults);
	}, [form.reset, fullname, email, phone, form]);
	return (
		<div>
			{paymentLoading && tempOrder ? (
				<Moyasar order={tempOrder} />
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6 mb-5"
					>
						{/* Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="email"
											{...field}
											defaultValue={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Name"
											{...field}
											defaultValue={field.value}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Phone */}
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input
											placeholder="Phone"
											{...field}
											defaultValue={field.value}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Shipping Information */}
						<p className="text-md font-semibold">Shipping Address</p>
						<div className="flex flex-col gap-2">
							{/* Disable Field */}
							<Input value={"Saudi Arabia 🇸🇦"} disabled className="mb-4" />
							{/* Add line 1 */}
							<FormField
								control={form.control}
								name="addl1"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Address line 1"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Add line 1 */}
							<FormField
								control={form.control}
								name="addl2"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Address line 2"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* City */}
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="City" {...field} disabled={loading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* State */}
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="State"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Postal */}
							<FormField
								control={form.control}
								name="postalCode"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Pin Code"
												{...field}
												type="tel"
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type="submit"
							className="w-full text-lg"
							aria-disabled={loading}
						>
							{loading ? <Loader /> : `Pay ${orderAmount}`}
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
};

export default CheckoutForm;
