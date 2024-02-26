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
import { CheckCircleIcon } from "lucide-react";
import { Order } from "@prisma/client";

const OrderCard = ({ order }: { order: Order }) => {
	return (
		<div className=" w-full bg-white">
			<div className="mb-8 ">
				<Table>
					<TableHeader className="bg-gray-100">
						<TableRow>
							<TableHead className="text-black font-bold ">
								Order number
							</TableHead>
							<TableHead className="text-black font-bold ">
								Date placed
							</TableHead>
							<TableHead className="text-black font-bold ">
								Total amount
							</TableHead>
							<TableHead className="text-black font-bold ">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableHead>{order.id}</TableHead>
							<TableHead>{order.createdAt.toISOString()}</TableHead>
							<TableHead>SAR {order.amount}</TableHead>
							<TableHead className="text-[#00adb5]">
								<Link href="#">Cancel</Link>
							</TableHead>
						</TableRow>
					</TableBody>
				</Table>
				<div className="flex flex-col gap-4 mt-4">
					{order.orderedProducts.map((product) => (
						<Card className="p-4" key={product.productId}>
							<div className="flex items-start gap-4">
								<Image
									src={product.previewImg}
									alt=""
									className="relative mx-auto mt-8"
									width={60}
									height={80}
									objectFit="contain"
								/>

								<div className="flex-1">
									<h3 className=" font-semibold ">{product.title}</h3>

									<p className="text-sm font-semibold">SAR {product.price}</p>
									<p className="text-xs mt-2">Quantity</p>
									<div className="flex items-center mt-2">
										<CheckCircleIcon className="text-green-500 mr-2" />
										<span className="text-xs">Delivered </span>
									</div>
								</div>
							</div>
							<div className="flex justify-end mt-2">
								<div className="px-4 text-sm text-[#00adb5] font-bold">
									<Link href={""}>View Product</Link>
								</div>
							</div>
						</Card>
						
					))}
					 <Card className="p-4 bg-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-1 flex-col">
                <h3 className=" font-semibold mb-4">Delivery Address:</h3>

                <p className="text-sm break-normal mb-4">
                  Muhammed Ranees Kommeri, +966 539740365, Unaizah, Dhahran, 23
                  Halah Al-Fida Passage.
                </p>
                <p className="text-sm break-normal">
                  محمد رنيس كوميري، +966 539740365، عنيزة، الظهران، ممر هالة
                  الفدا رقم 23.
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <div className="px-4 text-sm text-[#00adb5] font-bold">
                <Link href={""}>Manage Address</Link>
              </div>{" "}
            </div>
          </Card>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
