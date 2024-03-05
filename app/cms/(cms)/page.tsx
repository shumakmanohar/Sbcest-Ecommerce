import CardContent from "@/components/cms/CardContent";
import Header from "@/components/cms/Header";
import prisma from "@/lib/prisma";
import { Box, LucideIcon, PackageSearch } from "lucide-react";

const Card = ({
	name,
	total,
	description,
	icon,
}: {
	name: string;
	total: number;
	description: string;
	icon: JSX.Element;
}) => {
	return (
		<CardContent>
			<section className="flex justify-between gap-2">
				{/* label */}
				<p className="text-sm">{name}</p>
				{/* icon */}
				{icon}
			</section>
			<section className="flex flex-col gap-1">
				<h2 className="text-2xl font-semibold">{total}</h2>
				<p className="text-xs text-gray-500">{description}</p>
			</section>
		</CardContent>
	);
};

const page = async () => {
	const totalProducts = (await prisma.product.findMany()).length;
	const totalCategoires = (await prisma.categories.findMany()).length;
	const totalOrders = (await prisma.order.findMany()).length;
	return (
		<div className="mt-16">
			<Header description={"CMS Dashboard"} heading={"Overview"} />
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
				<Card
					name="Products"
					total={totalProducts}
					description={"Total  Products in Store"}
					icon={<PackageSearch className="h-4 w-4 text-gray-400" />}
				/>
				<Card
					name="Categories"
					total={totalCategoires}
					description={"Total  Categories in Store"}
					icon={<Box className="h-4 w-4 text-gray-400" />}
				/>
				<Card
					name="Order"
					total={totalOrders}
					description={"Total  Orders in Store"}
					icon={<Box className="h-4 w-4 text-gray-400" />}
				/>
			</div>
		</div>
	);
};

export default page;
