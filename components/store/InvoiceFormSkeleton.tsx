import React from "react";
import { Skeleton } from "../ui/skeleton";

const InvoiceFormSkeleton = () => {
	return (
		<div className="flex flex-col gap-4 mt-8">
			<div>
				<Skeleton className="w-[100px] h-[30px]  bg-gray-300 mb-2" />
				<Skeleton className="w-full max-w-sm h-[30px]  bg-gray-300" />
			</div>
			<div>
				<Skeleton className="w-[100px] h-[30px]  bg-gray-300 mb-2" />
				<Skeleton className="w-full max-w-sm h-[30px]  bg-gray-300" />
			</div>
			<br />
			<div>
				<Skeleton className="w-[100px] h-[30px]  bg-gray-300 mb-2" />
				<Skeleton className="w-full max-w-sm h-[30px]  bg-gray-300" />
			</div>
			<div>
				<Skeleton className="w-[100px] h-[30px]  bg-gray-300 mb-2" />
				<Skeleton className="w-full max-w-sm h-[30px]  bg-gray-300" />
			</div>
			<Skeleton className="w-full max-w-sm h-[50px]  bg-gray-300" />
		</div>
	);
};

export default InvoiceFormSkeleton;
