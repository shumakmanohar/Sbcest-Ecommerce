import { FetchFeaturedProducts } from "@/server-actions/Product-Actions";
import Wrapper from "./Wrapper";
import Link from "next/link";
import ProductCard from "./ProductCard";

import { StoreProduct } from "@/util/Types";
import { Separator } from "../ui/separator";
import { getTranslations } from "next-intl/server";

const FeaturedProducts = async () => {
  const t = await getTranslations("Index");
  const response = await FetchFeaturedProducts();
  // if (!response.status) return <h1>Something Went Wrong Try Again</h1>;
  return (
    <div className="my-10">
      <Wrapper>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold md:text-3xl">
            {t("featured products")}
            {/* Featured Products */}
          </h1>
          <Link
            href={"/products"}
            className="text-xs text-muted-foreground md:text-lg"
          >
            {t("view more")}
          </Link>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
          {response.products?.map((product: StoreProduct) => (
            <ProductCard product={product} key={product?.id} />
          ))}
        </div>
        <div className="mt-16 mx-auto text-center">
          <Link
            href={"/products"}
            className="bg-black  text-white text-base font-medium py-3 px-6 rounded-full transition duration-300"
          >
            {t("vm btn")}
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default FeaturedProducts;
