import CategoryForm from "@/components/cms/CategoryForm";
import ErrorCms from "@/components/cms/ErrorCms";
import Header from "@/components/cms/Header";
import prisma from "@/lib/prisma";
import Error from "next/error";

const page = async ({ params }: { params: { id: string } }) => {
	try {
		const categories = await prisma.categories.findFirst({
			where: { id: params.id },
		});
		return (
			<div>
				<Header
					heading={`Edit Category [${categories?.name}]`}
					description={"Categories"}
				/>
				<CategoryForm categories={categories} />
			</div>
		);
	} catch (error: any) {
		return (
			<div>
				<ErrorCms error={error} />
			</div>
		);
	}
};

export default page;
