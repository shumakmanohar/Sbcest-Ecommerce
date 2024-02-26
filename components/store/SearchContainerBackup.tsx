"use client";
import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import debounce from "debounce";
import Loader from "../cms/Loader";
import { StoreProduct } from "@/util/Types";
import Link from 'next/link'

const SearchResultCard = ({
	item,
	handleClear,
}: {
	item: StoreProduct;
	handleClear: () => void;
}) => {
	return (
		<Link href={`/products/${item?.id}`} onClick={handleClear}>
			<div className="w-full flex items-center justify-between p-1 hover:shadow-sm  gap-2 hover:bg-gray-200">
				<div className="w-20 h-20 relative ">
					<Image
						src={"/sblogo.png"}
						alt="Product Image"
						sizes="10vw"
						fill
						objectFit="contain"
					/>
				</div>
				<div className="flex flex-col items-end">
					<span className="text-xs font-semibold">{item?.title}</span>

					<span className="text-xs font-semibold text-green-700">
						SAR {item?.isOnOffer ? item.offerPrice : item?.price}
					</span>
				</div>
			</div>
		</Link>
	);
};

const SearchContainer = () => {
	const [items, setItems] = useState<StoreProduct[] | []>([]);
	const [isSearching, setIsSearching] = useState<Boolean>();

	const handleSearchName = debounce(async (event) => {
		if (event.target.value == "") {
			setItems([]);
			return;
		}

		setIsSearching(true);

		try {
			const response = await fetch(
				`/api/products/search-by-name/${event.target.value}`
			);
			const result = await response.json();

			if (result) {
				setItems(result);
				setIsSearching(false);
				return;
			}
			setItems([]);
			setIsSearching(false);
		} catch (error) {
			console.log(error);
		}
	}, 500);

	const handleClear = () => {
		setItems([]);
	};
	return (
		<div className="w-full">
			{/* Search */}
			<div className="w-full  relative max-w-lg mx-auto bg-gray-100 h-[50px] flex items-center gap-2 rounded-2xl px-4">
				<input
					type="text"
					className="w-full flex-1  h-[50px] outline-none bg-none bg-gray-100"
					placeholder="What are you looking for ..."
					onChange={handleSearchName}
				/>
				{isSearching ? (
					<Loader />
				) : (
					<GrSearch className="text-[15px] md:text-[20px] text-gray-500" />
				)}
				{items?.length > 0 ? (
					<div className="mt-2 w-full h-auto absolute border bg-white rounded-lg top-[50px] z-50 right-0 p-4 overflow-auto">
						{items.map((item) => (
							<SearchResultCard
								key={item?.id}
								item={item}
								handleClear={handleClear}
							/>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default SearchContainer;
