import { createSlice } from "@reduxjs/toolkit";
import localProductData from "@/temp/localProduceData";

// Function to calculate price based on quantity and oneQuantityPrice
const calculatePrice = (quantity, oneQuantityPrice) => {
	return quantity * oneQuantityPrice;
};
const calculateSubtotal = (cartItems) => {
	return cartItems.reduce((total, item) => total + item.attributes.price, 0);
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: [],
		subtotal: 0,
	},
	reducers: {
		initializeCartFromStorage: (state, action) => {
			const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
			console.log("Initializing cart from storage:", storedCart);
			state.cartItems = storedCart;
			state.subtotal = calculateSubtotal(storedCart);
		},
		addToCart: (state, action) => {
			const productDetails = localProductData
				.flatMap((group) => group.data)
				.find((product) => product.attributes.id === action.payload.id);

			if (productDetails) {
				const item = state.cartItems.find(
					(p) => p.id === productDetails.attributes.id
				);

				if (item) {
					item.quantity++;
				} else {
					const oneQuantityPrice = productDetails.attributes.price;
					state.cartItems.push({
						...productDetails.attributes,
						quantity: 1,
						oneQuantityPrice: oneQuantityPrice,
						attributes: {
							...productDetails.attributes,
							price: oneQuantityPrice,
						},
					});
				}

				// Recalculate subtotal after updating the cart
				state.subtotal = state.cartItems.reduce(
					(total, item) => total + item.attributes.price,
					0
				);
				updateLocalStorage(state.cartItems);
				// Update local storage
				localStorage.setItem("cart", JSON.stringify(state.cartItems));
			}
		},

		updateCart: (state, action) => {
			state.cartItems = state.cartItems.map((p) => {
				if (p.id === action.payload.id) {
					if (action.payload.key === "quantity") {
						const newQuantity = action.payload.val;
						const oneQuantityPrice = p.oneQuantityPrice || 0;

						// Ensure that both newQuantity and oneQuantityPrice are valid numbers
						if (!isNaN(newQuantity) && !isNaN(oneQuantityPrice)) {
							p.attributes.price = calculatePrice(
								newQuantity,
								oneQuantityPrice
							);
						}
					}
					return { ...p, [action.payload.key]: action.payload.val };
				}
				return p;
			});

			// Recalculate subtotal after updating the cart
			state.subtotal = state.cartItems.reduce(
				(total, item) => total + item.attributes.price,
				0
			);
			updateLocalStorage(state.cartItems);
			// Update local storage
			localStorage.setItem("cart", JSON.stringify(state.cartItems));
		},

		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(p) => p.id !== action.payload.id
			);

			// Recalculate subtotal after updating the cart
			state.subtotal = state.cartItems.reduce(
				(total, item) => total + item.attributes.price,
				0
			);
			updateLocalStorage(state.cartItems);
			// Update local storage
			localStorage.setItem("cart", JSON.stringify(state.cartItems));
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addToCart,
	updateCart,
	removeFromCart,
	initializeCartFromStorage,
} = cartSlice.actions;
export const updateLocalStorage = () => (dispatch, getState) => {
	const { cart } = getState();
	localStorage.setItem("cart", JSON.stringify(cart.cartItems));
};

export default cartSlice.reducer;
