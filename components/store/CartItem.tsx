"use client";
import { removeFromCart, updateQuantity } from "@/state/cart/cartSlice";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const CartItem = ({ product, quantity }) => {
	const dispatch = useDispatch();
	const handleRemoveFromCart = (productId: string) => {
		dispatch(removeFromCart(productId));
	};
	const handleUpdateQuantity = (productId: string, newQuantity: number) => {
		dispatch(updateQuantity({ productId, quantity: newQuantity }));
	};
	return (
		<div className="flex py-5 gap-3 md:gap-5 border-b">
			{/* IMAGE START */}
			<div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
				<Image src={"/test2.webp"} alt={""} width={120} height={120} />
			</div>
			{/* IMAGE END */}

			<div className="w-full flex flex-col">
				<div className="flex flex-col md:flex-row justify-between">
					{/* PRODUCT TITLE */}
					<div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
						{product.title}
					</div>

					{/* PRODUCT SUBTITLE */}
					<div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
						{product.category}
					</div>

					{/* PRODUCT PRICE */}
					<div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
						{product.isOnOffer ? product.offerPrice : product.price}
					</div>
				</div>

				{/* PRODUCT SUBTITLE */}
				<div className="text-md font-medium text-black/[0.5] hidden md:block">
					Not Required
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
						<div className="flex items-center gap-1">
							<div className="font-semibold">Quantity:</div>
							<select
								className="hover:text-black"
								onChange={(e) => {
									handleUpdateQuantity(product.id, Number(e.target.value));
									console.log(e.target.value);
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
							handleRemoveFromCart(product.id);
						}}
						className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
