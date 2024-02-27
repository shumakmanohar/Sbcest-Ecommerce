import Wrapper from "@/components/store/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<Wrapper>
			<Skeleton className="w-[50px] h-[50px] rounded-full  bg-gray-200" />
			<div className="flex flex-col gap-4 mt-16">
				<Skeleton className="w-full max-w-md h-[80px] rounded-md  bg-gray-200" />
				<Skeleton className="w-full max-w-sm h-[30px] rounded-md  bg-gray-200" />
			</div>

			<div className="flex flex-col gap-8 mt-10 mb-20">
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md  bg-gray-200" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md  bg-gray-200" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md  bg-gray-200" />
				<Skeleton className="w-full max-w-xl h-[50px] rounded-md  bg-gray-200" />
			</div>
		</Wrapper>
	);
};

export default loading;
