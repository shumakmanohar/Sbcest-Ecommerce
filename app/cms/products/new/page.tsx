import Header from "@/components/cms/Header";
import React from "react";
import ProductForm from "@/components/cms/ProductForm";
import { GetCategories } from "@/server-actions/Category-Action";
import { ServerGetProps } from "@/util/Types";
import { Categories } from "@prisma/client";

const page = async () => {
	const data: ServerGetProps = await GetCategories();
	return (
		<div>
			<div>
				<Header heading={"Create Product"} description={"Add New Product"} />
			</div>
			<div className="py-8">
				<ProductForm categories={data.data as Categories[]} />
			</div>
		</div>
	);
};

export default page;
