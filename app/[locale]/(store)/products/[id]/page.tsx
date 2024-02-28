import AddToCart from "@/components/store/AddToCart";
import ProductDetailsCarousel from "@/components/store/ProductDetailsCarousel";
import Wrapper from "@/components/store/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getDiscountedPricePercentage } from "@/util/Price";
import { StoreProduct } from "@/util/Types";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { cache } from "react";
import prisma from "@/lib/prisma";

const getProduct = cache(async (id: string) => {
	const product = await prisma.product.findUnique({
		where: { id },
		include: { category: true },
	});

	if (!product) notFound();

	return product;
});

export async function generateMetadata({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await getProduct(id);

	return {
		title: product.title,
	};
}

const page = async ({ params }: { params: { id: string } }) => {
	const product: StoreProduct = await getProduct(params.id);

	return (
		<div className="w-full md:py-20 min-h-[90vh]">
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* left column start */}
					<div className="w-full md:w-auto flex flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						<ProductDetailsCarousel images={product?.images || [""]} />
					</div>
					{/* left column end */}

					{/* right column start */}
					<div className="flex-[1] py-3">
						{/* PRODUCT TITLE */}
						<div className="text-[34px] font-semibold mb-2 leading-tight">
							{product?.title}
						</div>

						{/* PRODUCT CATEGORY */}
						<div className="text-lg font-semibold mb-5">
							{product && (product as any).category.name}
						</div>

						{/* PRODUCT PRICE */}
						<div className="flex items-center">
							<p className="mr-2 text-lg font-semibold">
								SAR :{product?.isOnOffer ? product?.offerPrice : product?.price}
							</p>
							{product?.isOnOffer && (
								<>
									<p className="text-base  font-medium line-through">
										{product.price}
									</p>
									<p className="ml-auto text-base font-medium text-green-500">
										{getDiscountedPricePercentage(
											product?.price || 0,
											product?.offerPrice || 0
										)}
										% off
									</p>
								</>
							)}
						</div>

						{/* ADD TO CART BUTTON */}
						{product?.isArchived ? (
							<Alert className="my-16">
								<Info className="h-4 w-4" />

								<AlertTitle>Out Of Stock</AlertTitle>
								<AlertDescription>
									Due to an unexpectedly high number of orders, we no longer
									have this product in stock. We know how disappointing this
									news is, and we sincerely apologize for the inconvenience it
									has caused.
								</AlertDescription>
							</Alert>
						) : (
							<AddToCart product={product} />
						)}

						<div>
							<div className="text-lg font-bold mb-5">Product Details</div>
							<div className="markdown text-md mb-5 display-linebreak">
								<p>{product?.description}</p>
							</div>
						</div>
					</div>
					{/* right column end */}
				</div>
			</Wrapper>
		</div>
	);
};

export default page;
