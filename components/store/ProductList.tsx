"use client";
import ProductCard from "./ProductCard";
import { StoreProduct } from "@/util/Types";
import Loader from "../cms/Loader";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState } from "react";
import type { Categories, Product } from "@prisma/client";
import { Separator } from "../ui/separator";
import { IoCloseOutline } from "react-icons/io5";
import FilterOption from "./FilterOption";
import { FetchStoreProducts } from "@/server-actions/Product-Actions";

const ProductList = ({
	initialProducts,
	categoriesList,
}: {
	initialProducts: Product[] | undefined;
	categoriesList: Categories[] | undefined;
}) => {
	const [products, setProducts] = useState(initialProducts);
	const [fetchedProducts, setFetchedProducts] = useState(initialProducts);
	const [selectedCategory, setSelectedCategory] = useState<Categories | null>();
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	const loadMoreProducts = useCallback(async () => {
		const next = page + 1;
		const { products } = await FetchStoreProducts(next);
		if (products?.length) {
			setPage(next);
			// todo filter
			setProducts((prev) => [...(prev?.length ? prev : []), ...products]);
			setFetchedProducts((prev) => [
				...(prev?.length ? prev : []),
				...products,
			]);
		}
	}, [page, selectedCategory]);

	const handleChangeCategory = useCallback(
		(category: Categories) => {
			setSelectedCategory(category);
			// Filter products immediately when category changes
			let updatedProducts;
			if (fetchedProducts && category) {
				updatedProducts = [...fetchedProducts];
				updatedProducts = updatedProducts.filter(
					(product) => product.categoryId === category.id
				);
			}
			setProducts(updatedProducts);
		},
		[fetchedProducts]
	);

	useEffect(() => {
		if (inView) {
			loadMoreProducts();
		}
	}, [inView, loadMoreProducts]);
	return (
		<div className="mt-[180px]">
			{/* Filter Option */}
			<div>
				<FilterOption
					categoriesList={categoriesList}
					selectedCategoryID={selectedCategory?.id}
					handleChangeCategory={handleChangeCategory}
				/>
				<Separator />
				{/* Selected Filters OR Categories */}
				<div className="mt-4">
					{selectedCategory && (
						<div className="filter-btn">
							<span>{selectedCategory.name}</span>
							<IoCloseOutline />
						</div>
					)}
				</div>
			</div>
			{/* Main Product List  */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-7 px-5 md:px-0">
				{products?.map((product: StoreProduct) => (
					<ProductCard key={product?.id} product={product} />
				))}
			</div>
			{/* Infinite Scroll Trigger */}
			<div ref={ref} className=" flex items-center justify-center">
				<Loader className="w-10 h-10" />
			</div>
		</div>
	);
};

export default ProductList;
