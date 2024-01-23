import Header from "@/components/cms/Header";
import SideNavBar from "@/components/cms/SideNavBar";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const Card = ({ name, total }: { name: string; total: number }) => {
	return (
		<div className="shadow-lg rounded-md p-10">
			<h3 className="text-5xl font-bold ">{total}</h3>
			<span className="mt-4 text-muted-foreground">{name}</span>
		</div>
	);
};

const page = async () => {
	const totalProducts = (await prisma.product.findMany()).length;
	const totalCategoires = (await prisma.categories.findMany()).length;
	return (
		<div className="mt-16">
			<Header description={"CMS Dashboard"} heading={"Overview"} />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
				<Card name="Products" total={totalProducts} />
				<Card name="Categories" total={totalCategoires} />
			</div>
		</div>
	);
};

export default page;
