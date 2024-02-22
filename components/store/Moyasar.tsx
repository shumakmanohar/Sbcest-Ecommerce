"use client";
declare global {
	interface Window {
		Moyasar: any;
	}
}
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Moyasar = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		// Initialize Moyasar once the component is mounted
		if (typeof window !== "undefined" && window.Moyasar) {
			window.Moyasar.init({
				element: ".mysr-form",
				amount: 1000 * 100,
				currency: "SAR",
				language: "en",
				description: "#23874782389429838923402390", // Pass the cart description to Moyasar or OrderID
				metadata: {
					order_id: "#34788579498734",
				},
				publishable_api_key: "pk_test_CRDwq4EokXry8u3DBENb6pRaLtgoZB9fbr7SKqQv",
				callback_url:
					"https://media.makeameme.org/created/payment-successful-aaaand.jpg",
				methods: ["creditcard", "stcpay", "applepay"],
				apple_pay: {
					country: "SA",
					label: "Awesome Cookie Store",
					validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
				},
				on_completed: function (payment: any) {
					return new Promise(function (resolve, reject) {
						const requestOptions = {
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ payment }),
						};
						// savePayment is just an example, your usage may vary.
						fetch("/api/payment/moyasar", requestOptions)
							.then((response) => {
								console.log("Response form SErver");
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
	}, []);

	return (
		<div>
			Moyasar
			<div className="mysr-form"></div>
		</div>
	);
};

export default Moyasar;
