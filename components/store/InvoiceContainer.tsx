"use client";
import React, { useState } from "react";
import Invoice from "./Invoice";
import CheckoutForm from "./CheckoutForm";
import { useUser } from "@clerk/nextjs";
import { OrderedProducts, Product } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import InvoiceSkeleton from "./InvoiceSkeleton";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";

const InvoiceContainer = ({
	translations,
}: {
	translations: {
		email: string;
		name: string;
		phone: string;
		shippingAddress: string;
		shippingCost: string;
		addl1: string;
		addl2: string;
		city: string;
		pincode: string;
		district: string;
		pay: string;
		currency: string;
		total: string;
		vat: string;
		subTotal: string;
		checkout: string;
		vatSummary: string;
		bt: string;
		at: string;
		region: string;
	};
}) => {
	const [orderAmount, setOrderAmount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [orderedProducts, setOrderedProducts] = useState<OrderedProducts[]>([]);
	const [applicableVat, setApplicableVat] = useState(0);
	const [beforeTaxPrice, setBeforeTaxPrice] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);
	return (
		<>
			<div className="w-full max-w-lg">
				<Invoice
					setOrderAmount={setOrderAmount}
					setOrderedProducts={setOrderedProducts}
					setLoading={setLoading}
					setShippingCost={setShippingCost}
					setApplicableVat={setApplicableVat}
					setBeforeTaxPrice={setBeforeTaxPrice}
					translations={{
						total: translations.total,
						pay: translations.pay,
						currency: translations.currency,
						shippingCost: translations.shippingCost,
						vat: translations.vat,
						subTotal: translations.subTotal,
						bt: translations.bt,
						at: translations.at,
						vatSummary: translations.vatSummary,
					}}
				/>
			</div>
			{loading ? (
				<InvoiceFormSkeleton />
			) : (
				<div className="my-10 md:mt-0 max-w-xl bg-white p-5 shadow-md">
					<p className="text-lg mb-4">{translations.checkout}</p>
					<CheckoutForm
						orderAmount={orderAmount}
						orderedProducts={orderedProducts}
						applicableVat={applicableVat}
						shippingCost={shippingCost}
						beforeTaxPrice={beforeTaxPrice}
						translations={translations}
					/>
				</div>
			)}
		</>
	);
};

export default InvoiceContainer;
