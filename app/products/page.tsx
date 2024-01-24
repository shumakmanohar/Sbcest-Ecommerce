import ProductCard from "@/components/store/ProductCard";
import Wrapper from "@/components/store/Wrapper";
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
	const products = await getProducts();
	return (
		<Wrapper>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
				{products.map((product: StoreProduct) => (
					<ProductCard key={product?.id} product={product} />
				))}
			</div>
		</Wrapper>
	);
};

export default page;
