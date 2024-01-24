"use client";

import { addToCart } from "@/state/cart/cartSlice";
import { RootState } from "@/state/store";
import { StoreProduct } from "@/util/Types";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({ product }: { product: StoreProduct }) => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch();

	const handleAddToCart = (product: StoreProduct, quantity: number) => {
		dispatch(addToCart({ product, quantity }));
		toast.success("Product Added To Cart");
	};
	return (
		<div>
			<button
				onClick={() => {
					handleAddToCart(product, 1);
				}}
				className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
			>
				Add to Cart
			</button>
		</div>
	);
};

export default AddToCart;
