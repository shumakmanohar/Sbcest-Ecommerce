import { Skeleton } from "../ui/skeleton";

const InvoiceSkeleton = () => {
	return (
		<div>
			<div className="flex flex-col gap-2">
				<Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-300" />
				<Skeleton className="w-[100px] h-[21px] rounded-full bg-gray-300" />
			</div>
			{/* Card */}
			<div className="mt-2 grid grid-cols-4 gap-2">
				<Skeleton className="w-[100px] h-[80px] rounded-md bg-gray-300" />
				<div className="col-span-3 flex flex-col gap-2">
					<Skeleton className="  w-full max-w-sm h-[20px] rounded-full bg-gray-300" />
					<Skeleton className="  w-full max-w-sm h-[20px] rounded-full bg-gray-300" />
				</div>
			</div>
			{/* Card */}
			<div className="mt-2 grid grid-cols-4 gap-2">
				<Skeleton className="w-[100px] h-[80px] rounded-md bg-gray-300" />
				<div className="col-span-3 flex flex-col gap-2">
					<Skeleton className="  w-full max-w-sm h-[20px] rounded-full bg-gray-300" />
					<Skeleton className="  w-full max-w-sm h-[20px] rounded-full bg-gray-300" />
				</div>
			</div>
		</div>
	);
};

export default InvoiceSkeleton;
