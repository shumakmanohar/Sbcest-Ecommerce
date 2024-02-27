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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import { useState } from "react";
import { UpdateOrder } from "@/server-actions/Order-Actions";
import { ServerResponse } from "@/util/Enums";
import toast from "react-hot-toast";
import Loader from "./Loader";

const orderSchema = z.object({
	deliveryStatus: z.string({
		required_error: "Please select an delivery status to display.",
	}),
});
const OrderForm = ({ orderID }: { orderID: string | undefined }) => {
	const [loading, setLoading] = useState(false);
	const deliveryStatusOptions = [
		DeliveryStatus.TRANSIT,
		DeliveryStatus.DELIVERED,
		DeliveryStatus.CANCELLED,
	];
	const form = useForm<z.infer<typeof orderSchema>>({
		resolver: zodResolver(orderSchema),
	});
	async function updateDeliveryStatus(data: z.infer<typeof orderSchema>) {
		setLoading(true);
		const response = await UpdateOrder(
			orderID!,
			data.deliveryStatus as DeliveryStatus
		);

		response.status == ServerResponse.Success
			? toast.success("Product Updated Successfully")
			: (toast.error("Something Went Wrong. Check Console"),
			  console.log(response.message));

		setLoading(false);
	}
	return (
		<div>
			<div className="my-10">
				<h3 className="text-xl font-semibold mb-4 underline">
					Update Delivery Status{" "}
				</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(updateDeliveryStatus)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={form.control}
							name="deliveryStatus"
							disabled={loading}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Delivery Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a delivery to display" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{deliveryStatusOptions.map((opt, _indx) => (
												<SelectItem value={opt} key={_indx}>
													{opt}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										You can manage delivery status of the order
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" aria-disabled={loading} className="min-w-28">
							{loading ? <Loader /> : "Update Delivery Status"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default OrderForm;
