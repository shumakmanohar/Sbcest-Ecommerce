"use client";
import { CMS_CONFIG } from "@/cms.config";
import { removeFromCart, updateQuantity } from "@/state/cart/cartSlice";
import { StoreProduct } from "@/util/Types";
import { useLocale } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({
	product,
	quantity,
}: {
	product: StoreProduct;
	quantity: number;
}) => {
	const dispatch = useDispatch();
	const localeActive = useLocale();
	const handleRemoveFromCart = (productId: string) => {
		dispatch(removeFromCart(productId));
	};
	const handleUpdateQuantity = (productId: string, newQuantity: number) => {
		dispatch(updateQuantity({ productId, quantity: newQuantity }));
	};
	return (
		<div className="flex py-5 gap-3 md:gap-5 border-b">
			{/* IMAGE START */}
			<div className="">
				<Image
					src={
						product?.previewImg
							? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
							: "/sblogo.png"
					}
					alt={""}
					width={120}
					height={120}
					style={{
						objectFit: "contain",
					}}
					priority
				/>
			</div>
			{/* IMAGE END */}

			<div className="w-full flex flex-col">
				<div className="flex flex-col md:flex-row justify-between">
					{/* PRODUCT TITLE */}
					<Link href={`/products/${product?.id}`}>
						<div className="text-lg md:text-2xl font-semibold text-black/[0.8] hover:underline cursor-pointer transition-all duration-200">
							{localeActive === "en" ? product?.title : product?.ar_title}
						</div>
					</Link>
					{/* PRODUCT PRICE */}
					<div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
						{product?.isOnOffer ? product?.offerPrice : product?.price}
					</div>
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
						<div className="flex items-center gap-1">
							<div className="font-semibold">
								{localeActive === "en" ? "Quantity:" : "كمية"}
							</div>
							<select
								className="hover:text-black"
								onChange={(e: any) => {
									handleUpdateQuantity(product?.id!, Number(e.target.value));
								}}
							>
								{Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => (
									<option key={i} value={q} selected={quantity === q}>
										{q}
									</option>
								))}
							</select>
						</div>
					</div>
					<RiDeleteBin6Line
						onClick={() => {
							handleRemoveFromCart(product?.id!);
						}}
						className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
