import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { GrSearch } from "react-icons/gr";
import Image from "next/image";
import debounce from "debounce";
import Loader from "../cms/Loader";
import { StoreProduct } from "@/util/Types";
import Link from "next/link";
import { CMS_CONFIG } from "@/cms.config";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SearchResultCard = ({
  item,
  handleClear,
}: {
  item: StoreProduct;
  handleClear: () => void;
}) => {
  const productImageSrc = item?.images[0]
    ? `${CMS_CONFIG.cdn.location}/${item?.images[0]}`
    : "/sblogo.png";
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

const SearchContainer = ({ placeholder }: { placeholder: string }) => {
  const [items, setItems] = useState<StoreProduct[] | []>([]);
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const [searchParam, setSearchParam] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      router.push(`/products?s=${event.target.value}`);
    }
  };

  const handleSearchName = debounce(async (event) => {
    if (event.target.value === "") {
      setItems([]);
      setSearchParam("");
      return;
    }

    setIsSearching(true);
    setSearchParam(event.target.value);

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

  useEffect(() => {
    const closeSearch = (e: any) => {
      setItems([]);
    };

    document.body.addEventListener("click", closeSearch);

    return () => document.removeEventListener("click", closeSearch);
  }, []);

  return (
    <div className={`w-full `}>
      {/* Search */}
      <div className="search-container w-full relative max-w-lg mx-auto bg-gray-100 h-[50px] flex items-center gap-2 rounded-2xl px-4">
        <input
          type="text"
          className="w-full flex-1 h-[50px] outline-none bg-none bg-gray-100"
          placeholder={placeholder}
          ref={inputRef.current}
          onChange={handleSearchName}
          onKeyDown={handleKeyDown}
        />
        {isSearching ? (
          <Loader />
        ) : (
          <Link href={`/products?s=${searchParam}`}>
            <GrSearch className="text-[15px] md:text-[20px] text-gray-500" />
          </Link>
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
