import { Skeleton } from "@/components/ui/skeleton";
const SkeletonProductList = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 my-7 px-5 md:px-0">
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
			<Skeleton className=" h-[400px]  bg-gray-200" />
		</div>
	);
};

export default SkeletonProductList;
