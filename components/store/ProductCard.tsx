import { CMS_CONFIG } from "@/cms.config";
import { getDiscountedPricePercentage } from "@/util/Price";
import { StoreProduct } from "@/util/Types";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: StoreProduct }) => {
	return (
		<Link href={`/products/${product?.id}`}>
			<div className="relative flex flex-col bg-white  z-30 p-5 h-[460px] min-h-[460px]  rounded-xl transform transition-transform duration-500 hover:scale-105 cursor-pointer">
				{product?.isOnOffer && (
					<p className="bg-green-600  p-2 text-center text-white absolute top-3 left-2 text-xs rounded-full">
						On Sale
					</p>
				)}
				{product?.isArchived && (
					<p className="bg-red-600 p-2 text-center text-white absolute top-3 left-2 text-xs rounded-full">
						Out Of Stock
					</p>
				)}

				<div className="aspect-square h-auto relative overflow-hidden">
					<Image
						src={
							product?.previewImg
								? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
								: "/sblogo.png"
						}
						alt=""
						className="object-contain -z-20"
						fill
						quality={100}
						sizes="(min-width: 1540px) 290px, (min-width: 1040px) calc(21.88vw - 43px), (min-width: 780px) calc(50vw - 90px), calc(100vw - 120px)"
					/>
				</div>
				<h4 className="truncate mt-2">{product?.title}</h4>
				<p className="self-start mb-3 mt-1 italic rounded-full text-xs  text-gray-500">
					{product && (product as any).category.name}
				</p>
				<p className=" text-xs my-2 line-clamp-1 leading-[2]">
					{product?.description}
				</p>
				<p className="font-bold ">
					SAR {product?.isOnOffer ? product?.offerPrice : product?.price}
				</p>

				{product?.isOnOffer && (
					<>
						<p className="font-bold text-xs line-through text-red-500">
							SAR {product?.price}
						</p>
						<p className="font-bold text-xs text-right text-green-500 ">
							{getDiscountedPricePercentage(
								product?.price || 0,
								product?.offerPrice || 0
							)}
							%
						</p>
					</>
				)}
			</div>
		</Link>
	);
};

export default ProductCard;
