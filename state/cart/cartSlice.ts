import { StoreProduct } from "@/util/Types";
import type { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartItem {
	product: StoreProduct;
	quantity: number;
}
interface CartState {
	items: CartItem[];
}
export const initialState: CartState = {
	items:
		localStorage.getItem("cart") != null
			? JSON.parse(localStorage.getItem("cart")!)["cart"]["items"]
			: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<{ product: StoreProduct; quantity: number }>
		) => {
			const { product, quantity } = action.payload;
			console.log(state.items);
			const existingItemIndex = state.items.findIndex(
				(item) => item.product?.id === product?.id
			);

			if (existingItemIndex !== -1) {
				state.items[existingItemIndex].quantity += quantity;
			} else {
				state.items.push({ product, quantity });
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			const productId = action.payload;
			state.items = state.items.filter(
				(item) => item.product?.id !== productId
			);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;
