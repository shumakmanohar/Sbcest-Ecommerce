import AddToCart from "@/components/store/AddToCart";
import ProductCarousel from "@/components/store/ProductCarousel";
import ProductDetailsCarousel from "@/components/store/ProductDetailsCarousel";
import Wrapper from "@/components/store/Wrapper";
import { getDiscountedPricePercentage } from "@/util/Price";
import { StoreProduct } from "@/util/Types";
import { notFound } from "next/navigation";

const getProduct = async (id: string) => {
	const res = await fetch(`${process.env.SITE_URL}/api/products/${id}`, {
		next: { tags: [`products-${id}`] },
	});
	console.log(res);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		notFound();
	}
	return res.json();
};

const page = async ({ params }: { params: { id: string } }) => {
	const product: StoreProduct = await getProduct(params.id);
	const images = product?.images || [];


	return (
		<div className="w-full md:py-20 max-w-[1460px] mx-auto">
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* left column start */}
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						{/* <ProductDetailsCarousel images={images} /> */}
						<ProductCarousel images ={images}/>
					</div>
					{/* left column end */}

					{/* right column start */}
					<div className="flex-[1] py-3">
						{/* PRODUCT TITLE */}
						<div className="text-[34px] font-semibold mb-2 leading-tight">
							{product?.title}
						</div>

						{/* PRODUCT SUBTITLE
						<div className="text-lg font-semibold mb-5">{product?.categoryId}</div> */}

						{/* PRODUCT PRICE */}
						<div className="flex items-center">
							<p className="mr-2 text-lg font-semibold">
								SAR :{product?.isOnOffer ? product?.offerPrice : product?.price}
							</p>
							{product?.isOnOffer && (
								<>
									<p className="text-base text-red-500 font-medium line-through">
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

						<div className="text-md font-medium text-black/[0.5]">
							incl. of taxes
						</div>
						<div className="text-md font-medium text-black/[0.5] mb-20">
							{`(Also includes all applicable duties)`}
						</div>

						{/* ADD TO CART BUTTON START */}
						<AddToCart product={product} />
						{/* ADD TO CART BUTTON END */}

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
