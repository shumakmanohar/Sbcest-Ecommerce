import { FetchFeaturedProducts } from "@/server-actions/Product-Actions";
import Wrapper from "./Wrapper";
import Link from "next/link";
import ProductCard from "./ProductCard";

const FeaturedProducts = async () => {
	const response = await FetchFeaturedProducts();
	if (!response.status) return <h1>Something Went Wrong Try Again</h1>;
	return (
		<div className="my-10 ">
			<Wrapper>
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold md:text-3xl">
						Featured Products
					</h1>
					
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-7 px-5 md:px-0">
					{response.products?.map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</div>
				<div className="flex justify-center mt-12">
				<Link href="/products">
						<button className="px-6 py-2 rounded-full bg-[#00adb5] text-white hover:scale-110 transition-transform duration-200 ease-in-out font-semibold">
							View more
						</button>
					</Link>
          </div>
				{/* {JSON.stringify(fetchedProducts)} */}
			</Wrapper>
		</div>
	);
};

export default FeaturedProducts;
