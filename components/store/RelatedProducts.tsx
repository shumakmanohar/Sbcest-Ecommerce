import prisma from "@/lib/prisma";
import ProductCard from "./ProductCard";
const RelatedProducts = async ({ categoryId }: { categoryId: string }) => {
	const relatedProducts = await prisma.product.findMany({
		where: {
			categoryId,
		},
		take: 8,
		skip: 1,
		orderBy: {
			createdAt: "desc",
		},
		include: { category: true },
	});
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
				{relatedProducts?.map((product) => (
					<ProductCard product={product} key={product?.id} />
				))}
			</div>
		</div>
	);
};

export default RelatedProducts;
