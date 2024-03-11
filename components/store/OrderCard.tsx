import {
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	Table,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { Ban, CheckCircleIcon } from "lucide-react";
import { DeliveryStatus, Order } from "@prisma/client";
import { CMS_CONFIG } from "@/cms.config";
import Trackbar from "./Trackbar";
import { useTranslations } from "next-intl";

const OrderCard = ({ order }: { order: Order }) => {
	const t = useTranslations("Dashboard");
	return (
		<div className=" w-full bg-white">
			<div className="mb-8 ">
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead className="text-black font-bold ">{t("on")}</TableHead>
							<TableHead className="text-black font-bold ">
								{t("date")}
							</TableHead>
							<TableHead className="text-black font-bold ">
								{t("total")}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableHead>{order.id}</TableHead>
							<TableHead>
								{order && new Date(order.createdAt).toLocaleDateString("en-GB")}
							</TableHead>
							<TableHead>
								{t("CA")} {order.amount}
							</TableHead>
						</TableRow>
					</TableBody>
				</Table>
				<div className="flex flex-col gap-4 mt-4">
					{/* DELIVERY STATUS BAR  */}
					{order.deliveryStatus === DeliveryStatus.CANCELLED ? (
						<div className="flex items-center mt-2">
							<Ban className="text-red-500 mr-2" />
							<span className="text-xs">{t("cancel")}</span>
						</div>
					) : (
						<Trackbar deliveryStatus={order.deliveryStatus} />
					)}

					{order.orderedProducts.map((product) => (
						<Card className="p-4" key={product.productId}>
							<div className="flex items-start gap-4">
								<Image
									src={
										product?.previewImg
											? `${CMS_CONFIG.cdn.location}/${product?.previewImg}`
											: "/sblogo.png"
									}
									alt=""
									className="relative mx-auto mt-8"
									width={60}
									height={80}
									objectFit="contain"
								/>

								<div className="flex-1">
									<h3 className=" font-semibold ">{product.title}</h3>

									<p className="text-sm font-semibold">
										{t("CA")} {product.price}
									</p>
									<p className="text-xs mt-2">
										{t("quantity")} : {`${product.quantity}`}
									</p>
								</div>
							</div>
							<div className="flex justify-end mt-2">
								<div className="px-4 text-sm text-[#00adb5] font-bold">
									<Link href={`/products/${product.productId}`}>{t("vm")}</Link>
								</div>
							</div>
						</Card>
					))}
					<Card className="p-4 bg-gray-200">
						<div className="flex items-start gap-4">
							<div className="flex-1 flex-col">
								<h3 className=" font-semibold mb-4">{t("da")}:</h3>

								<p className="text-sm break-normal mb-4">
									{`${order.shippingInformation.name}, ${order.shippingInformation.phone}, ${order.shippingInformation.addl1}, ${order.shippingInformation.addl2}, ${order.shippingInformation.name},  ${order.shippingInformation.district},${order.shippingInformation.city},${order.shippingInformation.region}, ${order.shippingInformation.postalCode}`}
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
