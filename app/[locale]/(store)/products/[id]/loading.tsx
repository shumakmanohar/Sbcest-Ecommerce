import Wrapper from "@/components/store/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<div className="w-full md:py-20 animate-pulse">
			<Wrapper>
				<div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
					{/* left column start */}
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0"></div>
					{/* left column end */}
					<Skeleton className="w-full max-w-xl h-[200px] rounded-md" />
					{/* right column start */}
					<div className="flex-[1] py-3 gap-4">
						{/* PRODUCT TITLE */}
						<Skeleton className="w-full max-w-xl h-[20px] rounded-md" />
						<Skeleton className="w-full max-w-xl h-[20px] rounded-md" />

						<Skeleton className="w-full max-w-xl h-[50px] rounded-md" />
						<Skeleton className="w-full max-w-xl h-[150px] rounded-md" />
					</div>
					{/* right column end */}
				</div>
			</Wrapper>
		</div>
	);
};

export default loading;
