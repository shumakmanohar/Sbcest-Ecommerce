"use client";

import { initializeCartFromLocalStorage } from "@/state/cart/cartSlice";
import { RootState, store } from "@/state/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartIcon = () => {
	let cartItems = useSelector((state: RootState) => state.cart.items);
	//https://stackoverflow.com/questions/55622768/uncaught-invariant-violation-rendered-more-hooks-than-during-the-previous-rende

	useEffect(() => {
		store.dispatch(initializeCartFromLocalStorage());
	}, []);
	return (
		<Link href="/cart">
			<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
				<BsCart className="text-[18px] md:text-[20px]" />

				<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
					{cartItems.length}
				</div>
			</div>
		</Link>
	);
};

export default CartIcon;
