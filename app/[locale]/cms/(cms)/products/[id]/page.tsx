import type { Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import Header from "@/components/cms/Header";
import ProductForm from "@/components/cms/ProductForm";

import ErrorCms from "@/components/cms/ErrorCms";

// export async function generateStaticProps() {
// 	const res = await fetch("/api/products");
// 	const products = await res.json();
// 	return products.map((product: Product) => ({
// 		id: product.id,
// 	}));
// }

const page = async ({ params }: { params: { id: string } }) => {
	try {
		const categories = await prisma.categories.findMany();
		const product = await prisma.product.findFirst({
			where: { id: params.id },
		});

		return (
			<div>
				<Header heading={product?.title} description={product?.description} />
				<ProductForm categories={categories} product={product} />
			</div>
		);
	} catch (error) {
		return (
			<div>
				<ErrorCms />
			</div>
		);
	}
};

export default page;
