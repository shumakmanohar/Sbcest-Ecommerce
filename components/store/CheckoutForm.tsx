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
import { useEffect } from "react";
const CheckoutSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	addl1: z.string().min(2, {
		message: "Address must be at least 2 characters.",
	}),
	addl2: z.string().min(2, {
		message: "Address must be at least 2 characters.",
	}),
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	state: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	postalCode: z.coerce
		.number()
		.min(4, {
			message: "Invalid",
		})
		.max(6, { message: "Invalid Post Code" }),
	phone: z
		.string()
		.min(10, {
			message: "Invalid phone",
		})
		.max(10, { message: "Invalid phone" }),
});
const CheckoutForm = ({
	email,
	fullname,
	phone,
}: {
	email: string;
	fullname: string;
	phone: string;
}) => {
	const form = useForm<z.infer<typeof CheckoutSchema>>({
		resolver: zodResolver(CheckoutSchema),
		defaultValues: {},
	});
	function onSubmit(data: z.infer<typeof CheckoutSchema>) {}
	const validate = (value: string) => {
		const matches = value.match(
			/^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
		);
		return matches ? matches?.length > 0 || "Not a Number" : "Not a Number";
	};
	useEffect(() => {
		let defaults = {
			name: fullname,
			email,
			phone,
		};
		form.reset(defaults);
	}, [form.reset, fullname, email, phone]);
	return (
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
									readOnly
									disabled
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
									<Input placeholder="Address line 1" {...field} />
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
									<Input placeholder="Address line 2" {...field} />
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
									<Input placeholder="City" {...field} />
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
									<Input placeholder="State" {...field} />
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
									<Input placeholder="Pin Code" {...field} type="tel" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full text-lg">
					Pay
				</Button>
			</form>
		</Form>
	);
};

export default CheckoutForm;
