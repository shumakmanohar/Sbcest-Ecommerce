"use client";
import ProductCard from "./ProductCard";
import { FilterType, StoreProduct } from "@/util/Types";
import Loader from "../cms/Loader";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState } from "react";
import type { Categories, Product } from "@prisma/client";
import { Separator } from "../ui/separator";
import { IoCloseOutline } from "react-icons/io5";
import FilterOption from "./FilterOption";
import { FetchStoreProducts } from "@/server-actions/Product-Actions";
import { EnumPriceFilter } from "@/util/Enums";
import SkeletonProductList from "./SkeletonProductList";

const ProductList = ({
	initialProducts,
	categoriesList,
	filterList,
}: {
	initialProducts: Product[] | undefined;
	categoriesList: Categories[] | undefined;
	filterList: FilterType[];
}) => {
	const [products, setProducts] = useState(initialProducts);
	const [fetchedProducts, setFetchedProducts] = useState(initialProducts);
	const [selectedCategory, setSelectedCategory] = useState<Categories | null>();
	const [selectedPriceFilter, setSelectedPriceFilter] =
		useState<FilterType | null>(null);
	const [stopLoading, setStopLoading] = useState(false);
	const [loading, setLoading] = useState(false); // Loading state
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	const filterProducts = useCallback(
		(category?: Categories | null, filter?: FilterType | null) => {
			if (fetchedProducts) {
				setLoading(true);
				let updatedProducts;
				updatedProducts = [...fetchedProducts];
				// For Category Filtering
				if (category) {
					console.log("categories filtering");
					updatedProducts = updatedProducts.filter(
						(product) => product.categoryId === category?.id
					);
				}
				//For General Filtering [Price filtering]
				if (filter) {
					if (filter?.id === EnumPriceFilter.lTh) {
						updatedProducts.sort((a, b) => a.price - b.price);
					} else if (filter?.id === EnumPriceFilter.hTl) {
						updatedProducts.sort((a, b) => b.price - a.price);
					}
				}
				//Setting the New/Filtered Products
				setProducts(updatedProducts);
				setLoading(false);
			}
		},
		[fetchedProducts, selectedCategory]
	);

	const loadMoreProducts = useCallback(async () => {
		setLoading(true);
		const next = page + 1;
		const { products } = await FetchStoreProducts(next);
		if (products?.length) {
			setPage(next);
			// todo filter
			setFetchedProducts((prev) => [
				...(prev?.length ? prev : []),
				...products,
			]);
			if (selectedCategory || selectedPriceFilter) {
				console.log("Yoooo I am filtering");
				filterProducts(selectedCategory, selectedPriceFilter);
			}
			setProducts((prev) => [...(prev?.length ? prev : []), ...products]);
		} else {
			// Every Products is Fetched
			setStopLoading(true);
		}
		setLoading(false);
	}, [page, selectedCategory, selectedPriceFilter]);

	const handleChangeCategory = useCallback((category: Categories) => {
		setSelectedCategory(category);
		// Filter products immediately when category changes
		filterProducts(category);
	}, []);

	const handleChangeFilter = useCallback((filter: FilterType | null) => {
		setSelectedPriceFilter(filter);
		// Apply price filter if set
		filterProducts(null, filter);
	}, []);

	useEffect(() => {
		if (inView) {
			loadMoreProducts();
		}
	}, [inView, loadMoreProducts]);
	return (
		<div className="">
			{/* Filter Option */}
			<div>
				<FilterOption
					selectedCategoryID={selectedCategory?.id}
					selectedFilterID={selectedPriceFilter?.id}
					categoriesList={categoriesList}
					handleChangeCategory={handleChangeCategory}
					filterList={filterList}
					handleChangeFilter={handleChangeFilter}
				/>
				<Separator />
				{/* Selected Filters OR Categories */}
				<div className="mt-4 flex gap-4">
					{selectedCategory && (
						<div className="filter-btn border border-black">
							<span>{selectedCategory.name}</span>
							<IoCloseOutline
								size={20}
								className="cursor-pointer"
								onClick={() => {
									setSelectedCategory(null);
									filterProducts(null, selectedPriceFilter);
								}}
							/>
						</div>
					)}
					{selectedPriceFilter && (
						<div className="filter-btn border border-black">
							<span>{selectedPriceFilter.name}</span>
							<IoCloseOutline
								size={20}
								className="cursor-pointer"
								onClick={() => {
									setSelectedPriceFilter(null);
									filterProducts(selectedCategory, null);
								}}
							/>
						</div>
					)}
				</div>
			</div>
			{/* Main Product List  */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
				{products?.map((product: StoreProduct) => (
					<ProductCard key={product?.id} product={product} />
				))}
			</div>

			{loading && <SkeletonProductList />}

			{/* Infinite Scroll Trigger */}
			{!stopLoading && (
				<div ref={ref} className=" flex items-center justify-center">
					<Loader className="w-10 h-10 my-10" />
				</div>
			)}
		</div>
	);
};

export default ProductList;
