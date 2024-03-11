import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Suspense, cache } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Wrapper from "@/components/store/Wrapper";
import ProductDetails from "@/components/store/ProductDetails";
import { Separator } from "@/components/ui/separator";
import RelatedProducts from "@/components/store/RelatedProducts";
import { Skeleton } from "@/components/ui/skeleton";

const getProduct = cache(async (id: string) => {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
			include: { category: true },
		});

		if (!product) notFound();

		return product;
	} catch (error) {
		notFound();
	}
});

export async function generateStaticParams() {
	const products = await prisma.product.findMany({
		take: 10,
		orderBy: { createdAt: "desc" },
	});
	const locales = ["en", "ar"];
	let paths: { locale: string; id: string }[] = [];
	products.map((product) => {
		locales.map((locale) => {
			paths.push({
				locale,
				id: product.id,
			});
		});
	});
	return paths;
}

export async function generateMetadata({
	params,
}: {
	params: { id: string; locale: string };
}): Promise<Metadata> {
	const product = await getProduct(params.id);
	const productTitle =
		params.locale === "en" ? product.title : product.ar_title;
	return {
		title: productTitle,
	};
}

const Page = async ({ params }: { params: { id: string; locale: string } }) => {
	const locale = params.locale;
	unstable_setRequestLocale(params.locale);
	const product = await getProduct(params.id);

	return (
		<div className="min-h-[90vh]">
			<Wrapper>
				<ProductDetails product={product} locale={locale} />
				{/* Related  Products */}
				<div className="flex items-center justify-between mb-2 mt-16">
					<h1 className="text-2xl font-semibold md:text-3xl">
						{locale === "ar" ? "قد يعجبك ايضا" : "You Might Also Like"}
					</h1>
				</div>
				<Separator />
				<Suspense
					fallback={
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
							<Skeleton className=" h-[400px]  bg-gray-200" />
							<Skeleton className=" h-[400px]  bg-gray-200" />
							<Skeleton className=" h-[400px]  bg-gray-200" />
						</div>
					}
				>
					<RelatedProducts categoryId={product.categoryId} />
				</Suspense>
			</Wrapper>
		</div>
	);
};

export default Page;
