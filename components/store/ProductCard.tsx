import { CMS_CONFIG } from "@/cms.config";
import { getDiscountedPricePercentage } from "@/util/Price";
import { StoreProduct } from "@/util/Types";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: StoreProduct }) => {
	return (
		<Link href={`/products/${product?.id}`}>
			<div className="flex flex-col items-start w-full max-w-[1460px] p-4  ">
				<Image
					width={400}
					height={400}
					src={
						product?.previewImg
							? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
							: "/sblogo.png"
					}
					alt={"product Image"}
					className="transform transition-transform duration-500 hover:scale-110 cursor-pointer "
				/>
				 <h3 className="text-sm mt-4 font-semibold">{product?.title}</h3>
                <p className="text-xs text-gray-500 mt-2 w-3/4 truncate">{product?.description}</p>
                <p className="mt-2 text-sm font-semibold">{`SR ${product?.offerPrice}`}</p>
                <p className="text-xs font-medium line-through text-red-500">{`SR${product?.price}`}</p>
                <p className="ml-auto text-xs font-medium text-green-500">{getDiscountedPricePercentage(product?.price, product?.offerPrice)}%
						off`</p>
                <p className="text-xs text-white bg-black rounded-full px-2">{product?.category.name}</p>
				
			</div>
		</Link>
	);
};

export default ProductCard;
{
	/* <Image
	width={500}
	height={500}
	src={
		product?.previewImg
			? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
			: "/sblogo.png"
	}
	alt={"product Image"}
/>; */
}
