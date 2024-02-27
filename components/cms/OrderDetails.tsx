"use client";

import { Address, DeliveryStatus, Order, PaymentStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ServerResponse } from "@/util/Enums";
import { DeleteOrder } from "@/server-actions/Order-Actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const OrderDetails = ({ order }: { order: Order | null }) => {
	const [mounted, setMounted] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setMounted(true);
	}, []);

	const deleteOrder = async () => {
		setDeleteLoading(true);
		// delete the Images related as Well
		const response = await DeleteOrder(order?.id);
		response.status == ServerResponse.Success
			? (toast.success("Product Deleted  Successfully"),
			  router.push("/cms/orders/"))
			: toast.error("Something Went Wrong. Check Console");
	};

	const renderKeyValuePairs = (obj: Address) => {
		return Object.entries(obj).map(([key, value]) => {
			if (typeof value === "object") {
				return (
					<React.Fragment key={key}>
						<p>{key}</p>
						{renderKeyValuePairs(value)}
					</React.Fragment>
				);
			} else {
				return (
					<div className="flex gap-4 text-lg" key={key}>
						<p className="font-semibold">{key} :</p>
						<p className="">{value}</p>
					</div>
				);
			}
		});
	};
	return (
		<div>
			<div className="mt-10 flex flex-col gap-3">
				<div className="order-label">
					<p className="order-value">ORDER Date :</p>
					<p>
						{order && new Date(order.createdAt).toLocaleDateString("en-GB")}
					</p>
				</div>
				<div className="order-label">
					<p className="order-value">Order ID :</p>
					<p>{order?.id}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Moyasar ID :</p>
					<p>{order?.moyasarID}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Payment Status :</p>
					<p
						className={`${
							order?.paymentStatus === PaymentStatus.SUCCESS
								? "border-green-500 text-green-500"
								: "border-red-500 text-red-500"
						} border-2 font-semibold p-2 rounded-full text-sm`}
					>
						{order?.paymentStatus}
					</p>
				</div>
				<div className="order-label">
					<p className="order-value">Delivery Status :</p>
					<p
						className={`border-2 font-semibold p-2 rounded-full text-sm ${
							order?.deliveryStatus === DeliveryStatus.DELIVERED
								? "border-green-500 text-green-500"
								: order?.deliveryStatus === DeliveryStatus.TRANSIT
								? "border-blue-500 text-blue-500"
								: "border-red-500 text-red-500"
						}`}
					>
						{order?.deliveryStatus}
					</p>
				</div>
				<div className="order-label">
					<p className="order-value">Name :</p>
					<p>{order?.name}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Email :</p>
					<p>{order?.email}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Currency :</p>
					<p>{order?.currency}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Amount :</p>
					<p>{order?.amount}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Moyasar Fee :</p>
					<p>{order?.moyasarFee}</p>
				</div>
				<div className="order-label">
					<p className="order-value">Shipping Address :</p>

					<p>
						{order?.shippingInformation &&
							mounted &&
							renderKeyValuePairs(order?.shippingInformation)}
					</p>
				</div>
			</div>
			<Button variant="destructive" className="mt" onClick={deleteOrder}>
				{deleteLoading ? <Loader /> : "Delete order"}
			</Button>
		</div>
	);
};

export default OrderDetails;
