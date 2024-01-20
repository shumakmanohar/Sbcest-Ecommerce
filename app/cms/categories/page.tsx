import Category from "@/components/cms/Category";
import CategoryForm from "@/components/cms/CategoryForm";
import Header from "@/components/cms/Header";
import { GetCategories } from "@/server-actions/Category-Action";
import { ServerResponse } from "@/util/Enums";
import { PrismaClient } from "@prisma/client";

const pages = async () => {
	const { data: category, status } = await GetCategories();
	return (
		<div>
			<Header
				heading={"Categories"}
				description={"Manage your store categories"}
			/>
			<CategoryForm />
			<div className="mt-8 flex items-center flex-wrap gap-4">
				{status === ServerResponse.Success
					? category?.map(({ id, name, ar_name }) => (
							<Category key={id} name={name} id={id} ar_name={ar_name} />
					  ))
					: "Sorry Something Went Wrong Please Try Again"}
			</div>
		</div>
	);
};

export default pages;
