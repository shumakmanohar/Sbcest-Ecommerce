import React, { useState, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import Image from "next/image";
import debounce from "debounce";
import Loader from "../cms/Loader";
import { StoreProduct } from "@/util/Types";
import Link from "next/link";
import { CMS_CONFIG } from "@/cms.config";

const SearchResultCard = ({
  item,
  handleClear,
}: {
  item: StoreProduct;
  handleClear: () => void;
}) => {
  const productImageSrc = item?.images[0] ? `${CMS_CONFIG.cdn.location}/${item?.images[0]}` : '/sblogo.png';
  return (
    <Link href={`/products/${item?.id}`} onClick={handleClear}>
      <div className="w-full flex items-center justify-between p-1 hover:shadow-sm gap-2 hover:bg-gray-200">
        <div className="w-20 h-20 relative">
          <Image
          
            src={productImageSrc}
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
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<Boolean>(false);
  const [isBackdropActive, setIsBackdropActive] = useState<Boolean>(false);

  const handleSearchName = debounce(async (event) => {
    if (event.target.value === "") {
      setItems([]);
      return;
    }

    setIsSearching(true);
    setIsBackdropActive(true);

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
    setIsBackdropActive(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsBackdropActive(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setIsFocused(false);
      setIsBackdropActive(false);
      setItems([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setIsFocused(false);
        setIsBackdropActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`w-full ${isBackdropActive ? ' fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40' : ''}`}>
      {/* Search */}
      <div className="search-container w-full relative max-w-lg mx-auto bg-gray-100 h-[50px] flex items-center gap-2 rounded-2xl px-4">
        <input
          type="text"
          className="w-full flex-1 h-[50px] outline-none bg-none bg-gray-100"
          placeholder="What are you looking for ..."
          onChange={handleSearchName}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isSearching ? (
          <Loader />
        ) : (
          <GrSearch className="text-[15px] md:text-[20px] text-gray-500" />
        )}
        {items?.length > 0 && (
          <div className="mt-2 w-full h-auto absolute border bg-white rounded-lg top-[50px] z-50 right-0 p-4 overflow-auto">
            {items.map((item) => (
              <SearchResultCard
                key={item?.id}
                item={item}
                handleClear={handleClear}
              />
            ))}
          </div>
        )}
      </div>
    </div>

    
  );
};

export default SearchContainer;
