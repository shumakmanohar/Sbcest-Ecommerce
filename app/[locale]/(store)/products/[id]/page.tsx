import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

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
		take: 5,
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
	console.log("LOCALE HERE : [Single PAge]", params.locale);
	unstable_setRequestLocale(params.locale);
	console.log("Single Product Page Rendering", params.id);
	const product = await getProduct(params.id);
	return (
		<div>
			Single Product page {params.id}
			<div>Product Details:</div>
			<div>{JSON.stringify(product)}</div>
		</div>
	);
};

export default Page;
