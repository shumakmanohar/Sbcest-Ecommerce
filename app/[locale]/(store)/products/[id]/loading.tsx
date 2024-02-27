import Wrapper from "@/components/store/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<div className="min-h-[90vh]">
			<Wrapper>
				<div className=" grid grid-cols-2 md:grid-cols-2 gap-3">
					<div className="">
						<Skeleton className="w-full max-w-xl h-[500px] rounded-md bg-gray-300" />
					</div>

					<div className=" flex flex-col gap-4 justify-center">
						<Skeleton className="w-full max-w-md h-[20px]  bg-gray-300 rounded-md" />
						<Skeleton className="w-full max-w-xl h-[20px]  bg-gray-300 rounded-md" />

						<Skeleton className="w-full max-w-xl h-[50px]  bg-gray-300 rounded-md" />
						<Skeleton className="w-full max-w-xl h-[150px]  bg-gray-300 rounded-md" />
					</div>
				</div>
			</Wrapper>
		</div>
	);
};

export default loading;
