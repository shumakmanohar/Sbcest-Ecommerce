"use client";

import { CMS_CONFIG } from "@/cms.config";
import { addToCart } from "@/state/cart/cartSlice";
import { RootState } from "@/state/store";
import { StoreProduct } from "@/util/Types";
import { useLocale } from "next-intl";

import toast, { ToastPosition } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({ product }: { product: StoreProduct }) => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const dispatch = useDispatch();
	const activeLocale = useLocale();
	const handleAddToCart = (product: StoreProduct, quantity: number) => {
		dispatch(addToCart({ product, quantity }));
		toast.custom(
			(t) => (
				<div
					className={`${
						t.visible ? "animate-enter" : "animate-leave"
					} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
				>
					<div className="flex-1 w-0 p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0 pt-0.5">
								<img
									className="h-10 w-10 rounded-full object-contain object-center"
									src={
										product?.previewImg
											? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
											: "/sblogo.png"
									}
									alt=""
								/>
							</div>
							<div className="ml-3 flex-1">
								<p className="text-sm font-medium text-gray-900  text-clip">
									{product?.title}
								</p>
								<p className="mt-1 text-sm text-gray-500">
									Product added to cart
								</p>
							</div>
						</div>
					</div>
					<div className="flex border-l border-gray-200">
						<a
							href="/cart"
							className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							View cart
						</a>
					</div>
				</div>
			),
			{ position: "bottom-right" }
		);
		// toast.success("Product Added To Cart", {
		// 	position: "bottom-right" as ToastPosition, // Set the position to bottom-right
		// });
	};
	return (
		<div>
			<button
				onClick={() => {
					handleAddToCart(product, 1);
				}}
				className="w-full my-10 py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95  hover:opacity-75"
			>
				{activeLocale === "en" ? "Add to Cart" : "أضف إلى السلة"}
			</button>
		</div>
	);
};

export default AddToCart;
