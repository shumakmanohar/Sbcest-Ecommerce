"use client";
declare global {
	interface Window {
		Moyasar: any;
	}
}
import { CheckoutType } from "@/util/Types";
import { Order, OrderedProducts } from "@prisma/client";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Moyasar = ({
	order,
}: {
	order: {
		userID: string;
		orderAmount: number;
		shippingInformation: CheckoutType;
		orderedProducts: OrderedProducts[];
	};
}) => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		// Initialize Moyasar once the component is mounted
		if (typeof window !== "undefined" && window.Moyasar) {
			window.Moyasar.init({
				element: ".mysr-form",
				amount: order.orderAmount * 100,
				currency: "SAR",
				language: "en",
				description: "Text", // Pass the order ID to Moyasar or OrderID
				publishable_api_key: "pk_test_GNLZsbL9QPjzk37YQYeKwSrSTUAhoah1KVxC3vWp",
				callback_url: `http://localhost:3000/en/order-complete`,
				methods: ["creditcard", "stcpay", "applepay"],
				apple_pay: {
					country: "SA",
					label: "Sbcest Store",
					validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
				},
				on_completed: function (payment: any) {
					return new Promise(function (resolve, reject) {
						const requestOptions = {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								payment,
								metadata: {
									orderedProducts: order.orderedProducts,
									shippingInformation: order.shippingInformation,
								},
							}),
						};
						// savePayment is just an example, your usage may vary.
						fetch("/api/payment/moyasar", requestOptions)
							.then((response) => {
								if (response.ok) {
									resolve({});
									//reject();
								} else {
									throw Error("Payment ID not saved");
								}
							})
							.catch(() => {
								reject();
							});
					});
				},
			});
		}
	}, [order]);

	return (
		<div className="">
			<div className="mysr-form"></div>
		</div>
	);
};

export default Moyasar;
