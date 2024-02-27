import ProductCard from "@/components/store/ProductCard";
import ProductList from "@/components/store/ProductList";
import Wrapper from "@/components/store/Wrapper";
import { GetCategories } from "@/server-actions/Category-Action";
import { FetchStoreProducts } from "@/server-actions/Product-Actions";
import { EnumPriceFilter } from "@/util/Enums";
import { StoreProduct } from "@/util/Types";

export async function generateStaticParams() {
	const res = await fetch(`${process.env.SITE_URL}/api/products`, {
		next: { tags: ["products"] },
	});
	const products = await res.json();

	return products.map((product: StoreProduct) => ({
		id: product?.id,
	}));
}

const getProducts = async () => {
	const res = await fetch(`${process.env.SITE_URL}/api/products`, {
		next: { tags: ["products"] },
	});
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}
	return res.json();
};

const page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	//const products = await getProducts();
	const searchQuery = searchParams["s"];
	const { products } = await FetchStoreProducts(1, searchQuery as string);
	const { data: categoriesList } = await GetCategories();
	const filterOptionsData = [
		{
			name: "Price: low to high",
			arName: "Price: low to high",
			id: EnumPriceFilter.lTh,
		},
		{
			name: "Price: high to low",
			arName: "Price: high to low",
			id: EnumPriceFilter.hTl,
		},
	];
	return (
		<Wrapper>
			{/* Dynamic Title */}

			<div className="mt-20 mb-10">
				<div>
					{searchQuery ? (
						<h2 className="text-3xl md:text-4xl ">
							Showing results for{" "}
							<span className="font-bold">&quot;{searchQuery}&ldquo;</span>
						</h2>
					) : (
						<h2 className="text-3xl md:text-4xl font-semibold">
							Available Products
						</h2>
					)}

					<p className="text-muted-foreground text-sm mt-2">
						Choose from our wide variety of products
					</p>
				</div>
			</div>

			<ProductList
				key={Math.random()}
				initialProducts={products}
				categoriesList={categoriesList}
				filterList={filterOptionsData}
				searchQuery={searchQuery as string}
			/>
		</Wrapper>
	);
};

export default page;
