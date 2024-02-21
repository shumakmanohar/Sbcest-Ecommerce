import { CMS_CONFIG } from "@/cms.config";
import { Product } from "@prisma/client";
import Image from "next/image";

const InvoiceCard = ({
	product,
	quantity,
}: {
	product: Product;
	quantity: number;
}) => {
	return (
		<div className="flex gap-4 items-center justify-between">
			{/* Image */}
			<div className="h-14 w-14 rounded-sm  relative">
				<Image
					fill
					className="object-contain"
					src={
						product?.previewImg
							? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
							: "/sblogo.png"
					}
					alt="Product Image"
				/>
			</div>
			{/* Product Name  and Quantity*/}
			<div>
				<p className="text-lg">{product.title}</p>
				<p className="text-md text-muted-foreground">Qauntity : {quantity}</p>
			</div>
			<div>
				<p className="font-semibold">
					SAR {product.isOnOffer ? product.offerPrice : product.price}
				</p>
			</div>
		</div>
	);
};

export default InvoiceCard;
