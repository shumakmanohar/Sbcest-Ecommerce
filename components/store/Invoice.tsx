import { useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { RootState } from "@/state/store";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FetchStoreInvoiceProducts } from "@/server-actions/Product-Actions";
import InvoiceCard from "./InvoiceCard";
import { OrderedProducts, Product } from "@prisma/client";
import { CartItem } from "@/state/cart/cartSlice";

const Invoice = ({
	setOrderAmount,
	setOrderedProducts,
}: {
	setOrderAmount: Dispatch<SetStateAction<number>>;
	setOrderedProducts: Dispatch<SetStateAction<OrderedProducts[]>>;
}) => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const [serverFetchedProducts, setServerFetchedProducts] = useState<
		Product[] | undefined
	>([]);
	const [invoiceProducts, setInvoiceProducts] = useState<OrderedProducts[]>([]);
	const [VAT, setVAT] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const DELIVERY_CHARGE = 35;
	const VAT_PERCENTAGE = 15;

	// Redirect if no products in cart.

	const totalPrice = useMemo(() => {
		let calculatedTotalPrice = 0;
		let _invoiceProducts: OrderedProducts[] = [];
		console.log("Server Fetched Products  UseMemo", serverFetchedProducts);
		serverFetchedProducts?.forEach((serverProduct) => {
			cartItems.forEach((item) => {
				if (serverProduct.id === item.product?.id) {
					console.log("matching product found");
					const price = serverProduct.isOnOffer
						? serverProduct.offerPrice
						: serverProduct.price;
					calculatedTotalPrice += price! * item.quantity;
					// Pushing the Server Fetched  Products to Invoice Products with quantity.

					_invoiceProducts.push({
						productId: serverProduct.id,
						quantity: item.quantity,
						title: serverProduct.title,
						description: serverProduct.description,
						ar_description: serverProduct.ar_description,
						ar_title: serverProduct.ar_title,
						previewImg: serverProduct.previewImg,
						price,
					});
				}
			});
		});
		/* 
		Ordered Products are products that gonna be send to backend/server to create
		order .Invoice Products are used to Update UI for the Invoice 
		*/
		// Setting Order Products
		setOrderedProducts(_invoiceProducts);
		// Setting Invoice Products
		setInvoiceProducts(_invoiceProducts);
		//Setting Sub Total
		setSubTotal(calculatedTotalPrice);
		//Adding Delivery Charge and VAT
		const _VAT = (VAT_PERCENTAGE / 100) * calculatedTotalPrice;
		//Setting VAT ON UI
		setVAT(_VAT);
		calculatedTotalPrice += DELIVERY_CHARGE;
		calculatedTotalPrice += _VAT;
		//Setting Order Amount
		setOrderAmount(calculatedTotalPrice);
		return calculatedTotalPrice.toFixed(2);
	}, [serverFetchedProducts]);

	useEffect(() => {
		//todo wrap arround error check
		const localCartItems: CartItem[] =
			localStorage.getItem("cart") != null
				? JSON.parse(localStorage.getItem("cart")!)["cart"]["items"]
				: [];
		const fetchProductsByID = async () => {
			console.log("Local Fethced Items", localCartItems);
			const localStoredProducts = localCartItems.map((item) => {
				return item.product?.id || "";
			});
			console.log("localStoredProduct", localStoredProducts);
			const _serverFetchedProducts = await FetchStoreInvoiceProducts(
				localStoredProducts
			);
			// todo do the server  error check
			setServerFetchedProducts(_serverFetchedProducts.products);
			console.log("Yo serverfetched ", _serverFetchedProducts);
		};

		fetchProductsByID();
		//getTotal();
	}, []);

	return (
		<>
			<div>
				<span className="text-xl text-muted-foreground">Pay</span>
				<p className="text-4xl font-semibold mt-2">SAR {totalPrice}</p>
			</div>
			<div className="mt-10">
				{/* Invoice Card */}
				<div className="flex flex-col gap-3">
					{invoiceProducts?.map((invoiceProducts) => (
						<InvoiceCard product={invoiceProducts} />
					))}
				</div>
				<Separator className="my-8" />
				<div className="flex flex-col gap-4">
					<div className="font-medium flex items-center justify-between">
						<p>Subtotal</p>
						<p>SAR {subTotal}</p>
					</div>
					<div className="text-muted-foreground flex items-center justify-between">
						<p>Shipping</p>
						<p>SAR 35</p>
					</div>
					<div className="text-muted-foreground flex items-center justify-between">
						<p>VAT {"(15%)"}</p>
						<p>SAR {VAT.toFixed(2)}</p>
					</div>
				</div>
				<Separator className="my-8" />
				<div className="font-medium flex items-center justify-between">
					<p>Total Due</p>
					<p>SAR {totalPrice}</p>
				</div>
			</div>
		</>
	);
};

export default Invoice;
