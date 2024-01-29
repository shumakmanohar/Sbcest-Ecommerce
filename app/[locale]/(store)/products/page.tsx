import ProductCard from "@/components/store/ProductCard";
import ProductList from "@/components/store/ProductList";
import Wrapper from "@/components/store/Wrapper";
import { GetCategories } from "@/server-actions/Category-Action";
import { FetchStoreProducts } from "@/server-actions/Product-Actions";
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

const page = async () => {
	//const products = await getProducts();
	const { products } = await FetchStoreProducts();
	const { data: categoriesList } = await GetCategories();

	return (
		<Wrapper>
			<ProductList
				key={Math.random()}
				initialProducts={products}
				categoriesList={categoriesList}
			/>
		</Wrapper>
	);
};

export default page;
