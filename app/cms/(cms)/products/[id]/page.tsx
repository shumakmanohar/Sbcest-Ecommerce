import type { Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import Header from "@/components/cms/Header";
import ProductForm from "@/components/cms/ProductForm";
import ErrorCms from "@/components/cms/ErrorCms";

const page = async ({ params }: { params: { id: string } }) => {
	try {
		const categories = await prisma.categories.findMany();
		const product = await prisma.product.findFirst({
			where: { id: params.id },
		});

		return (
			<div>
				<Header heading={product?.title} description={product?.id} />
				<ProductForm categories={categories} product={product} />
			</div>
		);
	} catch (error: any) {
		return (
			<div>
				<ErrorCms error={error} />
			</div>
		);
	}
};

export default page;
