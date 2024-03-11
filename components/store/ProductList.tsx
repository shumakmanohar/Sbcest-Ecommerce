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
import { Skeleton } from "../ui/skeleton";
import { useLocale } from "next-intl";

const ProductList = ({
	initialProducts,
	categoriesList,
	filterList,
	searchQuery,
}: {
	initialProducts: Product[] | undefined;
	categoriesList: Categories[] | undefined;
	filterList: FilterType[];
	searchQuery: string | undefined;
}) => {
	const [products, setProducts] = useState<StoreProduct[] | undefined>(
		initialProducts
	);
	const [fetchedProducts, setFetchedProducts] = useState<
		StoreProduct[] | undefined
	>(initialProducts);
	const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
		null
	);
	const [selectedPriceFilter, setSelectedPriceFilter] =
		useState<FilterType | null>(null);
	const [stopLoading, setStopLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();
	const activeLocale = useLocale();

	const filterAndSortProducts = useCallback(
		(category?: Categories | null, filter?: FilterType | null) => {
			setLoading(true);
			let updatedProducts = [...(fetchedProducts || [])];

			// Apply search query filter if present
			if (searchQuery) {
				updatedProducts = updatedProducts.filter((product) =>
					product?.title.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}

			// Apply category filter if present
			if (category) {
				updatedProducts = updatedProducts.filter(
					(product) => product?.categoryId === category.id
				);
			}

			if (filter) {
				if (filter.id === EnumPriceFilter.lTh) {
					updatedProducts.sort((a, b) => {
						const priceA = a?.isOnOffer ? a.offerPrice : a?.price || 0;
						const priceB = b?.isOnOffer ? b.offerPrice : b?.price || 0;
						return priceA - priceB;
					});
				} else if (filter.id === EnumPriceFilter.hTl) {
					updatedProducts.sort((a, b) => {
						const priceA = a?.isOnOffer ? a.offerPrice : a?.price || 0;
						const priceB = b?.isOnOffer ? b.offerPrice : b?.price || 0;
						return priceB - priceA;
					});
				}
			}

			setProducts(updatedProducts);
			setLoading(false);
		},
		[fetchedProducts, searchQuery]
	);

	const loadMoreProducts = useCallback(async () => {
		setLoading(true);
		const next = page + 1;
		const { products } = await FetchStoreProducts(next);
		if (products?.length) {
			setPage(next);
			// Filter out duplicate products by ID
			const uniqueProducts = products.filter(
				(newProduct) =>
					!fetchedProducts?.some(
						(existingProduct) => existingProduct?.id === newProduct.id
					)
			);
			const mergedProducts = [...(fetchedProducts || []), ...uniqueProducts];
			setFetchedProducts(mergedProducts);
			filterAndSortProducts(selectedCategory, selectedPriceFilter); // Apply sort after merging new products
		} else {
			setStopLoading(true);
		}
		setLoading(false);
	}, [
		page,
		selectedCategory,
		selectedPriceFilter,
		fetchedProducts,
		filterAndSortProducts,
	]);

	const handleChangeCategory = useCallback(
		(category: Categories | null) => {
			setSelectedCategory(category);
			filterAndSortProducts(category, selectedPriceFilter);
		},
		[filterAndSortProducts, selectedPriceFilter]
	);

	const handleChangeFilter = useCallback(
		(filter: FilterType | null) => {
			setSelectedPriceFilter(filter);
			filterAndSortProducts(selectedCategory, filter);
		},
		[filterAndSortProducts, selectedCategory]
	);

	useEffect(() => {
		if (inView) {
			loadMoreProducts();
		}
	}, [inView, loadMoreProducts]);

	useEffect(() => {
		// Apply initial filtering and sorting when the component mounts
		filterAndSortProducts(selectedCategory, selectedPriceFilter);
	}, [filterAndSortProducts, selectedCategory, selectedPriceFilter]);

	return (
		<div className="min-h-[100vh]">
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
									filterAndSortProducts(null, selectedPriceFilter);
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
									filterAndSortProducts(selectedCategory, null);
								}}
							/>
						</div>
					)}
				</div>
			</div>
			{/* Main Product List  */}
			{products?.length === 0 ? (
				<div>
					<p className="font-semibold text-lg">
						{activeLocale === "en"
							? "Sorry no products found"
							: "لم يتم العثور على نتائج"}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
					{products?.map((product: StoreProduct) => (
						<ProductCard key={product?.id} product={product} />
					))}
					{loading && (
						<>
							<Skeleton className=" h-[400px]  bg-gray-200" />
							<Skeleton className=" h-[400px]  bg-gray-200" />
							<Skeleton className=" h-[400px]  bg-gray-200" />
						</>
					)}
				</div>
			)}

			{/* Infinite Scroll Trigger */}
			{!stopLoading && (
				<div ref={ref} className=" flex items-center justify-center"></div>
			)}
		</div>
	);
};

export default ProductList;
