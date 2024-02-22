import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return (
		<div className="container min-h-[80vh] flex items-center justify-center">
			<Skeleton className="w-full max-w-md h-[500px] rounded-md bg-gray-200" />
		</div>
	);
};

export default loading;
