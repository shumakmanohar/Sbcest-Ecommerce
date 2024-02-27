import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<>
			<div className="flex flex-col gap-4 mt-16">
				{<Skeleton className="w-full max-w-md h-[80px] rounded-md" />}
				{<Skeleton className="w-full max-w-sm h-[30px] rounded-md" />}
			</div>

			<div className="flex flex-col gap-8 mt-10">
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md" />
			</div>
		</>
	);
};

export default loading;
