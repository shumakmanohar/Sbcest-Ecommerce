"use client";
import HeroBanner from "@/components/store/HeroBanner";
import NavBar from "@/components/store/NavBar";
import { addToCart } from "@/state/cart/cartSlice";
import { RootState } from "@/state/store";
import { StoreProduct } from "@/util/Types";

import { UserButton } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
	const tempItem = {
		id: "65abf3fd3214982434e1221b8a",
		title:
			"LENOVO 16 inch ThinkPad E16 Gen 1 i5 1335U RAM 8GB 512GB M.2 - BLACK",
		description: "",
		ar_title: "dasdasdas",
		ar_description: "asdasdasasd",
		price: 400,
		isOnOffer: false,
		offerPrice: 0,
		isArchived: false,
		isFeatured: false,
		images: [],
		previewImg: "",
		categoryId: "65abf3b43214982434e13b88",
		createdAt: "2024-01-20T16:25:33.051Z",
		updatedAt: "2024-01-20T16:25:33.051Z",
		category: {
			id: "65abf3b43214982434e13b88",
			name: "Display",
			ar_name: "Display",
			createdAt: "2024-01-20T16:24:20.098Z",
			updatedAt: "2024-01-20T16:24:20.098Z",
		},
	};
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch();

	const handleAddToCart = (product: StoreProduct, quantity: number) => {
		dispatch(addToCart({ product, quantity }));
	};
	return (
		<main>
			<HeroBanner />
			<UserButton afterSignOutUrl="/" />
			<p className="text-4xl">{JSON.stringify(cartItems)}</p>

			<button
				onClick={() => {
					console.log("use clicked");
					handleAddToCart(tempItem, 1);
				}}
				className="bg-red-600"
			>
				Add
			</button>
			<button
				onClick={() => {
					console.log("use clicked");
					dispatch(addToCart(tempItem));
				}}
				className="bg-red-600"
			>
				Remove
			</button>
		</main>
	);
}
