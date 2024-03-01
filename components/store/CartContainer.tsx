"use client";
import { CMS_CONFIG } from "@/cms.config";
import CartItem from "@/components/store/CartItem";
import Wrapper from "@/components/store/Wrapper";
import { RootState } from "@/state/store";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CartContainer = ({
	titleText,
	cartItemsText,
	subHeadingText,
	subtotalText,
	descriptionText,
	checkoutBtnText,
	currencyText,
	quantityText,
}: {
	titleText: string;
	cartItemsText: string;
	subHeadingText: string;
	subtotalText: string;
	descriptionText: string;
	checkoutBtnText: string;
	currencyText: string;
	quantityText: string;
}) => {
	const router = useRouter();
	// console.log(router.locale)
	const cartItems = useSelector((state: RootState) => state.cart.items);

	const totalPrice = useMemo(() => {
		let calculatedTotalPrice = 0;

		cartItems.forEach((item) => {
			const price = item.product?.isOnOffer
				? item.product.offerPrice
				: item.product?.price;
			calculatedTotalPrice += price! * item.quantity;
		});

		return calculatedTotalPrice;
	}, [cartItems]);
	return (
		<div className="w-full md:py-20">
			<Wrapper>
				{cartItems.length > 0 && (
					<>
						{/* HEADING AND PARAGRAPH START */}
						<div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
							<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
								{titleText}
							</div>
						</div>
						{/* HEADING AND PARAGRAPH END */}

						{/* CART CONTENT START */}
						<div className="flex flex-col lg:flex-row gap-12 py-10">
							{/* CART ITEMS START */}
							<div className="flex-[2]">
								<div className="text-lg font-bold"> {cartItemsText}</div>
								{cartItems.map(({ product, quantity }) => (
									<CartItem
										product={product}
										quantity={quantity}
										key={product?.id}
									/>
								))}
							</div>
							{/* CART ITEMS END */}

							{/* SUMMARY START */}
							<div className="flex-[1]">
								<div className="text-lg font-bold"> {subHeadingText}</div>

								<div className="p-5 my-5 bg-black/[0.05] rounded-xl">
									<div className="flex justify-between">
										<div className="uppercase text-md md:text-lg font-medium text-black">
											{subtotalText}
										</div>
										<div className="text-md md:text-lg font-medium text-black">
											{currencyText} {totalPrice}
										</div>
									</div>
									<div className="text-sm md:text-md py-5 border-t mt-5">
										{descriptionText}
									</div>
								</div>

								{/* BUTTON START */}
								<Link
									href={"/checkout"}
									className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
								>
									{checkoutBtnText}
								</Link>
								{/* BUTTON END */}
							</div>
							{/* SUMMARY END */}
						</div>
						{/* CART CONTENT END */}
					</>
				)}

				{/* This is empty screen */}
				{cartItems?.length < 1 && (
					<div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
						<Image
							src={`${CMS_CONFIG.cdn.location}/static/empty-cart.png`}
							alt="Empty Cart"
							width={300}
							height={300}
							className="w-[300px] md:w-[400px]"
						/>
						<span className="text-xl font-bold">Your cart is empty</span>
						<span className="text-center mt-4">
							Looks like you have not added anything in your cart.
							<br />
							Go ahead and explore top categories.
						</span>
						<Link
							href="/"
							className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
						>
							Continue Shopping
						</Link>
					</div>
				)}
			</Wrapper>
		</div>
	);
};

export default CartContainer;
