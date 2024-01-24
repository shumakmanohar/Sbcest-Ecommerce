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
	items: [],
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
		updateQuantity: (
			state,
			action: PayloadAction<{ productId: string; quantity: number }>
		) => {
			const { productId, quantity } = action.payload;
			const existingItem = state.items.find(
				(item) => item.product?.id === productId
			);

			if (existingItem) {
				existingItem.quantity = quantity;
			}
		},
		initializeCartFromLocalStorage: (state) => {
			// Load initial cart data from localStorage
			state.items =
				localStorage.getItem("cart") != null
					? JSON.parse(localStorage.getItem("cart")!)["cart"]["items"]
					: [];
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	initializeCartFromLocalStorage,
	updateQuantity,
} = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;
