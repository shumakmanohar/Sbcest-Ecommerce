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
  const [products, setProducts] = useState<StoreProduct[] | undefined>(initialProducts);
  const [fetchedProducts, setFetchedProducts] = useState<StoreProduct[] | undefined>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<FilterType | null>(null);
  const [stopLoading, setStopLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const defaultSort = (productsToSort: StoreProduct[]) => {
	// Sort products by date (newest first) if no sort filter is applied
	return productsToSort.slice().sort((a, b) => {
	  const dateA = new Date((a as any).createdAt);
	  const dateB = new Date((b as any).createdAt);
	  
	  if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
		return dateB.getTime() - dateA.getTime();
	  } else if (!isNaN(dateA.getTime())) {
		return -1;
	  } else if (!isNaN(dateB.getTime())) {
		return 1;
	  }
	  
	  return 0;
	});
  };
  

  const filterAndSortProducts = useCallback(
    (category?: Categories | null, filter?: FilterType | null) => {
      setLoading(true);
      let updatedProducts = [...fetchedProducts || []];

      // Apply category filter if present
      if (category) {
        updatedProducts = updatedProducts.filter(
          (product) => product?.categoryId === category.id
        );
      }

      // Apply price filter if present
      if (filter) {
        if (filter.id === EnumPriceFilter.lTh) {
          updatedProducts.sort((a, b) => getPrice(a) - getPrice(b));
        } else if (filter.id === EnumPriceFilter.hTl) {
          updatedProducts.sort((a, b) => getPrice(b) - getPrice(a));
        }
      } else {
        // If no sort filter is applied, resort to default sorting
        updatedProducts = defaultSort(updatedProducts);
      }

      setProducts(updatedProducts);
      setLoading(false);
    },
    [fetchedProducts]
  );

  const getPrice = (product: StoreProduct | undefined) => {
    // Use offer price if available and product is on offer, else use regular price
    return product?.isOnOffer ? product.offerPrice : product?.price || 0;
  };

  const loadMoreProducts = useCallback(async () => {
    setLoading(true);
    const next = page + 1;
    const { products } = await FetchStoreProducts(next);
    if (products?.length) {
      setPage(next);
      let mergedProducts = [...fetchedProducts || [], ...products];
      setFetchedProducts(mergedProducts);
      filterAndSortProducts(selectedCategory, selectedPriceFilter);
    } else {
      setStopLoading(true);
    }
    setLoading(false);
  }, [page, selectedCategory, selectedPriceFilter, fetchedProducts, filterAndSortProducts]);

  const handleChangeCategory = useCallback((category: Categories | null) => {
    setSelectedCategory(category);
    filterAndSortProducts(category, selectedPriceFilter);
  }, [filterAndSortProducts, selectedPriceFilter]);

  const handleChangeFilter = useCallback((filter: FilterType | null) => {
    setSelectedPriceFilter(filter);
    filterAndSortProducts(selectedCategory, filter);
  }, [filterAndSortProducts, selectedCategory]);

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
