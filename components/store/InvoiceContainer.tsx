"use client";
import React from "react";
import Invoice from "./Invoice";
import CheckoutForm from "./CheckoutForm";
import { useUser } from "@clerk/nextjs";

const InvoiceContainer = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	console.log(` full name ${user?.firstName} ${user?.lastName}`);
	return (
		<>
			<div className="w-full max-w-lg">
				<Invoice />
			</div>
			<div className="mt-10 md:mt-0 max-w-xl bg-white p-5 shadow-md">
				<p className="text-lg mb-4">Shipping Information</p>
				<CheckoutForm
					email={user?.emailAddresses[0]?.emailAddress || ""}
					fullname={user?.firstName ? `${user.firstName} ${user.lastName}` : ""}
					phone={user?.phoneNumbers[0]?.phoneNumber || ""}
				/>
			</div>
			;
		</>
	);
};

export default InvoiceContainer;
