import { getDiscountedPricePercentage } from "@/util/Price";
import { StoreProduct } from "@/util/Types";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: StoreProduct }) => {
	return (
		<div className="grid grid-cols-1 gap-5 my-14 px-5 md:px-0">
			<Link href={`/products/${product?.id}`}>
				<div className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer">
					<Image
						width={500}
						height={500}
						src={"/test2.webp"}
						alt={"product Image"}
					/>
					<div className="p-4 text-black/[0.9]">
						<h2 className="text-lg font-medium">"Product Name"</h2>
						<div className="flex items-center text-black/[0.5]">
							<p className="mr-2 text-lg font-semibold">&#8377;{45}</p>
							{2 && (
								<>
									<p className="text-base font-medium line-through">
										&#8377;{5}
									</p>
									<p className="ml-auto text-base font-medium text-green-500">
										{getDiscountedPricePercentage(10000, 40)}% off
									</p>
								</>
							)}
						</div>
						<p className="text-sm text-gray-500">{"ehwdsfs"}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
