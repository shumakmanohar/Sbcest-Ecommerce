"use client";
import React, { useState } from "react";
import Invoice from "./Invoice";
import CheckoutForm from "./CheckoutForm";
import { useUser } from "@clerk/nextjs";
import { OrderedProducts, Product } from "@prisma/client";

const InvoiceContainer = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	const [orderAmount, setOrderAmount] = useState(0);
	const [orderedProducts, setOrderedProducts] = useState<OrderedProducts[]>([]);
	return (
		<>
			<div className="w-full max-w-lg">
				<Invoice
					setOrderAmount={setOrderAmount}
					setOrderedProducts={setOrderedProducts}
				/>
			</div>
			<div className="mt-10 md:mt-0 max-w-xl bg-white p-5 shadow-md">
				<p className="text-lg mb-4">Shipping Information</p>
				<CheckoutForm
					email={user?.emailAddresses[0]?.emailAddress || ""}
					fullname={user?.firstName ? `${user.firstName} ${user.lastName}` : ""}
					phone={user?.phoneNumbers[0]?.phoneNumber || ""}
					orderAmount={orderAmount}
					orderedProducts={orderedProducts}
				/>
			</div>
			;
		</>
	);
};

export default InvoiceContainer;
