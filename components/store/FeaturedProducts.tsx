import { FetchFeaturedProducts } from "@/server-actions/Product-Actions";
import Wrapper from "./Wrapper";
import Link from "next/link";
import ProductCard from "./ProductCard";

const FeaturedProducts = async () => {
	const response = await FetchFeaturedProducts();
	if (!response.status) return <h1>Something Went Wrong Try Again</h1>;
	return (
		<div className="my-10">
			<Wrapper>
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold md:text-3xl">
						Featured Products
					</h1>
					<Link
						href={"/products"}
						className="text-xs text-muted-foreground md:text-lg"
					>
						View More
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-7 px-5 md:px-0">
					{response.products?.map((product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</div>
				{/* {JSON.stringify(fetchedProducts)} */}
			</Wrapper>
		</div>
	);
};

export default FeaturedProducts;
